
import { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FullShopPage from '@/components/full-shop-page'

export const metadata: Metadata = {
  title: '3I/Atlas Complete Collection | All Cosmic Products',
  description: 'Browse our complete collection of 3I/Atlas cosmic products from Mystic Arcana, EDM Shuffle, and BirthdayGen. Find the perfect interstellar-inspired merchandise.',
  keywords: '3I/Atlas shop, cosmic products, Mystic Arcana, EDM Shuffle, BirthdayGen, interstellar merchandise, space gifts',
  openGraph: {
    title: '3I/Atlas Complete Collection | All Cosmic Products',
    description: 'Browse our complete collection of 3I/Atlas cosmic products from all our brands.',
    url: 'https://3iatlas.com/shop',
    siteName: '3I/Atlas Collection',
    images: [
      {
        url: 'https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png',
        width: 1200,
        height: 630,
        alt: '3I/Atlas Complete Product Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3I/Atlas Complete Collection | All Cosmic Products',
    description: 'Browse our complete collection of 3I/Atlas cosmic products from all our brands.',
    images: ['https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png'],
  },
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <FullShopPage />
      <Footer />
    </main>
  )
}
