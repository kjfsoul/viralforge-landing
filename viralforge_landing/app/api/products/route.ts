import { ProductsService } from "@/lib/products-service";
import { NextResponse } from "next/server";

interface GetParams {
  featured: boolean;
  brand?: string;
  category?: string;
  context?: string;
  limit?: number;
  live: boolean;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const brand = searchParams.get("brand") || undefined;
    const category = searchParams.get("category") || undefined;
    const context = searchParams.get("context") || undefined;
    const limitParam = searchParams.get("limit");
    const live = searchParams.get("live") === "true";

    const limit = limitParam
      ? Math.max(1, Math.min(100, parseInt(limitParam)))
      : undefined;

    const params: GetParams = {
      featured,
      brand,
      category,
      context,
      limit,
      live,
    };

    const productsService = ProductsService.getInstance();

    const products = params.live
      ? await productsService.refreshFromPrintify()
      : await productsService.getProducts({
          featured: params.featured,
          brand: params.brand,
          category: params.category,
          context: params.context,
          limit: params.limit,
        });

    const appliedLimit =
      params.limit ?? (params.featured ? 12 : params.context ? 6 : 50);

    return NextResponse.json(
      {
        success: true,
        data: products.slice(0, appliedLimit),
        total: products.length,
        context: params.context || "general",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        data: [],
      },
      { status: 500 }
    );
  }
}
