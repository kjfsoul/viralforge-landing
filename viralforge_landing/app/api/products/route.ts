import { NextRequest, NextResponse } from 'next/server'
import { getAllProductsForBrand, type BrandName } from '@/lib/printify-live'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const brandParam = searchParams.get('brand') || ''
    const limit = Math.min(Math.max(Number(searchParams.get('limit')) || 3, 1), 50)
    const page = Math.max(Number(searchParams.get('page')) || 1, 1)
    const live = (searchParams.get('live') || '').toLowerCase() === 'true'

    const allowed: BrandName[] = ['3iAtlas', 'BirthdayGen', 'EDM Shuffle', 'Mystic Arcana']
    const match = allowed.find(b => b.toLowerCase() === brandParam.toLowerCase())
    if (!match) {
      return NextResponse.json(
        { success: false, error: 'brand must be one of 3iAtlas, BirthdayGen, EDM Shuffle, Mystic Arcana' },
        { status: 400 }
      )
    }

    const data = await getAllProductsForBrand(match, { limit, page, live })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create is not part of the storefront contract; rejecting explicitly
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Not supported' },
    { status: 405 }
  )
}
