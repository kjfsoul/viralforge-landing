"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  seed?: string;
  width?: number; // used for viewBox math only
  height?: number; // used for viewBox math only
  className?: string;
};

export default function FlightpathSimulator({
  seed = "default",
  width = 560,
  height = 220,
  className = "",
}: Props) {
  const prefersReduced = useReducedMotion();

  const { d, start, end } = useMemo(() => {
    const s = hash(seed);
    const x0 = 20,
      y0 = height - 30;
    const x1 = width - 30,
      y1 = 30;
    const cx = Math.round(width * (0.3 + (s % 40) / 200)); // 0.3–0.5W
    const cy = Math.round(height * (0.2 + (s % 30) / 200)); // 0.2–0.35H
    return {
      d: `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`,
      start: { x: x0, y: y0 },
      end: { x: x1, y: y1 },
    };
  }, [seed, width, height]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/20 ${className}`}
    >
      {/* IMPORTANT: no height="auto" on <svg>. Use CSS; SVG sized by viewBox + width 100%. */}
      <svg
        className="block h-auto w-full"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* path outline */}
        <motion.path
          d={d}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={2}
          initial={{ pathLength: prefersReduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: prefersReduced ? 0.2 : 1.2,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* craft dot using CSS Motion Path (works without SMIL) */}
      {prefersReduced ? (
        <div
          aria-label="Trajectory indicator"
          className="absolute h-2 w-2 rounded-full bg-white"
          style={{ left: 0, top: "50%", transform: "translateY(-50%)" }}
        />
      ) : (
        <>
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            style={
              {
                offsetPath: `path('${d}')`,
                WebkitOffsetPath: `path('${d}')`,
              } as React.CSSProperties
            }
          />
          {/* simple trailing particles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-white/40"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0.0, 0.6, 0.0] }}
              transition={{
                duration: 1.8,
                ease: "easeOut",
                repeat: Infinity,
                delay: i * 0.05,
              }}
              style={
                {
                  offsetPath: `path('${d}')`,
                  WebkitOffsetPath: `path('${d}')`,
                } as React.CSSProperties
              }
            />
          ))}
          {/* arrival pulse */}
          <motion.div
            className="absolute rounded-full bg-white/40"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${end.x - 2}px, ${end.y - 2}px)`,
            }}
            initial={{ width: 6, height: 6, opacity: 0.4, scale: 0.8 }}
            animate={{
              width: 18,
              height: 18,
              opacity: [0.4, 0.8, 0.4],
              scale: [0.8, 1.3, 1],
            }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
}

function hash(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
