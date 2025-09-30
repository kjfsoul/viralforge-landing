import { NextRequest, NextResponse } from 'next/server'
import { exportCsvForAllFourShops } from '@/lib/printify-live'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(_req: NextRequest) {
  try {
    const csv = await exportCsvForAllFourShops()
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="printify_catalog.csv"',
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Export failed'
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}
