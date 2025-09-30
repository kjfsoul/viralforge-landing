import Image from "next/image";
import Link from "next/link";
import { getProductByIdFromAnyShop } from "@/lib/printify-live";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProductByIdFromAnyShop(params.id);
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl">Product not found</div>
          <Link href="/" className="text-purple-400 underline">Return to site</Link>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image src={product.images?.[0]?.url || "/placeholder-product.jpg"} alt={product.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <div className="text-sm text-gray-400 uppercase tracking-wide">{product.brand}</div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-300">{product.description}</p>
          <div className="text-2xl font-bold">
            {typeof product.price_min === 'number' && typeof product.price_max === 'number'
              ? (product.price_min === product.price_max
                ? `$${product.price_min.toFixed(2)}`
                : `$${product.price_min.toFixed(2)} – $${product.price_max.toFixed(2)}`)
              : ''}
          </div>
          <div className="flex gap-3 pt-2">
            <Link href={product.storefront_product_url || '#'} target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">Buy on Store</Link>
            <Link href="/" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">Return to Site</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
