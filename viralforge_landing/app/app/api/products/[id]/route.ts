import { NextRequest, NextResponse } from "next/server";
import { getProductByIdFromAnyShop } from "@/lib/printify-live";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductByIdFromAnyShop(decodeURIComponent(params.id))
    if (!product) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
