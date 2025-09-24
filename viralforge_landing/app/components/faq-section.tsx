
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import Image from 'next/image'

const faqs = [
  {
    question: "What is the 3I/Atlas interstellar object?",
    answer: "3I/Atlas is a mysterious interstellar visitor that passed through our solar system, inspiring our cosmic design collection. Our artists have channeled its otherworldly energy into unique print-on-demand products that capture the wonder of space exploration and cosmic mystery."
  },
  {
    question: "What products are available in each brand?",
    answer: "Mystic Arcana offers tarot cards, astrology prints, crystals, and mystical home decor. EDM Shuffle features electronic music art, festival gear, DJ accessories, and neon wall art. BirthdayGen provides cosmic birthday cards, party decorations, gift wrapping, and celebration accessories."
  },
  {
    question: "Where can I purchase these cosmic designs?",
    answer: "All three brands are available on multiple platforms including Etsy, Amazon, and Redbubble. Each platform offers different product types and shipping options to suit your needs. Links to all our storefronts are provided on each brand section."
  },
  {
    question: "Are these designs available on different product types?",
    answer: "Yes! Our cosmic designs are available on a wide variety of products including t-shirts, hoodies, posters, canvas prints, phone cases, mugs, stickers, and home decor items. The specific product range varies by platform and brand."
  },
  {
    question: "How often do you release new designs?",
    answer: "We regularly release new cosmic designs inspired by space discoveries, astronomical events, and customer feedback. Follow our social media or bookmark our shop pages to stay updated on the latest additions to our interstellar collection."
  },
  {
    question: "Do you offer custom design services?",
    answer: "While our current focus is on our curated cosmic collection, we're always interested in hearing from customers about custom design requests. Contact us through any of our shop platforms to discuss potential custom projects."
  },
  {
    question: "What makes your designs unique?",
    answer: "Our designs are exclusively inspired by real astronomical phenomena, particularly the mysterious 3I/Atlas interstellar object. Each piece combines scientific wonder with artistic creativity, featuring authentic cosmic themes, neon aesthetics, and space-age styling you won't find elsewhere."
  },
  {
    question: "Are your products eco-friendly?",
    answer: "We partner with print-on-demand services that prioritize sustainable practices, including eco-friendly inks, responsible sourcing, and minimal waste production. Products are only created when ordered, reducing overproduction and waste."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-16 h-16">
              <Image
                src="https://cdn.abacus.ai/images/ff55bffe-a3dd-4031-a90d-0c25faf0d017.png"
                alt="FAQ alien probe icon"
                fill
                className="object-contain neon-glow"
              />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Cosmic Questions
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about our interstellar design collection and cosmic brands.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover-neon">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <HelpCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="font-semibold text-white text-lg">{faq.question}</span>
                    </div>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
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
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Schema Markup for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </div>
    </section>
  )
}
