"use client"

import { config } from '@/lib/config'

interface TrajectoryProductWidgetProps {
  productId: string
  title: string
  description: string
  price: number
  imageUrl: string
}

export default function TrajectoryProductWidget({
  productId,
  title,
  description,
  price,
  imageUrl
}: TrajectoryProductWidgetProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-blue-400">
              ${(price / 100).toFixed(2)}
            </span>
            <button
              onClick={() => window.open(config.printify.storeUrl, '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              View on Printify
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
