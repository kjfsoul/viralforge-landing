
'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-purple-400 neon-glow" />
            <span className="text-xl font-bold text-white neon-glow">
              3I/<span className="text-cyan-400">ATLAS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('brands')}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Brands
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              FAQ
            </button>
            <Button 
              onClick={() => window.open('/shop', '_self')}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full hover-neon"
            >
              Shop Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('brands')}
                className="text-gray-300 hover:text-purple-400 transition-colors text-left"
              >
                Brands
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-300 hover:text-cyan-400 transition-colors text-left"
              >
                FAQ
              </button>
              <Button 
                onClick={() => window.open('/shop', '_self')}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-full hover-neon w-full"
              >
                Shop Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
