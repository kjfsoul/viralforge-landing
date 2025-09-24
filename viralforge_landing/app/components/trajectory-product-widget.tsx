
'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Rocket, Star } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price: number
  images: { id: string; url: string }[]
  printify_url: string
  status: string
  tags: string[]
}

export default function TrajectoryProductWidget() {
  const [trajectoryProducts, setTrajectoryProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    async function fetchTrajectoryProducts() {
      try {
        const response = await fetch('/api/products?context=trajectory')
        const data = await response.json()
        if (data.success) {
          setTrajectoryProducts(data.data.slice(0, 3)) // Show 3 space/trajectory products
        }
      } catch (error) {
        console.error('Failed to fetch trajectory products:', error)
      }
      setLoading(false)
    }

    fetchTrajectoryProducts()
  }, [])

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`
  }

  if (loading || trajectoryProducts.length === 0) {
    return null
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mt-16 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-8 border border-cyan-500/20"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Rocket className="h-6 w-6 text-cyan-400 animate-bounce" />
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            Trajectory Collection
          </Badge>
          <Rocket className="h-6 w-6 text-blue-400 animate-bounce" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          Commemorate the Journey
        </h3>
        <p className="text-cyan-200">
          Own a piece of history with our exclusive 3I/Atlas trajectory designs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trajectoryProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="bg-gray-900/70 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden h-full">
              <div className="relative aspect-square">
                <Image
                  src={product.images[0]?.url || '/placeholder-product.jpg'}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {product.status.includes('Exclusive') && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs animate-pulse">
                    {product.status}
                  </Badge>
                )}

                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-cyan-400 font-bold text-sm">{formatPrice(product.price)}</span>
                </div>
              </div>

              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {product.title}
                  </h4>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {product.description}
                  </p>

                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xs"
                    onClick={() => window.open(product.printify_url, '_blank')}
                  >
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-6"
      >
        <Button 
          variant="outline"
          className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
          onClick={() => window.open('https://3iatlas.printify.me/', '_blank')}
        >
          View Complete Trajectory Collection
        </Button>
      </motion.div>
    </motion.div>
  )
}
