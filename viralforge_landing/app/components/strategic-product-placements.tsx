"use client"

import { config } from '@/lib/config'

interface StrategicProductPlacementsProps {
  title: string
  description: string
  products: Array<{
    id: string
    name: string
    description: string
    price: number
    imageUrl: string
  }>
}

export default function StrategicProductPlacements({ 
  title, 
  description, 
  products 
}: StrategicProductPlacementsProps) {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-600">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  <button
                    onClick={() => window.open(config.printify.storeUrl, '_blank')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    View on Printify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button
            onClick={() => window.open(config.printify.storeUrl, '_blank')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  )
}
