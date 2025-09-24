
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, ExternalLink, ShoppingCart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  images: Array<{ id: string; url: string }>;
  printify_url: string;
  status: string;
  urgent: boolean;
  featured: boolean;
  tags: string[];
}

interface StrategicPlacementProps {
  context: "hero" | "oracle" | "trajectory" | "celebration" | "rave";
  maxProducts?: number;
  className?: string;
}

export function StrategicProductPlacement({
  context,
  maxProducts = 3,
  className = "",
}: StrategicPlacementProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?context=${context}&featured=true`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.slice(0, maxProducts));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [context, maxProducts]);

  const contextConfig = {
    hero: {
      title: "🔥 Mars Flyby Exclusives",
      subtitle: "Limited time commemorative collection",
      bgGradient: "from-purple-900/20 to-pink-900/20",
      borderColor: "border-purple-500/30",
    },
    oracle: {
      title: "🔮 Mystical Oracle Collection",
      subtitle: "Channel cosmic wisdom with these sacred designs",
      bgGradient: "from-violet-900/20 to-purple-900/20",
      borderColor: "border-violet-500/30",
    },
    trajectory: {
      title: "🚀 Hyperbolic Journey Collection",
      subtitle: "Track 3I/Atlas's path through our solar system",
      bgGradient: "from-cyan-900/20 to-blue-900/20",
      borderColor: "border-cyan-500/30",
    },
    celebration: {
      title: "🎉 Cosmic Celebration Collection",
      subtitle: "Make every moment interstellar",
      bgGradient: "from-orange-900/20 to-red-900/20",
      borderColor: "border-orange-500/30",
    },
    rave: {
      title: "⚡ Festival Cosmic Collection",
      subtitle: "EDM designs from another galaxy",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
    },
  };

  const config = contextConfig[context];

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800 h-48 rounded-lg mb-3"></div>
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        className={`bg-gradient-to-br ${config.bgGradient} ${config.borderColor} backdrop-blur-md`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {config.title}
              </h3>
              <p className="text-sm text-gray-400">{config.subtitle}</p>
            </div>
            <Button
              onClick={() =>
                window.open("https://3iatlas.printify.me", "_blank")
              }
              variant="outline"
              size="sm"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-black/40 border-gray-700 hover:border-cyan-400 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images[0]?.url || "/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.urgent && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                          <Clock className="h-3 w-3 mr-1" />
                          Limited
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 bg-purple-500/80 text-white text-xs">
                        {product.brand}
                      </Badge>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2">
                        {product.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                        {(() => {
                          const text = (product.description || "")
                            .replace(/\s+/g, " ")
                            .trim();
                          const parts = text
                            .split(/(?<=[.!?])\s+/)
                            .slice(0, 2)
                            .join(" ");
                          return parts.length > 140
                            ? parts.slice(0, 140).replace(/\s\S*$/, "") + "…"
                            : parts;
                        })()}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-cyan-400">
                          ${product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() =>
                            window.open(product.printify_url, "_blank")
                          }
                          size="sm"
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-xs"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Buy Now
                        </Button>
                      </div>

                      {product.status && (
                        <p className="text-xs text-orange-400 mt-2 font-medium">
                          {product.status}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() =>
                window.open("https://3iatlas.printify.me", "_blank")
              }
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full group"
            >
              <Sparkles className="mr-2 h-4 w-4 group-hover:animate-spin" />
              Shop Full {config.title
                .replace(/🔥|🔮|🚀|🎉|⚡/g, "")
                .trim()}{" "}
              Collection
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Brand-specific showcases
export function MysticArcanaShowcase({ className = '' }: { className?: string }) {
  return <StrategicProductPlacement context="oracle" maxProducts={4} className={className} />
}

export function EDMShuffleShowcase({ className = '' }: { className?: string }) {
  return <StrategicProductPlacement context="rave" maxProducts={4} className={className} />
}

export function BirthdayGenShowcase({ className = '' }: { className?: string }) {
  return <StrategicProductPlacement context="celebration" maxProducts={4} className={className} />
}

export function HeroProductShowcase({ className = '' }: { className?: string }) {
  return <StrategicProductPlacement context="hero" maxProducts={3} className={className} />
}

export function TrajectoryProductShowcase({ className = '' }: { className?: string }) {
  return <StrategicProductPlacement context="trajectory" maxProducts={3} className={className} />
}
