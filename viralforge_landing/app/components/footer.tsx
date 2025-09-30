"use client"

import { Instagram, Music, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PrintifyProductCard from "./printify-product-card";

interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  price?: number;
  price_min?: number | null;
  price_max?: number | null;
  images: { id: string; url: string }[];
  printify_url?: string;
  storefront_product_url?: string | null;
  status?: string;
  urgent?: boolean;
  featured?: boolean;
  tags?: string[];
}

interface BrandSectionProps {
  brandName: string;
  logoPath?: string;
  shopUrl: string;
  brandKey: string;
}

function BrandSection({
  brandName,
  logoPath,
  shopUrl,
  brandKey,
}: BrandSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `/api/products?brand=${brandKey}&limit=3&live=true`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error(`Error fetching products for ${brandName}:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [brandKey, brandName]);

  return (
    <div className="space-y-4">
      {/* Brand Header */}
      <div className="text-center">
        {logoPath ? (
          <div className="mb-4">
            <Image
              src={logoPath}
              alt={brandName}
              width={120}
              height={48}
              className="mx-auto h-12 w-auto"
            />
          </div>
        ) : (
          <h3 className="text-2xl font-bold mb-6">{brandName}</h3>
        )}
        <a
          href={shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors mb-4"
        >
          shop
        </a>

        {/* Social Media Icons */}
        <div className="flex gap-3 justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Instagram className="h-4 w-4 text-gray-300" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Music className="h-4 w-4 text-gray-300" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Twitter className="h-4 w-4 text-gray-300" />
          </a>
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <PrintifyProductCard
              key={product.id}
              product={product}
              variant="compact"
            />
          ))
        ) : (
          <div className="text-center text-gray-400">No products available</div>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 3iAtlas */}
          <BrandSection
            brandName="3iAtlas"
            shopUrl="https://3iatlas.printify.me/"
            brandKey="3iAtlas"
          />

          {/* Mystic Arcana */}
          <BrandSection
            brandName="Mystic Arcana"
            logoPath="/images/mystic-arcana-logo.png"
            shopUrl="https://mystic-arcana-pop-up.printify.me/"
            brandKey="Mystic Arcana"
          />

          {/* EDM Shuffle */}
          <BrandSection
            brandName="EDM Shuffle"
            logoPath="/images/edm-shuffle-logo.png"
            shopUrl="https://edm-shuffle-pop-up.printify.me/"
            brandKey="EDM Shuffle"
          />

          {/* BirthdayGen */}
          <BrandSection
            brandName="BirthdayGen"
            logoPath="/images/birthdaygen-logo.png"
            shopUrl="https://birthdaygen-popup.printify.me/"
            brandKey="BirthdayGen"
          />
        </div>
      </div>
    </footer>
  );
}
