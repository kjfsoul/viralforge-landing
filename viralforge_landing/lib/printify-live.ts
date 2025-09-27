/**
 * Printify live data utilities
 * - Server-only fetcher for products per shop
 * - Normalization to a stable shape for UI/API
 * - In-memory cache with TTL and live-bypass support
 */

import 'server-only'

export type NormalizedProduct = {
  // Core identity
  id: string
  product_id: string
  shop_id: string
  shop_title: string
  brand: string

  // Display
  title: string
  description: string
  short_description: string
  first_image_url: string | null
  images: { id: string; url: string }[]
  variant_count: number
  tags: string[]

  // Pricing
  price_min_cents: number | null
  price_max_cents: number | null
  default_price_cents: number | null
  price_min: number | null // dollars
  price_max: number | null // dollars

  // Links
  storefront_product_url: string | null
  external_handle: string | null

  // Meta
  updated_at: string | null
}

type PrintifyVariant = {
  id: number | string
  price?: number
  is_default?: boolean
}

type PrintifyImage = {
  src?: string
  is_default?: boolean
}

type PrintifyExternal = {
  handle?: string | null
}

type PrintifyProductSummary = {
  id: string
  title?: string
  updated_at?: string
}

type PrintifyProductDetail = {
  id: string
  shop_id: number | string
  title?: string
  description?: string
  tags?: string[]
  variants?: PrintifyVariant[]
  images?: PrintifyImage[]
  print_areas?: { placeholders?: { images?: { src?: string }[] }[] }[]
  updated_at?: string
  visible?: boolean
  is_deleted?: boolean
  external?: PrintifyExternal | null
}

type FetchOptions = {
  limit?: number
  page?: number
  live?: boolean
}

const PRINTIFY_API_BASE = 'https://api.printify.com/v1'

type ShopKey = '3IATLAS' | 'BIRTHDAYGEN' | 'EDM_SHUFFLE' | 'MYSTIC_ARCANA'

type ShopCfg = {
  idEnv: string
  brand: string
}

const SHOPS: Record<ShopKey, ShopCfg> = {
  '3IATLAS': {
    idEnv: 'PRINTIFY_SHOP_ID_3IATLAS',
    brand: '3iAtlas',
  },
  'BIRTHDAYGEN': {
    idEnv: 'PRINTIFY_SHOP_ID_BIRTHDAYGEN',
    brand: 'BirthdayGen',
  },
  'EDM_SHUFFLE': {
    idEnv: 'PRINTIFY_SHOP_ID_EDM_SHUFFLE',
    brand: 'EDM Shuffle',
  },
  'MYSTIC_ARCANA': {
    idEnv: 'PRINTIFY_SHOP_ID_MYSTIC_ARCANA',
    brand: 'Mystic Arcana',
  },
}

export type BrandName =
  | '3iAtlas'
  | 'BirthdayGen'
  | 'EDM Shuffle'
  | 'Mystic Arcana'

export function assertRequiredEnv() {
  const missing: string[] = []
  if (!process.env.PRINTIFY_API_TOKEN) missing.push('PRINTIFY_API_TOKEN')
  for (const k of Object.keys(SHOPS) as ShopKey[]) {
    const s = SHOPS[k]
    if (!process.env[s.idEnv]) missing.push(s.idEnv)
  }
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

function getShopIdByBrand(brand: BrandName): string {
  switch (brand) {
    case '3iAtlas':
      return process.env[SHOPS['3IATLAS'].idEnv] as string
    case 'BirthdayGen':
      return process.env[SHOPS['BIRTHDAYGEN'].idEnv] as string
    case 'EDM Shuffle':
      return process.env[SHOPS['EDM_SHUFFLE'].idEnv] as string
    case 'Mystic Arcana':
      return process.env[SHOPS['MYSTIC_ARCANA'].idEnv] as string
  }
}

function getBrandByShopId(shopId: string): BrandName {
  if (shopId === process.env[SHOPS['3IATLAS'].idEnv]) return '3iAtlas'
  if (shopId === process.env[SHOPS['BIRTHDAYGEN'].idEnv]) return 'BirthdayGen'
  if (shopId === process.env[SHOPS['EDM_SHUFFLE'].idEnv]) return 'EDM Shuffle'
  if (shopId === process.env[SHOPS['MYSTIC_ARCANA'].idEnv]) return 'Mystic Arcana'
  // Default unreachable for known mapping
  return '3iAtlas'
}

function resolveExternalUrl(handle: string | null | undefined): string | null {
  if (!handle) return null
  if (/^https?:/i.test(handle)) return handle
  const normalized = handle.startsWith('/') ? handle : `/${handle}`
  return `https://printify.com${normalized}`
}

function pickImageUrl(p: PrintifyProductDetail): string | null {
  const images = p.images || []
  const defaultImg = images.find(img => img && img.is_default && typeof img.src === 'string')
  if (defaultImg?.src) return defaultImg.src
  const fallback = images.find(img => typeof img?.src === 'string')
  if (fallback?.src) return fallback.src
  const area = p.print_areas?.[0]
  const ph = area?.placeholders?.[0]
  const img = ph?.images?.find(entry => typeof entry?.src === 'string')?.src
  return img ?? null
}

function computePriceRange(variants: PrintifyVariant[] | undefined) {
  const collection = (variants || []).filter(v => v && typeof v.price === 'number')
  if (!collection.length) {
    return { minCents: null as number | null, maxCents: null as number | null, defaultCents: null as number | null }
  }
  const defaultVariant = collection.find(v => v.is_default)
  let min = Number.MAX_SAFE_INTEGER
  let max = 0
  for (const v of collection) {
    const c = v.price as number
    if (c < min) min = c
    if (c > max) max = c
  }
  return {
    minCents: min,
    maxCents: max,
    defaultCents: defaultVariant?.price ?? collection[0].price ?? null,
  }
}

function truncateWords(input: string | undefined, maxWords = 20): string {
  if (!input) return ''
  const words = input.replace(/\s+/g, ' ').trim().split(' ')
  if (words.length <= maxWords) return words.join(' ')
  return words.slice(0, maxWords).join(' ') + '…'
}

function normalize(shopId: string, detail: PrintifyProductDetail): NormalizedProduct | null {
  if (!detail || detail.is_deleted) return null
  if (typeof detail.visible !== 'undefined' && !detail.visible) return null

  const imgUrl = pickImageUrl(detail)
  const { minCents, maxCents, defaultCents } = computePriceRange(detail.variants)
  if (!imgUrl || !minCents) {
    // Require an image and price for storefront display
    if (!imgUrl) return null
  }

  const brand = getBrandByShopId(shopId)
  const priceMin = minCents != null ? Number((minCents / 100).toFixed(2)) : null
  const priceMax = maxCents != null ? Number((maxCents / 100).toFixed(2)) : null
  const firstImage = imgUrl ? [{ id: '0', url: imgUrl }] : []
  const externalUrl = resolveExternalUrl(detail.external?.handle ?? null)

  return {
    id: detail.id,
    product_id: detail.id,
    shop_id: shopId,
    shop_title: brand,
    brand,
    title: detail.title || '',
    description: detail.description || '',
    short_description: truncateWords(detail.description || detail.title || ''),
    first_image_url: imgUrl,
    images: firstImage,
    variant_count: (detail.variants || []).length,
    tags: detail.tags || [],
    price_min_cents: minCents,
    price_max_cents: maxCents,
    default_price_cents: defaultCents,
    price_min: priceMin,
    price_max: priceMax,
    storefront_product_url: externalUrl,
    external_handle: detail.external?.handle ?? null,
    updated_at: detail.updated_at || null,
  }
}

async function fetchJson(url: string, apiToken: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'User-Agent': '3i-atlas-observatory',
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Printify ${res.status}: ${body}`)
  }
  return res.json()
}

async function listAllProducts(shopId: string, apiToken: string): Promise<PrintifyProductSummary[]> {
  const items: PrintifyProductSummary[] = []
  for (let page = 1; ; page += 1) {
    const json = await fetchJson(
      `${PRINTIFY_API_BASE}/shops/${shopId}/products.json?limit=50&page=${page}`,
      apiToken,
    )
    let arr: unknown = json
    if (!Array.isArray(arr)) {
      if (json && Array.isArray(json.data)) arr = json.data
      else if (json && Array.isArray(json.products)) arr = json.products
      else if (json && Array.isArray(json.items)) arr = json.items
      else arr = []
    }
    const cast = arr as PrintifyProductSummary[]
    if (!cast.length) break
    items.push(...cast)
    if (cast.length < 50) break
  }
  return items
}

async function fetchDetails(shopId: string, ids: string[], apiToken: string): Promise<PrintifyProductDetail[]> {
  const results: PrintifyProductDetail[] = []
  const queue = [...ids]
  const concurrency = 4
  const workers: Promise<void>[] = []

  const next = async () => {
    const id = queue.shift()
    if (!id) return
    try {
      const detail = await fetchJson(
        `${PRINTIFY_API_BASE}/shops/${shopId}/products/${id}.json`,
        apiToken,
      ) as PrintifyProductDetail
      results.push(detail)
    } catch (error) {
      console.warn(`Failed to hydrate product ${id} for shop ${shopId}:`, error)
    }
    await next()
  }

  for (let i = 0; i < concurrency; i += 1) {
    workers.push(next())
  }

  await Promise.all(workers)
  return results
}

// Simple in-memory cache keyed per shop
type CacheEntry = { ts: number; data: NormalizedProduct[] }
const CACHE = new Map<string, CacheEntry>()
const TTL_MS = 12 * 60 * 1000 // 12 minutes

async function loadShopInventory(shopId: string, live: boolean): Promise<NormalizedProduct[]> {
  assertRequiredEnv()
  const apiToken = process.env.PRINTIFY_API_TOKEN as string
  const now = Date.now()
  const cached = CACHE.get(shopId)
  if (cached && !live && now - cached.ts < TTL_MS) {
    return cached.data
  }

  const summaries = await listAllProducts(shopId, apiToken)
  const details = await fetchDetails(shopId, summaries.map(s => s.id), apiToken)
  const normalized = details
    .map(detail => normalize(shopId, detail))
    .filter((p): p is NormalizedProduct => Boolean(p))
    .sort((a, b) => {
      const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0
      const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0
      return bTime - aTime
    })

  CACHE.set(shopId, { ts: now, data: normalized })
  return normalized
}

export async function getShopProducts(shopId: string, opts: FetchOptions = {}): Promise<NormalizedProduct[]> {
  const limit = Math.min(Math.max(Number(opts.limit) || 50, 1), 50)
  const page = Math.max(Number(opts.page) || 1, 1)
  const live = Boolean(opts.live)

  const inventory = await loadShopInventory(shopId, live)
  const start = (page - 1) * limit
  const end = start + limit
  return inventory.slice(start, end)
}

export async function getAllProductsForBrand(brand: BrandName, opts: FetchOptions = {}) {
  const shopId = getShopIdByBrand(brand)
  if (!shopId) return []
  if (opts.limit || opts.page) {
    return getShopProducts(shopId, opts)
  }
  return loadShopInventory(shopId, Boolean(opts.live))
}

export async function getProductByIdFromAnyShop(productId: string): Promise<NormalizedProduct | null> {
  assertRequiredEnv()
  const apiToken = process.env.PRINTIFY_API_TOKEN as string
  const shopIds = [
    process.env[SHOPS['3IATLAS'].idEnv] as string,
    process.env[SHOPS['BIRTHDAYGEN'].idEnv] as string,
    process.env[SHOPS['EDM_SHUFFLE'].idEnv] as string,
    process.env[SHOPS['MYSTIC_ARCANA'].idEnv] as string,
  ]
  for (const shopId of shopIds) {
    try {
      const detail = await fetchJson(
        `${PRINTIFY_API_BASE}/shops/${shopId}/products/${productId}.json`,
        apiToken,
      ) as PrintifyProductDetail
      const normalized = normalize(shopId, detail)
      if (normalized) return normalized
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        continue
      }
      throw error
    }
  }
  return null
}

export function truncateDescription(desc: string) {
  return truncateWords(desc, 20)
}

// Cache utilities
export function clearCache(brand?: BrandName) {
  if (!brand) {
    CACHE.clear()
    return
  }
  const shopId = getShopIdByBrand(brand)
  CACHE.delete(shopId)
}

// Export helpers (for CSV export)
export async function paginateAll(shopId: string): Promise<NormalizedProduct[]> {
  return loadShopInventory(shopId, true)
}

export async function exportCsvForAllFourShops(): Promise<string> {
  assertRequiredEnv()
  const shops = [
    { id: process.env[SHOPS['3IATLAS'].idEnv] as string, title: '3iAtlas' },
    { id: process.env[SHOPS['BIRTHDAYGEN'].idEnv] as string, title: 'BirthdayGen' },
    { id: process.env[SHOPS['EDM_SHUFFLE'].idEnv] as string, title: 'EDM Shuffle' },
    { id: process.env[SHOPS['MYSTIC_ARCANA'].idEnv] as string, title: 'Mystic Arcana' },
  ]
  const header = [
    'shop_id','shop_title','product_id','product_title','storefront_product_url','first_image_url','variant_count','min_price_cents','max_price_cents','tags'
  ]
  const lines: string[] = [header.join(',')]
  let validRows = 0
  for (const s of shops) {
    const rows = await paginateAll(s.id)
    for (const p of rows) {
      if (!p.storefront_product_url || (p.variant_count || 0) <= 0) continue
      const tags = (p.tags || []).join('|')
      const rec = [
        s.id,
        JSON.stringify(s.title),
        JSON.stringify(p.product_id),
        JSON.stringify(p.title),
        JSON.stringify(p.storefront_product_url),
        JSON.stringify(p.first_image_url || ''),
        String(p.variant_count ?? 0),
        String(p.price_min_cents ?? ''),
        String(p.price_max_cents ?? ''),
        JSON.stringify(tags),
      ]
      lines.push(rec.join(','))
      validRows += 1
    }
  }
  if (validRows === 0) {
    throw new Error('Exporter produced empty dataset after filtering')
  }
  return lines.join('\n') + '\n'
}
