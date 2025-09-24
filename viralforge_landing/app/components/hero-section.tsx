
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Zap, Sparkles, Rocket } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToBrands = () => {
    const element = document.getElementById('brands')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png"
            alt="3I/Atlas Interstellar Object in Deep Space"
            fill
            className="object-cover parallax cosmic-drift"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>
      </div>

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
              Inspired by 3I/Atlas Interstellar Object
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
            Three unique brands, infinite cosmic possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToBrands}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg hover-neon group"
            >
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Explore Brands
            </Button>
            <Button 
              onClick={() => window.open('#shop', '_self')}
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-full text-lg hover-neon group"
            >
              <Zap className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Shop Collection
            </Button>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 cosmic-text-glow count-up">3</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Unique Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 cosmic-text-glow count-up">12+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">3I/Atlas Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl crystal-text count-up text-5xl">∞</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Possibilities</div>
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
