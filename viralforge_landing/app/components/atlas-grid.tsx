"use client"

import { useEffect, useState } from 'react'
import PrintifyProductCard from '@/components/printify-product-card'
import type { NormalizedProduct } from '@/lib/printify-live'

function toCardProduct(item: NormalizedProduct) {
  return {
    id: item.id,
    title: item.title,
    description: item.short_description || item.description,
    brand: item.brand,
    category: item.tags?.[0] ?? item.brand,
    images: item.images,
    price: typeof item.price_min_cents === 'number'
      ? item.price_min_cents
      : typeof item.price_min === 'number'
        ? Math.round(item.price_min * 100)
        : typeof item.default_price_cents === 'number'
          ? item.default_price_cents
          : 0,
    price_min: item.price_min_cents ?? (typeof item.price_min === 'number' ? Math.round(item.price_min * 100) : null),
    price_max: null,
    storefront_product_url: item.storefront_product_url ?? null,
    printify_url: item.storefront_product_url ?? '#',
    status: 'Available',
    urgent: false,
    featured: false,
    tags: item.tags,
  }
}

export default function AtlasGrid({ initialItems = [] as NormalizedProduct[] }: { initialItems?: NormalizedProduct[] }) {
  const [items, setItems] = useState<NormalizedProduct[]>(initialItems)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const load = async (nextPage: number) => {
    if (loading || done) return
    setLoading(true)
    try {
      const r = await fetch(`/api/products?brand=3iAtlas&limit=24&page=${nextPage}`)
      const j = await r.json()
      const rows: NormalizedProduct[] = j?.data || []
      if (!rows.length) setDone(true)
      setItems(prev => [...prev, ...rows])
      setPage(nextPage)
    } catch (e) {
      console.warn('Failed to load 3iAtlas grid', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialItems || initialItems.length === 0) {
      load(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">3iAtlas Store</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <PrintifyProductCard key={p.id} product={toCardProduct(p)} />
          ))}
        </div>

        {!done && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => load(page + 1)}
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
