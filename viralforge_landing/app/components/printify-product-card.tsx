import Image from 'next/image'

interface PrintifyProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    brand: string;
    category?: string;
    // price can be a single number (legacy) or min/max in dollars
    price?: number;
    price_min?: number | null;
    price_max?: number | null;
    images: { id: string; url: string }[];
    printify_url?: string;
    storefront_product_url?: string | null;
    status?: string;
    urgent?: boolean;
    featured?: boolean;
    tags?: string[];
  };
  variant?: 'default' | 'compact' | 'featured';
}

export default function PrintifyProductCard({ 
  product, 
  variant = 'default' 
}: PrintifyProductCardProps) {
  const productUrl = product.storefront_product_url || product.printify_url || null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  const renderPrice = () => {
    if (typeof product.price_min === 'number' && product.price_min != null) {
      return formatPrice(product.price_min as number)
    }
    if (typeof product.price === 'number') return formatPrice(product.price)
    return ''
  }

  const limitWords = (text: string, maxWords = 20) => {
    if (!text) return ''
    const words = text.replace(/\s+/g, ' ').trim().split(' ')
    if (words.length <= maxWords) return words.join(' ')
    return words.slice(0, maxWords).join(' ') + '…'
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "p-3";
      case "featured":
        return "p-6 border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20";
      default:
        return "p-4";
    }
  };

  return (
    <div
      className={`bg-gray-900/50 border border-gray-700 rounded-lg ${productUrl ? 'hover:border-gray-600 cursor-pointer' : 'opacity-75 cursor-not-allowed'} transition-all duration-300 group ${getVariantClasses()}`}
      role={productUrl ? 'button' : undefined}
      tabIndex={productUrl ? 0 : -1}
      onClick={() => {
        if (productUrl) window.open(productUrl, '_blank', 'noopener,noreferrer')
      }}
      onKeyDown={(event) => {
        if (!productUrl) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          window.open(productUrl, '_blank', 'noopener,noreferrer')
        }
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.images[0]?.url || "/placeholder-product.jpg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.urgent && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
            URGENT
          </div>
        )}
        {product.status === "Available" && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            LIVE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Brand */}
        <div className="text-xs text-gray-400 uppercase tracking-wide">
          {product.brand}
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-white group-hover:text-purple-300 transition-colors ${
            variant === "compact" ? "text-sm" : "text-lg"
          }`}
        >
          {product.title}
        </h3>

        {/* Description */}
        {variant !== "compact" && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {limitWords(product.description, 20)}
          </p>
        )}

        {/* Category */}
        {product.category && (
          <div className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full inline-block">
            {product.category}
          </div>
        )}

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-white">
            {renderPrice()}
          </div>

        <div className="flex gap-2">
          <a
            href={productUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              productUrl
                ? 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transform'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            onClick={(event) => {
              if (!productUrl) event.preventDefault()
              event.stopPropagation()
            }}
          >
            View Product
          </a>
          <a
            href={productUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              productUrl
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(event) => {
              if (!productUrl) event.preventDefault()
              event.stopPropagation()
            }}
          >
            Buy Now
          </a>
        </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && variant !== "compact" && (
          <div className="flex flex-wrap gap-1 pt-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
