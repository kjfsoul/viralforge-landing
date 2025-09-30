import { NextResponse } from "next/server";

export const runtime = "edge"; // or "nodejs" if you prefer

export async function GET() {
  try {
    const url = process.env.CATALOG_BLOB_URL;
    if (!url) {
      return NextResponse.json([], { headers: { "cache-control": "no-store" } });
    }
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json([], { headers: { "cache-control": "no-store" } });
    }
    const items = await res.json();
    return NextResponse.json(items, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("CATALOG_ERROR", msg);
    return NextResponse.json([], { headers: { "cache-control": "no-store" } });
  }
}
