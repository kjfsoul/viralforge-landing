import { config, getImageUrl, getShopUrl } from '@/lib/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cosmic Shop | 3I/Atlas',
  description: 'Explore our curated collections inspired by interstellar phenomena and cosmic energies',
  openGraph: {
    title: 'Cosmic Shop | 3I/Atlas',
    description: 'Explore our curated collections inspired by interstellar phenomena and cosmic energies',
    url: getShopUrl(),
    images: [
      {
        url: getImageUrl('8a9404c9-f529-4c66-a220-f04b902f9580'),
        width: 1200,
        height: 630,
        alt: '3I/Atlas Cosmic Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [getImageUrl('8a9404c9-f529-4c66-a220-f04b902f9580')],
  },
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      {/* Shop content would go here */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Cosmic Shop</h1>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Explore our curated collections inspired by interstellar phenomena and cosmic energies
        </p>
      </div>
    </div>
  )
}
