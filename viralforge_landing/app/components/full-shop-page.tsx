'use client'

import { useState, useEffect } from 'react'
import { Product, PrintifyShop } from '@/lib/types'
import { MOCK_PRODUCTS } from '@/lib/printify-mock'

export default function FullShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [shops, setShops] = useState<PrintifyShop[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState<string>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock shops data
        const mockShops: PrintifyShop[] = [
          {
            id: "1",
            title: "3I/Atlas Official Store",
            sales_channel: "3I/Atlas",
            products: MOCK_PRODUCTS.filter(p => p.brand === "3I/Atlas")
          },
          {
            id: "2", 
            title: "Mystic Arcana",
            sales_channel: "Mystic Arcana",
            products: MOCK_PRODUCTS.filter(p => p.brand === "Mystic Arcana")
          },
          {
            id: "3",
            title: "EDM Shuffle", 
            sales_channel: "EDM Shuffle",
            products: MOCK_PRODUCTS.filter(p => p.brand === "EDM Shuffle")
          },
          {
            id: "4",
            title: "BirthdayGen",
            sales_channel: "BirthdayGen", 
            products: MOCK_PRODUCTS.filter(p => p.brand === "BirthdayGen")
          }
        ]
        
        setShops(mockShops)
        const allProducts = mockShops.flatMap((shop: PrintifyShop) => shop.products || [])
        setProducts(allProducts)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get unique brands and categories for filters
  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand)))]
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'All' || product.brand === selectedBrand
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory
    return brandMatch && categoryMatch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Cosmic Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our curated collections inspired by interstellar phenomena and cosmic energies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div>
            <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              id="brand-filter"
              className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category-filter"
              className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.images[0]?.url || '/placeholder.png'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {product.title}
                    </h3>
                    <span className="text-lg font-bold text-purple-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {product.brand}
                    </span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  )
}
