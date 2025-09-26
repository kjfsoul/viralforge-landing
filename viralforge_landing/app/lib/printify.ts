import { PrintifyVariant } from './types'

export interface PrintifyOptions {
  [key: string]: string | number | boolean
}

export interface PrintifyBlueprint {
  id: string
  title: string
  description: string
  brand: string
  model: string
  print_provider_id: number
  variants: PrintifyVariant[]
}

export interface PrintifyProvider {
  id: number
  title: string
  description: string
}

export interface PrintifyShop {
  id: string
  title: string
  sales_channel: string
}

export interface PrintifyProduct {
  id: string
  title: string
  description: string
  blueprint_id: number
  print_provider_id: number
  variants: PrintifyVariant[]
}

export interface CatalogResponse {
  total: number
  limit: number
  page: number
  data: PrintifyProduct[]
}

export interface BlueprintResponse {
  total: number
  limit: number
  page: number
  data: PrintifyBlueprint[]
}

export interface ProviderResponse {
  total: number
  limit: number
  page: number
  data: PrintifyProvider[]
}

export interface ShopResponse {
  total: number
  limit: number
  page: number
  data: PrintifyShop[]
}

export interface VariantResponse {
  total: number
  limit: number
  page: number
  data: PrintifyVariant[]
}

// Helper function to create variants from options
export function createVariants(options: PrintifyOptions[]): PrintifyVariant[] {
  // This is a simplified implementation
  // In a real scenario, you would generate all possible combinations of options
  return options.map((option, index) => ({
    id: `variant-${index}`,
    title: `Variant ${index + 1}`,
    options: Object.values(option).map(String)
  }))
}
