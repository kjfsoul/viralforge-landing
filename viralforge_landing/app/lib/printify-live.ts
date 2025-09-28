/**
 * Printify Live Service
 * Provides high-level functions for Printify operations including product retrieval,
 * cache management, and export functionality.
 */

import { getPrintifyProductService } from './printify-product-service'
import type {
  PrintifyProduct,
  PrintifyShop,
  ProductImage
} from './types'

// Brand type definition
export type BrandName = '3iAtlas' | 'BirthdayGen' | 'EDM Shuffle' | 'Mystic Arcana'

// Cache management
const brandCache = new Map<BrandName, PrintifyProduct[]>()
const lastCacheUpdate = new Map<BrandName, number>()

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Assert that required environment variables are set
 */
export function assertRequiredEnv(): void {
  const requiredEnvVars = [
    'PRINTIFY_API_TOKEN',
    'PRINTIFY_API_URL'
  ]
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }
}

/**
 * Clear the cache for all brands or a specific brand
 */
export function clearCache(brand?: BrandName): void {
  if (brand) {
    brandCache.delete(brand)
    lastCacheUpdate.delete(brand)
    console.log(`Cache cleared for brand: ${brand}`)
  } else {
    brandCache.clear()
    lastCacheUpdate.clear()
    console.log('Cache cleared for all brands')
  }
}

/**
 * Check if cache is valid for a brand
 */
function isCacheValid(brand: BrandName): boolean {
  const lastUpdate = lastCacheUpdate.get(brand)
  if (!lastUpdate) return false
  return Date.now() - lastUpdate < CACHE_TTL
}

/**
 * Get products for a specific brand from cache or fetch from Printify
 */
async function getProductsForBrand(brand: BrandName): Promise<PrintifyProduct[]> {
  // Check cache first
  if (isCacheValid(brand)) {
    return brandCache.get(brand) || []
  }

  try {
    const service = getPrintifyProductService()
    
    // Get all shops first
    const shops: PrintifyShop[] = await service.getShops()
    
    // Collect products from all shops for this brand
    const allProducts: PrintifyProduct[] = []
    
    for (const shop of shops) {
      try {
        const products = await service.getProducts(shop.id)
        
        // Ensure products is an array
        if (!Array.isArray(products)) {
          console.error(`Products is not an array for shop ${shop.id}:`, typeof products, products)
          continue
        }
        
        // Filter products by brand (assuming brand is in title or tags)
        const brandProducts = products.filter(product =>
          product.title.toLowerCase().includes(brand.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(brand.toLowerCase()))
        )
        allProducts.push(...brandProducts)
      } catch (error) {
        console.error(`Error fetching products for shop ${shop.id}:`, error)
      }
    }

    // Update cache
    brandCache.set(brand, allProducts)
    lastCacheUpdate.set(brand, Date.now())
    
    return allProducts
  } catch (error) {
    console.error(`Error fetching products for brand ${brand}:`, error)
    throw new Error(`Failed to fetch products for brand ${brand}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Get all products for a brand with pagination and live filtering options
 */
export async function getAllProductsForBrand(
  brand: BrandName,
  options: {
    limit?: number;
    page?: number;
    live?: boolean;
  } = {}
): Promise<NormalizedProduct[]> {
  const { limit = 3, page = 1, live = false } = options
  
  try {
    const products = await getProductsForBrand(brand)
    
    // Apply live filter if specified - check if any variant is visible
    const filteredProducts = live
      ? products.filter(product => product.visible !== false && product.variants?.some(variant => variant.options.length > 0))
      : products
    
    // Apply pagination and convert to NormalizedProduct
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    
    // Convert PrintifyProduct to NormalizedProduct
    return paginatedProducts.map(product => normalizeProduct(product, brand))
  } catch (error) {
    console.error(`Error getting all products for brand ${brand}:`, error)
    throw error
  }
}

/**
 * Get a product by ID from any shop
 */
export async function getProductByIdFromAnyShop(productId: string): Promise<NormalizedProduct | null> {
  try {
    const service = getPrintifyProductService()
    
    // Get all shops
    const shops: PrintifyShop[] = await service.getShops()
    
    // Search for the product in all shops
    for (const shop of shops) {
      try {
        const products = await service.getProducts(shop.id)
        const product = products.find(p => p.id === productId)
        if (product) {
          // Convert to NormalizedProduct with a default brand
          return normalizeProduct(product, 'Unknown Brand')
        }
      } catch (error) {
        // Product not found in this shop, continue to next
        continue
      }
    }
    
    return null
  } catch (error) {
    console.error(`Error getting product by ID ${productId}:`, error)
    throw new Error(`Failed to get product by ID: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Convert PrintifyProduct to NormalizedProduct for components
 */
export function normalizeProduct(product: PrintifyProduct, brand: string = 'Unknown'): NormalizedProduct {
  // Extract price information - using placeholder since PrintifyVariant doesn't have price
  const variants = product.variants || []
  
  // Calculate price in cents - using placeholder values
  const priceMinCents = 1000 // Default placeholder price
  const priceMaxCents = variants.length > 1 ? 2000 : priceMinCents
  
  // Get first image URL
  const firstImage = product.images?.[0]?.url || ''
  
  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    brand,
    category: product.tags?.[0] || brand,
    price: priceMinCents,
    images: product.images || [],
    printify_url: '#', // Will be updated with storefront URL when available
    status: 'Available',
    urgent: false,
    featured: false,
    tags: product.tags || [],
    price_min: priceMinCents,
    price_max: priceMaxCents,
    storefront_product_url: '', // Will be populated by API
    short_description: product.description?.substring(0, 100) || '',
    // Additional properties for component compatibility
    price_min_cents: priceMinCents,
    default_price_cents: priceMinCents,
    first_image_url: firstImage
  }
}

/**
 * Export CSV for all four shops
 */
export async function exportCsvForAllFourShops(): Promise<string> {
  try {
    const service = getPrintifyProductService()
    
    // Get all shops
    const shops: PrintifyShop[] = await service.getShops()
    
    // Collect all products from all shops
    const allProducts: PrintifyProduct[] = []
    
    for (const shop of shops) {
      try {
        const products = await service.getProducts(shop.id)
        
        // Ensure products is an array before spreading
        if (Array.isArray(products)) {
          allProducts.push(...products)
        } else {
          console.error(`Products is not an array for shop ${shop.id}:`, typeof products, products)
        }
      } catch (error) {
        console.error(`Error fetching products for shop ${shop.id}:`, error)
      }
    }
    
    // Generate CSV
    const headers = [
      'Product ID',
      'Product Title',
      'Description',
      'Blueprint ID',
      'Print Provider ID',
      'Tags',
      'Variant Count',
      'Visible',
      'Updated At'
    ]
    
    const rows = allProducts.map(product => [
      product.id,
      product.title,
      product.description || '',
      product.blueprint_id || '',
      product.print_provider_id || '',
      product.tags?.join(';') || '',
      product.variants?.length || 0,
      product.visible !== false ? 'true' : 'false',
      product.updated_at || ''
    ])
    
    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(','))
      .join('\n')
    
    return csvContent
  } catch (error) {
    console.error('Error exporting CSV:', error)
    throw new Error(`Failed to export CSV: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * NormalizedProduct type for components
 */
export type NormalizedProduct = {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price: number
  images: ProductImage[]
  printify_url: string
  status: string
  urgent: boolean
  featured: boolean
  tags?: string[]
  price_min?: number | null
  price_max?: number | null
  storefront_product_url?: string | null
  short_description?: string
  // Additional properties used by components
  price_min_cents?: number
  default_price_cents?: number
  first_image_url?: string
}
