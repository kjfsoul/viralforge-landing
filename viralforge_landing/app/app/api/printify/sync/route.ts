import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';
import { Product } from '@/lib/products-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      products, 
      shopId, 
      blueprintId, 
      printProviderId, 
      variantId 
    } = body;

    if (!products || !Array.isArray(products) || !shopId || !blueprintId || !printProviderId || !variantId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'products array, shopId, blueprintId, printProviderId, and variantId are required' 
        },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const results = await service.syncProducts(
      products as Product[],
      shopId,
      blueprintId,
      printProviderId,
      variantId
    );
    
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error syncing products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to sync products' 
      },
      { status: 500 }
    );
  }
}
