import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const need = process.env.IMPORTER_BEARER || "";
  if (need) {
    const tok = (req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
    if (tok !== need) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(req.headers.get("content-type")||"").includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 400 });
  }

  const body = await req.json();
  const items = Array.isArray(body) ? body : body.items;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Body must be { items: [...] } or an array" }, { status: 400 });
  }

  const { url } = await put("printify/catalog.json", JSON.stringify(items), {
    contentType: "application/json",
    access: "public",
  });
  return NextResponse.json({ count: items.length, blob_url: url });
}
