"use client"

import { useEffect, useState } from "react"

export default function FeaturedProductsRow({ storeBase, dedupe }: { storeBase: string; dedupe?: Set<string> }) {
  const [items, setItems] = useState<{ title: string; image: string; url: string }[]>([])
  const [fallback, setFallback] = useState<{ cta: string; href: string } | null>(null)

  useEffect(() => {
    let mounted = true
    fetch(`/api/featured-products?storeBase=${encodeURIComponent(storeBase)}`)
      .then(r => r.json())
      .then(json => {
        if (!mounted) return
        const seen = dedupe || new Set<string>()
        const filtered = (json.items || []).filter((it: any) => {
          if (seen.has(it.url)) return false
          seen.add(it.url)
          return true
        })
        setItems(filtered)
        if (filtered.length === 0 && json.fallback) setFallback(json.fallback)
      })
      .catch(() => setFallback({ cta: "View all products", href: storeBase }))
    return () => { mounted = false }
  }, [storeBase])

  if (items.length === 0 && fallback) {
    return (
      <div className="mt-3">
        <a href={fallback.href} target="_blank" rel="noopener" className="text-sm underline">
          {fallback.cta}
        </a>
      </div>
    )
  }

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((p) => (
        <a key={p.url} href={p.url} target="_blank" rel="noopener"
           className="group block overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition">
          <div className="aspect-[16/9] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
          </div>
          <div className="p-3 text-sm">{p.title}</div>
        </a>
      ))}
    </div>
  )
}