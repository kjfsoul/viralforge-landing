import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const blueprintId = searchParams.get('blueprintId');
    
    if (!blueprintId) {
      return NextResponse.json(
        { success: false, error: 'blueprintId parameter is required' },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const printProviders = await service.getPrintProviders(parseInt(blueprintId));
    
    return NextResponse.json({ success: true, printProviders });
  } catch (error) {
    console.error('Error fetching print providers:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch print providers' 
      },
      { status: 500 }
    );
  }
}
