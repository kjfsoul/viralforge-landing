
import { NextResponse } from 'next/server'
import { printifyClient } from '@/lib/printify'

export async function GET() {
  try {
    const shops = await printifyClient.getShops()
    return NextResponse.json({ success: true, data: shops })
  } catch (error) {
    console.error('Error fetching shops:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shops' },
      { status: 500 }
    )
  }
}
