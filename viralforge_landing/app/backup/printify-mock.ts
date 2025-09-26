import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl } from "@/lib/config"
import { Product } from './types'

// Mock Printify data until API is fully integrated
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "3i-atlas-001",
    title: "3I/Atlas Interstellar Journey T-Shirt",
    description: "Commemorate humanity's third interstellar visitor with this exclusive design featuring 3I/Atlas's trajectory through our solar system.",
    brand: "3I/Atlas",
    category: "Apparel", 
    price: 2499, // $24.99 in cents
    images: [{ 
      id: "img1", 
      url: "getHeroImageUrl()" 
    }],
    printify_url: "config.mockImages.pinimg1",
    status: "New Release",
    urgent: true,
    featured: true
  },
  {
    id: "3i-atlas-002", 
    title: "Mars Flyby Commemorative Poster",
    description: "Historic moment captured: 3I/Atlas's closest approach to Mars on October 2-3, 2025. Limited edition astronomical poster.",
    brand: "3I/Atlas",
    category: "Prints",
    price: 1899,
    images: [{ 
      id: "img2", 
      url: "getOracleImageUrls()[1]" 
    }],
    printify_url: "config.mockImages.pinimg2", 
    status: "Limited Edition",
    urgent: true,
    featured: true
  },
  {
    id: "mystic-001",
    title: "Cosmic Oracle Tarot Deck Preview",
    description: "Channel the wisdom of 3I/Atlas with this mystical tarot deck inspired by interstellar visitors and cosmic energies.",
    brand: "Mystic Arcana",
    category: "Cards",
    price: 3499,
    images: [{ 
      id: "img3", 
      url: "getOracleImageUrls()[2]" 
    }],
    printify_url: "config.mockImages.amazon1",
    status: "Best Seller", 
    urgent: false,
    featured: true
  },
  {
    id: "mystic-002",
    title: "Interstellar Astrology Reading Mug",
    description: "Start your day with cosmic wisdom. This celestial mug features 3I/Atlas constellation patterns and mystical symbols.",
    brand: "Mystic Arcana",
    category: "Drinkware",
    price: 1699,
    images: [{ 
      id: "img4", 
      url: "getHeroImageUrl()" 
    }],
    printify_url: "config.printify.mysticArcanaProductUrlastrology-mug",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "edm-001",
    title: "3I/Atlas Rave Festival Tank Top",
    description: "Dance under the stars with this cosmic festival tank featuring 3I/Atlas-inspired neon designs and electronic beats visualization.",
    brand: "EDM Shuffle",
    category: "Apparel",
    price: 2199,
    images: [{ 
      id: "img5", 
      url: "getOracleImageUrls()[1]" 
    }],
    printify_url: "config.mockImages.amazon2",
    status: "New Release",
    urgent: false,
    featured: true
  },
  {
    id: "edm-002",
    title: "Cosmic Bass Drop Hoodie", 
    description: "Feel the universe vibrate with this bass-heavy hoodie design inspired by 3I/Atlas's sonic signature through space.",
    brand: "EDM Shuffle",
    category: "Apparel",
    price: 4299,
    images: [{ 
      id: "img6", 
      url: "getOracleImageUrls()[2]" 
    }],
    printify_url: "config.printify.edmShuffleProductUrlcosmic-bass-hoodie",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "birthday-001",
    title: "Interstellar Birthday Card Set",
    description: "Celebrate birthdays with cosmic flair! Set of 5 cards featuring 3I/Atlas themes and space-age birthday messages.",
    brand: "BirthdayGen", 
    category: "Cards",
    price: 1299,
    images: [{ 
      id: "img7", 
      url: "getHeroImageUrl()" 
    }],
    printify_url: "config.printify.birthdayGenProductUrlinterstellar-birthday-cards",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "birthday-002",
    title: "Cosmic Celebration Party Supplies",
    description: "Complete party pack inspired by 3I/Atlas's journey - plates, cups, napkins with interstellar designs.",
    brand: "BirthdayGen",
    category: "Party Supplies",
    price: 2999,
    images: [{ 
      id: "img8", 
      url: "getOracleImageUrls()[1]" 
    }],
    printify_url: "config.printify.birthdayGenProductUrlcosmic-party-pack",
    status: "Limited Edition",
    urgent: false,
    featured: true
  },
  {
    id: "3i-atlas-003",
    title: "Perihelion Moment Sticker Pack",
    description: "Mark 3I/Atlas's closest approach to the Sun with these holographic stickers celebrating the October 29-30 perihelion.",
    brand: "3I/Atlas",
    category: "Stickers",
    price: 899,
    images: [{ 
      id: "img9", 
      url: "getOracleImageUrls()[2]" 
    }],
    printify_url: "config.printify.mysticArcanaProductUrlperihelion-stickers",
    status: "Best Seller",
    urgent: true,
    featured: true
  },
  {
    id: "3i-atlas-004",
    title: "Interstellar Visitor Phone Case",
    description: "Protect your phone with 3I/Atlas energy. Features the comet's actual trajectory data and cosmic protection symbols.",
    brand: "3I/Atlas",
    category: "Accessories",
    price: 1999,
    images: [{ 
      id: "img10", 
      url: "getHeroImageUrl()" 
    }],
    printify_url: "config.mockImages.teepublic",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "mystic-003",
    title: "Crystal Grid Activation Mat",
    description: "Align your crystals with 3I/Atlas energy using this sacred geometry activation mat featuring interstellar patterns.",
    brand: "Mystic Arcana",
    category: "Accessories",
    price: 3999,
    images: [{ 
      id: "img11", 
      url: "getOracleImageUrls()[1]" 
    }],
    printify_url: "config.mockImages.etsy",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "edm-003",
    title: "Hyperbolic Trajectory Tote Bag",
    description: "Carry your cosmic essentials in this durable tote featuring 3I/Atlas's one-way journey visualization.",
    brand: "EDM Shuffle",
    category: "Accessories",
    price: 1799,
    images: [{ 
      id: "img12", 
      url: "getOracleImageUrls()[2]" 
    }],
    printify_url: "config.printify.edmShuffleProductUrlhyperbolic-tote-bag",
    status: "New Release",
    urgent: false,
    featured: true
  }
]
