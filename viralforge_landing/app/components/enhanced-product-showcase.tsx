
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { summarizeText } from "@/lib/utils";
import { motion, useInView } from 'framer-motion'
import { ChevronRight, ExternalLink, Heart, Share2, ShoppingCart, Sparkles, Star, Store } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface FeaturedProduct {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price: number // in cents
  images: { id: string; url: string }[]
  printify_url: string
  status: string
  urgent?: boolean
  featured: boolean
}

export default function EnhancedProductShowcase() {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([])
  const [atlasShopProducts, setAtlasShopProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    async function fetchAll() {
      setLoading(true)
      try {
        // Main featured feed used for strategic brand sections
        const [featuredRes, atlasRes] = await Promise.all([
          fetch('/api/products?featured=true'),
          fetch('/api/products?brand=3I/Atlas&featured=true&limit=12')
        ])
        const [featuredJson, atlasJson] = await Promise.all([
          featuredRes.json(),
          atlasRes.json()
        ])
        if (featuredJson?.success) setFeaturedProducts(featuredJson.data)
        if (atlasJson?.success) setAtlasShopProducts(atlasJson.data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const shareProduct = (product: FeaturedProduct) => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const openProductLink = (product: FeaturedProduct) => {
    window.open(product.printify_url, '_blank')
  }

  // Organize products by brand for strategic display
  const brandSections = {
    '3I/Atlas': featuredProducts.filter(p => p.brand === '3I/Atlas'),
    'Mystic Arcana': featuredProducts.filter(p => p.brand === 'Mystic Arcana').slice(0, 3),
    'EDM Shuffle': featuredProducts.filter(p => p.brand === 'EDM Shuffle').slice(0, 3),
    'BirthdayGen': featuredProducts.filter(p => p.brand === 'BirthdayGen').slice(0, 3)
  }

  const ProductCard = ({
    product,
    index,
  }: {
    product: FeaturedProduct;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover-neon group overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.images[0]?.url || "/placeholder-product.jpg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Status Badge */}
          <Badge
            className={`absolute top-2 left-2 ${
              product.urgent
                ? "bg-red-500 animate-pulse"
                : product.status === "Best Seller"
                  ? "bg-green-500"
                  : product.status === "New Release"
                    ? "bg-blue-500"
                    : "bg-gray-600"
            } text-white text-xs`}
          >
            {product.status}
          </Badge>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 bg-gray-900/80 hover:bg-red-500"
              onClick={() => toggleLike(product.id)}
            >
              <Heart
                className={`h-4 w-4 ${likedProducts.includes(product.id) ? "fill-current text-red-500" : "text-gray-400"}`}
              />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 bg-gray-900/80 hover:bg-cyan-500"
              onClick={() => shareProduct(product)}
            >
              <Share2 className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Brand and Category */}
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400"
              >
                {product.brand}
              </Badge>
              <Badge className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                {product.category}
              </Badge>
            </div>

            {/* Title and Price */}
            <div>
              <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
                {product.title}
              </h3>
              <span className="text-xl font-bold text-cyan-400">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
              {summarizeText(product.description, {
                sentences: 2,
                maxChars: 140,
              })}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white group"
                onClick={() => openProductLink(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => openProductLink(product)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <section id="shop" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading cosmic products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="shop" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative mb-12">
            <div className="relative h-48 lg:h-72 rounded-xl overflow-hidden">
              <Image
                src="https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png"
                alt="3I/Atlas Cosmic Collection Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
                    <Badge className="bg-red-500 text-white animate-pulse text-lg px-4 py-2">LIVE NOW</Badge>
                    <span className="text-lg uppercase tracking-wider text-cyan-400 font-bold">
                      Featured Collection
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    3I/Atlas Featured Products
                  </h2>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    Exclusive designs celebrating humanity's third interstellar visitor across all our cosmic brands
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3I/Atlas Collection - Priority Section */}
        {brandSections['3I/Atlas'].length > 0 && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-6 py-2 mb-4">
                🚨 MARS FLYBY EXCLUSIVE
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Official 3I/Atlas Collection
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Limited edition commemorative products celebrating the historic Mars flyby
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandSections['3I/Atlas'].map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Brand Collections Grid (limit 3 per brand as requested) */}
        <div className="space-y-20">
          
          {/* Mystic Arcana Section */}
          {brandSections['Mystic Arcana'].length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Mystic Arcana</h3>
                    <p className="text-gray-400">Tarot, Astrology & Cosmic Wisdom</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  onClick={() => window.open('https://mysticarcana.com', '_blank')}
                >
                  Visit Store <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandSections['Mystic Arcana'].map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* EDM Shuffle Section */}
          {brandSections['EDM Shuffle'].length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">EDM Shuffle</h3>
                    <p className="text-gray-400">Electronic Dance & Festival Gear</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                  onClick={() => window.open('https://edmshuffle.com', '_blank')}
                >
                  Visit Store <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandSections['EDM Shuffle'].map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* BirthdayGen Section */}
          {brandSections['BirthdayGen'].length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">BirthdayGen</h3>
                    <p className="text-gray-400">Cosmic Celebrations & Party Supplies</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
                  onClick={() => window.open('https://birthdaygen.com', '_blank')}
                >
                  Visit Store <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {brandSections['BirthdayGen'].map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Full 3I/Atlas Shop Grid (12 products at the bottom) */}
        {atlasShopProducts.length > 0 && (
          <motion.div
            className="mt-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">3I/Atlas Shop</h3>
              <p className="text-gray-300">Featured picks from the full store</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {atlasShopProducts.slice(0, 12).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Full Shop CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-6">
                <Store className="h-12 w-12 text-cyan-400 mr-4" />
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Explore Our Complete Collection
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Discover hundreds more cosmic designs across all our brands
                  </p>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Button 
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-3"
                  onClick={() => window.open('/shop', '_self')}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Browse Full Shop
                </Button>
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Back to Top
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
