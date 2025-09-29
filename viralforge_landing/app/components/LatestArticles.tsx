"use client"

import { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'

interface Article {
  title: string;
  excerpt: string;
  slug: string;
  canonical_url: string;
  image_url: string;
  published_at: string;
  tags: string[];
  source?: string;
  summary?: string;
  url?: string;
  id?: string;
}

function limitWords(copy: string, maxWords = 20) {
  if (!copy) return '';
  const words = copy.replace(/\s+/g, ' ').trim().split(' ')
  if (words.length <= maxWords) return words.join(' ')
  return words.slice(0, maxWords).join(' ') + '…'
}

export default function LatestArticles() {
  const [items, setItems] = useState<Article[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/articles?limit=3')
      .then(r => r.json())
      .then(json => {
        if (mounted) {
          setItems(json.items || [])
        }
      })
    return () => { mounted = false }
  }, [])

  if (items.length === 0) {
    return null // Or a loading skeleton
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#080b24] via-[#060819] to-[#04040f] py-20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            items.map((a) => ({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              datePublished: a.published_at,
              description: a.excerpt,
              author: { "@type": "Organization", name: "3I Atlas" },
              mainEntityOfPage: a.canonical_url || `https://3iatlas.com/blog/${a.slug}`,
              image: a.image_url || undefined,
            })),
          ),
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-24 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute right-[-5%] bottom-10 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),transparent_55%)]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
            Latest Mission Updates
          </span>
          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
            Broadcasts from the 3I/Atlas Observatory
          </h2>
          <p className="mt-4 text-base text-slate-200/80 md:text-lg">
            Fresh intel on interstellar science, mission coordination, and citizen-observation breakthroughs—sourced live whenever the news feed updates.
          </p>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <article
              key={item.slug || index}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm shadow-[0_25px_60px_rgba(12,15,35,0.55)] transition hover:border-cyan-400/40"
            >
              <div className="grid gap-6 rounded-3xl bg-[#0b0f25]/80 p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:p-6">
                <div className="relative hidden aspect-[4/5] overflow-hidden rounded-2xl sm:block">
                  <Image
                    src={item.image_url || '/placeholder-product.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    {new Date(item.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                      {item.source || 'Mission Control'}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                      {new Date(item.published_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold leading-snug text-white transition group-hover:text-cyan-200 md:text-2xl">
                    {item.title}
                  </h3>

                  <p className="max-w-2xl text-sm text-slate-200/80 md:text-base">
                    {limitWords(item.summary || item.excerpt, 20)}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <Link
                      href={item.canonical_url || item.url || '#'}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(167,139,250,0.35)] transition hover:scale-[1.02]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read dispatch
                    </Link>
                    <span className="text-xs uppercase tracking-[0.4em] text-white/30">
                      Synced {index === 0 ? 'just now' : 'recently'}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}