import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';
import { Product } from '@/lib/products-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get('shopId');
    
    if (!shopId) {
      return NextResponse.json(
        { success: false, error: 'shopId parameter is required' },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const products = await service.getProducts(shopId);
    
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch products' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      product, 
      shopId, 
      blueprintId, 
      printProviderId, 
      variantId,
      imageId 
    } = body;

    if (!product || !shopId || !blueprintId || !printProviderId || !variantId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'product, shopId, blueprintId, printProviderId, and variantId are required' 
        },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const printifyProduct = await service.createProduct(
      product as Product,
      shopId,
      blueprintId,
      printProviderId,
      variantId,
      imageId
    );
    
    return NextResponse.json({ success: true, product: printifyProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create product' 
      },
      { status: 500 }
    );
  }
}
