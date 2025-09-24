#!/usr/bin/env bash
set -euo pipefail

# ---------- PRECHECKS ----------
: "${PRINTIFY_API_TOKEN:?PRINTIFY_API_TOKEN is not set in the shell}"
command -v jq >/dev/null 2>&1 || { echo "jq is required. Install: brew install jq" >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "python3 is required." >&2; exit 1; }
[ -x ./live_printify_published_csv.sh ] || { echo "./live_printify_published_csv.sh is missing or not executable" >&2; exit 1; }

# Config
LIMIT="${PRINTIFY_LIMIT:-50}"
REQUIRED_HEADER="shop_id,shop_title,subdomain,product_id,product_title,storefront_product_url,first_image_url,variant_count,min_price_cents,max_price_cents,tags"
CSV_PUBLISHED="/tmp/published_products.csv"
CSV_READY="/tmp/site_ready.csv"
LOG="/tmp/printify_sync.log"

echo "[START] $(date -u +"%Y-%m-%dT%H:%M:%SZ") | LIMIT=$LIMIT" | tee "$LOG"

# ---------- 1) LIVE EXPORT ----------
echo "[EXPORT] running live_printify_published_csv.sh..." | tee -a "$LOG"
bash -lc "bash ./live_printify_published_csv.sh > '$CSV_PUBLISHED'"

# ---------- 2) VALIDATE PULL ----------
if [ ! -s "$CSV_PUBLISHED" ]; then
  echo "[ERROR] Exporter produced empty CSV" | tee -a "$LOG"; exit 1
fi
HEADER="$(head -n1 "$CSV_PUBLISHED" | tr -d $'\r')"
if [ "$HEADER" != "$REQUIRED_HEADER" ]; then
  echo "[ERROR] Unexpected CSV header" | tee -a "$LOG"
  echo "Got:      $HEADER" | tee -a "$LOG"
  echo "Expected: $REQUIRED_HEADER" | tee -a "$LOG"
  exit 1
fi
ROWS_TOTAL=$(($(wc -l < "$CSV_PUBLISHED") - 1))
echo "[OK] Export rows (incl. unpublished): $ROWS_TOTAL" | tee -a "$LOG"

# ---------- 3) FILTER TO POSTABLE ----------
python3 - << 'PY' >/tmp/site_ready.csv
import csv, sys
inp = '/tmp/published_products.csv'
out = '/tmp/site_ready.csv'
with open(inp, newline='') as f, open(out, 'w', newline='') as g:
    r = csv.DictReader(f)
    w = csv.DictWriter(g, fieldnames=r.fieldnames)
    w.writeheader()
    kept = 0; skipped = 0
    for row in r:
        url = (row.get('storefront_product_url') or '').strip()
        try:
            vc = int(float(row.get('variant_count') or '0'))
        except ValueError:
            vc = 0
        if url and vc > 0:
            w.writerow(row); kept += 1
        else:
            skipped += 1
    sys.stderr.write(f"[FILTER] kept={kept} skipped={skipped}\n")
    if kept == 0:
        sys.stderr.write('[ERROR] No site-ready rows (no URL or no enabled variants)\n'); sys.exit(2)
PY
FILTER_MSG=$?
if [ "$FILTER_MSG" -ne 0 ] && [ "$FILTER_MSG" -ne 2 ]; then exit "$FILTER_MSG"; fi
echo "[OK] Filtered CSV -> $CSV_READY" | tee -a "$LOG"

# ---------- 4) UPSERT INTO SITE (IDEMPOTENT) ----------
# OPTION A: HTTP importer (set IMPORTER_URL + optional AUTH header)
if [ "${IMPORTER_URL:-}" != "" ]; then
  echo "[IMPORT] POST CSV to $IMPORTER_URL" | tee -a "$LOG"
  # Example expects JSON response with {added,updated,unlisted,skipped,per_brand:{...}}
  curl -fsS -X POST "$IMPORTER_URL" \
    -H "Content-Type: text/csv" ${IMPORTER_AUTH:+-H "$IMPORTER_AUTH"} \
    --data-binary @"$CSV_READY" > /tmp/import_result.json
  echo "[IMPORT] Response:" | tee -a "$LOG"
  cat /tmp/import_result.json | tee -a "$LOG"

# OPTION B: CLI importer (set IMPORTER_CMD to your script path)
elif [ "${IMPORTER_CMD:-}" != "" ]; then
  echo "[IMPORT] Running CLI importer: $IMPORTER_CMD $CSV_READY" | tee -a "$LOG"
  "$IMPORTER_CMD" "$CSV_READY" | tee /tmp/import_result.json

# OPTION C: No importer provided – skip with notice
else
  echo "[WARN] No importer configured (IMPORTER_URL or IMPORTER_CMD). Skipping DB upsert." | tee -a "$LOG"
  echo '{"added":0,"updated":0,"unlisted":0,"skipped":0,"per_brand":{}}' > /tmp/import_result.json
fi

# ---------- 5) REVALIDATE / CACHE-BUST (OPTIONAL) ----------
# Set REVALIDATE_HITS="https://yoursite/api/revalidate?path=/,/brands,/shop/3iatlas"
if [ "${REVALIDATE_HITS:-}" != "" ]; then
  echo "[REVALIDATE] Hitting endpoints..." | tee -a "$LOG"
  IFS=',' read -r -a PATHS <<< "$REVALIDATE_HITS"
  for P in "${PATHS[@]}"; do
    echo "  -> $P" | tee -a "$LOG"
    curl -fsS -X POST "$P" >/dev/null || echo "[WARN] Revalidate failed: $P" | tee -a "$LOG"
  done
else
  echo "[REVALIDATE] None configured. Skipping." | tee -a "$LOG"
fi

# ---------- 6) QA SPOT-CHECK (5 links per brand) ----------
python3 - << 'PY'
import csv, subprocess, random
from collections import defaultdict

f = '/tmp/site_ready.csv'
rows = list(csv.DictReader(open(f, newline='')))
by_brand = defaultdict(list)
for r in rows: by_brand[r['shop_title']].append(r)

for brand, lst in by_brand.items():
    sample = random.sample(lst, min(5, len(lst)))
    print(f'\n=== QA: {brand} (sample {len(sample)} of {len(lst)}) ===')
    for r in sample:
        url = r['storefront_product_url']
        try:
            res = subprocess.run(['curl','-fsSI',url], capture_output=True, text=True, timeout=10)
            status = (res.stdout.splitlines()[0] if res.stdout else 'NO-HEADERS').strip()
        except Exception as e:
            status = f'ERROR: {e}'
        print(f'- {r["product_title"][:64]} -> {url} [{status}]')
PY

# ---------- 7) REPORT ----------
python3 - << 'PY'
import csv, json
from collections import defaultdict

ready = '/tmp/site_ready.csv'
rows = list(csv.DictReader(open(ready, newline='')))
counts = defaultdict(int)
for _ in rows: counts['site_ready'] += 1

try:
    imp = json.load(open('/tmp/import_result.json'))
except Exception:
    imp = {"added":0,"updated":0,"unlisted":0,"skipped":0,"per_brand":{}}

print("\n=== SUMMARY ===")
print(json.dumps({
  "rows_exported": sum(1 for _ in open("/tmp/published_products.csv"))-1,
  "rows_site_ready": counts.get("site_ready",0),
  "import_result": imp
}, indent=2))
PY

echo "[DONE] $(date -u +"%Y-%m-%dT%H:%M:%SZ") | CSV ready -> $CSV_READY" | tee -a "$LOG"
