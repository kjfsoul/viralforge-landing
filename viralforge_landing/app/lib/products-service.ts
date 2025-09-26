import { Product, PrintifyShop, ApiResponse } from './types'
import { createPrintifyApi } from './printify-api'
import { MOCK_PRODUCTS } from './printify-mock'

export class ProductsService {
  private api: ReturnType<typeof createPrintifyApi>
  private useMockData: boolean

  constructor(apiKey: string, useMockData: boolean = false) {
    this.api = createPrintifyApi(apiKey)
    this.useMockData = useMockData
  }

  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    if (this.useMockData) {
      return { data: MOCK_PRODUCTS, success: true }
    }

    try {
      const shopsResponse = await this.getShops()
      if (!shopsResponse.success || !shopsResponse.data) {
        throw new Error('Failed to fetch shops')
      }

      const shops = shopsResponse.data
      const allowedShops = shops.filter((shop: PrintifyShop) => {
        // Add any filtering logic here if needed
        return true
      })

      const allProducts: Product[] = []
      
      for (const shop of allowedShops) {
        const productsResponse = await this.getProducts(shop.id)
        if (productsResponse.success && productsResponse.data) {
          // Transform Printify products to our Product interface
          const transformedProducts = productsResponse.data.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            brand: '', // This would need to be set based on your business logic
            category: '', // This would need to be set based on your business logic
            price: 0, // This would need to be calculated from variants
            images: [], // This would need to be populated from the product data
            printify_url: '', // This would need to be set based on your business logic
            status: 'Available', // This would need to be set based on your business logic
            urgent: false, // This would need to be set based on your business logic
            featured: false, // This would need to be set based on your business logic
          }))
          allProducts.push(...transformedProducts)
        }
      }

      return { data: allProducts, success: true }
    } catch (error) {
      console.error('Error fetching all products:', error)
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async getProductById(id: string): Promise<ApiResponse<Product | undefined>> {
    if (this.useMockData) {
      const product = MOCK_PRODUCTS.find(p => p.id === id)
      return { data: product, success: true }
    }

    try {
      // This would need to be implemented based on your API structure
      // For now, we'll return undefined
      return { data: undefined, success: true }
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      return { data: undefined, success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async getProductsByBrand(brand: string): Promise<ApiResponse<Product[]>> {
    if (this.useMockData) {
      const products = MOCK_PRODUCTS.filter(p => p.brand === brand)
      return { data: products, success: true }
    }

    try {
      const allProductsResponse = await this.getAllProducts()
      if (!allProductsResponse.success || !allProductsResponse.data) {
        throw new Error('Failed to fetch all products')
      }

      const filteredProducts = allProductsResponse.data.filter(p => p.brand === brand)
      return { data: filteredProducts, success: true }
    } catch (error) {
      console.error(`Error fetching products by brand ${brand}:`, error)
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    if (this.useMockData) {
      const products = MOCK_PRODUCTS.filter(p => p.category === category)
      return { data: products, success: true }
    }

    try {
      const allProductsResponse = await this.getAllProducts()
      if (!allProductsResponse.success || !allProductsResponse.data) {
        throw new Error('Failed to fetch all products')
      }

      const filteredProducts = allProductsResponse.data.filter(p => p.category === category)
      return { data: filteredProducts, success: true }
    } catch (error) {
      console.error(`Error fetching products by category ${category}:`, error)
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Methods to interact with Printify API directly
  async getShops(): Promise<ApiResponse<PrintifyShop[]>> {
    if (this.useMockData) {
      // Return mock shops if needed
      const mockShops: PrintifyShop[] = [
        {
          id: "1",
          title: "3I/Atlas Official Store",
          sales_channel: "3I/Atlas"
        },
        {
          id: "2",
          title: "Mystic Arcana",
          sales_channel: "Mystic Arcana"
        }
      ]
      return { data: mockShops, success: true }
    }

    try {
      const shops = await this.api.getShops()
      return { data: shops, success: true }
    } catch (error) {
      console.error('Error fetching shops:', error)
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async getProducts(shopId: string): Promise<ApiResponse<any[]>> {
    if (this.useMockData) {
      // Return mock products if needed
      return { data: MOCK_PRODUCTS, success: true }
    }

    try {
      const products = await this.api.getProducts(shopId)
      return { data: products, success: true }
    } catch (error) {
      console.error(`Error fetching products for shop ${shopId}:`, error)
      return { data: [], success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

// Factory function to create a ProductsService instance
export function createProductsService(apiKey: string, useMockData: boolean = false): ProductsService {
  return new ProductsService(apiKey, useMockData)
}
