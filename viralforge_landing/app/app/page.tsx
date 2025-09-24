
// import products from '@/data/products.json'; // Removed - using API instead
import { Metadata } from 'next'
import EnhancedHeroSection from '@/components/enhanced-hero-section'
import HeroProductShowcase from '@/components/hero-product-showcase'
import BrandSection from '@/components/brand-section'
import NewsSection from '@/components/news-section'
import OracleSection from '@/components/oracle-section'
import AtlasTrajectorySimulator from '@/components/atlas-trajectory-simulator'
import EnhancedProductShowcase from '@/components/enhanced-product-showcase'
import EnhancedFAQSection from '@/components/enhanced-faq-section'
import CTASection from '@/components/cta-section'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { 
  HeroProductShowcase as StrategicHeroShowcase,
  MysticArcanaShowcase,
  EDMShuffleShowcase,
  BirthdayGenShowcase,
  TrajectoryProductShowcase
} from '@/components/strategic-product-placements'
import { FloatingProductRecommendation, InlineProductWidget } from '@/components/inline-product-widgets'

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
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
        <NewsSection />
        
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
            <h2 className="text-3xl font-bold text-center">Mystic Arcana</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.mystic_arcana.slice(0, 3).map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4" />
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDM Shuffle Products */}
        <section className="py-16 px-4 bg-gradient-to-b from-blue-900/10 to-transparent">
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-3xl font-bold text-center">EDM Shuffle</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.edm_shuffle.slice(0, 3).map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4" />
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BirthdayGen Products */}
        <section className="py-16 px-4 bg-gradient-to-b from-pink-900/10 to-transparent">
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-3xl font-bold text-center">BirthdayGen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.birthday_gen.slice(0, 3).map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4" />
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3iAtlas Products */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-3xl font-bold text-center">3iAtlas Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {products["3i_atlas"].map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4" />
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OracleSection products={products["3i_atlas"].slice(6, 9)} />
        
        {/* Oracle-Related Product Showcase */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <InlineProductWidget context="oracle" />
          </div>
        </section>

        <AtlasTrajectorySimulator products={products["3i_atlas"].slice(9, 12)} />
        
        {/* Trajectory Product Showcase */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <TrajectoryProductShowcase />
          </div>
        </section>

        <EnhancedProductShowcase />

        {/* Remaining 3iAtlas Products */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-3xl font-bold text-center">More from 3iAtlas</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {products["3i_atlas"].slice(12).map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  <img src={product.image_url} alt={product.title} className="w-full h-64 object-cover mb-4" />
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="text-gray-400">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <EnhancedFAQSection />
        <CTASection />
        <Footer />
        
        {/* Floating Product Recommendation */}
        <FloatingProductRecommendation />
      </main>
    </>
  )
}
