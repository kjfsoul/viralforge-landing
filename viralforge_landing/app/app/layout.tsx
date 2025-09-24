
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3I/Atlas Interstellar Collection | Cosmic Designs by Mystic Arcana, EDM Shuffle & BirthdayGen',
  description: 'Exclusive cosmic designs inspired by the mysterious 3I/Atlas interstellar visitor. Shop Mystic Arcana tarot & astrology, EDM Shuffle electronic music, and BirthdayGen celebration products.',
  keywords: '3I/Atlas, interstellar object, cosmic designs, tarot, astrology, electronic music, birthday cards, space art, mystic arcana, edm shuffle, birthday gen',
  openGraph: {
    title: '3I/Atlas Interstellar Collection | Cosmic Designs',
    description: 'Exclusive cosmic designs inspired by the mysterious 3I/Atlas interstellar visitor',
    url: 'https://3iatlas.com',
    siteName: '3I/Atlas Collection',
    images: [
      {
        url: 'https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png',
        width: 2752,
        height: 1536,
        alt: '3I/Atlas Interstellar Object Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3I/Atlas Interstellar Collection | Cosmic Designs',
    description: 'Exclusive cosmic designs inspired by the mysterious 3I/Atlas interstellar visitor',
    images: ['https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "3I/Atlas Interstellar Collection",
              "description": "Exclusive cosmic designs inspired by the mysterious 3I/Atlas interstellar visitor across three unique brands.",
              "url": "https://3iatlas.com",
              "mainEntity": {
                "@type": "Organization",
                "name": "3I/Atlas Collection",
                "description": "Cosmic design collection inspired by interstellar visitors",
                "brand": [
                  {
                    "@type": "Brand",
                    "name": "Mystic Arcana",
                    "description": "Cosmic tarot and astrology designs"
                  },
                  {
                    "@type": "Brand", 
                    "name": "EDM Shuffle",
                    "description": "Electronic dance music cosmic art"
                  },
                  {
                    "@type": "Brand",
                    "name": "BirthdayGen", 
                    "description": "Cosmic celebration and birthday cards"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
