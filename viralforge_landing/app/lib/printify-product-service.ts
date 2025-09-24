/**
 * Printify Product Service
 * Handles product operations with Printify API integration
 */

import {
    CreateProductRequest,
    PrintifyAPIClient,
    PrintifyBlueprint,
    PrintifyPrintProvider,
    PrintifyProduct,
    PrintifyShop,
    PrintifyVariant,
    UpdateProductRequest,
    UploadImageRequest
} from './printify-api';
import { Product } from './products-service';

export interface PrintifyProductConfig {
  defaultShopId?: string;
  defaultBlueprintId?: number;
  defaultPrintProviderId?: number;
  defaultPosition?: string;
  defaultScale?: number;
  defaultAngle?: number;
}

export interface ProductSyncResult {
  success: boolean;
  printifyProductId?: string;
  error?: string;
  shopId?: string;
}

export class PrintifyProductService {
  private client: PrintifyAPIClient;
  private config: PrintifyProductConfig;

  constructor(client: PrintifyAPIClient, config: PrintifyProductConfig = {}) {
    this.client = client;
    this.config = {
      defaultPosition: 'front',
      defaultScale: 100,
      defaultAngle: 0,
      ...config
    };
  }

  /**
   * Convert CSV product to Printify product format
   */
  private convertToPrintifyProduct(
    product: Product, 
    shopId: string,
    blueprintId: number,
    printProviderId: number,
    variantId: number
  ): CreateProductRequest {
    return {
      title: product.title,
      description: product.description,
      tags: product.tags || [],
      blueprint_id: blueprintId,
      print_provider_id: printProviderId,
      variants: [{
        id: variantId,
        price: Math.round(product.price * 100), // Convert to cents
        is_enabled: true
      }],
      print_areas: [{
        variant_ids: [variantId],
        placeholders: [{
          position: this.config.defaultPosition!,
          images: [{
            id: product.images && product.images.length > 0 ? product.images[0].url : '', // This should be a Printify image ID
            x: 0,
            y: 0,
            scale: this.config.defaultScale!,
            angle: this.config.defaultAngle!
          }]
        }]
      }]
    };
  }

  /**
   * Upload image to Printify and get image ID
   */
  async uploadImage(imageUrl: string, fileName: string): Promise<string> {
    try {
      // Fetch the image from URL
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const imageBuffer = await response.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString('base64');
      
      const uploadRequest: UploadImageRequest = {
        file_name: fileName,
        contents: base64Image
      };

      const uploadResponse = await this.client.uploadImage(uploadRequest);
      return uploadResponse.id;
    } catch (error) {
      console.error('Error uploading image to Printify:', error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a product in Printify
   */
  async createProduct(
    product: Product,
    shopId: string,
    blueprintId: number,
    printProviderId: number,
    variantId: number,
    imageId?: string
  ): Promise<PrintifyProduct> {
    try {
      // If no image ID provided, upload the image first
      let printifyImageId = imageId;
      if (!printifyImageId && product.images && product.images.length > 0) {
        printifyImageId = await this.uploadImage(product.images[0].url, `${product.title}.jpg`);
      }

      const printifyProduct = this.convertToPrintifyProduct(
        product,
        shopId,
        blueprintId,
        printProviderId,
        variantId
      );

      // Update the image ID in the product
      if (printifyImageId) {
        printifyProduct.print_areas[0].placeholders[0].images[0].id = printifyImageId;
      } else if (product.images && product.images.length > 0) {
        // Use the first image URL as a fallback (this won't work with Printify API but prevents errors)
        printifyProduct.print_areas[0].placeholders[0].images[0].id = product.images[0].url;
      }

      return await this.client.createProduct(shopId, printifyProduct);
    } catch (error) {
      console.error('Error creating Printify product:', error);
      throw new Error(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update a product in Printify
   */
  async updateProduct(
    productId: string,
    shopId: string,
    updates: Partial<Product>
  ): Promise<PrintifyProduct> {
    try {
      const printifyUpdates: UpdateProductRequest = {};

      if (updates.title) printifyUpdates.title = updates.title;
      if (updates.description) printifyUpdates.description = updates.description;
      if (updates.tags) printifyUpdates.tags = updates.tags;
      if (updates.price) {
        printifyUpdates.variants = [{
          id: 0, // This should be the actual variant ID
          price: Math.round(updates.price * 100),
          is_enabled: true
        }];
      }

      return await this.client.updateProduct(shopId, productId, printifyUpdates);
    } catch (error) {
      console.error('Error updating Printify product:', error);
      throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Publish a product to the store
   */
  async publishProduct(shopId: string, productId: string): Promise<boolean> {
    try {
      const result = await this.client.publishProduct(shopId, productId);
      return result.success;
    } catch (error) {
      console.error('Error publishing product:', error);
      throw new Error(`Failed to publish product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Sync multiple products to Printify
   */
  async syncProducts(
    products: Product[],
    shopId: string,
    blueprintId: number,
    printProviderId: number,
    variantId: number
  ): Promise<ProductSyncResult[]> {
    const results: ProductSyncResult[] = [];

    for (const product of products) {
      try {
        const printifyProduct = await this.createProduct(
          product,
          shopId,
          blueprintId,
          printProviderId,
          variantId
        );

        results.push({
          success: true,
          printifyProductId: printifyProduct.id,
          shopId
        });
      } catch (error) {
        results.push({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          shopId
        });
      }
    }

    return results;
  }

  /**
   * Get all shops
   */
  async getShops(): Promise<PrintifyShop[]> {
    try {
      return await this.client.getShops();
    } catch (error) {
      console.error('Error fetching shops:', error);
      throw new Error(`Failed to fetch shops: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get available blueprints
   */
  async getBlueprints(): Promise<PrintifyBlueprint[]> {
    try {
      return await this.client.getBlueprints();
    } catch (error) {
      console.error('Error fetching blueprints:', error);
      throw new Error(`Failed to fetch blueprints: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get print providers for a blueprint
   */
  async getPrintProviders(blueprintId: number): Promise<PrintifyPrintProvider[]> {
    try {
      return await this.client.getPrintProviders(blueprintId);
    } catch (error) {
      console.error('Error fetching print providers:', error);
      throw new Error(`Failed to fetch print providers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get variants for a blueprint and print provider
   */
  async getVariants(blueprintId: number, printProviderId: number): Promise<PrintifyVariant[]> {
    try {
      return await this.client.getVariants(blueprintId, printProviderId);
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw new Error(`Failed to fetch variants: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get products from a shop
   */
  async getProducts(shopId: string): Promise<PrintifyProduct[]> {
    try {
      return await this.client.getProducts(shopId);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete a product
   */
  async deleteProduct(shopId: string, productId: string): Promise<boolean> {
    try {
      await this.client.deleteProduct(shopId, productId);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Sync product with external store
   */
  async syncProduct(shopId: string, productId: string): Promise<boolean> {
    try {
      const result = await this.client.syncProduct(shopId, productId);
      return result.success;
    } catch (error) {
      console.error('Error syncing product:', error);
      throw new Error(`Failed to sync product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Singleton instance
let printifyProductService: PrintifyProductService | null = null;

export function getPrintifyProductService(): PrintifyProductService {
  if (!printifyProductService) {
    const { getPrintifyClient } = require('./printify-api');
    const client = getPrintifyClient();
    printifyProductService = new PrintifyProductService(client);
  }
  return printifyProductService;
}

export function setPrintifyProductService(service: PrintifyProductService): void {
  printifyProductService = service;
}
