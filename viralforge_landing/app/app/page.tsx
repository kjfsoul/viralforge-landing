
import AtlasTrajectorySimulator from "@/components/atlas-trajectory-simulator";
import BrandSection from "@/components/brand-section";
import CTASection from "@/components/cta-section";
import EnhancedFAQSection from "@/components/enhanced-faq-section";
import EnhancedHeroSection from "@/components/enhanced-hero-section";
import EnhancedProductShowcase from "@/components/enhanced-product-showcase";
import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroProductShowcase from "@/components/hero-product-showcase";
import {
  FloatingProductRecommendation,
  InlineProductWidget,
} from "@/components/inline-product-widgets";
import NewsSection from "@/components/news-section";
import OracleSection from "@/components/oracle-section";
import PrintifyProductCard from "@/components/printify-product-card";
import {
  HeroProductShowcase as StrategicHeroShowcase,
  TrajectoryProductShowcase,
} from "@/components/strategic-product-placements";
import { Metadata } from "next";

// Server-side function to fetch products
async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002"}/api/products`,
      {
        cache: "no-store", // Always fetch fresh data
      }
    );
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: '3I/Atlas Historic Mars Flyby | Cosmic Collection Live Now',
  description: 'Exclusive cosmic designs inspired by 3I/Atlas, the third confirmed interstellar visitor. Mars flyby Oct 2-3, perihelion Oct 29-30, 2025. Shop Mystic Arcana, EDM Shuffle, BirthdayGen limited editions.',
  keywords: '3I/Atlas, interstellar object, Mars flyby, perihelion 2025, cosmic designs, Mystic Arcana, EDM Shuffle, BirthdayGen, space merchandise, astronomy gifts',
  openGraph: {
    title: '3I/Atlas Historic Mars Flyby | Cosmic Collection',
    description: 'Witness history as 3I/Atlas approaches Mars Oct 2-3, 2025. Limited edition cosmic designs celebrating our third interstellar visitor.',
    url: 'https://3iatlas.com',
    siteName: '3I/Atlas Collection',
    images: [
      {
        url: 'https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png',
        width: 1312,
        height: 736,
        alt: '3I/Atlas approaching Mars - Historic interstellar flyby Oct 2-3, 2025',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚨 LIVE: 3I/Atlas Mars Flyby | Historic Interstellar Event',
    description: 'Ancient cosmic visitor 3I/Atlas approaches Mars in 3 days! Limited edition commemorative collection available now.',
    images: ['https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png'],
  },
}

// Enhanced structured data with current events
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "3I/Atlas Interstellar Collection",
  "description": "Exclusive cosmic designs inspired by 3I/Atlas interstellar visitor approaching Mars Oct 2-3, 2025",
  "url": "https://3iatlas.com",
  "datePublished": "2025-10-30T00:00:00Z",
  "dateModified": new Date().toISOString(),
  "about": [
    {
      "@type": "Event",
      "name": "3I/Atlas Mars Flyby",
      "description": "Historic close approach of third interstellar visitor to Mars",
      "startDate": "2025-10-02T00:00:00Z",
      "endDate": "2025-10-03T23:59:59Z",
      "location": {
        "@type": "Place",
        "name": "Mars vicinity, 18-30 million miles"
      }
    },
    {
      "@type": "CelestialBody", 
      "name": "3I/Atlas",
      "description": "Third confirmed interstellar visitor, active comet with exotic composition",
      "discoveryDate": "2025-07-01",
      "speed": "137000 mph",
      "age": "4.6-8 billion years"
    }
  ],
  "mainEntity": {
    "@type": "Organization",
    "name": "3I/Atlas Collection",
    "description": "Cosmic design collection celebrating interstellar visitors",
    "url": "https://3iatlas.com",
    "brand": [
      {
        "@type": "Brand",
        "name": "Mystic Arcana", 
        "url": "https://mysticarcana.com",
        "description": "Cosmic tarot, astrology, and 3I/Atlas oracle designs"
      },
      {
        "@type": "Brand",
        "name": "EDM Shuffle",
        "url": "https://edmshuffle.com", 
        "description": "Electronic dance music and cosmic rave designs"
      },
      {
        "@type": "Brand",
        "name": "BirthdayGen",
        "url": "https://birthdaygen.com",
        "description": "Cosmic celebration and interstellar birthday designs"
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "description": "3I/Atlas commemorative collection",
      "priceCurrency": "USD",
      "lowPrice": "12.99",
      "highPrice": "34.99",
      "availability": "https://schema.org/InStock"
    }
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "3I/Atlas Collection",
    "url": "https://3iatlas.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint", 
      "urlTemplate": "https://3iatlas.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default async function HomePage() {
  // Fetch products from API
  const allProducts = await getProducts();

  // Group products by brand for backward compatibility
  const products = {
    "3i_atlas": allProducts.filter((p: any) => p.brand === "3I/Atlas"),
    mystic_arcana: allProducts.filter((p: any) => p.brand === "Mystic Arcana"),
    edm_shuffle: allProducts.filter((p: any) => p.brand === "EDM Shuffle"),
    birthday_gen: allProducts.filter((p: any) => p.brand === "BirthdayGen"),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="min-h-screen bg-black text-white relative">
        <Header />
        <EnhancedHeroSection />

        {/* Strategic Hero Product Placement - Mars Flyby Exclusives */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <StrategicHeroShowcase />
          </div>
        </section>

        <HeroProductShowcase />
        <NewsSection products={allProducts} />

        {/* Inline Product Widget after News */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <InlineProductWidget context="hero" />
          </div>
        </section>

        <BrandSection />

        {/* Mystic Arcana Products */}
        <section className="py-16 px-4 bg-gradient-to-b from-purple-900/10 to-transparent">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Mystic Arcana
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Cosmic tarot, astrology, and mystical designs inspired by the
                3I/Atlas journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.mystic_arcana.slice(0, 3).map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
            {products.mystic_arcana.length > 3 && (
              <div className="text-center">
                <a
                  href="https://mysticarcana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  View All Mystic Arcana Products
                </a>
              </div>
            )}
          </div>
        </section>

        {/* EDM Shuffle Products */}
        <section className="py-16 px-4 bg-gradient-to-b from-blue-900/10 to-transparent">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                EDM Shuffle
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Electronic dance music and cosmic rave designs for the
                interstellar party
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.edm_shuffle.slice(0, 3).map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
            {products.edm_shuffle.length > 3 && (
              <div className="text-center">
                <a
                  href="https://edmshuffle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  View All EDM Shuffle Products
                </a>
              </div>
            )}
          </div>
        </section>

        {/* BirthdayGen Products */}
        <section className="py-16 px-4 bg-gradient-to-b from-pink-900/10 to-transparent">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                BirthdayGen
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Cosmic celebration and interstellar birthday designs for special
                moments
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.birthday_gen.slice(0, 3).map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
            {products.birthday_gen.length > 3 && (
              <div className="text-center">
                <a
                  href="https://birthdaygen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
                >
                  View All BirthdayGen Products
                </a>
              </div>
            )}
          </div>
        </section>

        {/* 3iAtlas Featured Products - Sprinkled throughout */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                3I/Atlas Collection
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Exclusive commemorative designs celebrating the historic Mars
                flyby
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products["3i_atlas"].slice(0, 3).map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>

        <OracleSection products={products["3i_atlas"].slice(3, 6)} />

        {/* Oracle-Related Product Showcase */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <InlineProductWidget context="oracle" />
          </div>
        </section>

        {/* More 3iAtlas Products - Strategic Placement */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-900/20 to-transparent">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-8">
              Mars Flyby Exclusives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products["3i_atlas"].slice(6, 10).map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>

        <AtlasTrajectorySimulator
          products={products["3i_atlas"].slice(10, 13)}
        />

        {/* Trajectory Product Showcase */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <TrajectoryProductShowcase />
          </div>
        </section>

        <EnhancedProductShowcase />

        {/* Full 3iAtlas Store - Complete Collection */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/30 to-black">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center">
              <h2 className="text-5xl font-bold text-white mb-6">
                Complete 3I/Atlas Store
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
                Explore our entire collection of commemorative designs
                celebrating the historic Mars flyby. From apparel to home decor,
                find the perfect way to commemorate this once-in-a-lifetime
                cosmic event.
              </p>
              <div className="flex justify-center gap-4 mb-12">
                <a
                  href="https://3iatlas.printify.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 transform"
                >
                  Visit Full Store
                </a>
                <a
                  href="#newsletter"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
                >
                  Get Updates
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products["3i_atlas"].map((product: any) => (
                <PrintifyProductCard
                  key={product.id}
                  product={product}
                  variant="default"
                />
              ))}
            </div>

            {products["3i_atlas"].length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-lg mb-4">
                  Loading products from Printify...
                </div>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              </div>
            )}
          </div>
        </section>
        <EnhancedFAQSection />
        <CTASection />
        <Footer />

        {/* Floating Product Recommendation */}
        <FloatingProductRecommendation />
      </main>
    </>
  );
}
