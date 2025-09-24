'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Telescope } from 'lucide-react'
import Image from 'next/image'

export default function NewsSection({ products }: { products: any[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Telescope className="h-8 w-8 text-purple-400 cosmic-text-glow animate-pulse" />
            <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
            <span className="text-sm uppercase tracking-wider cosmic-text-glow text-cyan-400">
              3I/Atlas Breaking News
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Latest Interstellar Updates
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Real-time coverage of 3I/Atlas's historic journey through our solar system, Mars flyby, and approach to perihelion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className={`bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-1/3">
                    <div className="relative aspect-video lg:aspect-square lg:h-full">
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-300 text-base leading-relaxed">
                        {product.description}
                      </p>
                    </CardHeader>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}