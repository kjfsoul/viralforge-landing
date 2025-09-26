"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, ShoppingCart, Star } from 'lucide-react'

import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { config } from '@/lib/config'

function formatPrice(product: Product) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100)

  if (typeof product.price_min === 'number' && product.price_min > 0) {
    return formatCurrency(product.price_min)
  }

  if (typeof product.price === 'number' && product.price > 0) {
    return formatCurrency(product.price)
  }

  return '—'
}

function limitWords(copy: string | undefined, maxWords = 20) {
  if (!copy) return ''
  const words = copy.replace(/\s+/g, ' ').trim().split(' ')
  if (words.length <= maxWords) return words.join(' ')
  return words.slice(0, maxWords).join(' ') + '…'
}

type Props = {
  products: Product[]
  remainderCount: number
}

export default function HeroProductShowcase({ products, remainderCount }: Props) {
  if (!products?.length) return null

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#050414] via-[#080b24] to-transparent py-20 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-12 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
        <div className="text-center">
          <Badge className="mx-auto mb-4 inline-flex items-center gap-2 border border-purple-500/50 bg-purple-500/20 px-5 py-1 text-sm uppercase tracking-widest text-purple-100">
            <span className="inline-block h-2 w-2 rounded-full bg-purple-300" />
            Strategic Product Placements
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Live merch positions aligned to the 3I/Atlas campaign
          </h2>
          <p className="mt-4 text-base text-slate-200/80 md:text-lg">
            Each placement refreshes with every sync run—no hardcoded payloads, just telemetry-driven Printify data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => {
            const buyUrl = product.printify_url || null
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-1 backdrop-blur-sm shadow-[0_20px_60px_rgba(15,23,42,0.45)]"
                role={buyUrl ? 'button' : undefined}
                tabIndex={buyUrl ? 0 : -1}
                onClick={() => {
                  if (buyUrl) window.open(buyUrl, '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(event) => {
                  if (!buyUrl) return
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    window.open(buyUrl, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                <div className="overflow-hidden rounded-2xl bg-black/60">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <Badge className="bg-black/60 text-xs uppercase tracking-wide text-purple-200">
                        {product.brand}
                      </Badge>
                      {product.featured && (
                        <Badge className="bg-purple-500/80 text-xs text-white">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 rounded-lg bg-white/10 px-3 py-1 text-sm font-semibold text-white">
                      {formatPrice(product)}
                    </div>
                  </div>

                  <div className="space-y-4 px-5 pb-6 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold leading-tight group-hover:text-purple-200">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-slate-300/80">
                      {limitWords(product.short_description ?? product.description, 20)}
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        className="flex-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 text-sm font-semibold shadow-[0_0_25px_rgba(165,94,234,0.35)] transition hover:scale-[1.02]"
                        onClick={(event) => {
                          if (!buyUrl) return
                          event.stopPropagation()
                          window.open(buyUrl, '_blank', 'noopener,noreferrer')
                        }}
                        disabled={!buyUrl}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-white/20 text-white transition hover:border-white/40 hover:bg-white/10"
                        onClick={(event) => {
                          if (!buyUrl) return
                          event.stopPropagation()
                          window.open(buyUrl, '_blank', 'noopener,noreferrer')
                        }}
                        disabled={!buyUrl}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
          {remainderCount > 0 && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: products.length * 0.1 }}
              className="flex items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">See all 3iAtlas products</h3>
                <p className="text-sm text-slate-200/70">
                  {remainderCount} additional designs are waiting in the full shop manifest.
                </p>
                <Button
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:border-white/60 hover:bg-white/20"
                  onClick={() => window.open(config.printify.storeUrl || config.shopUrl || '/shop', '_blank', 'noopener,noreferrer')}
                >
                  View full shop
                </Button>
              </div>
            </motion.article>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Need the full manifest?</p>
          <Button
            variant="outline"
            className="border-white/20 bg-white/10 px-6 text-white transition hover:border-white/40 hover:bg-white/20"
            onClick={() => window.open(config.printify.storeUrl || config.shopUrl || '/shop', '_blank', 'noopener,noreferrer')}
          >
            Browse the complete Printify storefront
          </Button>
        </div>
      </div>
    </section>
  )
}
