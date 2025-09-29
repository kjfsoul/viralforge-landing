import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

type ProductOut = { id: string; title: string; image: string; url: string; price?: string }

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const PRINTIFY_API_TOKEN = process.env.PRINTIFY_API_TOKEN!

const supaAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const supaSrv  = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

export const revalidate = 86400 // 24h

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const storeBase = (searchParams.get("storeBase") || "").trim()
  if (!storeBase) return NextResponse.json({ error: "storeBase required" }, { status: 400 })

  try {
    const domain = new URL(storeBase).host // e.g., 3iatlas.printify.me
    const shopId = await resolveShopId(domain)
    if (!shopId) throw new Error("shop-not-found")

    const products = await fetchProducts(shopId)
    const sorted = products.sort((a: any, b: any) =>
      (b.published_at ?? b.created_at ?? 0) - (a.published_at ?? a.created_at ?? 0)
    )

    const picks: ProductOut[] = []
    for (const p of sorted) {
      if (p.is_archived) continue
      const url = await resolvePublicUrl(storeBase, domain, p.id, p.title)
      if (!url) continue
      const cover = pickImage(p) || ""
      picks.push({ id: p.id, title: p.title, image: cover, url, price: p?.variants?.[0]?.price })
      if (picks.length === 3) break
    }

    // empty-state fallback
    if (picks.length === 0) {
      return NextResponse.json({
        items: [],
        fallback: { cta: "View all products", href: storeBase }
      })
    }

    return NextResponse.json({ items: picks })
  } catch (e) {
    // never crash UI – return fallback
    return NextResponse.json({
      items: [],
      fallback: { cta: "View all products", href: storeBase }
    })
  }
}

async function resolveShopId(domain: string): Promise<string | null> {
  const res = await fetch("https://api.printify.com/v1/shops.json", {
    headers: { Authorization: `Bearer ${PRINTIFY_API_TOKEN}` },
    cache: "no-store",
  })
  if (!res.ok) return null
  const data = await res.json()
  const match = (data || []).find((s: any) => {
    // Pop-up stores expose domain in "sales_channel"/"sales_channel_name"/"name" inconsistently; match loosely
    const src = `${s?.sales_channel || ""} ${s?.sales_channel_name || ""} ${s?.name || ""}`.toLowerCase()
    return src.includes(domain.toLowerCase())
  })
  return match?.id?.toString() || null
}

async function fetchProducts(shopId: string) {
  const res = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json?limit=100`, {
    headers: { Authorization: `Bearer ${PRINTIFY_API_TOKEN}` }, cache: "no-store",
  })
  if (!res.ok) return []
  const data = await res.json()
  return data?.data || data || []
}

async function resolvePublicUrl(storeBase: string, domain: string, productId: string, title: string) {
  const direct = new URL(`/product/${productId}`, storeBase).toString()
  // HEAD probe (some hosts block HEAD—treat 200/301/302 as valid; others return 405 but still valid)
  try {
    const probe = await fetch(direct, { method: "HEAD" })
    if ([200, 301, 302, 405].includes(probe.status)) return direct
  } catch {}

  // Scrape Map (daily) in Supabase – look up
  const { data: cached } = await supaAnon
    .from("storefront_product_urls")
    .select("public_url")
    .eq("store_domain", domain)
    .eq("product_id", productId)
    .eq("is_valid", true)
    .order("updated_at", { ascending: false })
    .limit(1)
  if (cached?.[0]?.public_url) return cached[0].public_url

  // If no map, try a light scrape and upsert (service role)
  try {
    const htmlRes = await fetch(storeBase, { cache: "no-store" })
    if (htmlRes.ok) {
      const html = await htmlRes.text()
      // naive link capture: /product/<id> + surrounding title
      const links = Array.from(html.matchAll(/href="(\/product\/[^"]+)"/g)).map(m => m[1])
      for (const href of links) {
        const url = new URL(href, storeBase).toString()
        await supaSrv.from("storefront_product_urls").upsert({
          store_domain: domain,
          product_id: href.split("/").pop(),
          product_title: title,
          public_url: url,
          http_status: 200,
          is_valid: true,
        })
        if (href.endsWith(productId)) return url
      }
    }
  } catch {}
  return null
}

function pickImage(p: any): string | undefined {
  // Printify product images live under p.images or p.print_areas/variants; be defensive
  if (Array.isArray(p?.images) && p.images[0]?.src) return p.images[0].src
  if (Array.isArray(p?.print_areas) && p.print_areas[0]?.placeholders?.[0]?.images?.[0]?.src)
    return p.print_areas[0].placeholders[0].images[0].src
}