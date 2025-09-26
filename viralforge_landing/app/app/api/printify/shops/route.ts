import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const service = getPrintifyProductService();
    const shops = await service.getShops();
    
    return NextResponse.json({ success: true, shops });
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch shops' 
      },
      { status: 500 }
    );
  }
}
