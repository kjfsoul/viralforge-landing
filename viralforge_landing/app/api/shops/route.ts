export const runtime = "nodejs";
import { NextResponse } from 'next/server'
import { assertRequiredEnv } from '@/lib/printify-live'

const PRINTIFY_API_BASE = 'https://api.printify.com/v1'

export async function GET() {
  try {
    assertRequiredEnv()
    const token = process.env.PRINTIFY_API_TOKEN as string
    const res = await fetch(`${PRINTIFY_API_BASE}/shops.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`Printify ${res.status}: ${body}`)
    }
    const json = await res.json()
    const data = Array.isArray(json) ? json : json?.data ?? []
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching shops:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shops' },
      { status: 500 }
    )
  }
}
