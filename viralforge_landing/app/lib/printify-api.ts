import {
  PrintifyShop,
  PrintifyBlueprint,
  PrintifyProvider,
  PrintifyProduct,
  PrintifyVariant,
  PrintifyUploadImageRequest,
  PrintifyUploadImageResponse,
  PrintifySyncResponse,
} from './types'

const DEFAULT_API_BASE = 'https://api.printify.com/v1'

type RequestOptions = RequestInit & {
  skipJsonParsing?: boolean
}

// Base API class for Printify
export class PrintifyApi {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, baseUrl: string = DEFAULT_API_BASE) {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
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

    if (options.skipJsonParsing || response.status === 204) {
      // Some endpoints (DELETE) return empty responses
      return undefined as T
    }

    const text = await response.text()
    if (!text) {
      return undefined as T
    }

    let json: unknown
    try {
      json = JSON.parse(text)
    } catch (error) {
      throw new Error(`Failed to parse Printify response: ${(error as Error).message}`)
    }

    if (json && typeof json === 'object') {
      const record = json as Record<string, unknown>
      if ('data' in record && Object.keys(record).length === 1) {
        return record.data as T
      }
      if ('items' in record && Object.keys(record).length === 1) {
        return record.items as T
      }
      if ('products' in record && Object.keys(record).length === 1) {
        return record.products as T
      }
    }

    return json as T
  }

  // Shops API
  async getShops(): Promise<PrintifyShop[]> {
    return this.request<PrintifyShop[]>('/shops.json')
  }

  // Blueprints API
  async getBlueprints(): Promise<PrintifyBlueprint[]> {
    return this.request<PrintifyBlueprint[]>('/catalog/blueprints.json')
  }

  async getBlueprint(id: string): Promise<PrintifyBlueprint> {
    return this.request<PrintifyBlueprint>(`/catalog/blueprints/${id}.json`)
  }

  // Print Providers API
  async getPrintProviders(blueprintId?: string | number): Promise<PrintifyProvider[]> {
    const endpoint = blueprintId 
      ? `/catalog/blueprints/${blueprintId}/print_providers.json`
      : '/catalog/print_providers.json'
    return this.request<PrintifyProvider[]>(endpoint)
  }

  // Products API
  async getProducts(shopId: string): Promise<PrintifyProduct[]> {
    return this.request<PrintifyProduct[]>(`/shops/${shopId}/products.json`)
  }

  async getProduct(shopId: string, productId: string): Promise<PrintifyProduct> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`)
  }

  async createProduct(shopId: string, product: Omit<PrintifyProduct, 'id'>): Promise<PrintifyProduct> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products.json`, {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  async updateProduct(shopId: string, productId: string, product: Partial<PrintifyProduct>): Promise<PrintifyProduct> {
    return this.request<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(shopId: string, productId: string): Promise<void> {
    await this.request<void>(`/shops/${shopId}/products/${productId}.json`, {
      method: 'DELETE',
      skipJsonParsing: true,
    })
  }

  // Variants API
  async getVariants(blueprintId: string | number, printProviderId: number): Promise<PrintifyVariant[]> {
    return this.request<PrintifyVariant[]>(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`)
  }

  // Publish API
  async publishProduct(shopId: string, productId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/shops/${shopId}/products/${productId}/publish.json`, {
      method: 'POST',
    })
  }

  // Upload asset
  async uploadImage(payload: PrintifyUploadImageRequest): Promise<PrintifyUploadImageResponse> {
    return this.request<PrintifyUploadImageResponse>('/uploads/images.json', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async syncProduct(shopId: string, productId: string): Promise<PrintifySyncResponse> {
    return this.request<PrintifySyncResponse>(`/shops/${shopId}/products/${productId}/sync.json`, {
      method: 'POST',
    })
  }
}

// Factory function to create a Printify API instance
export function createPrintifyApi(apiKey: string, baseUrl?: string): PrintifyApi {
  return new PrintifyApi(apiKey, baseUrl)
}

export function getPrintifyClient(): PrintifyApi {
  const apiKey = process.env.PRINTIFY_API_TOKEN
  if (!apiKey) {
    throw new Error('PRINTIFY_API_TOKEN is not set')
  }
  const baseUrl = process.env.PRINTIFY_API_URL || DEFAULT_API_BASE
  return new PrintifyApi(apiKey, baseUrl)
}
