
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Sparkles, Gem, Zap, Moon, Stars } from 'lucide-react'
import Image from 'next/image'
import OracleSurvey from './oracle-survey'
import OracleReading from './oracle-reading'
import OracleProductWidget from './oracle-product-widget'
import { OracleCard } from '@/lib/oracle-cards'

interface SurveyData {
  name: string
  email: string
  birthMonth: string
  currentFocus: string
  energyLevel: string
}

export default function OracleSection({ products }: { products: any[] }) {
  const [currentView, setCurrentView] = useState<'intro' | 'survey' | 'reading'>('intro')
  const [loading, setLoading] = useState(false)
  const [oracleData, setOracleData] = useState<{
    card: OracleCard
    personalizedMessage: string
    spookyInsight: string
    userName: string
  } | null>(null)
  
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSurveyComplete = async (surveyData: SurveyData) => {
    setLoading(true)
    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setOracleData(result.data)
        setCurrentView('reading')
      } else {
        console.error('Oracle reading failed:', result.error)
        // Fallback to quick reading
        handleQuickReading()
      }
    } catch (error) {
      console.error('Oracle reading error:', error)
      // Fallback to quick reading
      handleQuickReading()
    }
    setLoading(false)
  }

  const handleQuickReading = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/oracle')
      const result = await response.json()
      
      if (result.success) {
        setOracleData(result.data)
        setCurrentView('reading')
      }
    } catch (error) {
      console.error('Quick oracle reading error:', error)
    }
    setLoading(false)
  }

  const handleSkipSurvey = () => {
    handleQuickReading()
  }

  const handleNewReading = () => {
    setOracleData(null)
    setCurrentView('intro')
  }

  if (loading) {
    return (
      <section id="oracle" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-6"></div>
            <div className="space-y-2">
              <p className="text-white text-xl">The Oracle is consulting the cosmos...</p>
              <p className="text-gray-400">Aligning with 3I/Atlas energy signatures...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="oracle" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"
        />
        
        {/* Floating cosmic elements */}
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-20"
        >
          <Sparkles className="h-6 w-6 text-purple-400" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute bottom-32 right-32"
        >
          <Gem className="h-8 w-8 text-cyan-400" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 right-20"
        >
          <Moon className="h-5 w-5 text-purple-300" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {currentView === 'intro' && (
            <motion.div
              key="intro"
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Header */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center justify-center space-x-3 mb-6"
                >
                  <Eye className="h-8 w-8 text-purple-400 animate-pulse" />
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-400 px-4 py-2 text-lg animate-pulse">
                    PREVIEW MODE
                  </Badge>
                  <Gem className="h-8 w-8 text-cyan-400 animate-pulse" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  3I/Atlas Oracle
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8"
                >
                  Channel the cosmic wisdom of our third interstellar visitor. The Oracle reads the 
                  energy signatures left in 3I/Atlas's wake to reveal personalized insights about your path.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-6 rounded-lg border border-purple-500/20 max-w-2xl mx-auto"
                >
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Stars className="h-5 w-5 text-yellow-400" />
                    <span className="text-lg font-semibold text-white">How It Works</span>
                    <Stars className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 font-bold">1</span>
                      </div>
                      <p>Take the cosmic attunement survey</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-cyan-400 font-bold">2</span>
                      </div>
                      <p>Oracle analyzes your energy signature</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <p>Receive personalized cosmic guidance</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Oracle Preview Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
              >
                {[
                  {
                    title: "The Cosmic Messenger",
                    description: "Ancient wisdom travels across impossible distances to reach you",
                    icon: <Sparkles className="h-8 w-8" />,
                    color: "purple"
                  },
                  {
                    title: "The Martian Threshold", 
                    description: "Your moment of greatest visibility and influence approaches",
                    icon: <Zap className="h-8 w-8" />,
                    color: "cyan"
                  },
                  {
                    title: "The Infinite Trajectory",
                    description: "Your actions create ripples across dimensions you cannot perceive", 
                    icon: <Moon className="h-8 w-8" />,
                    color: "purple"
                  }
                ].map((card, index) => (
                  <Card 
                    key={card.title}
                    className="bg-black/60 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-${card.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <div className={`text-${card.color}-400`}>
                          {card.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-400">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-4"
              >
                <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <Button
                    onClick={() => setCurrentView('survey')}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-4 group"
                  >
                    <Eye className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Get Personalized Reading
                  </Button>
                  
                  <Button
                    onClick={handleQuickReading}
                    variant="outline"
                    className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Quick Oracle Draw
                  </Button>
                </div>

                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  🔮 Preview includes 10 of 44 cards from the complete deck. 
                  Full oracle system launches with expanded cosmic insights & advanced personalization.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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

            </motion.div>
          )}

          {currentView === 'survey' && (
            <motion.div
              key="survey"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="min-h-[600px] flex items-center justify-center"
            >
              <OracleSurvey onComplete={handleSurveyComplete} onSkip={handleSkipSurvey} />
            </motion.div>
          )}

          {currentView === 'reading' && oracleData && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="min-h-[600px]"
            >
              <OracleReading 
                card={oracleData.card}
                personalizedMessage={oracleData.personalizedMessage}
                spookyInsight={oracleData.spookyInsight}
                userName={oracleData.userName}
                onNewReading={handleNewReading}
              />
              <OracleProductWidget />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show products for intro view as well */}
        {currentView === 'intro' && <OracleProductWidget />}

      </div>
    </section>
  )
}
