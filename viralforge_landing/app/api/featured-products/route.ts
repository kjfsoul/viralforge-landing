export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function makeSupa() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supa = makeSupa();
  if (!supa) return NextResponse.json({ items: [] }); // safe during build

  const { data, error } = await supa
    .from("featured_products")
    .select("brand, product_id, title, image_url, product_url")
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: data ?? [] });
}
