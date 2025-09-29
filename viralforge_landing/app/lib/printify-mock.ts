import { config } from "@/lib/config"
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
      url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop"
    }],
    printify_url: "https://3i-atlas-mock-product-1.com",
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
      url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop"
    }],
    printify_url: "https://3i-atlas-mock-product-2.com",
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
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    }],
    printify_url: "https://mystic-arcana-mock-product-1.com",
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
      url: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop"
    }],
    printify_url: "https://mystic-arcana-mock-product-2.com",
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
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    }],
    printify_url: "https://edm-shuffle-mock-product-1.com",
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
      url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
    }],
    printify_url: "https://edm-shuffle-mock-product-2.com",
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
      url: "https://images.unsplash.com/photo-1518047601542-79f18c655718?w=400&h=400&fit=crop"
    }],
    printify_url: "https://birthday-gen-mock-product-1.com",
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
      url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop"
    }],
    printify_url: "https://birthday-gen-mock-product-2.com",
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
      url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=400&h=400&fit=crop"
    }],
    printify_url: "https://3i-atlas-mock-product-3.com",
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
      url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
    }],
    printify_url: "https://3i-atlas-mock-product-4.com",
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
      url: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=400&fit=crop"
    }],
    printify_url: "https://mystic-arcana-mock-product-3.com",
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
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
    }],
    printify_url: "https://edm-shuffle-mock-product-3.com",
    status: "New Release",
    urgent: false,
    featured: true
  }
]
