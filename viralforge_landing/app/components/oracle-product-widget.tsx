
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/lib/types'

function formatPrice(cents?: number) {
  if (typeof cents !== 'number' || Number.isNaN(cents) || cents <= 0) {
    return '—'
  }
  return `$${(cents / 100).toFixed(2)}`
}

export default function OracleProductWidget({ products = [] }: { products?: Product[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  if (!products || products.length === 0) {
    return null
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-500/20"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Mystical Collection
          </Badge>
          <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          Channel Your Cosmic Energy
        </h3>
        <p className="text-purple-200">
          Deepen your spiritual journey with our 3I/Atlas-inspired mystical products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-gray-900/70 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.images[0]?.url || '/placeholder-product.jpg'}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-purple-400 font-bold">{formatPrice(product.price)}</span>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {product.title}
                  </h4>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {product.description}
                  </p>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => {
                      if (product.printify_url) {
                        window.open(product.printify_url, '_blank', 'noopener,noreferrer')
                      }
                    }}
                    disabled={!product.printify_url}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Collection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
