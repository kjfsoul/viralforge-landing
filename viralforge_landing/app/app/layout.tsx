import { config, getImageUrl, getSiteUrl } from '@/lib/config'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: '3I/Atlas - Humanity\'s Third Interstellar Visitor',
    template: '%s | 3I/Atlas'
  },
  description: 'Commemorate humanity\'s third interstellar visitor with our exclusive collection. Each product captures a moment in 3I/Atlas\'s historic journey through our solar system.',
  keywords: ['3I/Atlas', 'interstellar', 'comet', 'space', 'cosmic', 'astronomy', 'science'],
  authors: [{ name: '3I/Atlas Team' }],
  openGraph: {
    title: '3I/Atlas - Humanity\'s Third Interstellar Visitor',
    description: 'Commemorate humanity\'s third interstellar visitor with our exclusive collection.',
    url: getSiteUrl(),
    siteName: '3I/Atlas',
    images: [
      {
        url: getImageUrl('f6796e88-78f4-4b81-8d60-730d45ee1fd5'),
        width: 1200,
        height: 630,
        alt: '3I/Atlas Interstellar Journey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [getImageUrl('f6796e88-78f4-4b81-8d60-730d45ee1fd5')],
    title: '3I/Atlas - Humanity\'s Third Interstellar Visitor',
    description: 'Commemorate humanity\'s third interstellar visitor with our exclusive collection.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#6366f1' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <link rel="preconnect" href={config.imageCdn.baseUrl} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
