import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blueprintId = searchParams.get('blueprintId');
    const printProviderId = searchParams.get('printProviderId');
    
    if (!blueprintId || !printProviderId) {
      return NextResponse.json(
        { success: false, error: 'blueprintId and printProviderId parameters are required' },
        { status: 400 }
      );
    }

    const service = getPrintifyProductService();
    const variants = await service.getVariants(parseInt(blueprintId), parseInt(printProviderId));
    
    return NextResponse.json({ success: true, variants });
  } catch (error) {
    console.error('Error fetching variants:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch variants' 
      },
      { status: 500 }
    );
  }
}
