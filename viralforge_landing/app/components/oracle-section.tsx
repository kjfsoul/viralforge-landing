"use client"

import { config, getOracleImageUrls } from '@/lib/config'

interface OracleSectionProps {
  title: string
  description: string
  cards: Array<{
    id: number
    title: string
    name: string
    description: string
  }>
  onCardSelect?: (card: any) => void
}

export default function OracleSection({ 
  title, 
  description, 
  cards, 
  onCardSelect 
}: OracleSectionProps) {
  const oracleImages = getOracleImageUrls()

  return (
    <div className="py-16 bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {oracleImages.map((imageUrl, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={`Oracle card ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={card.id} 
              className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl p-6 cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => onCardSelect?.(card)}
            >
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-700 to-indigo-700 flex items-center justify-center">
                  <img 
                    src={oracleImages[index % oracleImages.length]} 
                    alt={card.title} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 text-center">{card.title}</h3>
              <p className="text-lg text-purple-200 text-center mb-4">{card.name}</p>
              <p className="text-gray-300 text-center">{card.description}</p>
              
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Select Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
