import HomeClient from '@/components/home-client'
import { getAllProductsForBrand, type NormalizedProduct } from '@/lib/printify-live'
import { getLatestNews } from '@/lib/news'

type BrandKeys = '3iAtlas' | 'Mystic Arcana' | 'EDM Shuffle' | 'BirthdayGen'

export default async function Home({ searchParams }: { searchParams?: { live?: string } }) {
  const live = (searchParams?.live || '').toLowerCase() === 'true'

  const [atlasAll, mysticAll, edmAll, birthdayAll, newsArticles] = await Promise.all([
    getAllProductsForBrand('3iAtlas', { live }),
    getAllProductsForBrand('Mystic Arcana', { live }),
    getAllProductsForBrand('EDM Shuffle', { live }),
    getAllProductsForBrand('BirthdayGen', { live }),
    getLatestNews({ live }),
  ])

  const atlasFeaturedCount = atlasAll.length >= 4 ? 4 : atlasAll.length
  const atlasFeatured = atlasAll.slice(0, atlasFeaturedCount)
  const atlasRemainderCount = Math.max(atlasAll.length - atlasFeatured.length, 0)
  const atlasGrid = atlasAll.slice(0, 12)

  const brandProducts: Record<BrandKeys, NormalizedProduct[]> = {
    '3iAtlas': atlasAll.slice(atlasFeaturedCount, atlasFeaturedCount + 3),
    'Mystic Arcana': mysticAll.slice(0, 3),
    'EDM Shuffle': edmAll.slice(0, 3),
    'BirthdayGen': birthdayAll.slice(0, 3),
  }

  return (
    <HomeClient
      atlasFeatured={atlasFeatured}
      atlasRemainderCount={atlasRemainderCount}
      brandProducts={brandProducts}
      atlasGrid={atlasGrid}
      newsArticles={newsArticles}
    />
  )
}
