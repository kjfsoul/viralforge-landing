import { ProductsService } from "@/lib/products-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productsService = ProductsService.getInstance();
    const all = await productsService.getProducts();
    const product = all.find((p) => String(p.id) === decodeURIComponent(params.id));
    if (!product) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
