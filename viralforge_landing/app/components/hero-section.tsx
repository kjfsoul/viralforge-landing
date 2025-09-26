"use client"

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Rocket, Sparkles, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getHeroImageUrl } from '@/lib/config'

const HERO_STATS = [
  { label: 'Velocity', value: '137,000 mph', caption: 'Solar system traversal speed' },
  { label: 'Next Flyby', value: 'Oct 2-3 • Mars', caption: 'Closest approach window' },
  { label: 'Age', value: '≈4.6B years', caption: 'Estimated formation epoch' },
]

export default function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => setVisible(true), [])

  const heroImage = useMemo(() => getHeroImageUrl(), [])

  const scrollToBrands = () => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative overflow-hidden bg-[#050414] text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="3I/Atlas interstellar craft"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.35),rgba(5,4,20,0.9))]" />
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-28 pt-28 sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 md:grid-cols-2"
        >
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-purple-200">
              <Sparkles className="h-4 w-4" />
              Observatory Dispatch
            </span>

            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                <span className="block text-transparent bg-gradient-to-r from-purple-300 via-cyan-200 to-blue-200 bg-clip-text">
                  3I/ATLAS FLIGHTPATH
                </span>
                <span className="mt-2 block text-xl font-semibold text-purple-200 md:text-3xl">
                  Live drops from four Printify outposts
                </span>
              </h1>
            </div>

            <p className="max-w-xl text-base text-slate-200/90 md:text-lg">
              Track the cosmic merch convoy: every product here is streamed straight from Printify in real time, mapped to its brand hangar, and ready for launch.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {HERO_STATS.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left shadow-[0_10px_30px_rgba(24,17,75,0.35)]"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-200/70">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold text-white md:text-xl">{stat.value}</p>
                  {stat.caption && (
                    <p className="text-xs text-slate-200/70">{stat.caption}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={scrollToBrands}
                size="lg"
                className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500 px-8 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(168,85,247,0.45)] transition hover:scale-[1.02]"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Dive into the brands
              </Button>
              <Button
                onClick={() => window.open('#shop', '_self')}
                size="lg"
                variant="outline"
                className="border-cyan-300/60 bg-white/5 px-8 py-4 text-lg text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-500/10"
              >
                <Zap className="mr-2 h-5 w-5" />
                View live catalog
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[360px] w-[360px] max-w-full overflow-hidden rounded-full border border-purple-500/40 bg-gradient-to-br from-purple-900/30 via-black/40 to-cyan-900/10 shadow-[0_0_60px_rgba(59,130,246,0.35)]">
              <Image src={heroImage} alt="3I/Atlas craft" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
            </div>
            <div className="absolute -bottom-10 inset-x-0 mx-auto flex h-28 max-w-[460px] items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 backdrop-blur">
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Discovery</p>
                <p className="text-lg font-semibold text-white">July 1, 2025 • NASA ATLAS</p>
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-300/70">Trajectory</p>
                <p className="text-lg font-semibold text-white">Origin: Sagittarius Galactic Plane</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto flex items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            type="button"
            onClick={scrollToBrands}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Scroll for intel
            <ArrowDown className="h-4 w-4 transition group-hover:translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
