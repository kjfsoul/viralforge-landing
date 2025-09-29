"use client"

import { useEffect, useState } from "react"

const KEY = "3iatlas.attunement.v1"

interface OracleResult {
  card: any;
  message: string;
}

export default function AttunementGate({ children }: { children: (state: {
  canFlip: boolean;
  result: OracleResult | null;
  loading: boolean;
  reveal: (survey?: any) => Promise<void>;
  skip: () => Promise<void>
}) => React.ReactNode }) {
  const [result, setResult] = useState<OracleResult | null>(null)
  const [canFlip, setCanFlip] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      try {
        const saved = JSON.parse(raw)
        if (saved?.result?.card?.id) {
          setResult(saved.result);
          setCanFlip(true)
        }
      } catch {}
    }
  }, [])

  async function reveal(survey?: any) {
    setLoading(true);
    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        body: JSON.stringify(survey || {}),
        headers: { "content-type": "application/json" }
      })
      const json = await res.json()
      setResult(json);
      setCanFlip(true)
      localStorage.setItem(KEY, JSON.stringify({ result: json, decidedAt: Date.now(), method: survey ? "survey":"skip" }))
    } finally {
      setLoading(false);
    }
  }

  async function skip() {
    await reveal(undefined)
  }

  return <>{children({ canFlip, result, loading, reveal, skip })}</>
}