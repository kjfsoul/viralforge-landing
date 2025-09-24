
'use client'

import { Sparkles, ExternalLink, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-400 neon-glow" />
              <span className="text-xl font-bold text-white neon-glow">
                3I/ATLAS<span className="text-cyan-400">OBSERVATORY</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Cosmic designs inspired by the mysteries of space. Bringing interstellar 
              art to your everyday life through three unique brands.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('mailto:hello@3iatlas.com', '_blank')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-cyan-400"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://discord.gg/3iatlas', '_blank')}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-purple-400"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Discord
              </Button>
            </div>
          </div>

          {/* Mystic Arcana */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Mystic Arcana</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.open('https://etsy.com/shop/MysticArcana3I', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Etsy Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://amazon.com/stores/MysticArcana', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Amazon Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://redbubble.com/people/MysticArcana', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Redbubble Store
                </button>
              </li>
            </ul>
          </div>

          {/* EDM Shuffle */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">EDM Shuffle</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.open('https://etsy.com/shop/EDMShuffle3I', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Etsy Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://amazon.com/stores/EDMShuffle', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Amazon Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://redbubble.com/people/EDMShuffle', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Redbubble Store
                </button>
              </li>
            </ul>
          </div>

          {/* BirthdayGen */}
          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-4">BirthdayGen</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.open('https://etsy.com/shop/BirthdayGen3I', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Etsy Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://amazon.com/stores/BirthdayGen', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Amazon Store
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://redbubble.com/people/BirthdayGen', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <ExternalLink className="h-3 w-3 mr-2 group-hover:rotate-12 transition-transform" />
                  Redbubble Store
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} 3I/ATLAS OBSERVATORY. Inspired by the cosmos, created for Earth. 
            All designs are original works inspired by astronomical phenomena.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500">
            <span>🛸 3I/Atlas Collection</span>
            <span>•</span>
            <span>🌟 Print-on-Demand</span>
            <span>•</span>
            <span>🚀 Cosmic Designs</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
