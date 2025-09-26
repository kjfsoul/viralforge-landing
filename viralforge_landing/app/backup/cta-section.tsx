import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl } from "@/lib/config"

'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Rocket, Star, Music, Gift, Share } from 'lucide-react'
import Image from 'next/image'

const brandLinks = [
  {
    name: 'Mystic Arcana',
    platform: 'Platform',
    url: 'config.external.mysticArcana',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    status: '3I/Atlas Products Coming Soon'
  },
  {
    name: 'EDM Shuffle',
    platform: 'Platform',
    url: 'config.external.edmShuffle',
    icon: Music,
    color: 'from-cyan-500 to-blue-500',
    status: 'Cosmic Designs in Production'
  },
  {
    name: 'BirthdayGen',
    platform: 'Platform',
    url: 'config.external.birthdayGen',
    icon: Gift,
    color: 'from-pink-500 to-yellow-500',
    status: 'Space-Themed Cards Loading...'
  }
]

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: '3I/ATLAS OBSERVATORY | Cosmic Collection',
          text: 'Check out these amazing cosmic designs inspired by the mysterious 3I/Atlas interstellar object!',
          url: window.location.href,
        })
      } else {
        // Fallback for browsers without Web Share API
        const shareUrl = `config.social.twitterShareUrl?text=${encodeURIComponent('Check out these amazing cosmic designs inspired by the mysterious 3I/Atlas interstellar object!')}&url=${encodeURIComponent(window.location.href)}`
        window.open(shareUrl, '_blank')
      }
    } catch (error) {
      console.log('Share cancelled or failed:', error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <section id="shop" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="getImageUrl("f7568d5f-de1e-4130-adf6-280256d622c6")"
            alt="Cosmic call to action background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent neon-glow">
            Ready to Explore?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of cosmic enthusiasts who have discovered our unique designs. 
            Each purchase supports independent artists creating otherworldly art.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg hover-neon group"
            >
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Explore Brands
            </Button>
            <Button 
              onClick={handleShare}
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-full text-lg hover-neon group"
              disabled={isSharing}
            >
              <Share className={`mr-2 h-5 w-5 ${isSharing ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
              Share Collection
            </Button>
          </div>
        </motion.div>

        {/* Quick Shop Links */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {brandLinks.map((brand, index) => (
            <motion.div
              key={brand.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover-neon group cursor-pointer"
                onClick={() => window.open(brand.url, '_blank')}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${brand.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <brand.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{brand.name}</h3>
                  <p className="text-cyan-400 text-sm mb-4">{brand.status}</p>
                  <div className="flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    <span className="text-sm">Visit {brand.platform}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-purple-900/20 via-cyan-900/20 to-pink-900/20 rounded-3xl p-8 border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            The Universe Awaits Your Discovery
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get ready to own a piece of cosmic history. Our 3I/Atlas collection is being created by our Observatory, 
            our autonomous AI system that transforms astronomical events into stunning print-on-demand designs.
          </p>
          <Button 
            onClick={() => window.open('config.external.mysticArcana', '_blank')}
            size="lg"
            className="bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 hover:from-purple-600 hover:via-cyan-600 hover:to-pink-600 text-white px-12 py-4 rounded-full text-lg hover-neon group"
          >
            <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Watch the Magic Begin
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
