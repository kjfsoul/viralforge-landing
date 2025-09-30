export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function makeSupa() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const supa = makeSupa();
  if (!supa) return NextResponse.json({ items: [] }); // safe during build

  const url = new URL(req.url);
  const limit = Math.max(
    1,
    Math.min(parseInt(url.searchParams.get("limit") || "3", 10), 3)
  );

  const { data, error } = await supa
    .from("articles")
    .select(
      "title, excerpt, slug, canonical_url, image_url, published_at, tags"
    )
    .eq("published", true)
    .contains("tags", ["3I-Atlas"])
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: data || [] });
}
