import 'server-only'

import fallback from '../data/news-fallback.json'

export type NewsArticle = {
  id: string
  title: string
  summary: string
  published_at: string
  image_url: string | null
  source: string | null
  url: string
}

type FetchOptions = {
  live?: boolean
  limit?: number
}

const DEFAULT_LIMIT = 3
const SPACE_NEWS_ENDPOINT = process.env.SPACE_NEWS_API_URL || 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10&ordering=-published_at'

const ATLAS_REGEX = /3\s*i\s*[\/-]?\s*atlas/iu

function matchesAtlas(text: string | null | undefined): boolean {
  if (!text) return false
  return ATLAS_REGEX.test(text)
}

async function fetchRemote(limit: number): Promise<NewsArticle[]> {
  const endpoint = SPACE_NEWS_ENDPOINT.includes('limit=')
    ? SPACE_NEWS_ENDPOINT
    : `${SPACE_NEWS_ENDPOINT}${SPACE_NEWS_ENDPOINT.includes('?') ? '&' : '?'}limit=${limit}`

  const res = await fetch(endpoint, {
    headers: {
      'User-Agent': '3i-atlas-observatory',
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`News API responded with ${res.status}`)
  }

  const json = await res.json() as any
  const results = Array.isArray(json?.results) ? json.results : Array.isArray(json) ? json : []

  const normalized = results.map((item: any, index: number) => ({
    id: String(item.id ?? item.slug ?? `remote-${index}`),
    title: String(item.title ?? item.name ?? '3I/Atlas Update'),
    summary: String(item.summary ?? item.description ?? '').trim(),
    published_at: item.published_at ?? item.published ?? new Date().toISOString(),
    image_url: item.image_url ?? item.imageUrl ?? null,
    source: item.news_site ?? item.source ?? null,
    url: item.url ?? item.link ?? '#',
  }))

  const filtered = normalized.filter((item: NewsArticle) => matchesAtlas(item.title) || matchesAtlas(item.summary))

  return (filtered.length
    ? filtered
    : normalized.filter((item: NewsArticle) => matchesAtlas(item.url))).slice(0, limit)
}

function normalizeFallback(limit: number): NewsArticle[] {
  return fallback.slice(0, limit).map((item, index) => ({
    id: item.id || `fallback-${index}`,
    title: item.title,
    summary: item.summary,
    published_at: item.published_at,
    image_url: item.image_url || null,
    source: item.source || null,
    url: item.url,
  }))
}

export async function getLatestNews(opts: FetchOptions = {}): Promise<NewsArticle[]> {
  const limit = Math.max(1, Math.min(opts.limit ?? DEFAULT_LIMIT, 6))
  const live = Boolean(opts.live)

  if (!live) {
    try {
      const cached = await fetchRemote(limit)
      if (cached.length) return cached
    } catch (error) {
      console.warn('[news] remote fetch failed, using fallback', error)
    }
    const fallbackArticles = normalizeFallback(fallback.length)
    return fallbackArticles.slice(0, limit)
  }

  try {
    const fresh = await fetchRemote(limit)
    if (fresh.length) return fresh
  } catch (error) {
    console.error('[news] live fetch failed, using fallback', error)
  }
  const fallbackArticles = normalizeFallback(fallback.length)
  return fallbackArticles.slice(0, limit)
}
