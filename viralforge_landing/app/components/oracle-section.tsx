"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config, getOracleImageUrls } from '@/lib/config'
import { Eye, EyeOff } from 'lucide-react'

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
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())
  const [showAll, setShowAll] = useState(false)

  const toggleCard = (id: number) => {
    const newSet = new Set(revealedCards)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setRevealedCards(newSet)
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
    if (!showAll) {
      const allIds = new Set(cards.map(card => card.id))
      setRevealedCards(allIds)
    } else {
      setRevealedCards(new Set())
    }
  }

  return (
    <div className="py-16 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl text-purple-200 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Toggle all cards button */}
          <motion.button
            onClick={toggleShowAll}
            className="mt-6 flex items-center justify-center mx-auto gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm font-medium text-white">
              {showAll ? 'Hide All Cards' : 'Reveal All Cards'}
            </span>
          </motion.button>
        </motion.div>
        
        {/* Compact Oracle Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {cards.map((card, index) => {
            const isRevealed = revealedCards.has(card.id)
            return (
              <motion.div
                key={card.id}
                className="relative aspect-[3/4] cursor-pointer group"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => toggleCard(card.id)}
              >
                {/* Card shadow */}
                <div className="absolute inset-0 bg-black/30 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                
                {/* Card */}
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.div
                      key="front"
                      className="relative w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center mb-3">
                          <img
                            src={oracleImages[index % oracleImages.length]}
                            alt={card.title}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-white text-center mb-1">{card.title}</h3>
                        <p className="text-sm text-purple-200 text-center truncate w-full">{card.name}</p>
                      </div>
                      
                      {/* Select button overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation()
                            onCardSelect?.(card)
                          }}
                        >
                          Select
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      className="relative w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg flex items-center justify-center"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: -90 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Card back pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl"></div>
                        <div className="absolute inset-4 border border-purple-400/30 rounded-lg"></div>
                        <div className="absolute inset-8 border border-purple-400/20 rounded-md"></div>
                      </div>
                      
                      {/* Mystical symbol in center */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400"></div>
                      </div>
                      
                      {/* Hint text */}
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-xs text-purple-300/70">Tap to reveal</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Card glow effect when hovered */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-purple-500/20 opacity-0 group-hover:opacity-100 pointer-events-none"
                  animate={{
                    boxShadow: ["0 0 5px rgba(192, 132, 252, 0.5)", "0 0 20px rgba(192, 132, 252, 0.8)", "0 0 5px rgba(192, 132, 252, 0.5)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )
          })}
        </div>
        
        {/* Instructions */}
        <motion.div
          className="mt-12 text-center text-sm text-purple-300/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Tap on any card to reveal its meaning. Select a card to incorporate its energy into your journey with 3I/Atlas.</p>
        </motion.div>
      </div>
    </div>
  )
}
