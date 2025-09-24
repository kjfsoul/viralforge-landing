import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
export const runtime = "nodejs";
export async function GET() {
  try {
    const { blobs } = await list({ prefix: "printify/catalog.json", limit: 1 });
    if (!blobs.length) return NextResponse.json([]);
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    const items = await res.json();
    return NextResponse.json(items, { headers: { "cache-control": "no-store" } });
  } catch (e) {
    console.error("CATALOG_ERROR", e?.message);
    return NextResponse.json([], { headers: { "cache-control": "no-store" } });
  }
}
