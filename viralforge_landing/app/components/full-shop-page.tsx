
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Heart, Share2, ShoppingCart, Sparkles, Star, Filter, Search, Grid, List, SortAsc } from 'lucide-react'
import Image from 'next/image'

interface Product {
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
  tags?: string[]
}

export default function FullShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const brands = ['All Brands', '3I/Atlas', 'Mystic Arcana', 'EDM Shuffle', 'BirthdayGen']
  const categories = ['All Categories', 'Apparel', 'Wall Art', 'Accessories', 'Oracle & Tarot', 'Festival Wear', 'Cards & Stationery', 'Party Supplies']

  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true)
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        if (data.success) {
          // Flatten all products from all shops
          const products = data.data.flatMap((shop: any) => shop.products || [])
          setAllProducts(products)
          setFilteredProducts(products)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
      setLoading(false)
    }

    fetchAllProducts()
  }, [])

  useEffect(() => {
    let filtered = allProducts

    // Filter by brand
    if (selectedBrand !== 'All Brands') {
      filtered = filtered.filter(product => product.brand === selectedBrand)
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort products
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [allProducts, selectedBrand, selectedCategory, searchQuery, sortBy])

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const shareProduct = (product: Product) => {
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

  const openProductLink = (product: Product) => {
    window.open(product.printify_url, '_blank')
  }

  const ProductCard = ({ product, index }: { product: Product; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Card className={`bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover-neon group overflow-hidden h-full ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}>
        {/* Product Image */}
        <div className={`relative ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}`}>
          <Image
            src={product.images[0]?.url || '/placeholder-product.jpg'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badge */}
          <Badge className={`absolute top-2 left-2 ${
            product.urgent ? 'bg-red-500 animate-pulse' :
            product.status === 'Best Seller' ? 'bg-green-500' :
            product.status === 'New Release' ? 'bg-blue-500' :
            'bg-gray-600'
          } text-white text-xs`}>
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
              <Heart className={`h-4 w-4 ${likedProducts.includes(product.id) ? 'fill-current text-red-500' : 'text-gray-400'}`} />
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
        <CardContent className={`p-6 flex flex-col ${viewMode === 'list' ? 'flex-1' : 'h-full'}`}>
          <div className="space-y-3 flex-grow">
            {/* Brand and Category */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
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
              <span className="text-xl font-bold text-cyan-400">{formatPrice(product.price)}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-grow">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 mt-auto">
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
        </CardContent>
      </Card>
    </motion.div>
  )

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading complete cosmic collection...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 pt-20"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-cyan-400 animate-pulse" />
            <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-lg px-6 py-2">COMPLETE COLLECTION</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            3I/Atlas Cosmic Shop
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Explore our complete collection of cosmic products celebrating the third interstellar visitor
          </p>
          <p className="text-gray-400 mt-2">
            {allProducts.length} products across all brands
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* View Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">View</label>
                  <div className="flex items-center border border-gray-600 rounded-lg">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewMode('grid')}
                      className={`rounded-none flex-1 ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
                    >
                      <Grid className="h-4 w-4 mr-2" /> Grid
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setViewMode('list')}
                      className={`rounded-none flex-1 ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400'}`}
                    >
                      <List className="h-4 w-4 mr-2" /> List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredProducts.length} of {allProducts.length} products
                </p>
                {(selectedBrand !== 'All Brands' || selectedCategory !== 'All Categories' || searchQuery.trim()) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBrand('All Brands')
                      setSelectedCategory('All Categories')
                      setSearchQuery('')
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 text-6xl mb-4">🌌</div>
            <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedBrand('All Brands')
                setSelectedCategory('All Categories')
                setSearchQuery('')
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}

        {/* Back to Home CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            onClick={() => window.open('/', '_self')}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-3"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Back to 3I/Atlas Home
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
