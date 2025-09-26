import { NextRequest, NextResponse } from 'next/server'
import { clearCache, type BrandName } from '@/lib/printify-live'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const brandParam = searchParams.get('brand') || ''
  const allowed: BrandName[] = ['3iAtlas', 'BirthdayGen', 'EDM Shuffle', 'Mystic Arcana']
  const match = allowed.find(b => b.toLowerCase() === brandParam.toLowerCase())
  clearCache(match)
  return NextResponse.json({ success: true, brand: match || 'all' })
}
