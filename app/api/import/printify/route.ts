cat > app/api/import/printify/route.ts <<'TS2'
import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { put } from "@vercel/blob";
export const runtime = "nodejs";
type Row = { shop_id:string; shop_title:string; subdomain:string; product_id:string; product_title:string; storefront_product_url:string; first_image_url:string; variant_count:string; min_price_cents:string; max_price_cents:string; tags:string; };
export async function POST(req: NextRequest) {
  try {
    const need = process.env.IMPORTER_BEARER;
    if (need) {
      const tok = (req.headers.get("authorization")||"").replace(/^Bearer\s+/, "");
      if (tok !== need) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!(req.headers.get("content-type") || "").includes("text/csv")) {
      return NextResponse.json({ error: "Content-Type must be text/csv" }, { status: 400 });
    }
    const csv = await req.text();
    const rows = parse(csv, { columns: true, skip_empty_lines: true }) as Row[];
    const items = rows
      .filter(r => (r.storefront_product_url||"").trim() && Number(r.variant_count) > 0)
      .map(r => ({
        key: `${r.shop_id}:${r.product_id}`,
        shop_id: r.shop_id,
        shop_title: r.shop_title,
        subdomain: r.subdomain,
        product_id: r.product_id,
        title: r.product_title,
        buy_url: r.storefront_product_url,
        image: r.first_image_url,
        price_min: (Number(r.min_price_cents)||0)/100,
        price_max: (Number(r.max_price_cents)||0)/100,
        tags: (r.tags||"").split("|").filter(Boolean),
        touched_at: new Date().toISOString()
      }));
    const key = "printify/catalog.json";
    const { url } = await put(key, JSON.stringify(items), {
      contentType: "application/json",
      access: "public",
      allowOverwrite: true
    });
    return NextResponse.json({ imported: items.length, blob_url: url });
  } catch (err: any) {
    console.error("IMPORT_ERROR", err?.stack || err?.message);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
