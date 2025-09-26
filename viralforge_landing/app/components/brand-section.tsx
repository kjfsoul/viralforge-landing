"use client"

import PrintifyProductCard from "@/components/printify-product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Gift,
  Instagram,
  Music,
  Sparkles,
  Star,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { config } from "@/lib/config";
import type { NormalizedProduct } from "@/lib/printify-live";

type BrandSectionProps = {
  initial?: {
    [key: string]: NormalizedProduct[] | undefined
  }
}

const BRAND_VIEW_LINKS: Record<string, string> = {
  '3iAtlas': config.printify.storeUrl || config.shopUrl || '/shop',
  'Mystic Arcana': config.external.mysticArcana || '#',
  'EDM Shuffle': config.external.edmShuffle || '#',
  'BirthdayGen': config.external.birthdayGen || '#',
}

const brands = [
  {
    name: '3iAtlas',
    subtitle: 'Featured Interstellar Store',
    description: 'The flagship brand. Live interstellar-inspired merch and collectibles from the 3iAtlas store.',
    image: '/images/brand-3iatlas.jpg',
    icon: Star,
    color: 'from-blue-500 to-purple-500',
    hoverColor: 'hover:shadow-blue-500/25',
    borderColor: 'border-blue-500',
    website: BRAND_VIEW_LINKS['3iAtlas'],
    social: {
      instagram: '#',
      tiktok: '#',
      twitter: '#'
    },
    features: ['Featured Grid Below', 'Live Printify Data', 'Paginated']
  },
  {
    name: 'Mystic Arcana',
    subtitle: 'Cosmic Tarot & Astrology',
    description: 'Professional tarot and astrology platform offering mystical insights with a cosmic twist. Now featuring exclusive 3I/Atlas-inspired designs that blend ancient wisdom with interstellar mystery.',
    image: '/images/brand-mysticarcana.jpg',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:shadow-purple-500/25',
    borderColor: 'border-purple-500',
    website: BRAND_VIEW_LINKS['Mystic Arcana'],
    social: {
      instagram: '#',
      tiktok: '#',
      twitter: '#'
    },
    features: ['Tarot Readings', 'Astrology Charts', 'Cosmic Wisdom', '3I/Atlas Oracle']
  },
  {
    name: 'EDM Shuffle',
    subtitle: 'Digital Rave Experience',
    description: 'Electronic dance music platform delivering cosmic beats and futuristic vibes. Experience the rhythm of the universe with 3I/Atlas-inspired soundscapes and neon aesthetics.',
    image: '/images/brand-edmshuffle.jpg',
    icon: Music,
    color: 'from-cyan-500 to-blue-500',
    hoverColor: 'hover:shadow-cyan-500/25',
    borderColor: 'border-cyan-500',
    website: BRAND_VIEW_LINKS['EDM Shuffle'],
    social: {
      instagram: '#',
      tiktok: '#',
      twitter: '#'
    },
    features: ['Electronic Music', 'Rave Culture', 'Cosmic Beats', 'Interstellar Vibes']
  },
  {
    name: 'BirthdayGen',
    subtitle: 'Automated Celebrations',
    description: 'Revolutionary card creation and party planning platform. Make every birthday magical with AI-powered personalization and now featuring cosmic 3I/Atlas celebration themes.',
    image: '/images/brand-birthdaygen.jpg',
    icon: Gift,
    color: 'from-pink-500 to-yellow-500',
    hoverColor: 'hover:shadow-pink-500/25',
    borderColor: 'border-pink-500',
    website: BRAND_VIEW_LINKS['BirthdayGen'],
    social: {
      instagram: '#',
      tiktok: '#',
      twitter: '#'
    },
    features: ['Card Creation', 'Party Planning', 'Gift Automation', 'Cosmic Celebrations']
  }
]

function BrandInlineProducts({ brand, initialProducts }: { brand: string; initialProducts?: NormalizedProduct[] }) {
  const products = (initialProducts || []).slice(0, 3)
  const shopUrl = BRAND_VIEW_LINKS[brand] || '#'
  const needsCta = (initialProducts?.length ?? 0) < 3

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      {products.map((p) => (
        <PrintifyProductCard
          key={p.id}
          product={{
            id: p.id,
            title: p.title,
            description: p.short_description || p.description,
            brand: brand,
            category: p.tags?.[0] ?? brand,
            price: typeof p.price_min_cents === 'number'
              ? p.price_min_cents
              : typeof p.price_min === 'number'
                ? Math.round(p.price_min * 100)
                : typeof p.default_price_cents === 'number'
                  ? p.default_price_cents
                  : 0,
            images: p.images,
            printify_url: p.storefront_product_url ?? shopUrl,
            status: 'Available',
            urgent: false,
            featured: true,
            tags: p.tags,
            price_min: typeof p.price_min_cents === 'number'
              ? p.price_min_cents
              : typeof p.price_min === 'number'
                ? Math.round(p.price_min * 100)
                : null,
            price_max: null,
            storefront_product_url: p.storefront_product_url ?? shopUrl,
          }}
          variant="featured"
        />
      ))}

      {(needsCta || products.length === 0) && (
        <Card className="bg-gray-900/60 border-dashed border-2 border-purple-500/40 flex flex-col justify-between">
          <CardContent className="p-6 text-center space-y-4">
            <h4 className="text-lg font-semibold text-white">View full {brand} shop</h4>
            <p className="text-sm text-gray-300">
              {products.length ? 'Explore the rest of the live catalog.' : 'The latest products are syncing. Tap below to browse the full shop.'}
            </p>
            <Button
              variant="outline"
              className="border-purple-400 text-purple-200 hover:border-purple-200 hover:text-white"
              onClick={() => window.open(shopUrl, '_blank', 'noopener,noreferrer')}
            >
              Visit Shop
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function BrandSection({ initial }: BrandSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="brands"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-cyan-400 cosmic-text-glow" />
            <span className="text-sm uppercase tracking-wider text-cyan-400 cosmic-text-glow">
              Three Cosmic Brands
            </span>
            <Sparkles className="h-6 w-6 text-purple-400 cosmic-text-glow" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Explore Our Universe
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Each brand channels the cosmic energy of 3I/Atlas in its own unique
            way, bringing you designs that are truly out of this world.
          </p>
        </motion.div>

        <div className="space-y-20">
          {brands.map((brand, index) => {
            const BrandIcon = brand.icon
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="space-y-8"
              >
              {/* Row 1: Brand Image and Description side by side */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0
                    ? ""
                    : "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1"
                }`}
              >
                {/* Brand Image */}
                <div className="w-full">
                  <Card
                    className={`bg-gray-900/50 border-gray-700 overflow-hidden ${brand.hoverColor} hover:shadow-2xl transition-all duration-300 group`}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-video">
                        <Image
                          src={brand.image}
                          alt={`${brand.name} cosmic designs`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <BrandIcon
                              className={`h-6 w-6 text-transparent bg-gradient-to-r ${brand.color} bg-clip-text`}
                            />
                            <span
                              className={`text-sm font-medium bg-gradient-to-r ${brand.color} bg-clip-text text-transparent`}
                            >
                              {brand.subtitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Brand Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 crystal-text">
                      {brand.name}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {brand.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {brand.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${brand.color}`}
                        />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Website and Social Links */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => window.open(brand.website, "_blank", "noopener,noreferrer")}
                      className={`bg-gradient-to-r ${brand.color} hover:opacity-90 text-white rounded-full group flex-1`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Visit Website
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(brand.social.instagram, "_blank", "noopener,noreferrer")
                      }
                      variant="outline"
                      className={`border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full group`}
                    >
                      <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => window.open(brand.social.tiktok, "_blank", "noopener,noreferrer")}
                      variant="outline"
                      className={`border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full group`}
                    >
                      <Music className="h-4 w-4 group-hover:animate-bounce transition-transform" />
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(brand.social.twitter, "_blank", "noopener,noreferrer")
                      }
                      variant="outline"
                      className={`border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full group`}
                    >
                      <Twitter className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Row 2: Exactly 3 products beneath, in 3 columns */}
              <BrandInlineProducts brand={brand.name} initialProducts={initial?.[brand.name]} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
