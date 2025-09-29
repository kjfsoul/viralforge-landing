"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useMemo } from "react"

export default function FlightpathSimulator({ seed = "default", width = 560, height = 220 }:{
  seed?: string; width?: number; height?: number
}) {
  const reduce = useReducedMotion()
  const { d, start, end } = useMemo(() => {
    const s = hash(seed)
    const x0 = 20, y0 = height - 30
    const x1 = width - 30, y1 = 30
    const cx = Math.round(width * (0.3 + (s % 40) / 200)) // 0.3–0.5W
    const cy = Math.round(height * (0.2 + (s % 30) / 200)) // 0.2–0.35H
    return {
      d: `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`,
      start: { x: x0, y: y0 },
      end: { x: x1, y: y1 },
    }
  }, [seed, width, height])

  return (
    <div className="rounded-xl border border-white/10 p-3">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto">
        <path d={d} stroke="currentColor" strokeOpacity="0.3" fill="none" />
        {/* craft */}
        <motion.circle r="5" fill="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0.4 : 1.8, ease: "easeInOut" }}
        >
          <animateMotion dur={reduce ? "0.4s" : "1.8s"} fill="freeze" path={d}/>
        </motion.circle>
        {/* arrival pulse */}
        {!reduce && (
          <motion.circle cx={end.x} cy={end.y} r="6" stroke="currentColor" fill="none"
            initial={{ scale: 0.6, opacity: 0.0 }}
            animate={{ scale: [0.6, 1.2, 1], opacity: [0.0, 0.8, 0.0] }}
            transition={{ duration: 0.6 }}
          />
        )}
        {/* simple particles */}
        {!reduce && Array.from({ length: 12 }).map((_, i) => (
          <motion.circle key={i} r="2" fill="currentColor" opacity={0.25}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: i * 0.03, ease: "easeOut" }}
          >
            <animateMotion dur="1.8s" path={d} keyPoints="0;0.9" keyTimes="0;1" calcMode="linear" />
          </motion.circle>
        ))}
      </svg>
    </div>
  )
}

function hash(s: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}