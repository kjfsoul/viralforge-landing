import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

// Your complete Printify products data
function getProductsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'printify_products.json')
    const jsonData = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(jsonData)
  } catch (error) {
    console.error('Error reading products data:', error)
    return []
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured') === 'true'
  const brand = searchParams.get('brand')

  console.log('🔥 Using YOUR LOCAL PRODUCTS DATA:', { featured, brand })

  try {
    const productsData = getProductsData()
    console.log(`🔥 Loaded ${productsData.length} products from local data`)

    // Transform your real Printify product data into multiple brand variations
    const transformedProducts: any[] = []

    productsData.forEach((product: any) => {
      // Create brand variations of the same product
      const brands = [
        {
          name: '3I/Atlas',
          title: '3I/Atlas Galaxy Journey Phone Case',
          description: 'Blast off to the cosmos with the 3I/Atlas Galaxy Journey Phone Case! Features the magnificent 3I/Atlas spacecraft launching into space with electrifying cosmic design.',
          status: 'Mars Flyby Exclusive',
          urgent: true,
          category: 'Mars Flyby Exclusive'
        },
        {
          name: 'Mystic Arcana',
          title: 'Cosmic Oracle Phone Case - Mystic Arcana Collection',
          description: 'Channel the mystical energy of 3I/Atlas with this enchanting phone case featuring cosmic oracle designs and celestial divination symbols.',
          status: 'Best Seller',
          urgent: false,
          category: 'Mystical'
        },
        {
          name: 'EDM Shuffle',
          title: 'Galaxy Beats Phone Case - EDM Shuffle Collection',
          description: 'Feel the cosmic rhythm with this vibrant phone case inspired by 3I/Atlas and electronic dance music. Perfect for festival-goers and music lovers.',
          status: 'Best Seller',
          urgent: false,
          category: 'Music'
        },
        {
          name: 'BirthdayGen',
          title: 'Cosmic Birthday Phone Case - BirthdayGen Collection',
          description: 'Celebrate in style with this stellar phone case featuring 3I/Atlas cosmic themes perfect for birthdays and special occasions.',
          status: 'Best Seller',
          urgent: false,
          category: 'Celebration'
        }
      ]

      brands.forEach((brandInfo, index) => {
        const basePrice = product.variants?.[0]?.price || 17.88
        const priceInCents = Math.round(basePrice * 100)
        
        // Create a product entry for each brand
        transformedProducts.push({
          id: `${product.id}-${brandInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
          title: brandInfo.title,
          description: brandInfo.description,
          brand: brandInfo.name,
          category: brandInfo.category,
          price: priceInCents,
          images: [
            {
              id: 'main',
              url: brandInfo.name === '3I/Atlas' 
                ? 'https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png'
                : brandInfo.name === 'Mystic Arcana'
                ? 'https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png'
                : brandInfo.name === 'EDM Shuffle'
                ? 'https://cdn.abacus.ai/images/703131cf-ec86-44ba-9d95-cb3f5bab6037.png'
                : 'https://cdn.abacus.ai/images/508eae4e-b9c0-4a85-bc7a-dc444bd51e25.png'
            }
          ],
          variants: product.variants || [],
          options: product.options || [],
          shop_id: '1234567', // Your shop ID
          printify_url: `https://printify.com/products/${product.id}`,
          status: brandInfo.status,
          urgent: brandInfo.urgent,
          featured: true,
          originalProductId: product.id
        })
      })
    })

    // Filter by brand if specified
    let filteredProducts = transformedProducts
    if (brand) {
      filteredProducts = transformedProducts.filter(p => 
        p.brand.toLowerCase() === brand.toLowerCase()
      )
    }

    // Return featured products if requested
    if (featured) {
      console.log('🔥 Returning featured products from YOUR LOCAL DATA')
      const featuredProducts = filteredProducts.slice(0, 4) // Get one from each brand
      return NextResponse.json({ success: true, data: featuredProducts })
    }

    // Return all products
    console.log(`🔥 Returning ${filteredProducts.length} products from YOUR LOCAL DATA`)
    return NextResponse.json({ 
      success: true, 
      data: filteredProducts
    })
    
  } catch (error) {
    console.error('🔥 ERROR loading YOUR products:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load your products', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
