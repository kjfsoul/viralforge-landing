
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Calendar, MapPin, Telescope, Rocket } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const faqCategories = [
  {
    id: 'atlas',
    title: '3I/Atlas Interstellar Object',
    icon: Telescope,
    color: 'from-purple-500 to-pink-500',
    faqs: [
      {
        question: "What is 3I/Atlas and why is it significant?",
        answer: "3I/Atlas is the third confirmed interstellar visitor to our solar system, discovered on July 1, 2025, by NASA's ATLAS telescope. Unlike previous visitors 1I/'Oumuamua and 2I/Borisov, 3I/Atlas is an active comet with a visible coma and tail, traveling at 137,000 mph. It's estimated to be 4.6 billion years old - potentially older than our Solar System - and originated from the constellation Sagittarius near the galactic plane."
      },
      {
        question: "When will 3I/Atlas be closest to Earth and Mars?",
        answer: "3I/Atlas will make its closest approach to Mars on October 2-3, 2025, passing within 18-30 million miles. Its perihelion (closest approach to the Sun) occurs on October 29-30, 2025, at a distance of 1.36-1.4 AU (130-210 million miles). The closest approach to Earth will be 1.8 AU (270 million miles) - posing no threat to our planet."
      },
      {
        question: "What makes 3I/Atlas different from other interstellar objects?",
        answer: "3I/Atlas is unique because it's an active comet with a teardrop-shaped coma, unlike the rocky 1I/'Oumuamua. It contains carbon dioxide, water ice, carbon monoxide, cyanide gas, atomic nickel, and carbonyl sulfide. Its reddish color and high negative polarization make it particularly intriguing. The object rotates approximately every 0.6 hours and measures between 0.32-5.6 km in diameter."
      },
      {
        question: "How old is 3I/Atlas and where did it come from?",
        answer: "Recent studies suggest 3I/Atlas is between 4.6-8 billion years old, making it potentially older than our Solar System. It originated from the constellation Sagittarius, specifically from the galactic plane region, unlike previous interstellar visitors that came from the Milky Way's thin disk. This ancient visitor provides unprecedented insights into planetary formation in other star systems."
      },
      {
        question: "When can I see 3I/Atlas and track its journey?",
        answer: "3I/Atlas is visible through telescopes until September 2025, then becomes obscured by the Sun until December 2025. After perihelion in late October, it will be heading out of our solar system permanently. Amateur astronomers can track its progress using astronomy apps and follow NASA's real-time updates during its Mars flyby and perihelion approach."
      }
    ]
  },
  {
    id: 'products',
    title: 'Products & Brands',
    icon: Rocket,
    color: 'from-cyan-500 to-blue-500',
    faqs: [
      {
        question: "What products are available across all three brands?",
        answer: "Our cosmic collection spans three unique brands: **Mystic Arcana** features 3I/Atlas oracle cards, astrology prints, tarot decks, crystal guides, and mystical home decor. **EDM Shuffle** offers neon 3I/Atlas t-shirts, festival gear, DJ accessories, electronic music art, and blacklight-reactive designs. **BirthdayGen** provides cosmic birthday cards, interstellar party decorations, space-themed gift wrapping, and celebration accessories."
      },
      {
        question: "How many 3I/Atlas-specific designs do you have?",
        answer: "We currently have 50+ unique 3I/Atlas-inspired designs live on our Printify stores, with new releases timed to astronomical events. Our collection includes trajectory maps, scientific illustrations, artistic interpretations, and commemorative designs celebrating this historic interstellar visitor. Each brand interprets the 3I/Atlas theme through its unique aesthetic lens."
      },
      {
        question: "Where can I purchase your cosmic print-on-demand products?",
        answer: "Our products are available through multiple Printify-powered stores: the main 3I/Atlas collection, Mystic Arcana (mysticarcana.com), EDM Shuffle (edmshuffle.com), and BirthdayGen (birthdaygen.com). Each store specializes in its brand's aesthetic while featuring exclusive 3I/Atlas designs. We also have presence on Etsy, Amazon, and Redbubble for maximum accessibility."
      },
      {
        question: "What product types can I get 3I/Atlas designs on?",
        answer: "Our interstellar designs are available on 20+ product types including premium t-shirts, hoodies, tank tops, canvas prints, framed posters, metal prints, phone cases, laptop cases, mugs, water bottles, tote bags, stickers, magnets, and home decor items. Specific product availability varies by brand and design complexity."
      },
      {
        question: "Do you offer limited edition or timed releases?",
        answer: "Yes! We release special limited editions tied to 3I/Atlas milestones: Mars Flyby Collection (October 2-3, 2025), Perihelion Series (October 29-30, 2025), and Final Departure Collection (December 2025). These commemorative designs are only available during specific astronomical events, making them perfect collectibles for space enthusiasts."
      }
    ]
  },
  {
    id: 'business',
    title: 'Business & Ordering',
    icon: HelpCircle,
    color: 'from-green-500 to-emerald-500',
    faqs: [
      {
        question: "How does your print-on-demand process work?",
        answer: "We use Printify's premium network of print providers to create your products on-demand. When you place an order, it's automatically sent to the nearest quality print facility, produced using eco-friendly inks and sustainable materials, then shipped directly to you. This eliminates waste and ensures fresh, high-quality products every time."
      },
      {
        question: "What are your shipping times and costs?",
        answer: "Shipping varies by product and location: US orders typically take 3-7 business days, EU orders 5-10 days, and international orders 7-14 days. Shipping costs are calculated at checkout based on your location and order size. We offer free shipping promotions during major astronomical events like the 3I/Atlas perihelion approach."
      },
      {
        question: "What is your return and exchange policy?",
        answer: "We offer a 30-day satisfaction guarantee on all products. If you're not completely satisfied with your cosmic merchandise, contact us within 30 days for a replacement or refund. Products must be in original condition. We cover return shipping for defective items and manufacturing errors."
      },
      {
        question: "Do you offer bulk discounts for schools or organizations?",
        answer: "Yes! We provide special pricing for educational institutions, astronomy clubs, planetariums, and space-related organizations wanting to purchase 3I/Atlas educational materials or merchandise in bulk. Contact us directly through any of our stores for custom pricing on quantities of 10 or more items."
      },
      {
        question: "How do you ensure product quality?",
        answer: "All our products are produced by Printify's verified premium partners using high-quality materials: 100% cotton or premium blends for apparel, museum-quality paper for prints, and professional-grade materials for accessories. Each item undergoes quality checks before shipping, and we maintain a 99.2% customer satisfaction rate."
      }
    ]
  },
  {
    id: 'science',
    title: 'Science & Education',
    icon: Sparkles,
    color: 'from-orange-500 to-red-500',
    faqs: [
      {
        question: "How accurate are your 3I/Atlas scientific illustrations?",
        answer: "Our designs are based on real NASA and ESA data, including trajectory calculations, spectroscopic analysis, and Hubble telescope observations. We collaborate with astronomy consultants to ensure scientific accuracy while maintaining artistic appeal. Each design includes educational elements that teach viewers about interstellar objects and space science."
      },
      {
        question: "What can 3I/Atlas teach us about other star systems?",
        answer: "3I/Atlas provides unique insights into planetary formation beyond our solar system. Its composition reveals information about the stellar environment it originated from, while its age (4.6-8 billion years) suggests it formed in the early universe. Studying its trajectory and behavior helps scientists understand galactic dynamics and the frequency of interstellar visitors."
      },
      {
        question: "How many interstellar objects visit our solar system?",
        answer: "Scientists estimate that hundreds of millions of trillions of interstellar objects exist in our galaxy, with approximately one similar object passing through our inner solar system annually. Most go undetected due to their small size and speed. The upcoming Vera Rubin Observatory is expected to discover many more interstellar visitors starting in 2026."
      },
      {
        question: "What happened to the previous interstellar visitors?",
        answer: "1I/'Oumuamua (2017) has left our solar system and is now heading toward the constellation Pegasus. Recent research suggests it was an 'exo-Pluto' fragment - a nitrogen-rich icy body from another star system. 2I/Borisov (2019) also departed and is currently traveling through interstellar space, providing ongoing research opportunities about comet composition from other star systems."
      },
      {
        question: "Can we send a mission to study 3I/Atlas?",
        answer: "While 3I/Atlas is moving too fast for current spacecraft technology to intercept, scientists are using ground-based telescopes and space observatories to study it extensively. The data collected during its 2025 visit will inform future interstellar object missions and help design spacecraft capable of studying these cosmic visitors in real-time."
      }
    ]
  }
]

export default function EnhancedFAQSection() {
  const [activeCategory, setActiveCategory] = useState('atlas')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const activeCategoryData = faqCategories.find(cat => cat.id === activeCategory)

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src="https://cdn.abacus.ai/images/554503fc-f3d3-4064-a8ae-eda83a5dc1a3.png"
                alt="Cosmic FAQ alien probe with question marks"
                fill
                className="object-contain neon-glow"
              />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Cosmic Knowledge Center
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Everything you need to know about 3I/Atlas, our interstellar design collection, and the science behind cosmic visitors.
          </p>

          {/* Breaking News Alert */}
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white mb-8 animate-pulse">
            🔴 LIVE: 3I/Atlas approaching Mars flyby - October 2-3, 2025
          </Badge>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqCategories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setOpenIndex(null)
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            )
          })}
        </motion.div>

        {/* FAQ Content */}
        <div className="space-y-4">
          {activeCategoryData?.faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`bg-gray-900/50 border-gray-700 hover:border-opacity-50 transition-all duration-300 hover-neon ${
                openIndex === index ? `border-opacity-100 bg-gradient-to-r ${activeCategoryData.color} bg-opacity-5` : ''
              }`}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <activeCategoryData.icon className={`h-5 w-5 flex-shrink-0 ${
                        activeCategory === 'atlas' ? 'text-purple-400' :
                        activeCategory === 'products' ? 'text-cyan-400' :
                        activeCategory === 'business' ? 'text-green-400' :
                        'text-orange-400'
                      }`} />
                      <span className="font-semibold text-white text-lg pr-4">{faq.question}</span>
                    </div>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="pl-9 text-gray-300 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ 
                          __html: faq.answer.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                        }} />
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqCategories.flatMap(category => 
                category.faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer.replace(/\*\*(.*?)\*\*/g, '$1')
                  }
                }))
              ),
              "about": {
                "@type": "Thing",
                "name": "3I/Atlas Interstellar Object",
                "description": "Third confirmed interstellar visitor to our solar system, discovered July 2025"
              }
            })
          }}
        />
      </div>
    </section>
  )
}
