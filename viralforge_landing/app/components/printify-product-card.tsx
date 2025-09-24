import Image from 'next/image';
import Link from 'next/link';

interface PrintifyProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    images: { id: string; url: string }[];
    printify_url: string;
    status: string;
    urgent?: boolean;
    featured: boolean;
    tags?: string[];
  };
  variant?: 'default' | 'compact' | 'featured';
}

export default function PrintifyProductCard({ 
  product, 
  variant = 'default' 
}: PrintifyProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'p-3';
      case 'featured':
        return 'p-6 border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20';
      default:
        return 'p-4';
    }
  };

  return (
    <div className={`bg-gray-900/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 group ${getVariantClasses()}`}>
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.images[0]?.url || '/placeholder-product.jpg'}
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
        {product.status === 'Available' && (
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
        <h3 className={`font-bold text-white group-hover:text-purple-300 transition-colors ${
          variant === 'compact' ? 'text-sm' : 'text-lg'
        }`}>
          {product.title}
        </h3>

        {/* Description */}
        {variant !== 'compact' && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {truncateDescription(product.description)}
          </p>
        )}

        {/* Category */}
        <div className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full inline-block">
          {product.category}
        </div>

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-white">
            {formatPrice(product.price)}
          </div>
          
          <Link
            href={product.printify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
          >
            Buy Now
          </Link>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && variant !== 'compact' && (
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
