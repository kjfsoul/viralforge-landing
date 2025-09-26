import { config, getImageUrl } from "@/lib/config"
// Application configuration
export const config = {
  // Site URLs
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://3iatlas.com',
  shopUrl: process.env.NEXT_PUBLIC_SHOP_URL || 'https://3iatlas.com/shop',
  
  // Printify configuration
  printify: {
    storeUrl: process.env.PRINTIFY_STORE_URL || 'https://3iatlas.printify.me',
    apiKey: process.env.PRINTIFY_API_KEY || '',
    apiUrl: process.env.PRINTIFY_API_URL || 'config.printify.apiUrl',
    mysticArcanaProductUrl: process.env.PRINTIFY_MYSTIC_ARCANA_PRODUCT_URL || 'config.printify.mysticArcanaProductUrl',
    edmShuffleProductUrl: process.env.PRINTIFY_EDM_SHUFFLE_PRODUCT_URL || 'config.printify.edmShuffleProductUrl',
    birthdayGenProductUrl: process.env.PRINTIFY_BIRTHDAY_GEN_PRODUCT_URL || 'config.printify.birthdayGenProductUrl',
  },
  
  // Image CDN
  imageCdn: {
    baseUrl: process.env.NEXT_PUBLIC_IMAGE_CDN_URL || 'https://cdn.abacus.ai/images',
  },
  
  // API endpoints
  api: {
    products: '/api/products',
  },
  
  // Social media links
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/3iatlas',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/3iatlas',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/3iatlas',
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/3iatlas',
    twitterShareUrl: process.env.NEXT_PUBLIC_TWITTER_SHARE_URL || 'config.social.twitterShareUrl',
    
    // Brand-specific social media
    instagramMysticArcana: process.env.NEXT_PUBLIC_INSTAGRAM_MYSTIC_ARCANA_URL || 'https://www.instagram.com/mysticarcanaofficial/',
    tiktokMysticArcana: process.env.NEXT_PUBLIC_TIKTOK_MYSTIC_ARCANA_URL || 'https://www.tiktok.com/@the_mystic_arcana',
    twitterMysticArcana: process.env.NEXT_PUBLIC_TWITTER_MYSTIC_ARCANA_URL || 'https://x.com/arcana86042',
    
    instagramEDMShuffle: process.env.NEXT_PUBLIC_INSTAGRAM_EDM_SHUFFLE_URL || 'https://www.instagram.com/edmshuffleofficial/',
    tiktokEDMShuffle: process.env.NEXT_PUBLIC_TIKTOK_EDM_SHUFFLE_URL || 'https://www.tiktok.com/@edmshuffleofficial',
    twitterEDMShuffle: process.env.NEXT_PUBLIC_TWITTER_EDM_SHUFFLE_URL || 'https://x.com/edm_shuffle',
    
    instagramBirthdayGen: process.env.NEXT_PUBLIC_INSTAGRAM_BIRTHDAY_GEN_URL || 'https://www.instagram.com/birthday_gen/',
    tiktokBirthdayGen: process.env.NEXT_PUBLIC_TIKTOK_BIRTHDAY_GEN_URL || 'https://www.tiktok.com/@birthdaygen',
    twitterBirthdayGen: process.env.NEXT_PUBLIC_TWITTER_BIRTHDAY_GEN_URL || 'https://x.com/BirthdayGen',
  },
  
  // Contact information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@3iatlas.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+1 (555) 123-4567',
  },
  
  // External URLs
  external: {
    mysticArcanaSignup: process.env.MYSTIC_ARCANA_SIGNUP_URL || 'https://mysticarcana.com/signup?utm_source=3iatlas&oracle_unlock=true',
    mysticArcana: process.env.MYSTIC_ARCANA_URL || 'https://mysticarcana.com',
    edmShuffle: process.env.EDM_SHUFFLE_URL || 'https://edmshuffle.com',
    birthdayGen: process.env.BIRTHDAY_GEN_URL || 'https://birthdaygen.com',
    etsyMysticArcana: process.env.ETSY_MYSTIC_ARCANA_URL || 'https://etsy.com/shop/MysticArcana3I',
    amazonMysticArcana: process.env.AMAZON_MYSTIC_ARCANA_URL || 'https://amazon.com/stores/MysticArcana',
    redbubbleMysticArcana: process.env.REDBUBBLE_MYSTIC_ARCANA_URL || 'https://redbubble.com/people/MysticArcana',
    etsyEDMShuffle: process.env.ETSY_EDM_SHUFFLE_URL || 'https://etsy.com/shop/EDMShuffle3I',
    amazonEDMShuffle: process.env.AMAZON_EDM_SHUFFLE_URL || 'https://amazon.com/stores/EDMShuffle',
  },
  
  // Mock images
  mockImages: {
    pinimg1: process.env.MOCK_IMAGES_PINIMG1 || 'config.mockImages.pinimg1',
    pinimg2: process.env.MOCK_IMAGES_PINIMG2 || 'config.mockImages.pinimg2',
    amazon1: process.env.MOCK_IMAGES_AMAZON1 || 'config.mockImages.amazon1',
    amazon2: process.env.MOCK_IMAGES_AMAZON2 || 'config.mockImages.amazon2',
    teepublic: process.env.MOCK_IMAGES_TEEPUBLIC || 'config.mockImages.teepublic',
    etsy: process.env.MOCK_IMAGES_ETSY || 'config.mockImages.etsy',
  },
  
  // Image IDs
  images: {
    faq: 'ff55bffe-a3dd-4031-a90d-0c25faf0d017',
    productShowcase: [
      'ee292963-6c15-4b8b-a97d-bbcb51419d71',
      '18c61f33-c02e-4f50-892c-0f2d9f485a4b',
      '9f5c8620-0ec3-4392-9c16-ab9aa2f6ef1f',
    ],
    hero: 'f6796e88-78f4-4b81-8d60-730d45ee1fd5',
    oracle: [
      'f6796e88-78f4-4b81-8d60-730d45ee1fd5',
      'a00c4213-3b11-42a4-b4b7-2cbd98ba6042',
      '8a9404c9-f529-4c66-a220-f04b902f9580',
    ],
    enhancedFaq: '554503fc-f3d3-4064-a8ae-eda83a5dc1a3',
    enhancedProductShowcase: '8a9404c9-f529-4c66-a220-f04b902f9580',
    blog: [
      '884e3d49-0e2a-4f80-99c5-81a793e02ac3',
      '34cace12-f036-40af-94d5-b8e0cca2f9c1',
      '3e8deb50-06d0-440f-88c2-838f9f1b5903',
    ],
    brand: [
      'b36fadd6-3502-4b2d-a43a-f78f49504cd2',
      'c12bfc8e-745e-4bdd-9d2b-5d40f84c4585',
      '815c7bcd-9c6f-4e22-96f8-f9ef7ee79eec',
    ],
    cta: 'f7568d5f-de1e-4130-adf6-280256d622c6',
  },
}

// Helper function to get image URL from CDN
export function getImageUrl(imageId: string): string {
  return `${config.imageCdn.baseUrl}/${imageId}.png`
}

// Helper function to get full site URL
export function getSiteUrl(path: string = ''): string {
  return `${config.siteUrl}${path}`
}

// Helper function to get shop URL
export function getShopUrl(path: string = ''): string {
  return `${config.shopUrl}${path}`
}

// Helper function to get FAQ image URL
export function getFaqImageUrl(): string {
  return getImageUrl(config.images.faq)
}

// Helper function to get product showcase image URLs
export function getProductShowcaseImageUrls(): string[] {
  return config.images.productShowcase.map(id => getImageUrl(id))
}

// Helper function to get hero image URL
export function getHeroImageUrl(): string {
  return getImageUrl(config.images.hero)
}

// Helper function to get oracle image URLs
export function getOracleImageUrls(): string[] {
  return config.images.oracle.map(id => getImageUrl(id))
}

// Helper function to get enhanced FAQ image URL
export function getEnhancedFaqImageUrl(): string {
  return getImageUrl(config.images.enhancedFaq)
}

// Helper function to get enhanced product showcase image URL
export function getEnhancedProductShowcaseImageUrl(): string {
  return getImageUrl(config.images.enhancedProductShowcase)
}

// Helper function to get blog image URLs
export function getBlogImageUrls(): string[] {
  return config.images.blog.map(id => getImageUrl(id))
}

// Helper function to get brand image URLs
export function getBrandImageUrls(): string[] {
  return config.images.brand.map(id => getImageUrl(id))
}

// Helper function to get CTA image URL
export function getCtaImageUrl(): string {
  return getImageUrl(config.images.cta)
}
