
'use client'

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
import { useEffect, useRef, useState } from "react";
import BrandHighlightProducts from "./brand-highlight-products";

const brands = [
  {
    name: 'Mystic Arcana',
    subtitle: 'Cosmic Tarot & Astrology',
    description: 'Professional tarot and astrology platform offering mystical insights with a cosmic twist. Now featuring exclusive 3I/Atlas-inspired designs that blend ancient wisdom with interstellar mystery.',
    image: 'https://cdn.abacus.ai/images/b36fadd6-3502-4b2d-a43a-f78f49504cd2.png',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    hoverColor: 'hover:shadow-purple-500/25',
    borderColor: 'border-purple-500',
    website: 'https://mysticarcana.com',
    social: {
      instagram: 'https://www.instagram.com/mysticarcanaofficial/',
      tiktok: 'https://www.tiktok.com/@the_mystic_arcana',
      twitter: 'https://x.com/arcana86042'
    },
    features: ['Tarot Readings', 'Astrology Charts', 'Cosmic Wisdom', '3I/Atlas Oracle']
  },
  {
    name: 'EDM Shuffle',
    subtitle: 'Digital Rave Experience',
    description: 'Electronic dance music platform delivering cosmic beats and futuristic vibes. Experience the rhythm of the universe with 3I/Atlas-inspired soundscapes and neon aesthetics.',
    image: 'https://cdn.abacus.ai/images/c12bfc8e-745e-4bdd-9d2b-5d40f84c4585.png',
    icon: Music,
    color: 'from-cyan-500 to-blue-500',
    hoverColor: 'hover:shadow-cyan-500/25',
    borderColor: 'border-cyan-500',
    website: 'https://edmshuffle.com',
    social: {
      instagram: 'https://www.instagram.com/edmshuffleofficial/',
      tiktok: 'https://www.tiktok.com/@edmshuffleofficial?lang=en',
      twitter: 'https://x.com/edm_shuffle'
    },
    features: ['Electronic Music', 'Rave Culture', 'Cosmic Beats', 'Interstellar Vibes']
  },
  {
    name: 'BirthdayGen',
    subtitle: 'Automated Celebrations',
    description: 'Revolutionary card creation and party planning platform. Make every birthday magical with AI-powered personalization and now featuring cosmic 3I/Atlas celebration themes.',
    image: 'https://cdn.abacus.ai/images/815c7bcd-9c6f-4e22-96f8-f9ef7ee79eec.png',
    icon: Gift,
    color: 'from-pink-500 to-yellow-500',
    hoverColor: 'hover:shadow-pink-500/25',
    borderColor: 'border-pink-500',
    website: 'https://birthdaygen.com',
    social: {
      instagram: 'https://www.instagram.com/birthday_gen/',
      tiktok: 'https://www.tiktok.com/@birthdaygen?lang=en',
      twitter: 'https://x.com/BirthdayGen'
    },
    features: ['Card Creation', 'Party Planning', 'Gift Automation', 'Cosmic Celebrations']
  }
]

function BrandInlineProducts({ brand }: { brand: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `/api/products?brand=${encodeURIComponent(brand)}&limit=3&live=true`
        );
        const data = await res.json();
        if (data?.success) setProducts(data.data || []);
      } catch (e) {
        console.warn("Failed to load brand products", brand, e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [brand]);

  if (loading || products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      {products.map((p) => (
        <PrintifyProductCard key={p.id} product={p} variant="featured" />
      ))}
    </div>
  );
}

export default function BrandSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

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
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative space-y-8"
            >
              {/* Row 1: Brand Image and Description side by side */}
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0
                    ? ""
                    : "lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1"
                }`}
              >
                {/* Brand Highlight Product (floating badge card) */}
                <BrandHighlightProducts
                  brandName={brand.name}
                  brandColor={brand.borderColor}
                  position={index % 2 === 0 ? "left" : "right"}
                />

                {/* Brand Image */}
                <div className="w-full">
                  <Card
                    className={`bg-gray-900/50 border-gray-700 overflow-hidden ${brand.hoverColor} hover:shadow-2xl transition-all duration-300 group`}
                    onMouseEnter={() => setHoveredBrand(index)}
                    onMouseLeave={() => setHoveredBrand(null)}
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
                            <brand.icon
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
                      onClick={() => window.open(brand.website, "_blank")}
                      className={`bg-gradient-to-r ${brand.color} hover:opacity-90 text-white rounded-full group flex-1`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                      Visit Website
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(brand.social.instagram, "_blank")
                      }
                      variant="outline"
                      className={`border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full group`}
                    >
                      <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => window.open(brand.social.tiktok, "_blank")}
                      variant="outline"
                      className={`border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full group`}
                    >
                      <Music className="h-4 w-4 group-hover:bounce transition-transform" />
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(brand.social.twitter, "_blank")
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
              <BrandInlineProducts brand={brand.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
