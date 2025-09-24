import { getPrintifyProductService } from '@/lib/printify-product-service';
import { ProductsService } from '@/lib/products-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test Printify API connection
    const service = getPrintifyProductService();
    
    // Test 1: Get shops
    console.log('Testing Printify API connection...');
    const shops = await service.getShops();
    console.log('Shops found:', shops.length);
    
    // Test 2: Get blueprints
    const blueprints = await service.getBlueprints();
    console.log('Blueprints found:', blueprints.length);
    
    // Test 3: Get a sample product from CSV
    const productsService = ProductsService.getInstance();
    const csvProducts = await productsService.getProducts({ limit: 1 });
    
    if (csvProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Printify API connection successful, but no CSV products found to test with',
        shops: shops.length,
        blueprints: blueprints.length,
        csv_products: 0
      });
    }
    
    const sampleProduct = csvProducts[0];
    
    // Test 4: Try to upload an image (if product has images)
    let imageUploadTest = null;
    if (sampleProduct.images && sampleProduct.images.length > 0) {
      try {
        const imageId = await service.uploadImage(
          sampleProduct.images[0].url, 
          `${sampleProduct.title}.jpg`
        );
        imageUploadTest = { success: true, imageId };
      } catch (error) {
        imageUploadTest = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Printify API integration test completed',
      shops: shops.length,
      blueprints: blueprints.length,
      csv_products: csvProducts.length,
      sample_product: {
        title: sampleProduct.title,
        price: sampleProduct.price,
        has_images: sampleProduct.images && sampleProduct.images.length > 0
      },
      image_upload_test: imageUploadTest,
      next_steps: [
        'Set PRINTIFY_API_TOKEN environment variable',
        'Configure default shop ID',
        'Test product creation with a real product',
        'Test product publishing'
      ]
    });
    
  } catch (error) {
    console.error('Printify API test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Printify API test failed. Check your API token and configuration.',
        troubleshooting: [
          'Verify PRINTIFY_API_TOKEN is set correctly',
          'Check if the token has proper permissions',
          'Ensure network connectivity to api.printify.com',
          'Check console logs for detailed error information'
        ]
      },
      { status: 500 }
    );
  }
}
