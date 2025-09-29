"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Gift,
  Music,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import SocialLinks from "./SocialLinks";
import FeaturedProductsRow from "./FeaturedProductsRow";

type BrandSectionProps = {}

const BRAND_VIEW_LINKS: Record<string, string> = {
  "3iAtlas": "https://3iatlas.printify.me/",
  "Mystic Arcana": "https://mystic-arcana-pop-up.printify.me/",
  "EDM Shuffle": "https://edm-shuffle-pop-up.printify.me/",
  BirthdayGen: "https://birthdaygen-popup.printify.me/",
};

const brands = [
  {
    name: "3iAtlas",
    subtitle: "Featured Interstellar Store",
    description: "",
    image: "/images/thirdeye.png",
    icon: Star,
    color: "from-blue-500 to-purple-500",
    hoverColor: "hover:shadow-blue-500/25",
    borderColor: "border-blue-500",
    website: BRAND_VIEW_LINKS["3iAtlas"],
    social: null,
    features: [],
  },
  {
    name: "Mystic Arcana",
    brandKey: "mysticArcana",
    subtitle: "Cosmic Tarot & Astrology",
    description: "",
    image: "/images/Mystic Arcana_updated Logo.png",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    hoverColor: "hover:shadow-purple-500/25",
    borderColor: "border-purple-500",
    website: BRAND_VIEW_LINKS["Mystic Arcana"],
    social: {
      instagram: "#",
      tiktok: "#",
      twitter: "#",
    },
    features: [],
  },
  {
    name: "EDM Shuffle",
    brandKey: "edmShuffle",
    subtitle: "Digital Rave Experience",
    description: "",
    image: "/images/EDM_Shuffle_Logo.png",
    icon: Music,
    color: "from-cyan-500 to-blue-500",
    hoverColor: "hover:shadow-cyan-500/25",
    borderColor: "border-cyan-500",
    website: BRAND_VIEW_LINKS["EDM Shuffle"],
    social: {
      instagram: "#",
      tiktok: "#",
      twitter: "#",
    },
    features: [],
  },
  {
    name: "BirthdayGen",
    brandKey: "birthdayGen",
    subtitle: "Automated Celebrations",
    description: "",
    image: "/images/birthday-gen-logo.png",
    icon: Gift,
    color: "from-pink-500 to-yellow-500",
    hoverColor: "hover:shadow-pink-500/25",
    borderColor: "border-pink-500",
    website: BRAND_VIEW_LINKS["BirthdayGen"],
    social: {
      instagram: "#",
      tiktok: "#",
      twitter: "#",
    },
    features: [],
  },
];

export default function BrandSection({}: BrandSectionProps) {
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
                    </div>

                    {/* Shop Link and Social Media */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={() =>
                            window.open(
                              brand.website,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className={`bg-gradient-to-r ${brand.color} hover:opacity-90 text-white rounded-full group flex-1`}
                        >
                          <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          shop
                        </Button>
                      </div>

                      {/* Social Media Icons */}
                      {brand.brandKey && <SocialLinks brand={brand.brandKey as any} />}
                    </div>
                  </div>
                </div>

                {/* Row 2: Exactly 3 products beneath, in 3 columns */}
                <FeaturedProductsRow storeBase={brand.website} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
