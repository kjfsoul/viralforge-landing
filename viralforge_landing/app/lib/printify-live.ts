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
    
    // Map brand names to shop IDs from environment variables
    const brandToShopId: Record<BrandName, string> = {
      '3iAtlas': process.env.PRINTIFY_SHOP_ID_3IATLAS || '',
      'Mystic Arcana': process.env.PRINTIFY_SHOP_ID_MYSTIC_ARCANA || '',
      'EDM Shuffle': process.env.PRINTIFY_SHOP_ID_EDM_SHUFFLE || '',
      'BirthdayGen': process.env.PRINTIFY_SHOP_ID_BIRTHDAYGEN || ''
    }
    
    const shopId = brandToShopId[brand]
    console.log(`Fetching products for brand: ${brand}, shopId: ${shopId}`)
    
    if (!shopId) {
      throw new Error(`No shop ID configured for brand: ${brand}`)
    }
    
    // Get products from the specific shop for this brand
    const products = await service.getProducts(shopId)
    console.log(`Retrieved ${products?.length || 0} products for brand ${brand}`)
    
    // Ensure products is an array
    if (!Array.isArray(products)) {
      console.error(`Products is not an array for shop ${shopId}:`, typeof products, products)
      return []
    }

    // Update cache
    brandCache.set(brand, products)
    lastCacheUpdate.set(brand, Date.now())
    
    return products
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
    const products = await getProductsForBrand(brand);

    // Apply live filter if specified - check if any variant is visible
    const filteredProducts = live
      ? products.filter(
          (product) =>
            product.visible !== false &&
            product.variants?.some((variant) => variant.options.length > 0)
        )
      : products;

    // Apply pagination and convert to NormalizedProduct
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Convert PrintifyProduct to NormalizedProduct
    return paginatedProducts.map((product) => normalizeProduct(product, brand));
  } catch (error) {
    console.error(`Error getting all products for brand ${brand}:`, error);
    return [];
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
  // Extract price information from variants
  const variants = product.variants || []
  
  // Calculate actual prices from variants
  const prices = variants.map(v => v.price).filter((p): p is number => p !== undefined && p > 0)
  const priceMinCents = prices.length > 0 ? Math.min(...prices) : 0
  const priceMaxCents = prices.length > 0 ? Math.max(...prices) : 0
  
  // Get first image URL
  const firstImage = product.images?.[0]?.url || ''
  
  // Get storefront URL from external data
  const storefrontUrl = product.external?.handle || ''
  
  return {
    id: product.id,
    title: product.title,
    description: product.description || '',
    brand,
    category: product.tags?.[0] || brand,
    price: priceMinCents,
    images: product.images || [],
    printify_url: storefrontUrl,
    status: product.visible ? 'Available' : 'Unavailable',
    urgent: false,
    featured: true,
    tags: product.tags || [],
    price_min: priceMinCents,
    price_max: priceMaxCents,
    storefront_product_url: storefrontUrl,
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
