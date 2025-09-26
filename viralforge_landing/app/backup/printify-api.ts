import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl } from "@/lib/config"
import { PrintifyShop, PrintifyBlueprint, PrintifyProvider, PrintifyProduct, PrintifyVariant, ApiResponse } from './types'

// Base API class for Printify
export class PrintifyApi {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, baseUrl: string = 'config.printify.apiUrl') {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed with status ${response.status}`)
    }

    const data = await response.json()
    return { data, success: true }
  }

  // Shops API
  async getShops(): Promise<ApiResponse<PrintifyShop[]>> {
    return this.request<PrintifyShop[]>('/shops.json')
  }

  // Blueprints API
  async getBlueprints(): Promise<ApiResponse<PrintifyBlueprint[]>> {
    return this.request<PrintifyBlueprint[]>('/catalog/blueprints.json')
  }

  async getBlueprint(id: string): Promise<ApiResponse<PrintifyBlueprint>> {
    return this.request<PrintifyBlueprint>(`/catalog/blueprints/${id}.json`)
  }

  // Print Providers API
  async getPrintProviders(blueprintId?: string): Promise<ApiResponse<PrintifyProvider[]>> {
    const endpoint = blueprintId 
      ? `/catalog/blueprints/${blueprintId}/print_providers.json`
      : '/catalog/print_providers.json'
    return this.request<PrintifyProvider[]>(endpoint)
  }

  // Products API
  async getProducts(shopId: string): Promise<ApiResponse<PrintifyProduct[]>> {
    return this.request<PrintifyProduct[]>(`/shops/${shopId}/products.json`)
  }

  async getProduct(shopId: string, productId: string): Promise<ApiResponse<PrintifyProduct>> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`)
  }

  async createProduct(shopId: string, product: Omit<PrintifyProduct, 'id'>): Promise<ApiResponse<PrintifyProduct>> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products.json`, {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  async updateProduct(shopId: string, productId: string, product: Partial<PrintifyProduct>): Promise<ApiResponse<PrintifyProduct>> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(shopId: string, productId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/shops/${shopId}/products/${productId}.json`, {
      method: 'DELETE',
    })
  }

  // Variants API
  async getVariants(blueprintId: string, printProviderId: number): Promise<ApiResponse<PrintifyVariant[]>> {
    return this.request<PrintifyVariant[]>(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`)
  }

  // Publish API
  async publishProduct(shopId: string, productId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request<{ success: boolean }>(`/shops/${shopId}/products/${productId}/publish.json`, {
      method: 'POST',
    })
  }
}

// Factory function to create a Printify API instance
export function createPrintifyApi(apiKey: string, baseUrl?: string): PrintifyApi {
  return new PrintifyApi(apiKey, baseUrl)
}
