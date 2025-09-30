
import { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import BlogSection from '@/components/blog-section'

export const metadata: Metadata = {
  title: '3I/Atlas Interstellar News & Blog | Cosmic Collection',
  description: 'Latest breaking news, scientific discoveries, and updates about 3I/Atlas interstellar visitor. Mars flyby coverage, perihelion countdown, and cosmic insights.',
  keywords: '3I/Atlas, interstellar object, Mars flyby, perihelion, space news, astronomy blog, cosmic discoveries',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <BlogSection />
      <Footer />
    </main>
  )
}
