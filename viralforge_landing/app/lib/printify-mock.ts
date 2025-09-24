
// Mock Printify data until API is fully integrated
export const MOCK_PRODUCTS = [
  {
    id: "3i-atlas-001",
    title: "3I/Atlas Interstellar Journey T-Shirt",
    description: "Commemorate humanity's third interstellar visitor with this exclusive design featuring 3I/Atlas's trajectory through our solar system.",
    brand: "3I/Atlas",
    category: "Apparel", 
    price: 2499, // $24.99 in cents
    images: [{ 
      id: "img1", 
      url: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png" 
    }],
    printify_url: "https://i.pinimg.com/736x/28/a8/cf/28a8cf1db2d2e087f11604aff2197ca9.jpg",
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
      url: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png" 
    }],
    printify_url: "https://i.pinimg.com/736x/37/9d/51/379d515b9a7f858d9da361970e43160d.jpg", 
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
      url: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png" 
    }],
    printify_url: "https://m.media-amazon.com/images/I/81hDbMK6uIL.jpg",
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
      url: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png" 
    }],
    printify_url: "https://mysticarcana.printify.me/product/astrology-mug",
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
      url: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png" 
    }],
    printify_url: "https://m.media-amazon.com/images/I/71pnCj9wQjL._AC_SY350_QL65_.jpg",
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
      url: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png" 
    }],
    printify_url: "https://edmshuffle.printify.me/product/cosmic-bass-hoodie",
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
      url: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png" 
    }],
    printify_url: "https://birthdaygen.printify.me/product/interstellar-birthday-cards",
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
      url: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png" 
    }],
    printify_url: "https://birthdaygen.printify.me/product/cosmic-party-pack",
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
      url: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png" 
    }],
    printify_url: "https://mysticarcana.printify.me/product/perihelion-stickers",
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
      url: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png" 
    }],
    printify_url: "https://images.teepublic.com/derived/production/designs/335480_1/1447944103/i_m:bi_production_blanks_e6cc3yohhabggbsez5ct_1697685424,c_70_285_416x,bc_3d3d3d,s_630,q_90.jpg",
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
      url: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png" 
    }],
    printify_url: "https://i.etsystatic.com/22621809/r/il/48fc6b/3234608599/il_fullxfull.3234608599_6qv5.jpg",
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
      url: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png" 
    }],
    printify_url: "https://edmshuffle.printify.me/product/hyperbolic-tote-bag",
    status: "New Release",
    urgent: false,
    featured: true
  }
]
