import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET() {
  const url = process.env.CATALOG_BLOB_URL;
  if (!url) return NextResponse.json([], { headers: { "cache-control": "no-store" }});
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return NextResponse.json([], { headers: { "cache-control": "no-store" }});
  const items = await res.json();
  return NextResponse.json(items, { headers: { "cache-control": "no-store" }});
}
