
import { Metadata } from 'next'
import SocialMediaContent from '@/components/social-media-content'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Viral Social Media Content | 3I/Atlas Marketing Kit | 3I/ATLAS OBSERVATORY',
  description: 'Ready-to-use viral social media content for 3I/Atlas interstellar visitor. TikTok scripts, Instagram stories, Twitter threads, Reddit posts, and YouTube concepts.',
  keywords: 'viral content, social media marketing, 3I/Atlas, TikTok scripts, Instagram content, Twitter threads, Reddit posts, YouTube videos',
}

export default function SocialPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <SocialMediaContent />
      </div>
      <Footer />
    </main>
  )
}
