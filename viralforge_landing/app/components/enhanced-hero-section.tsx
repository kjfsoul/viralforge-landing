
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Zap, Sparkles, Rocket, Calendar, MapPin, Telescope } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function EnhancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [daysToPerihelion, setDaysToPerihelion] = useState(0)
  const [daysToMars, setDaysToMars] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Calculate days until 3I/Atlas perihelion (October 29-30, 2025)
    const perihelionDate = new Date('2025-10-29T12:00:00Z')
    const marsFlybyd = new Date('2025-10-03T12:00:00Z')
    const now = new Date()
    
    const daysToPerihelion = Math.max(0, Math.ceil((perihelionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    const daysToMarsFlyby = Math.max(0, Math.ceil((marsFlybyd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    
    setDaysToPerihelion(daysToPerihelion)
    setDaysToMars(daysToMarsFlyby)
  }, [])

  const scrollToBrands = () => {
    const element = document.getElementById('brands')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToNews = () => {
    const element = document.getElementById('news')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png"
            alt="3I/Atlas Interstellar Object approaching perihelion in October 2025"
            fill
            className="object-cover parallax cosmic-drift"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>
      </div>

      {/* Breaking News Banner */}
      {(daysToPerihelion > 0 || daysToMars > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 z-20"
        >
          <div className="max-w-6xl mx-auto px-4">
            <Card className="bg-gradient-to-r from-purple-900/80 to-cyan-900/80 border-purple-500/50 backdrop-blur-md">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                    <Telescope className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">
                      3I/Atlas Breaking News
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-200">
                    {daysToMars > 0 && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-red-400" />
                        <span>Mars Flyby in {daysToMars} days</span>
                      </div>
                    )}
                    {daysToPerihelion > 0 && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-400" />
                        <span>Perihelion in {daysToPerihelion} days</span>
                      </div>
                    )}
                    <Button 
                      onClick={scrollToNews}
                      size="sm" 
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-xs"
                    >
                      Latest Updates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-purple-400 cosmic-text-glow animate-pulse" />
            <span className="text-sm uppercase tracking-wider cosmic-text-glow text-cyan-400">
              Inspired by 3I/Atlas • Third Confirmed Interstellar Visitor
            </span>
            <Sparkles className="h-8 w-8 text-cyan-400 cosmic-text-glow animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="crystal-text">3I/ATLAS</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl solid-glow">
              FROM BEYOND
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover exclusive print-on-demand designs inspired by the mysterious 3I/Atlas interstellar visitor. 
            <br />
            <span className="text-cyan-400 font-semibold">Currently approaching perihelion at 137,000 mph!</span>
            <br />
            Three unique brands, infinite cosmic possibilities.
          </p>

          {/* 3I/Atlas Quick Facts */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">137K mph</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Hyperbolic Speed</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">1.36 AU</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Perihelion Distance</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">4.6B</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Years Old</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">Active</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Comet Status</div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToBrands}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg hover-neon group"
            >
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Explore Cosmic Brands
            </Button>
            <Button 
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-full text-lg hover-neon group"
            >
              <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Shop 3I/Atlas Collection
            </Button>
          </div>

          {/* Enhanced Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 cosmic-text-glow count-up">3</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Cosmic Brands</div>
              <div className="text-xs text-gray-500 mt-1">Mystic • EDM • Birthday</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 cosmic-text-glow count-up">50+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">3I/Atlas Designs</div>
              <div className="text-xs text-gray-500 mt-1">Live on Printify</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl crystal-text count-up text-5xl">∞</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Interstellar Possibilities</div>
              <div className="text-xs text-gray-500 mt-1">From Beyond Our System</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" onClick={scrollToBrands} />
        </motion.div>
      </div>
    </section>
  )
}
