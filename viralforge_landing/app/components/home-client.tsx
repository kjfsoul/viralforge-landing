"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BrandSection from '@/components/brand-section'
import AtlasGrid from '@/components/atlas-grid'
import HeroSection from '@/components/hero-section'
import HeroProductShowcase from '@/components/hero-product-showcase'
import AtlasTrajectorySimulator from '@/components/atlas-trajectory-simulator'
import NewsSection from '@/components/news-section'
import OracleSection from '@/components/oracle-section'
import OracleSurvey from '@/components/oracle-survey'
import OracleReading from '@/components/oracle-reading'
import OracleProductWidget from '@/components/oracle-product-widget'
import EnhancedFAQSection from '@/components/enhanced-faq-section'
import CTASection from '@/components/cta-section'
import StrategicProductPlacements from '@/components/strategic-product-placements'
import { ORACLE_CARDS, type OracleCard } from '@/lib/oracle-cards'
import { getHeroImageUrl, getOracleImageUrls } from '@/lib/config'
import type { NormalizedProduct } from '@/lib/printify-live'
import type { Product } from '@/lib/types'
import type { NewsArticle } from '@/lib/news'

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
  newsArticles: NewsArticle[]
}

type OracleReadingResult = {
  card: OracleCard
  personalizedMessage: string
  spookyInsight?: string
  userName?: string
}

type SurveyPayload = {
  name: string
  email: string
  birthMonth: string
  currentFocus: string
  energyLevel: string
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

export default function HomeClient({ atlasFeatured, atlasRemainderCount, brandProducts, atlasGrid, newsArticles }: Props) {
  const { oracleCards, oracleImageMap } = useMemo(() => {
    const heroImage = getHeroImageUrl()
    const oracleImages = getOracleImageUrls()

    const map = new Map<number, string>()
    const cards = ORACLE_CARDS.map((card, index) => {
      let resolved = heroImage
      if (card.image.includes('getOracleImageUrls')) {
        const match = card.image.match(/\[(\d+)\]/)
        const idx = match ? Number(match[1]) : index
        resolved = oracleImages[idx % oracleImages.length] ?? heroImage
      } else if (card.image.includes('getHeroImageUrl')) {
        resolved = heroImage
      } else if (card.image) {
        resolved = card.image
      }

      map.set(card.id, resolved)
      return { ...card, image: resolved }
    })

    return { oracleCards: cards, oracleImageMap: map }
  }, [])

  const [selectedCard, setSelectedCard] = useState<OracleCard>(oracleCards[0])
  const [oracleResult, setOracleResult] = useState<OracleReadingResult | null>(null)
  const [oracleLoading, setOracleLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])

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
  }, [atlasGrid, brandProducts])

  const legacyProducts = useMemo(() => allSummaries.map(mapNormalizedToProduct), [allSummaries])

  const heroProducts = useMemo(() => atlasFeatured.map(mapNormalizedToProduct), [atlasFeatured])
const oracleProducts = useMemo(
  () => legacyProducts.filter(product => product.brand === 'Mystic Arcana' || product.brand === '3I/Atlas').slice(0, 2),
  [legacyProducts]
)

const strategicProducts = useMemo(() => {
  // Get a mix of products from all brands for strategic placements
  const strategicSelection: NormalizedProduct[] = []
  
  // Add 1-2 featured products from each brand
  Object.entries(brandProducts).forEach(([brand, products]) => {
    const featured = products.filter(p => p.tags?.includes('featured')).slice(0, 2)
    if (featured.length === 0) {
      // If no featured products, take the first 1-2 products
      strategicSelection.push(...products.slice(0, Math.min(2, products.length)))
    } else {
      strategicSelection.push(...featured)
    }
  })
  
  // Add some additional products from the atlas grid for variety
  const atlasExtras = atlasGrid.filter(p => !strategicSelection.find(sp => sp.id === p.id)).slice(0, 3)
  strategicSelection.push(...atlasExtras)
  
  return strategicSelection.slice(0, 6) // Limit to 6 products for strategic placement
}, [brandProducts, atlasGrid])

  const resolveOracleCard = useCallback((card: OracleCard): OracleCard => ({
    ...card,
    image: oracleImageMap.get(card.id) ?? card.image,
  }), [oracleImageMap])

  const loadDefaultOracleReading = useCallback(async () => {
    try {
      const response = await fetch('/api/oracle')
      if (!response.ok) return
      const payload = await response.json()
      if (!payload?.success) return

      const card = resolveOracleCard(payload.data.card)
      setOracleResult({
        card,
        personalizedMessage: payload.data.personalizedMessage,
        spookyInsight: payload.data.spookyInsight,
        userName: payload.data.userName,
      })
      setSelectedCard(card)
    } catch (error) {
      console.error('Failed to load initial oracle reading', error)
    }
  }, [resolveOracleCard])

  useEffect(() => {
    loadDefaultOracleReading()
  }, [loadDefaultOracleReading])

  const handleSurveyComplete = useCallback(async (data: SurveyPayload) => {
    setOracleLoading(true)
    try {
      const response = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = await response.json()
      if (payload?.success) {
        const card = resolveOracleCard(payload.data.card)
        setOracleResult({
          card,
          personalizedMessage: payload.data.personalizedMessage,
          spookyInsight: payload.data.spookyInsight,
          userName: payload.data.userName,
        })
        setSelectedCard(card)
      }
    } catch (error) {
      console.error('Failed to complete oracle survey', error)
    } finally {
      setOracleLoading(false)
    }
  }, [resolveOracleCard])

  const handleSurveySkip = useCallback(async () => {
    setOracleLoading(true)
    try {
      await loadDefaultOracleReading()
    } finally {
      setOracleLoading(false)
    }
  }, [loadDefaultOracleReading])

  const handleCardSelect = useCallback((cardSummary: { id: number }) => {
    const card = oracleCards.find(entry => entry.id === cardSummary.id)
    if (!card) return
    setSelectedCard(card)
    setOracleResult(prev => prev ? { ...prev, card } : prev)

    window.setTimeout(() => {
      document.getElementById('oracle-survey')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [oracleCards])

  const readingCard = oracleResult?.card ?? selectedCard
  const readingMessage = oracleLoading
    ? 'The Oracle is attuning to your energy...'
    : oracleResult?.personalizedMessage ?? 'Select a card and complete the attunement to receive your personalized message.'

  const oracleCardsForSection = useMemo(() => oracleCards.map(card => ({
    id: card.id,
    title: card.title,
    name: card.name,
    description: card.meaning,
  })), [oracleCards])

  return (
    <div className="min-h-screen bg-[#030314] text-white">
      <Header />
      <main className="bg-gradient-to-b from-[#050414] via-[#060818] to-black">
        <HeroSection />
        <NewsSection articles={newsArticles} />
        {heroProducts.length > 0 && (
          <HeroProductShowcase products={heroProducts} remainderCount={atlasRemainderCount} />
        )}
        <BrandSection initial={brandProducts} />
        <AtlasTrajectorySimulator />
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
          <OracleSection
            title="3I/Atlas Oracle Deck"
            description="Choose a card, share your energy, and receive a custom reading generated by our interstellar Oracle."
            cards={oracleCardsForSection}
            onCardSelect={handleCardSelect}
          />
          <div className="container mx-auto px-4 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="oracle-survey">
              <OracleSurvey
                onComplete={handleSurveyComplete}
                onSkip={handleSurveySkip}
              />
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
                {oracleResult?.spookyInsight && (
                  <div className="bg-black/70 border border-purple-500/30 rounded-xl p-4 text-purple-100">
                    <h4 className="text-lg font-semibold mb-2">Spooky Insight</h4>
                    <p className="text-sm leading-relaxed">{oracleResult.spookyInsight}</p>
                  </div>
                )}
              </div>
            </div>
            <OracleProductWidget products={oracleProducts} />
          </div>
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
