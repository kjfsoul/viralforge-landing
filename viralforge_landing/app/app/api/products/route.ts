
import { printifyClient } from '@/lib/printify'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

// Define product categories based on actual 3I/Atlas store
const PRODUCT_CATEGORIES = {
  '3I/Atlas': {
    keywords: ['3i', 'atlas', 'interstellar', 'cosmic', 'space', 'asteroid', 'flyby', 'mars'],
    priority: 1
  },
  'Mystic Arcana': {
    keywords: ['mystic', 'arcana', 'tarot', 'oracle', 'astrology', 'crystal', 'spiritual', 'mystical'],
    priority: 2
  },
  'EDM Shuffle': {
    keywords: ['edm', 'shuffle', 'rave', 'electronic', 'neon', 'festival', 'music', 'dance', 'beats'],
    priority: 3
  },
  'BirthdayGen': {
    keywords: ['birthday', 'celebration', 'party', 'card', 'gift', 'happy', 'cake', 'celebrate'],
    priority: 4
  }
}

// Real product data from 3I/Atlas store
const FEATURED_3I_ATLAS_PRODUCTS = [
  {
    id: 'atlas-tshirt-cosmic',
    title: '3I/Atlas Cosmic Journey T-Shirt',
    description: 'Commemorate the historic Mars flyby with this exclusive 3I/Atlas design featuring the interstellar visitor\'s trajectory.',
    brand: '3I/Atlas',
    category: 'Apparel',
    price: 2499, // $24.99
    images: [{ id: 'atlas-1', url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/3I-ATLAS_noirlab2525b_crop.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Mars Flyby Exclusive',
    urgent: true,
    featured: true,
    tags: ['mars', 'flyby', 'interstellar', 'commemorative']
  },
  {
    id: 'atlas-mug-trajectory',
    title: '3I/Atlas Trajectory Coffee Mug',
    description: 'Start your morning with cosmic energy! Features the actual orbital path of 3I/Atlas through our solar system.',
    brand: '3I/Atlas',
    category: 'Drinkware',
    price: 1799, // $17.99
    images: [{ id: 'atlas-2', url: 'https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Best Seller',
    urgent: false,
    featured: true,
    tags: ['trajectory', 'orbital', 'coffee', 'morning']
  },
  {
    id: 'atlas-poster-mars',
    title: '3I/Atlas Mars Flyby Poster',
    description: 'Limited edition poster celebrating the October 2-3, 2025 Mars flyby. Perfect for space enthusiasts and collectors.',
    brand: '3I/Atlas',
    category: 'Art',
    price: 3299, // $32.99
    images: [{ id: 'atlas-3', url: 'https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Limited Edition',
    urgent: true,
    featured: true,
    tags: ['poster', 'limited', 'mars', 'collectors']
  },
  // Mystic Arcana products
  {
    id: 'mystic-oracle-deck',
    title: '3I/Atlas Oracle Card Deck',
    description: 'Channel cosmic wisdom with our exclusive 44-card oracle deck inspired by interstellar visitor 3I/Atlas.',
    brand: 'Mystic Arcana',
    category: 'Spiritual',
    price: 4999, // $49.99
    images: [{ id: 'mystic-1', url: 'https://cdn.abacus.ai/images/b36fadd6-3502-4b2d-a43a-f78f49504cd2.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Mystical Best Seller',
    urgent: false,
    featured: true,
    tags: ['oracle', 'tarot', 'spiritual', 'mystical']
  },
  {
    id: 'mystic-crystal-tshirt',
    title: 'Cosmic Crystal Tarot T-Shirt',
    description: 'Beautiful crystalline design merging tarot symbolism with 3I/Atlas cosmic energy.',
    brand: 'Mystic Arcana',
    category: 'Apparel',
    price: 2699, // $26.99
    images: [{ id: 'mystic-2', url: 'https://cdn.abacus.ai/images/b36fadd6-3502-4b2d-a43a-f78f49504cd2.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'New Release',
    urgent: false,
    featured: true,
    tags: ['crystal', 'tarot', 'mystical', 'cosmic']
  },
  // EDM Shuffle products
  {
    id: 'edm-rave-hoodie',
    title: 'Interstellar Rave Hoodie',
    description: 'Glow up your rave look with this cosmic EDM design featuring 3I/Atlas neon aesthetics.',
    brand: 'EDM Shuffle',
    category: 'Apparel',
    price: 4299, // $42.99
    images: [{ id: 'edm-1', url: 'https://cdn.abacus.ai/images/c12bfc8e-745e-4bdd-9d2b-5d40f84c4585.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Festival Ready',
    urgent: false,
    featured: true,
    tags: ['rave', 'festival', 'neon', 'edm']
  },
  {
    id: 'edm-sticker-pack',
    title: 'Cosmic Beats Sticker Pack',
    description: 'Deck out your gear with these holographic 3I/Atlas EDM stickers. Perfect for laptops and phones.',
    brand: 'EDM Shuffle',
    category: 'Accessories',
    price: 1299, // $12.99
    images: [{ id: 'edm-2', url: 'https://cdn.abacus.ai/images/c12bfc8e-745e-4bdd-9d2b-5d40f84c4585.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Fan Favorite',
    urgent: false,
    featured: true,
    tags: ['stickers', 'holographic', 'beats', 'cosmic']
  },
  // BirthdayGen products
  {
    id: 'birthday-cosmic-card',
    title: 'Cosmic Birthday Card Set',
    description: 'Make birthdays magical with these 3I/Atlas-themed celebration cards featuring personalized cosmic messages.',
    brand: 'BirthdayGen',
    category: 'Cards',
    price: 1899, // $18.99
    images: [{ id: 'birthday-1', url: 'https://cdn.abacus.ai/images/815c7bcd-9c6f-4e22-96f8-f9ef7ee79eec.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Party Essential',
    urgent: false,
    featured: true,
    tags: ['birthday', 'cards', 'celebration', 'cosmic']
  },
  {
    id: 'birthday-party-decorations',
    title: '3I/Atlas Party Decoration Kit',
    description: 'Transform any celebration into a cosmic event with this complete 3I/Atlas-themed party kit.',
    brand: 'BirthdayGen',
    category: 'Decorations',
    price: 3499, // $34.99
    images: [{ id: 'birthday-2', url: 'https://cdn.abacus.ai/images/815c7bcd-9c6f-4e22-96f8-f9ef7ee79eec.png' }],
    printify_url: 'https://3iatlas.printify.me/',
    status: 'Complete Set',
    urgent: false,
    featured: true,
    tags: ['party', 'decorations', 'celebration', 'kit']
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const featured = searchParams.get('featured') === 'true'
    const brand = searchParams.get('brand')
    const category = searchParams.get('category')
    const context = searchParams.get('context') // oracle, trajectory, hero, etc.
    const limitParam = searchParams.get('limit')
    const explicitLimit = limitParam ? Math.max(1, Math.min(100, parseInt(limitParam))) : undefined

    // Unified product type for the API response
    type UnifiedProduct = {
      id: string
      title: string
      description: string
      brand: string
      category: string
      price: number
      images: { id: string; url: string }[]
      printify_url: string
      status: string
      urgent?: boolean
      featured: boolean
      tags?: string[]
    }

    // Try primary source: Printify API
    async function tryPrintify(): Promise<UnifiedProduct[]> {
      const all = await printifyClient.getAllShopProducts()
      const products: UnifiedProduct[] = []
      for (const { shop, products: shopProducts } of all) {
        for (const p of shopProducts) {
          const priceCents = Array.isArray(p.variants) && p.variants.length > 0
            ? Math.min(...p.variants.map(v => v.price || 0))
            : 0

          // Basic brand inference: prefer shop title; fallback to keywords
          const inferredBrand = (() => {
            const shopTitle = (shop.title || '').toLowerCase()
            const title = (p.title || '').toLowerCase()
            const description = (p.description || '').toLowerCase()
            const tags = (p.tags || []).join(' ').toLowerCase()
            if (shopTitle.includes('mystic') || title.includes('mystic') || description.includes('mystic') || tags.includes('mystic')) return 'Mystic Arcana'
            if (shopTitle.includes('edm') || title.includes('edm') || description.includes('edm') || tags.includes('rave') || tags.includes('festival')) return 'EDM Shuffle'
            if (shopTitle.includes('birthday') || title.includes('birthday') || description.includes('birthday') || tags.includes('birthday')) return 'BirthdayGen'
            return '3I/Atlas'
          })()

          const primaryImage = p.images && p.images.length > 0
            ? `https://printify.com/pfh/media/printify/images/${p.images[0].id}`
            : '/placeholder-product.jpg'

          products.push({
            id: String(p.id),
            title: p.title || 'Product',
            description: p.description || '',
            brand: inferredBrand,
            category: (p.tags && p.tags[0]) || 'General',
            price: priceCents,
            images: [{ id: p.images?.[0]?.id || 'img', url: primaryImage }],
            // Storefront product URL is not provided by the API we call; default to global store
            printify_url: 'https://3iatlas.printify.me/',
            status: 'Available',
            urgent: false,
            featured: true,
            tags: p.tags || []
          })
        }
      }
      return products
    }

    // Secondary source: popup JSON/CSV files
    async function tryPopupFiles(): Promise<UnifiedProduct[]> {
      // Resolve repo root and read popup CSV
      // @ts-ignore - process is available in Node runtime
      const root = path.join(process.cwd(), '../../../3IAtlasSite')
      const csvPath = path.join(root, 'Popup_Store_Products__parsed_ (1).csv')
      console.log('CSV path:', csvPath)
      console.log('File exists:', fs.existsSync(csvPath))
      let data: any[] = []
      try {
        const raw = fs.readFileSync(csvPath, 'utf8')
        const lines = raw.split('\n')
        const headers = lines[0].split(',')
        
        // Simple CSV parser - just split by comma for now
        data = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',')
          const obj: any = {}
          headers.forEach((header, index) => {
            obj[header] = values[index] || ''
          })
          return obj
        })
        console.log(`Loaded ${data.length} products from popup CSV`)
        console.log('First product title:', data[0]?.product_title)
      } catch (e) {
        console.error('Failed to load popup CSV:', e)
        // If CSV not available, fallback to curated constant
        return [...FEATURED_3I_ATLAS_PRODUCTS]
      }

      const mapped: UnifiedProduct[] = data.map((row) => {
        const title: string = row.product_title || ''
        const desc: string = row.product_description_text || ''
        const tags: string = row.tags || ''
        const shopTitle: string = row.shop_title || ''
        const brandName = (() => {
          const blob = `${shopTitle} ${title} ${desc} ${tags}`.toLowerCase()
          if (blob.includes('mystic') || blob.includes('tarot') || blob.includes('oracle') || blob.includes('astrology')) return 'Mystic Arcana'
          if (blob.includes('edm') || blob.includes('rave') || blob.includes('festival')) return 'EDM Shuffle'
          if (blob.includes('birthday') || blob.includes('celebration') || blob.includes('party')) return 'BirthdayGen'
          return '3I/Atlas'
        })()
        const price = Number(row.min_variant_price_cents || 0)
        const firstImage = row.first_image_url || '/placeholder-product.jpg'
        return {
          id: String(row.product_id),
          title: title,
          description: desc,
          brand: brandName,
          category: 'General',
          price: price,
          images: [{ id: 'img', url: firstImage }],
          printify_url: row.storefront_product_url || 'https://3iatlas.printify.me/',
          status: 'Available',
          urgent: false,
          featured: true,
          tags: (tags || '').split('|').map((t: string) => t.trim()).filter(Boolean)
        }
      })
      return mapped
    }

    let unifiedProducts: UnifiedProduct[] = []
    
    // Try popup files first since Printify might not be configured
    try {
      unifiedProducts = await tryPopupFiles()
      console.log(`Using popup data: ${unifiedProducts.length} products`)
    } catch (err) {
      console.error('Popup files failed, using fallback:', err)
      unifiedProducts = [...FEATURED_3I_ATLAS_PRODUCTS]
    }
    
    if (!unifiedProducts || unifiedProducts.length === 0) {
      console.log('No products found, using fallback')
      unifiedProducts = [...FEATURED_3I_ATLAS_PRODUCTS]
    }

    let filteredProducts = [...unifiedProducts]

    // Apply filters
    if (featured) {
      filteredProducts = filteredProducts.filter(product => product.featured)
    }

    if (brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand.toLowerCase().includes(brand.toLowerCase())
      )
    }

    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    // Context-based filtering for strategic placement
    if (context) {
      switch (context) {
        case 'oracle':
          filteredProducts = filteredProducts.filter(product => 
            product.brand === 'Mystic Arcana' || (product.tags?.includes('mystical') ?? false) || (product.tags?.includes('oracle') ?? false)
          )
          break
        case 'trajectory':
          filteredProducts = filteredProducts.filter(product => 
            product.brand === '3I/Atlas' || (product.tags?.includes('trajectory') ?? false) || (product.tags?.includes('mars') ?? false)
          )
          break
        case 'hero':
          filteredProducts = filteredProducts.filter(product => 
            product.urgent || product.status.includes('Exclusive') || product.status.includes('Limited')
          )
          break
        case 'rave':
          filteredProducts = filteredProducts.filter(product => 
            product.brand === 'EDM Shuffle' || (product.tags?.includes('rave') ?? false) || (product.tags?.includes('festival') ?? false)
          )
          break
        case 'celebration':
          filteredProducts = filteredProducts.filter(product => 
            product.brand === 'BirthdayGen' || (product.tags?.includes('celebration') ?? false) || (product.tags?.includes('party') ?? false)
          )
          break
      }
    }

    // Smart sorting based on context and urgency
    filteredProducts.sort((a, b) => {
      // Priority brand order for mixed contexts
      const brandPriority = (brand: string) => PRODUCT_CATEGORIES[brand as keyof typeof PRODUCT_CATEGORIES]?.priority || 5
      
      if (a.urgent && !b.urgent) return -1
      if (!a.urgent && b.urgent) return 1
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      const aPriority = brandPriority(a.brand)
      const bPriority = brandPriority(b.brand)
      return aPriority - bPriority
    })

    // Limit results based on explicit limit or context
    const limit = explicitLimit ?? (featured ? 12 : context ? 6 : 50)

    return NextResponse.json({
      success: true,
      data: filteredProducts.slice(0, limit),
      total: filteredProducts.length,
      store_url: 'https://3iatlas.printify.me',
      context: context || 'general'
    })

  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      data: [],
      store_url: 'https://3iatlas.printify.me'
    }, { status: 500 })
  }
}
