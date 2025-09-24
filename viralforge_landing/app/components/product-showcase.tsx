
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Heart, Share2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

const featuredProducts = [
  {
    id: 1,
    name: "Mystic Oracle Deck",
    brand: "Mystic Arcana",
    price: "$29.99",
    image: "https://cdn.abacus.ai/images/ee292963-6c15-4b8b-a97d-bbcb51419d71.png",
    category: "Tarot & Oracle",
    status: "Coming Soon",
    description: "Channel the wisdom of 3I/Atlas with 44 beautifully illustrated oracle cards"
  },
  {
    id: 2,
    name: "Cosmic Rave Tee",
    brand: "EDM Shuffle",
    price: "$24.99",
    image: "https://cdn.abacus.ai/images/18c61f33-c02e-4f50-892c-0f2d9f485a4b.png",
    category: "Apparel",
    status: "In Production",
    description: "Premium soft-cotton tee with neon 3I/Atlas design that glows under blacklight"
  },
  {
    id: 3,
    name: "Stellar Birthday Cards",
    brand: "BirthdayGen",
    price: "$12.99",
    image: "https://cdn.abacus.ai/images/9f5c8620-0ec3-4392-9c16-ab9aa2f6ef1f.png",
    category: "Cards & Stationery",
    status: "Design Phase",
    description: "Set of 8 cosmic celebration cards featuring personalized interstellar themes"
  },
  {
    id: 4,
    name: "Holographic Sticker Pack",
    brand: "All Brands",
    price: "$8.99",
    image: "https://cdn.abacus.ai/images/c099eebc-06e7-449d-8b6d-618d360399a0.png",
    category: "Accessories",
    status: "Ready Soon",
    description: "12 premium holographic stickers perfect for laptops, water bottles, and more"
  }
]

export default function ProductShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [likedProducts, setLikedProducts] = useState<number[]>([])

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Coming Soon': return 'bg-purple-500/20 text-purple-300 border-purple-400/30'
      case 'In Production': return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
      case 'Design Phase': return 'bg-pink-500/20 text-pink-300 border-pink-400/30'
      case 'Ready Soon': return 'bg-green-500/20 text-green-300 border-green-400/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30'
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="crystal-text">Featured Products</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get a preview of the cosmic designs from our 3I/Atlas Observatory collection. 
            Each product captures the mystery and wonder of the 3I/Atlas visitor.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getStatusColor(product.status)} border text-xs`}>
                        {product.status}
                      </Badge>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/50 text-white hover:bg-black/70 p-2 h-auto"
                        onClick={() => toggleLike(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${likedProducts.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-black/50 text-white hover:bg-black/70 p-2 h-auto"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                          {product.brand}
                        </span>
                        <span className="text-lg font-bold text-white cosmic-text-glow">
                          {product.price}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-1 cosmic-text-glow">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full group/btn"
                        disabled={product.status === 'Design Phase'}
                        onClick={() => {
                          if (product.status !== 'Design Phase') {
                            // Simple alert for now - can be replaced with email capture modal
                            alert(`Thanks for your interest in ${product.name}! We'll notify you when it's available.`)
                          }
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                        {product.status === 'Design Phase' ? 'In Development' : 'Notify Me'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl p-8 border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 solid-glow">
            Want Early Access?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Be the first to know when new 3I/Atlas designs drop. Join our cosmic community 
            for exclusive previews and launch notifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <Button 
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full"
              onClick={() => {
                const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
                const email = emailInput?.value
                if (email && email.includes('@')) {
                  // Redirect to Mystic Arcana signup with cosmic pre-fill
                  window.open(`https://mysticarcana.com/signup?utm_source=3iatlas&cosmic_interest=interstellar&email=${encodeURIComponent(email)}`, '_blank')
                  emailInput.value = ''
                } else {
                  alert('Please enter a valid email address to join the cosmic community!')
                }
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
