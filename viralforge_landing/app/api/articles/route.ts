import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supa = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
export const revalidate = 86400

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const limit = Math.max(1, Math.min(parseInt(url.searchParams.get("limit") || "3", 10), 3))

  const { data, error } = await supa
    .from("articles")
    .select("title, excerpt, slug, canonical_url, image_url, published_at, tags")
    .eq("published", true)
    .contains("tags", ["3I-Atlas"])
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ items: [] }) // silent fail → UI can handle empty

  return NextResponse.json({ items: data || [] })
}