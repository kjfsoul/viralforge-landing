import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl, getImageUrl } from "@/lib/config"

'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { summarizeText } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart, Star, Zap } from "lucide-react";
import Image from 'next/image'

interface Product {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price: number
  images: { id: string; url: string }[]
  printify_url: string
  status: string
  urgent?: boolean
  featured: boolean
}

export default function HeroProductShowcase({ products }: { products: Product[] }) {
  

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="py-16 bg-gradient-to-b from-gray-900/50 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <Zap className="h-6 w-6 text-red-500 animate-pulse" />
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-4 py-1 animate-pulse">
              🚨 MARS FLYBY EXCLUSIVES
            </Badge>
            <Zap className="h-6 w-6 text-red-500 animate-pulse" />
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Limited Time Commemorative Collection
          </h2>
          <p className="text-gray-300 text-lg">
            Celebrate humanity's third interstellar visitor with these exclusive
            designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/70 border-gray-700 hover:border-red-500/50 transition-all duration-300 group overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0]?.url || "/placeholder-product.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <Badge
                    className={`absolute top-3 left-3 ${
                      product.urgent
                        ? "bg-red-500 animate-pulse"
                        : product.status.includes("Limited")
                          ? "bg-orange-500"
                          : "bg-blue-500"
                    } text-white`}
                  >
                    {product.status}
                  </Badge>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-cyan-400 font-bold text-lg">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-600 text-gray-400"
                      >
                        {product.brand}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    </div>

                    <h3 className="font-semibold text-white text-lg line-clamp-2 group-hover:text-red-400 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {summarizeText(product.description, {
                        sentences: 2,
                        maxChars: 120,
                      })}
                    </p>

                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white group"
                        onClick={() =>
                          window.open(product.printify_url, "_blank")
                        }
                      >
                        <ShoppingCart className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                        Shop Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        onClick={() =>
                          window.open(product.printify_url, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full Store CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-red-500"
            onClick={() =>
              window.open("config.printify.storeUrl/", "_blank")
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Browse Complete Collection
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
