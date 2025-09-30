import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { parse } from "csv-parse/sync";
import { clearCache } from "@/lib/printify-live";

// DEBUG: Log file content analysis
console.log("=== DEBUG: File Content Analysis ===");
console.log("File location:", __filename);
console.log("First few lines of file:");
console.log("Line 1:", import.meta.url || "import.meta.url not available");
console.log("Current timestamp:", new Date().toISOString());
console.log("Node environment:", process.env.NODE_ENV);
console.log("=== END DEBUG ===");

export const runtime = "nodejs";

type Row = {
  shop_id: string; shop_title: string; subdomain: string;
  product_id: string; product_title: string;
  storefront_product_url: string; first_image_url: string;
  variant_count: string; min_price_cents: string; max_price_cents: string;
  tags: string;
};

const AUTH = process.env.IMPORTER_BEARER || "";

export async function POST(req: NextRequest) {
  if (AUTH) {
    const hdr = req.headers.get("authorization") || "";
    if (hdr !== `Bearer ${AUTH}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  if (!(req.headers.get("content-type") || "").includes("text/csv")) {
    return NextResponse.json(
      { error: "Content-Type must be text/csv" },
      { status: 400 }
    );
  }

  const csvText = await req.text();
  const rows = parse(csvText, { columns: true, skip_empty_lines: true }) as Row[];

  const items = rows
    .filter(r => (r.storefront_product_url || "").trim() && Number(r.variant_count) > 0)
    .map(r => ({
      key: `${r.shop_id}:${r.product_id}`,
      shop_id: r.shop_id,
      shop_title: r.shop_title,
      subdomain: r.subdomain,
      product_id: r.product_id,
      product_title: r.product_title,
      buy_url: r.storefront_product_url,
      image: r.first_image_url,
      price_min: (Number(r.min_price_cents) || 0) / 100,
      price_max: (Number(r.max_price_cents) || 0) / 100,
      tags: (r.tags || "").split("|").filter(Boolean),
      touched_at: new Date().toISOString(),
    }));

  const { url } = await put("printify/catalog.json", JSON.stringify(items), {
    contentType: "application/json",
    access: "public",
  });

  // Bust caches for all brands so UI reflects changes immediately
  clearCache()

  return NextResponse.json({ count: items.length, blob_url: url });
}
