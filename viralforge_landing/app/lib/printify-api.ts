/**
 * Printify API Client
 * Handles all Printify API operations including product management across multiple stores
 */

export interface PrintifyShop {
  id: string;
  title: string;
  sales_channel: string;
}

export interface PrintifyBlueprint {
  id: number;
  title: string;
  brand: string;
  model: string;
  images: string[];
}

export interface PrintifyPrintProvider {
  id: number;
  title: string;
  location: string;
}

export interface PrintifyVariant {
  id: number;
  title: string;
  options: number[];
  placeholders: Array<{
    position: string;
    height: number;
    width: number;
  }>;
}

export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  blueprint_id: number;
  print_provider_id: number;
  variants: Array<{
    id: number;
    price: number;
    is_enabled: boolean;
  }>;
  print_areas: Array<{
    variant_ids: number[];
    placeholders: Array<{
      position: string;
      images: Array<{
        id: string;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }>;
    }>;
  }>;
  is_locked: boolean;
  external: {
    id: string;
    handle: string;
  };
  sales_channel_properties: Array<{
    sales_channel_id: string;
    active: boolean;
    external: {
      id: string;
      handle: string;
    };
  }>;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  tags?: string[];
  blueprint_id: number;
  print_provider_id: number;
  variants: Array<{
    id: number;
    price: number;
    is_enabled: boolean;
  }>;
  print_areas: Array<{
    variant_ids: number[];
    placeholders: Array<{
      position: string;
      images: Array<{
        id: string;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }>;
    }>;
  }>;
}

export interface UpdateProductRequest {
  title?: string;
  description?: string;
  tags?: string[];
  variants?: Array<{
    id: number;
    price: number;
    is_enabled: boolean;
  }>;
  print_areas?: Array<{
    variant_ids: number[];
    placeholders: Array<{
      position: string;
      images: Array<{
        id: string;
        x: number;
        y: number;
        scale: number;
        angle: number;
      }>;
    }>;
  }>;
}

export interface UploadImageRequest {
  file_name: string;
  contents: string; // base64 encoded image
}

export interface UploadImageResponse {
  id: string;
  file_name: string;
  height: number;
  width: number;
  size: number;
  mime_type: string;
  preview_url: string;
  upload_url: string;
}

export class PrintifyAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'PrintifyAPIError';
  }
}

export class PrintifyAPIClient {
  private baseURL = 'https://api.printify.com/v1';
  private token: string;
  private userAgent: string;

  constructor(token: string, userAgent = '3IAtlas-API') {
    this.token = token;
    this.userAgent = userAgent;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'User-Agent': this.userAgent,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new PrintifyAPIError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return response.json();
  }

  /**
   * List all shops in the account
   */
  async getShops(): Promise<PrintifyShop[]> {
    return this.makeRequest<PrintifyShop[]>('/shops.json');
  }

  /**
   * Get shop details by ID
   */
  async getShop(shopId: string): Promise<PrintifyShop> {
    return this.makeRequest<PrintifyShop>(`/shops/${shopId}.json`);
  }

  /**
   * List all products in a shop
   */
  async getProducts(shopId: string): Promise<PrintifyProduct[]> {
    return this.makeRequest<PrintifyProduct[]>(`/shops/${shopId}/products.json`);
  }

  /**
   * Get a specific product
   */
  async getProduct(shopId: string, productId: string): Promise<PrintifyProduct> {
    return this.makeRequest<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`);
  }

  /**
   * Create a new product
   */
  async createProduct(shopId: string, product: CreateProductRequest): Promise<PrintifyProduct> {
    return this.makeRequest<PrintifyProduct>(`/shops/${shopId}/products.json`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  /**
   * Update an existing product
   */
  async updateProduct(
    shopId: string, 
    productId: string, 
    updates: UpdateProductRequest
  ): Promise<PrintifyProduct> {
    return this.makeRequest<PrintifyProduct>(`/shops/${shopId}/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Delete a product
   */
  async deleteProduct(shopId: string, productId: string): Promise<void> {
    await this.makeRequest(`/shops/${shopId}/products/${productId}.json`, {
      method: 'DELETE',
    });
  }

  /**
   * Publish a product to the store
   */
  async publishProduct(shopId: string, productId: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(`/shops/${shopId}/products/${productId}/publish.json`, {
      method: 'POST',
    });
  }

  /**
   * Unpublish a product from the store
   */
  async unpublishProduct(shopId: string, productId: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(`/shops/${shopId}/products/${productId}/unpublish.json`, {
      method: 'POST',
    });
  }

  /**
   * Upload an image
   */
  async uploadImage(image: UploadImageRequest): Promise<UploadImageResponse> {
    return this.makeRequest<UploadImageResponse>('/uploads.json', {
      method: 'POST',
      body: JSON.stringify(image),
    });
  }

  /**
   * Get available blueprints (product types)
   */
  async getBlueprints(): Promise<PrintifyBlueprint[]> {
    return this.makeRequest<PrintifyBlueprint[]>('/catalog/blueprints.json');
  }

  /**
   * Get print providers for a blueprint
   */
  async getPrintProviders(blueprintId: number): Promise<PrintifyPrintProvider[]> {
    return this.makeRequest<PrintifyPrintProvider[]>(`/catalog/blueprints/${blueprintId}/print_providers.json`);
  }

  /**
   * Get variants for a blueprint and print provider
   */
  async getVariants(blueprintId: number, printProviderId: number): Promise<PrintifyVariant[]> {
    return this.makeRequest<PrintifyVariant[]>(`/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`);
  }

  /**
   * Get shipping rates for a product
   */
  async getShippingRates(shopId: string, productId: string, country: string): Promise<any> {
    return this.makeRequest(`/shops/${shopId}/products/${productId}/shipping.json?country=${country}`);
  }

  /**
   * Sync product with external store
   */
  async syncProduct(shopId: string, productId: string): Promise<{ success: boolean }> {
    return this.makeRequest<{ success: boolean }>(`/shops/${shopId}/products/${productId}/sync.json`, {
      method: 'POST',
    });
  }
}

// Singleton instance
let printifyClient: PrintifyAPIClient | null = null;

export function getPrintifyClient(): PrintifyAPIClient {
  if (!printifyClient) {
    const token = process.env.PRINTIFY_API_TOKEN;
    if (!token) {
      throw new Error('PRINTIFY_API_TOKEN environment variable is required');
    }
    printifyClient = new PrintifyAPIClient(token);
  }
  return printifyClient;
}

export function setPrintifyClient(client: PrintifyAPIClient): void {
  printifyClient = client;
}
