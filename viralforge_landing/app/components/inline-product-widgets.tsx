
'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  images: Array<{ id: string; url: string }>;
  printify_url: string;
  status: string;
  urgent: boolean;
  tags: string[];
}

// Compact product widget for inline placement
export function InlineProductWidget({
  productId,
  context = "general",
}: {
  productId?: string;
  context?: string;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products?context=${context}&featured=true`
        );
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          // Get the first relevant product or find by ID
          const selectedProduct = productId
            ? data.data.find((p: Product) => p.id === productId)
            : data.data[0];
          setProduct(selectedProduct || null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, context]);

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-4">
          <div className="animate-pulse flex items-center space-x-4">
            <div className="bg-gray-700 h-16 w-16 rounded-lg"></div>
            <div className="flex-1">
              <div className="bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-700 h-3 rounded w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30 backdrop-blur-md hover:border-cyan-400 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={product.images[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
              {product.urgent && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0.5">
                  HOT
                </Badge>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm mb-1 truncate">
                {product.title}
              </h4>
              <div className="flex items-center space-x-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-xs text-purple-400 border-purple-400"
                >
                  {product.brand}
                </Badge>
                <span className="text-lg font-bold text-cyan-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">
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
            </div>

            <Button
              onClick={() => window.open(product.printify_url, "_blank")}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white flex-shrink-0"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Buy
            </Button>
          </div>

          {product.status && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs text-orange-400 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {product.status}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Floating product recommendation
export function FloatingProductRecommendation() {
  const [isVisible, setIsVisible] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchHotProduct = async () => {
      try {
        const response = await fetch(
          "/api/products?context=hero&featured=true"
        );
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const urgentProduct =
            data.data.find((p: Product) => p.urgent) || data.data[0];
          setProduct(urgentProduct);
        }
      } catch (error) {
        console.error("Error fetching hot product:", error);
      }
    };

    fetchHotProduct();

    // Show after scrolling a bit
    const handleScroll = () => {
      const scrolled = window.scrollY > 800;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed bottom-6 right-6 z-40 max-w-sm"
    >
      <Card className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 border-purple-500/50 backdrop-blur-md shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-xs font-bold text-white">
                Mars Flyby Exclusive!
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <div className="relative w-12 h-12">
              <Image
                src={product.images[0]?.url || "/placeholder.jpg"}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm mb-1 line-clamp-2">
                {product.title}
              </h4>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 text-white text-xs animate-pulse">
                  LIMITED
                </Badge>
                <span className="text-sm font-bold text-cyan-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => window.open(product.printify_url, "_blank")}
            className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-sm"
          >
            Get Mars Flyby Exclusive
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
