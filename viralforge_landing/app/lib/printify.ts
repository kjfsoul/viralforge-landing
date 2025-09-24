
export interface PrintifyShop {
  id: number
  title: string
  sales_channel: string
}

export interface PrintifyProduct {
  id: number
  title: string
  description: string
  tags: string[]
  options: any[]
  variants: PrintifyVariant[]
  images: PrintifyImage[]
  shop_id: number
  print_provider_id: number
  created_at: string
  updated_at: string
  visible: boolean
  is_locked: boolean
}

export interface PrintifyVariant {
  id: number
  sku: string
  cost: number
  price: number
  title: string
  grams: number
  is_enabled: boolean
  is_default: boolean
  is_available: boolean
  options: number[]
}

export interface PrintifyImage {
  id: string
  file_name: string
  height: number
  width: number
  x: number
  y: number
  scale: number
  angle: number
}

class PrintifyClient {
  private baseUrl = 'https://api.printify.com/v1'
  private token = process.env.PRINTIFY_API_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImNiODA3YjkxYjEyMDQzNjIyNjZhOWRlZTEzMTg4OWY4NTNhM2MwZTNjNzIzMGYwNmQwOGNmNzEwOWJkNTdlM2M0NmE2ODJhODljYmYxMGI1IiwiaWF0IjoxNzU4MjAzNzIyLjAyNjc3NiwibmJmIjoxNzU4MjAzNzIyLjAyNjc3OCwiZXhwIjoxNzg5NzM5NzIyLjAwNTU3NCwic3ViIjoiMjEzNTc5MzUiLCJzY29wZXMiOlsic2hvcHMubWFuYWdlIiwic2hvcHMucmVhZCIsImNhdGFsb2cucmVhZCIsIm9yZGVycy5yZWFkIiwib3JkZXJzLndyaXRlIiwicHJvZHVjdHMucmVhZCIsInByb2R1Y3RzLndyaXRlIiwid2ViaG9va3MucmVhZCIsIndlYmhvb2tzLndyaXRlIiwidXBsb2Fkcy5yZWFkIiwidXBsb2Fkcy53cml0ZSIsInByaW50X3Byb3ZpZGVycy5yZWFkIiwidXNlci5pbmZvIl19.fD2EXLhiA4kN6leTSiF0xpJZXkkwo4_0jdYcpu0r_C_e6GNrA94gUyuXzF2Ftl-untl_ajzD3WPAr-B28KttmyclhBbNqH_H3lpFVj1Ix42OZqgGwlvt7xhUkaqy5-G-fMyboKrwfNRR3AEoeGiBzRDE3bjo4Z4RM2ydmM22HUfobjZ8Yiz64856QPJAbc08EqiZQMSkVuuB_syfUVoetwtbeigfzajFXnb7Nibhq-wZmzsfBFqjDp6k50mDR3mKZ3qjbO7L2Jkp1BsQpSvmMUG9rOUy912clxvD3Heazjk6_wdy2_dAMSf4aTL-cltqfMlN-2NZzfsId0XHDI4R55TAlaF0upjv2SpwtuGnHiEdjfF8-yYKv0zGDcFmF2YPglASA2YSQAbxhz8e3lV2y5-MbDUwcG8ixHXpik1Dlb4nVdIc_H3gtLu3i3FMVhTqLwIhyjMbiFvbgnexxjJDdCZ1YEx7LTFVKFht35EU_aky4dPqDVBjhK66JEc8i5k3wczACra18vIO90x8O2CS8znhjg0CPv70Y6ldhEFZOyiOTGACHbSIqnYMXWX-qOFNzojvC2bVczKnZCHcgnTmSpnKaJMXU6TNqawcSjcXs2RGdBZa1JAQPM2FKvwamFCm1ELymFe4yFGAhiBapDtSuPE-ZQifEEzmKIJrIeB6oKc'

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Printify API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getShops(): Promise<PrintifyShop[]> {
    const data = await this.request('/shops.json')
    return data.data || []
  }

  async getProducts(shopId: number): Promise<PrintifyProduct[]> {
    const data = await this.request(`/shops/${shopId}/products.json`)
    return data.data || []
  }

  async getProduct(shopId: number, productId: number): Promise<PrintifyProduct> {
    const data = await this.request(`/shops/${shopId}/products/${productId}.json`)
    return data
  }

  async getAllShopProducts(): Promise<{ shop: PrintifyShop; products: PrintifyProduct[] }[]> {
    const shops = await this.getShops()
    const allProducts = []

    for (const shop of shops) {
      try {
        const products = await this.getProducts(shop.id)
        allProducts.push({ shop, products })
      } catch (error) {
        console.error(`Error fetching products for shop ${shop.id}:`, error)
        allProducts.push({ shop, products: [] })
      }
    }

    return allProducts
  }

  // Brand-specific product filtering
  async getBrandProducts(brandName: string): Promise<PrintifyProduct[]> {
    const allShopProducts = await this.getAllShopProducts()
    const brandProducts: PrintifyProduct[] = []

    for (const { products } of allShopProducts) {
      const filtered = products.filter(product => {
        const title = product.title.toLowerCase()
        const description = product.description?.toLowerCase() || ''
        const tags = product.tags?.join(' ').toLowerCase() || ''
        
        switch (brandName.toLowerCase()) {
          case 'mystic arcana':
          case 'mysticarcana':
            return title.includes('mystic') || title.includes('arcana') || 
                   title.includes('tarot') || title.includes('oracle') ||
                   title.includes('astrology') || title.includes('crystal') ||
                   tags.includes('mystical') || tags.includes('spiritual')
          
          case 'edm shuffle':
          case 'edmshuffle':
            return title.includes('edm') || title.includes('shuffle') ||
                   title.includes('rave') || title.includes('electronic') ||
                   title.includes('neon') || title.includes('festival') ||
                   tags.includes('music') || tags.includes('dance')
          
          case 'birthday gen':
          case 'birthdaygen':
            return title.includes('birthday') || title.includes('celebration') ||
                   title.includes('party') || title.includes('card') ||
                   title.includes('gift') || tags.includes('birthday')
          
          case '3i/atlas':
          case '3iatlas':
          case 'atlas':
            return title.includes('3i') || title.includes('atlas') ||
                   title.includes('interstellar') || title.includes('cosmic') ||
                   title.includes('space') || title.includes('alien') ||
                   tags.includes('interstellar') || tags.includes('cosmic')
          
          default:
            return false
        }
      })
      
      brandProducts.push(...filtered)
    }

    return brandProducts
  }
}

export const printifyClient = new PrintifyClient()

// Helper function to format price
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

// Helper function to get primary product image
export function getPrimaryImage(product: PrintifyProduct): string {
  if (product.images && product.images.length > 0) {
    return `https://printify.com/pfh/media/printify/images/${product.images[0].id}`
  }
  return '/placeholder-product.jpg'
}
