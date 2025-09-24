import { NextRequest, NextResponse } from 'next/server';
import { getPrintifyProductService } from '@/lib/printify-product-service';

export async function GET(request: NextRequest) {
  try {
    const service = getPrintifyProductService();
    const blueprints = await service.getBlueprints();
    
    return NextResponse.json({ success: true, blueprints });
  } catch (error) {
    console.error('Error fetching blueprints:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch blueprints' 
      },
      { status: 500 }
    );
  }
}
