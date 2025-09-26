'use client'

import { getHeroImageUrl } from '@/lib/config'

interface EnhancedHeroSectionProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

export function EnhancedHeroSection({ 
  title, 
  description, 
  ctaText, 
  ctaLink 
}: EnhancedHeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 z-0"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 z-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center shadow-xl">
                <img
                  src={getHeroImageUrl()}
                  alt="3I/Atlas Interstellar Journey"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xl font-bold">3I</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-3xl mx-auto">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={ctaLink}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            >
              {ctaText}
            </a>
            
            <a
              href="#shop"
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full text-lg transition-all backdrop-blur-sm border border-white/20"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#about" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default EnhancedHeroSection
