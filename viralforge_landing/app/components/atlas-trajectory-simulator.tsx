"use client"

import { motion, useInView } from 'framer-motion'
import { useMemo, useState, useRef, useEffect } from 'react'
import { Star, Zap, Clock, Rocket } from 'lucide-react'

type MissionSnapshot = {
  label: string
  phase: number
  heliocentricDistanceAu: number
  geocentricDistanceAu: number
  velocityKmh: number
  tailLengthKm: number
  solarLongitude: number
}

// Mars flyby date - October 2, 2025
const MARS_FLYBY_DATE = new Date('2025-10-02T00:00:00Z')

const TIMELINE: MissionSnapshot[] = [
  {
    label: 'July 2025 • Discovery',
    phase: 0,
    heliocentricDistanceAu: 2.3,
    geocentricDistanceAu: 2.9,
    velocityKmh: 220000,
    tailLengthKm: 150000,
    solarLongitude: 215,
  },
  {
    label: 'Sept 2025 • Approach',
    phase: 25,
    heliocentricDistanceAu: 1.8,
    geocentricDistanceAu: 2.1,
    velocityKmh: 245000,
    tailLengthKm: 280000,
    solarLongitude: 255,
  },
  {
    label: 'Oct 2-3 • Mars Flyby',
    phase: 50,
    heliocentricDistanceAu: 1.55,
    geocentricDistanceAu: 1.74,
    velocityKmh: 265000,
    tailLengthKm: 360000,
    solarLongitude: 275,
  },
  {
    label: 'Oct 29 • Perihelion',
    phase: 75,
    heliocentricDistanceAu: 1.36,
    geocentricDistanceAu: 1.82,
    velocityKmh: 285000,
    tailLengthKm: 410000,
    solarLongitude: 298,
  },
  {
    label: 'Dec 2025 • Departure',
    phase: 100,
    heliocentricDistanceAu: 1.62,
    geocentricDistanceAu: 2.4,
    velocityKmh: 255000,
    tailLengthKm: 290000,
    solarLongitude: 330,
  },
]

// Calculate current mission phase based on date
function calculateCurrentPhase(): number {
  const now = new Date()
  const totalDuration = MARS_FLYBY_DATE.getTime() - new Date('2025-07-01').getTime()
  const elapsed = now.getTime() - new Date('2025-07-01').getTime()
  
  if (elapsed <= 0) return 0
  if (elapsed >= totalDuration) return 100
  
  return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
}

// Calculate time remaining until Mars flyby
function getTimeUntilMarsFlyby(): { days: number, hours: number, minutes: number, seconds: number } {
  const now = new Date()
  const diff = MARS_FLYBY_DATE.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds }
}

function interpolateSnapshot(phase: number): MissionSnapshot {
  if (phase <= 0) return TIMELINE[0]
  if (phase >= 100) return TIMELINE[TIMELINE.length - 1]

  const scaled = phase
  const nextIndex = TIMELINE.findIndex((entry) => entry.phase >= scaled)
  if (nextIndex <= 0) {
    return TIMELINE[nextIndex < 0 ? TIMELINE.length - 1 : nextIndex]
  }

  const prev = TIMELINE[nextIndex - 1]
  const next = TIMELINE[nextIndex]
  const span = next.phase - prev.phase
  const ratio = span === 0 ? 0 : (scaled - prev.phase) / span

  const lerp = (a: number, b: number) => a + (b - a) * ratio

  return {
    label: scaled <= prev.phase ? prev.label : next.label,
    phase: scaled,
    heliocentricDistanceAu: Number(lerp(prev.heliocentricDistanceAu, next.heliocentricDistanceAu).toFixed(2)),
    geocentricDistanceAu: Number(lerp(prev.geocentricDistanceAu, next.geocentricDistanceAu).toFixed(2)),
    velocityKmh: Math.round(lerp(prev.velocityKmh, next.velocityKmh)),
    tailLengthKm: Math.round(lerp(prev.tailLengthKm, next.tailLengthKm)),
    solarLongitude: Math.round(lerp(prev.solarLongitude, next.solarLongitude)),
  }
}

const METRIC_CARDS = [
  {
    title: 'Heliocentric Distance',
    format: (snapshot: MissionSnapshot) => `${snapshot.heliocentricDistanceAu.toFixed(2)} AU`,
    caption: 'Distance from the Sun',
  },
  {
    title: 'Earth Distance',
    format: (snapshot: MissionSnapshot) => `${snapshot.geocentricDistanceAu.toFixed(2)} AU`,
    caption: 'Range from Earth center',
  },
  {
    title: 'Velocity',
    format: (snapshot: MissionSnapshot) => `${snapshot.velocityKmh.toLocaleString()} km/h`,
    caption: 'Instantaneous frame velocity',
  },
  {
    title: 'Observed Tail Length',
    format: (snapshot: MissionSnapshot) => `${snapshot.tailLengthKm.toLocaleString()} km`,
    caption: 'Combined dust + ion tail',
  },
]

const EVENT_MARKERS = TIMELINE.map((entry) => ({
  label: entry.label,
  phase: entry.phase,
}))

export default function AtlasTrajectorySimulator() {
  const [timelinePhase, setTimelinePhase] = useState<number>(50)
  const [inclinationAdjust, setInclinationAdjust] = useState<number>(0)
  const [outgassingScale, setOutgassingScale] = useState<number>(1)
  const [timeUntilFlyby, setTimeUntilFlyby] = useState(getTimeUntilMarsFlyby())
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const snapshot = useMemo(() => interpolateSnapshot(timelinePhase), [timelinePhase])

  // Auto-update timeline phase based on current date
  useEffect(() => {
    if (!autoUpdate) return
    
    const updatePhase = () => {
      const currentPhase = calculateCurrentPhase()
      setTimelinePhase(currentPhase)
    }
    
    updatePhase()
    const interval = setInterval(updatePhase, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [autoUpdate])

  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilFlyby(getTimeUntilMarsFlyby())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const adjustedSolarLongitude = useMemo(() => {
    const adjustment = inclinationAdjust * 0.25
    return Math.round(snapshot.solarLongitude + adjustment)
  }, [snapshot, inclinationAdjust])

  const adjustedTail = useMemo(() => {
    const scaled = snapshot.tailLengthKm * outgassingScale
    return Math.round(scaled)
  }, [snapshot, outgassingScale])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-black via-[#050414] to-[#04040f] py-20 text-white">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(88,28,135,0.25),transparent_65%)]" />
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-purple-200"
            animate={isInView ? {
              boxShadow: ["0 0 5px rgba(192, 132, 252, 0.5)", "0 0 20px rgba(192, 132, 252, 0.8)", "0 0 5px rgba(192, 132, 252, 0.5)"]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-3 h-3 mr-2 text-purple-300" />
            Trajectory Laboratory
            <Star className="w-3 h-3 ml-2 text-purple-300" />
          </motion.span>
          <motion.h2
            className="text-3xl font-semibold md:text-4xl bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
            animate={isInView ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            } : {}}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Model the 3I/Atlas flightpath in real time
          </motion.h2>
          <motion.p
            className="text-base text-slate-200/80 md:text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Blend official ephemerides with Observatory tunables to explore how inclination and activity change the interstellar comet's encounter.
          </motion.p>
          
          {/* Mars Flyby Countdown */}
          <motion.div
            className="mt-6 p-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-300">Mars Flyby Countdown</h3>
              <Rocket className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex justify-center items-center gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-cyan-100">{timeUntilFlyby.days}</span>
                <span className="text-xs text-cyan-300">Days</span>
              </div>
              <span className="text-2xl text-cyan-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-cyan-100">{timeUntilFlyby.hours}</span>
                <span className="text-xs text-cyan-300">Hours</span>
              </div>
              <span className="text-2xl text-cyan-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-cyan-100">{timeUntilFlyby.minutes}</span>
                <span className="text-xs text-cyan-300">Minutes</span>
              </div>
              <span className="text-2xl text-cyan-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-cyan-100">{timeUntilFlyby.seconds}</span>
                <span className="text-xs text-cyan-300">Seconds</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-200">
                {autoUpdate ? 'Live tracking enabled' : 'Manual mode'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur"
            whileHover={{
              boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3), 0 8px 10px -6px rgba(139, 92, 246, 0.2)",
              borderColor: "rgba(139, 92, 246, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                {METRIC_CARDS.map((card, index) => (
                  <motion.div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-5 shadow-[0_20px_40px_rgba(15,15,45,0.35)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      y: -5,
                      borderColor: "rgba(139, 92, 246, 0.5)",
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-purple-200/70">{card.title}</p>
                    <motion.p
                      className="mt-2 text-xl font-semibold text-white"
                      animate={{
                        color: ["#ffffff", "#c084fc", "#ffffff"]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {card.format({ ...snapshot, tailLengthKm: adjustedTail })}
                    </motion.p>
                    <p className="text-xs text-slate-300/70 mt-1">{card.caption}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="flex items-center justify-between text-sm text-slate-200/70 mb-2">
                  <span>{TIMELINE[0].label}</span>
                  <span>{TIMELINE[TIMELINE.length - 1].label}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={timelinePhase}
                  onChange={(event) => setTimelinePhase(Number(event.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-white/50">
                  {EVENT_MARKERS.map((event) => (
                    <button
                      key={event.label}
                      type="button"
                      className={`rounded-full border px-3 py-1 transition ${
                        timelinePhase === event.phase
                          ? 'border-cyan-300 text-cyan-200'
                          : 'border-white/10 hover:border-cyan-200 hover:text-cyan-100'
                      }`}
                      onClick={() => {
                        setTimelinePhase(event.phase)
                        setAutoUpdate(false) // Switch to manual mode when user selects a phase
                      }}
                    >
                      {event.label.split(' • ')[0]}
                    </button>
                  ))}
                </div>
                
                {/* Auto-update toggle */}
                <div className="mt-4 flex items-center justify-center">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={autoUpdate}
                        onChange={(e) => setAutoUpdate(e.target.checked)}
                      />
                      <div className={`block w-14 h-7 rounded-full transition-colors ${
                        autoUpdate ? 'bg-cyan-500' : 'bg-gray-600'
                      }`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                        autoUpdate ? 'transform translate-x-7' : ''
                      }`}></div>
                    </div>
                    <div className="ml-3 text-sm text-cyan-200 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Live Updates
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-200/70">
                    <span>Inclination tweak</span>
                    <span>{inclinationAdjust}°</span>
                  </div>
                  <input
                    type="range"
                    min={-6}
                    max={6}
                    value={inclinationAdjust}
                    onChange={(event) => setInclinationAdjust(Number(event.target.value))}
                    className="mt-3 w-full accent-purple-500"
                  />
                  <p className="mt-3 text-xs text-slate-300/70">
                    Adjust the simulated inclination relative to the ecliptic plane to test observatory targeting windows.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-200/70">
                    <span>Outgassing multiplier</span>
                    <span>{outgassingScale.toFixed(1)}×</span>
                  </div>
                  <input
                    type="range"
                    min={0.6}
                    max={1.6}
                    step={0.1}
                    value={outgassingScale}
                    onChange={(event) => setOutgassingScale(Number(event.target.value))}
                    className="mt-3 w-full accent-purple-500"
                  />
                  <p className="mt-3 text-xs text-slate-300/70">
                    Scale tail length predictions by varying dust and gas production assumptions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Phase intel</h3>
              <p className="mt-2 text-sm text-slate-200/80">{snapshot.label}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300/80">
                <li>
                  <strong className="text-white">Solar longitude:</strong> {adjustedSolarLongitude}°
                </li>
                <li>
                  <strong className="text-white">Projected tail:</strong> {adjustedTail.toLocaleString()} km
                </li>
                <li>
                  <strong className="text-white">Perihelion ETA:</strong> 29 Oct 2025
                </li>
                <li>
                  <strong className="text-white">Mission note:</strong> Coordinate joint observations with Mars rover assets during the flyby window.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Observation checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300/80">
                <li>• Confirm JWST pointing request 7 days before perihelion.</li>
                <li>• Queue citizen-science imaging when outgassing multiplier {'>'} 1.2×.</li>
                <li>• Update merch drop schedule when velocity crosses 270,000 km/h.</li>
              </ul>
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  )
}
