
import { NextResponse } from 'next/server'

export async function GET() {
  console.log('🔥 TEST ENDPOINT CALLED!')
  return NextResponse.json({ test: 'working', timestamp: new Date().toISOString() })
}
