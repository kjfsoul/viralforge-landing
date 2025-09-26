#!/usr/bin/env bash
set -euo pipefail

# Find a free port using Python, fallback to 3000
PORT=$(python - <<'PY'
import socket
s=socket.socket()
s.bind(('',0))
print(s.getsockname()[1])
s.close()
PY
)
if [[ -z "$PORT" ]]; then PORT=3000; fi

echo "Starting Next.js dev on port $PORT"

# Start server in background
NEXT_TELEMETRY_DISABLED=1 NODE_ENV=development npx next dev -p "$PORT" &
PID=$!

# Wait for server to be ready
RETRIES=60
URL="http://localhost:$PORT/"
until curl -sf "$URL" >/dev/null 2>&1; do
  sleep 0.5
  RETRIES=$((RETRIES-1))
  if [[ $RETRIES -le 0 ]]; then
    echo "Dev server did not become ready in time" >&2
    kill "$PID" 2>/dev/null || true
    exit 1
  fi
done

echo "Opening $URL"
if command -v open >/dev/null 2>&1; then
  open "$URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$URL"
fi

# Attach to server process
wait "$PID"

