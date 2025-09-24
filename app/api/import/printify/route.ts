import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
export const runtime = "nodejs";
type Row = {
  shop_id:string; shop_title:string; subdomain:string;
  product_id:string; product_title:string;
  storefront_product_url:string; first_image_url:string;
  variant_count:string; min_price_cents:string; max_price_cents:string; tags:string;
};
export async function POST(req: NextRequest) {
  const need = process.env.IMPORTER_BEARER;
  if (need) {
    const tok = (req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
    if (tok !== need) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!(req.headers.get("content-type")||"").includes("text/csv")) {
    return NextResponse.json({ error: "Content-Type must be text/csv" }, { status: 400 });
  }
  const csv = await req.text();
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as Row[];
  const items = rows.filter(r => (r.storefront_product_url||"").trim() && Number(r.variant_count) > 0)
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
  return NextResponse.json({ imported: items.length, items });
}
