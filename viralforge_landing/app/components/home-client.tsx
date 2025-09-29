"use client"

import { useMemo } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BrandSection from '@/components/brand-section'
import AtlasGrid from '@/components/atlas-grid'
import HeroSection from '@/components/hero-section'
import HeroProductShowcase from '@/components/hero-product-showcase'
import FlightpathSimulator from '@/components/FlightpathSimulator'
import LatestArticles from '@/components/LatestArticles'
import OracleSection from '@/components/oracle-section'
import OracleSurvey from '@/components/oracle-survey'
import OracleReading from '@/components/oracle-reading'
import OracleProductWidget from '@/components/oracle-product-widget'
import EnhancedFAQSection from '@/components/enhanced-faq-section'
import CTASection from '@/components/cta-section'
import StrategicProductPlacements from '@/components/strategic-product-placements'
import AttunementGate from '@/components/AttunementGate'
import { ORACLE_CARDS } from '@/lib/oracle-cards'
import type { NormalizedProduct } from '@/lib/printify-live'
import type { Product } from '@/lib/types'

const BRAND_LABEL_MAP: Record<string, string> = {
  '3iatlas': '3I/Atlas',
  '3i/atlas': '3I/Atlas',
  '3i-atlas': '3I/Atlas',
  '3i atlas': '3I/Atlas',
  'mystic arcana': 'Mystic Arcana',
  'edm shuffle': 'EDM Shuffle',
  'birthdaygen': 'BirthdayGen',
}

type BrandMap = Record<'3iAtlas' | 'Mystic Arcana' | 'EDM Shuffle' | 'BirthdayGen', NormalizedProduct[]>

type Props = {
  atlasFeatured: NormalizedProduct[]
  atlasRemainderCount: number
  brandProducts: BrandMap
  atlasGrid: NormalizedProduct[]
}

function prettifyBrand(brand: string): string {
  const key = brand?.toLowerCase?.() ?? ''
  return BRAND_LABEL_MAP[key] ?? brand
}

function mapNormalizedToProduct(item: NormalizedProduct): Product {
  const brand = prettifyBrand(item.brand)
  const defaultCents = typeof item.default_price_cents === 'number'
    ? item.default_price_cents
    : typeof item.price_min_cents === 'number'
      ? item.price_min_cents
      : typeof item.price_min === 'number'
        ? Math.round(item.price_min * 100)
        : 0

  const priceMinCents = typeof item.price_min_cents === 'number'
    ? item.price_min_cents
    : typeof item.price_min === 'number'
      ? Math.round(item.price_min * 100)
      : null

  const images = (item.images?.length ? item.images : [])
  const fallbackImage = item.first_image_url
  const imagePayload = images.length
    ? images
    : fallbackImage
      ? [{ id: '0', url: fallbackImage }]
      : []

  const statusTag = item.tags?.find(tag => /limited|drop|exclusive/i.test(tag))

  return {
    id: item.id,
    title: item.title,
    description: item.short_description || item.description,
    brand,
    category: item.tags?.[0] ?? brand,
    price: priceMinCents ?? defaultCents,
    images: imagePayload,
    printify_url: item.storefront_product_url ?? '#',
    status: statusTag ?? 'Available',
    urgent: item.tags?.some(tag => /urgent|flash/i.test(tag)) ?? false,
    featured: item.tags?.some(tag => /featured|spotlight/i.test(tag)) ?? false,
    tags: item.tags ?? [],
    price_min: priceMinCents,
    price_max: null,
    storefront_product_url: item.storefront_product_url,
    short_description: item.short_description,
  }
}

export default function HomeClient({ atlasFeatured, atlasRemainderCount, brandProducts, atlasGrid }: Props) {
  const allSummaries = useMemo(() => {
    const seen = new Set<string>()
    const merged: NormalizedProduct[] = []
    const pushItems = (items: NormalizedProduct[]) => {
      items.forEach(item => {
        if (!item || seen.has(item.id)) return
        seen.add(item.id)
        merged.push(item)
      })
    }
    pushItems(atlasFeatured)
    pushItems(atlasGrid)
    Object.values(brandProducts).forEach(pushItems)
    return merged
  }, [atlasGrid, atlasFeatured, brandProducts])

  const legacyProducts = useMemo(() => allSummaries.map(mapNormalizedToProduct), [allSummaries])
  const heroProducts = useMemo(() => atlasFeatured.map(mapNormalizedToProduct), [atlasFeatured])
  const oracleProducts = useMemo(
    () => legacyProducts.filter(product => product.brand === 'Mystic Arcana' || product.brand === '3I/Atlas').slice(0, 2),
    [legacyProducts]
  )
  const strategicProducts = useMemo(() => {
    const strategicSelection: NormalizedProduct[] = []
    Object.entries(brandProducts).forEach(([_, products]) => {
      const featured = products.filter(p => p.tags?.includes('featured')).slice(0, 2)
      if (featured.length === 0) {
        strategicSelection.push(...products.slice(0, Math.min(2, products.length)))
      } else {
        strategicSelection.push(...featured)
      }
    })
    const atlasExtras = atlasGrid.filter(p => !strategicSelection.find(sp => sp.id === p.id)).slice(0, 3)
    strategicSelection.push(...atlasExtras)
    return strategicSelection.slice(0, 6)
  }, [brandProducts, atlasGrid])

  const oracleCardsForSection = useMemo(() => ORACLE_CARDS.map(card => ({
    id: card.id,
    title: card.title,
    name: card.name,
    description: card.meaning,
  })), [])

  return (
    <div className="min-h-screen bg-[#030314] text-white">
      <Header />
      <main className="bg-gradient-to-b from-[#050414] via-[#060818] to-black">
        <HeroSection />
        <LatestArticles />
        {heroProducts.length > 0 && (
          <HeroProductShowcase products={heroProducts} remainderCount={atlasRemainderCount} />
        )}
        <BrandSection />
        <FlightpathSimulator seed="viral-forge-landing-page" />
        {strategicProducts.length > 0 && (
          <StrategicProductPlacements
            title="Featured Collection"
            description="Discover our handpicked selection of premium products from across all brands"
            products={strategicProducts.map(p => ({
              id: p.id,
              name: p.title,
              description: p.short_description || p.description,
              price: p.default_price_cents || p.price_min_cents || 0,
              imageUrl: p.first_image_url || p.images?.[0]?.url || ''
            }))}
          />
        )}
        <section id="oracle" className="py-16 bg-gradient-to-br from-purple-900/10 via-black/5 to-indigo-900/10">
          <AttunementGate>
            {({ canFlip, result, loading, reveal, skip }) => {
              const defaultCard = ORACLE_CARDS.find(c => c.name === "The Interstellar Journey") ?? ORACLE_CARDS[0];
              const readingCard = result?.card ?? defaultCard;
              const readingMessage = loading ? 'The Oracle is attuning to your energy...' : (result?.message ?? 'Complete the attunement to receive your personalized message.');

              return (
                <>
                  <OracleSection
                    title="3I/Atlas Oracle Deck"
                    description="Choose a card, share your energy, and receive a custom reading generated by our interstellar Oracle."
                    cards={oracleCardsForSection}
                    onCardSelect={() => {}}
                    isGated={!canFlip}
                  />
                  <div className="container mx-auto px-4 mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="oracle-survey">
                      {!canFlip ? (
                        <OracleSurvey onComplete={reveal} onSkip={skip} />
                      ) : (
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-cyan-300">Attunement Complete</h3>
                          <p className="text-gray-300">Your path has been illuminated. The Oracle has spoken.</p>
                        </div>
                      )}
                      <div className="space-y-6">
                        <OracleReading
                          card={{
                            id: readingCard.id,
                            title: readingCard.title,
                            name: readingCard.name,
                            description: readingCard.meaning,
                            image: readingCard.image,
                          }}
                          personalizedMessage={readingMessage}
                        />
                      </div>
                    </div>
                    <OracleProductWidget products={oracleProducts} />
                  </div>
                </>
              )
            }}
          </AttunementGate>
        </section>
        <AtlasGrid initialItems={atlasGrid} />
        <section className="py-16 bg-white" id="faq">
          <div className="container mx-auto px-4">
            <EnhancedFAQSection />
          </div>
        </section>
        {strategicProducts.length > 0 && (
          <StrategicProductPlacements
            title="Complete Your Collection"
            description="Explore more products that complement your journey through the cosmos"
            products={strategicProducts.slice(0, 3).map(p => ({
              id: p.id,
              name: p.title,
              description: p.short_description || p.description,
              price: p.default_price_cents || p.price_min_cents || 0,
              imageUrl: p.first_image_url || p.images?.[0]?.url || ''
            }))}
          />
        )}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}