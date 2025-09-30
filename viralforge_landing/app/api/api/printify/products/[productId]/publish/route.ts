import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const revalidate = 0;

export async function POST(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { searchParams } = request.nextUrl;
    const shopId = searchParams.get('shopId');
    
    if (!shopId) {
      return NextResponse.json(
        { success: false, error: 'shopId parameter is required' },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const success = await service.publishProduct(shopId, params.productId);
    
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error publishing product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to publish product' 
      },
      { status: 500 }
    );
  }
}
