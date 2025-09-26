"use client"

import { useMemo, useState } from 'react'

type MissionSnapshot = {
  label: string
  phase: number
  heliocentricDistanceAu: number
  geocentricDistanceAu: number
  velocityKmh: number
  tailLengthKm: number
  solarLongitude: number
}

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

  const snapshot = useMemo(() => interpolateSnapshot(timelinePhase), [timelinePhase])

  const adjustedSolarLongitude = useMemo(() => {
    const adjustment = inclinationAdjust * 0.25
    return Math.round(snapshot.solarLongitude + adjustment)
  }, [snapshot, inclinationAdjust])

  const adjustedTail = useMemo(() => {
    const scaled = snapshot.tailLengthKm * outgassingScale
    return Math.round(scaled)
  }, [snapshot, outgassingScale])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#050414] to-[#04040f] py-20 text-white">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(88,28,135,0.25),transparent_65%)]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 sm:px-10 lg:px-12">
        <div className="text-center space-y-4">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
            Trajectory Laboratory
          </span>
          <h2 className="text-3xl font-semibold md:text-4xl">Model the 3I/Atlas flightpath in real time</h2>
          <p className="text-base text-slate-200/80 md:text-lg">
            Blend official ephemerides with Observatory tunables to explore how inclination and activity change the interstellar comet’s encounter.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                {METRIC_CARDS.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-5 shadow-[0_20px_40px_rgba(15,15,45,0.35)]">
                    <p className="text-xs uppercase tracking-[0.3em] text-purple-200/70">{card.title}</p>
                    <p className="mt-2 text-xl font-semibold text-white">{card.format({ ...snapshot, tailLengthKm: adjustedTail })}</p>
                    <p className="text-xs text-slate-300/70 mt-1">{card.caption}</p>
                  </div>
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
                      onClick={() => setTimelinePhase(event.phase)}
                    >
                      {event.label.split(' • ')[0]}
                    </button>
                  ))}
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
        </div>
      </div>
    </section>
  )
}
