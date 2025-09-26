"use client"

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getImageUrl } from '@/lib/config'

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorBio: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  views: number
  likes: number
  featured?: boolean
  urgent?: boolean
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: '3I/Atlas Mars Flyby: A Once‑in‑a‑Lifetime Event',
    slug: '3i-atlas-mars-flyby-cosmic-event',
    excerpt:
      "On Oct 2–3, 2025, 3I/Atlas makes its closest approach to Mars. Spacecraft and observatories are poised to capture unprecedented data.",
    content: `The Mars flyby provides unique opportunities to study gravitational perturbations, coma evolution under increased irradiation, and interactions with the Martian environment.

Key goals:
- High‑cadence imaging of coma/tail morphology
- Spectroscopic sampling of volatiles (CO2, CO, H2O) and exotic species
- Photometry for rotational state and activity changes

NASA MRO and ESA Mars Express will coordinate with ground‑based sites for multi‑wavelength coverage.`,
    author: 'Dr. Sarah Chen',
    authorBio: 'Planetary Scientist, JPL',
    publishDate: '2025-10-02',
    readTime: '8 min read',
    category: 'Breaking News',
    tags: ['3I/Atlas', 'Mars Flyby', 'Interstellar', 'Astronomy'],
    image: getImageUrl('884e3d49-0e2a-4f80-99c5-81a793e02ac3'),
    views: 15420,
    likes: 1287,
    featured: true,
    urgent: true,
  },
  {
    id: 2,
    title: 'The Science of 3I/Atlas: Composition & Origins',
    slug: '3i-atlas-science-composition-origin',
    excerpt:
      'Spectroscopy suggests an unusual mix: dominant CO2, water ice, carbon monoxide, cyanides, atomic nickel, and carbonyl sulfide.',
    content: `Hubble/ground spectra reveal a composition distinct from typical solar‑system comets. Atomic nickel is especially intriguing, hinting at metal‑rich formation or unique thermal history.

Working hypotheses:
- Low‑temperature formation with abundant CO/CO2 ices
- Metal‑enriched source region or post‑formation processing
- Red coloration partially due to CN and complex organics`,
    author: 'Dr. Emily Zhang',
    authorBio: 'Director of Solar System Studies, MIT',
    publishDate: '2025-09-26',
    readTime: '12 min read',
    category: 'Scientific Analysis',
    tags: ['Spectroscopy', 'Comet Chemistry', 'Origins'],
    image: getImageUrl('34cace12-f036-40af-94d5-b8e0cca2f9c1'),
    views: 12567,
    likes: 987,
  },
  {
    id: 3,
    title: "Interstellar Visitors: 1I/'Oumuamua, 2I/Borisov, and 3I/Atlas",
    slug: 'interstellar-visitors-comparison',
    excerpt:
      "From 'Oumuamua’s enigmas to Borisov’s familiar behavior, 3I/Atlas adds a new chapter with active cometary traits and exotic chemistry.",
    content: `1I/'Oumuamua (2017) challenged expectations (non‑gravitational acceleration, no visible outgassing). 2I/Borisov (2019) behaved like a standard comet. 3I/Atlas (2025) combines cometary activity with unusual composition, expanding the known diversity of extrasolar small bodies.`,
    author: 'Alicia Romero',
    authorBio: 'Astrodynamics Researcher',
    publishDate: '2025-09-22',
    readTime: '10 min read',
    category: 'Historical Analysis',
    tags: ['History', 'Comparative Science'],
    image: getImageUrl('3e8deb50-06d0-440f-88c2-838f9f1b5903'),
    views: 9060,
    likes: 721,
  },
  {
    id: 4,
    title: 'How to Observe 3I/Atlas: Amateur Guide',
    slug: 'observe-3i-atlas-amateur-guide',
    excerpt:
      'Best windows, equipment suggestions, and safety tips to catch this once‑in‑a‑lifetime visitor before it departs forever.',
    content: `Recommended gear: 6‑inch or larger telescope, tracking mount, and a dark site. Use high‑contrast filters for tail visibility, and log observations for community science projects.`,
    author: 'Leo Martinez',
    authorBio: 'Citizen Science Coordinator',
    publishDate: '2025-09-18',
    readTime: '6 min read',
    category: 'Observer’s Guide',
    tags: ['Observation', 'Amateur Astronomy'],
    image: getImageUrl('18c61f33-c02e-4f50-892c-0f2d9f485a4b'),
    views: 6421,
    likes: 514,
  },
]

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const categories = useMemo(() => {
    const base = new Set<string>(['All'])
    for (const p of POSTS) base.add(p.category)
    return Array.from(base)
  }, [])

  const posts = useMemo(() => {
    return selectedCategory === 'All'
      ? POSTS
      : POSTS.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Interstellar News & Blog</h2>
          <div className="flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                className={`px-3 py-1 rounded-md text-sm border ${
                  selectedCategory === c ? 'bg-white text-black' : 'border-gray-700 text-gray-300'
                }`}
                onClick={() => {
                  setSelectedCategory(c)
                  setExpandedId(null)
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => {
            const isExpanded = expandedId === p.id
            return (
              <Card key={p.id} className="bg-gray-900/60 border-gray-700 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-600">{p.category}</Badge>
                    {p.featured && <Badge className="bg-cyan-600">Featured</Badge>}
                    {p.urgent && <Badge className="bg-red-600">Urgent</Badge>}
                  </div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.readTime} · {p.publishDate}</p>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <p className="text-gray-300 mb-3">{isExpanded ? p.content : p.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">By {p.author}</div>
                    <button
                      className="text-sm px-3 py-1 rounded-md border border-gray-700 hover:bg-gray-800"
                      onClick={() => setExpandedId(isExpanded ? null : p.id)}
                    >
                      {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
