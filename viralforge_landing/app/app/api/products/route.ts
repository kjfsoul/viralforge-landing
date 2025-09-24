import { ProductsService } from "@/lib/products-service";
import { getPrintifyProductService } from "@/lib/printify-product-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const featured = searchParams.get("featured") === "true";
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const context = searchParams.get("context"); // oracle, trajectory, hero, etc.
    const limitParam = searchParams.get("limit");
    const syncPrintify = searchParams.get("sync_printify") === "true";
    const explicitLimit = limitParam
      ? Math.max(1, Math.min(100, parseInt(limitParam)))
      : undefined;

    // Get products service instance
    const productsService = ProductsService.getInstance();

    // Get filtered products
    const products = await productsService.getProducts({
      featured,
      brand: brand || undefined,
      category: category || undefined,
      context: context || undefined,
      limit: explicitLimit,
    });

    // If sync_printify is requested, sync products to Printify
    if (syncPrintify) {
      try {
        const printifyService = getPrintifyProductService();
        const shops = await printifyService.getShops();
        
        if (shops.length > 0) {
          const defaultShopId = shops[0].id;
          const { PRINTIFY_BLUEPRINTS, PRINTIFY_PRINT_PROVIDERS, PRINTIFY_VARIANTS } = await import('@/lib/printify-config');
          
          // Sync products to Printify
          const syncResults = await printifyService.syncProducts(
            products,
            defaultShopId,
            PRINTIFY_BLUEPRINTS.TSHIRT,
            PRINTIFY_PRINT_PROVIDERS.GILDAN,
            PRINTIFY_VARIANTS.TSHIRT_M
          );
          
          console.log('Printify sync results:', syncResults);
        }
      } catch (printifyError) {
        console.warn('Printify sync failed:', printifyError);
        // Continue with normal response even if Printify sync fails
      }
    }

    // Determine limit for response
    const limit = explicitLimit ?? (featured ? 12 : context ? 6 : 50);

    return NextResponse.json({
      success: true,
      data: products.slice(0, limit),
      total: products.length,
      store_url: "https://3iatlas.printify.me",
      context: context || "general",
      printify_synced: syncPrintify,
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        data: [],
        store_url: "https://3iatlas.printify.me",
      },
      { status: 500 }
    );
  }
}
