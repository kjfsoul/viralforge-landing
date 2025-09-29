export type Expense = {
  id: string
  amount: number
  category: string
  description: string
  date: Date
}

export type ExpenseFormData = Omit<Expense, 'id' | 'date'> & {
  date: string
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
] as const

export type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

// Product types based on the mock data structure
export interface ProductImage {
  id: string
  url: string
}

export interface Product {
  id: string
  title: string
  description: string
  brand: string
  category: string
  price: number // in cents
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
}

export interface PrintifyShop {
  id: string
  title: string
  sales_channel: string
  products?: Product[]
}

export interface PrintifyBlueprint {
  id: string
  title: string
  description: string
  brand: string
  model: string
  print_provider_id: number
}

export interface PrintifyProduct {
  id: string
  title: string
  description: string
  blueprint_id?: number
  print_provider_id?: number
  variants?: PrintifyVariant[]
  images?: ProductImage[]
  is_deleted?: boolean
  visible?: boolean
  tags?: string[]
  updated_at?: string
  external?: {
    id: string
    handle: string
    url?: string
  }
}

export interface PrintifyVariant {
  id: string
  title: string
  options: string[]
  price?: number
  cost?: number
  is_enabled?: boolean
  is_default?: boolean
  is_available?: boolean
  quantity?: number
}

export interface ApiResponse<T> {
  data: T
  success?: boolean
  error?: string
}

export interface PrintifyProvider {
  id: number
  title: string
  description: string
}

export interface PrintifyUploadImageRequest {
  file_name: string
  contents: string
}

export interface PrintifyUploadImageResponse {
  id: string
}

export interface PrintifySyncResponse {
  success: boolean
}
