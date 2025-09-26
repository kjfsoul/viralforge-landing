import { config, getProductShowcaseImageUrls } from '@/lib/config'

interface ProductShowcaseProps {
  title: string
  description: string
  products: Array<{
    id: string
    name: string
    description: string
    price: number
  }>
}

export default function ProductShowcase({ title, description, products }: ProductShowcaseProps) {
  const showcaseImages = getProductShowcaseImageUrls()

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {showcaseImages.map((imageUrl, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={`Product showcase ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <img
                  src={showcaseImages[index % showcaseImages.length]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-purple-600">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
