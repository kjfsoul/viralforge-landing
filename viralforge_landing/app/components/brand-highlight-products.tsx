
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const limitWords = (input: string, maxWords = 20) => {
  if (!input) return ''
  const words = input.replace(/\s+/g, ' ').trim().split(' ')
  if (words.length <= maxWords) return words.join(' ')
  return words.slice(0, maxWords).join(' ') + '…'
}

interface Product {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price?: number
  price_min?: number | null
  price_max?: number | null
  images: { id: string; url: string }[]
  printify_url?: string
  storefront_product_url?: string | null
  status: string
}

interface BrandHighlightProductsProps {
  brandName: string
  brandColor: string
  position?: 'left' | 'right'
}

export default function BrandHighlightProducts({ 
  brandName, 
  brandColor, 
  position = 'right' 
}: BrandHighlightProductsProps) {
  const [brandProducts, setBrandProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    async function fetchBrandProducts() {
      try {
        const response = await fetch(`/api/products?brand=${encodeURIComponent(brandName)}`)
        const data = await response.json()
        if (data.success) {
          const products = (data.data as any[]).slice(0, 1).map((item) => ({
            id: item.id,
            title: item.title,
            description: limitWords(item.short_description || item.description || ''),
            brand: item.brand,
            category: item.tags?.[0] ?? item.brand,
            price: typeof item.price_min_cents === 'number'
              ? item.price_min_cents
              : typeof item.price_min === 'number'
                ? Math.round(item.price_min * 100)
                : typeof item.default_price_cents === 'number'
                  ? item.default_price_cents
                  : null,
            price_min: typeof item.price_min_cents === 'number'
              ? item.price_min_cents
              : typeof item.price_min === 'number'
                ? Math.round(item.price_min * 100)
                : null,
            price_max: null,
            images: item.images ?? [],
            printify_url: item.storefront_product_url ?? '#',
            storefront_product_url: item.storefront_product_url ?? '#',
            status: 'Available',
          }))
          setBrandProducts(products)
        }
      } catch (error) {
        console.error(`Failed to fetch ${brandName} products:`, error)
      }
      setLoading(false)
    }

    fetchBrandProducts()
  }, [brandName])

  const formatPrice = (price: number | null): string => {
    if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) return '—'
    return `$${(price / 100).toFixed(2)}`
  }
  const renderPrice = (p: Product) => formatPrice(
    typeof p.price_min === 'number'
      ? p.price_min
      : typeof p.price === 'number'
        ? p.price
        : null
  )

  if (loading || brandProducts.length === 0) {
    return null
  }

  const product = brandProducts[0]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`absolute ${position === "left" ? "-left-24" : "-right-24"} top-1/2 -translate-y-1/2 hidden xl:block z-10`}
    >
      <Card
        className={`w-72 bg-gray-900/90 backdrop-blur-sm border-2 hover:border-opacity-100 transition-all duration-300 group overflow-hidden ${brandColor} shadow-2xl`}
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0]?.url || "/placeholder-product.jpg"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <Badge
            className={`absolute top-3 left-3 bg-gradient-to-r ${brandColor.replace("border-", "")} text-white`}
          >
            {brandName}
          </Badge>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-white font-semibold text-lg mb-1 line-clamp-1">
              {product.title}
            </div>
            <div className="text-gray-200 text-sm mb-2 line-clamp-2">
              {product.description?.slice(0, 120)}
              {product.description && product.description.length > 120
                ? "…"
                : ""}
            </div>
            <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-xl">{renderPrice(product)}</span>
              <Badge className="bg-green-500 text-white text-xs">
                {product.status}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button
              size="sm"
              className={`flex-1 bg-gradient-to-r ${brandColor.replace("border-", "")} hover:opacity-90 text-white`}
              onClick={() => window.open(product.storefront_product_url || product.printify_url || '#', "_blank")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Shop Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => window.open(product.storefront_product_url || product.printify_url || '#', "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
