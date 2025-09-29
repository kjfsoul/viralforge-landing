import { config } from "@/lib/config"
import { Product } from './types'

// REAL PRINTIFY PRODUCTS - No more fucking mock data
export const REAL_PRODUCTS: Product[] = [
  // 3I/ATLAS BRAND - Featured Products
  {
    id: "68cf870d4a1cc466510fb858",
    title: "Blast Off to the Cosmos with the 3I/Atlas Galaxy Journey Phone Case!",
    description: "Premium phone case featuring the 3I/Atlas interstellar journey design",
    brand: "3I/Atlas",
    category: "Accessories",
    price: 1788,
    images: [{
      id: "img1",
      url: "https://images-api.printify.com/mockup/68cf870d4a1cc466510fb858/112191/105690/blast-off-to-the-cosmos-with-the-3iatlas-galaxy-journey-phone-case.jpg?camera_label=front"
    }],
    printify_url: "https://3iatlas.printify.me/product/23365971",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cf870d4a1cc466510fb857",
    title: "3I/ATLAS Mystic Eye Wall Tapestry — Cosmic Symbol Art",
    description: "Beautiful wall tapestry featuring the 3I/Atlas mystic eye cosmic symbol design",
    brand: "3I/Atlas",
    category: "Home Decor",
    price: 5513,
    images: [{
      id: "img2",
      url: "https://images-api.printify.com/mockup/68cf870d4a1cc466510fb857/46151/2283/3iatlas-mystic-eye-wall-tapestry-cosmic-symbol-art-for-bedroom-studio-decor.jpg?camera_label=front"
    }],
    printify_url: "https://3iatlas.printify.me/product/23365981",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cf870c4a1cc466510fb856",
    title: "Unleash Your Inner Alien with the 3I/Atlas Cosmic Dream Phone Case!",
    description: "Unique phone case with alien and cosmic dream design",
    brand: "3I/Atlas",
    category: "Accessories",
    price: 1788,
    images: [{
      id: "img3",
      url: "https://images-api.printify.com/mockup/68cf870c4a1cc466510fb856/112191/105690/unleash-your-inner-alien-with-the-3iatlas-cosmic-dream-phone-case.jpg?camera_label=front"
    }],
    printify_url: "https://3iatlas.printify.me/product/23365998",
    status: "Available",
    urgent: false,
    featured: true
  },

  // MYSTIC ARCANA BRAND - Featured Products
  {
    id: "68d0575a1ad5bb78200db0ee",
    title: "3I/ATLAS Cosmic Abduction T-Shirt",
    description: "Premium t-shirt featuring the cosmic abduction design",
    brand: "Mystic Arcana",
    category: "Apparel",
    price: 2499,
    images: [{
      id: "img4",
      url: "https://images-api.printify.com/mockup/68d0575a1ad5bb78200db0ee/40699/109464/3iatlas-cosmic-abduction-t-shirt.jpg?camera_label=front"
    }],
    printify_url: "https://mystic-arcana-pop-up.printify.me/product/23423067",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68d057541ad5bb78200db0e5",
    title: "Welcome Aboard the Atlas: Galactic Odyssey Sci-Fi Poster",
    description: "Stunning sci-fi poster for space lovers and home decoration",
    brand: "Mystic Arcana",
    category: "Art & Posters",
    price: 718,
    images: [{
      id: "img5",
      url: "https://images-api.printify.com/mockup/68d057541ad5bb78200db0e5/43135/94677/welcome-aboard-the-atlas-galactic-odyssey-sci-fi-poster-space-decor-cosmic-wall-art-gift-for-sci-fi-lovers.jpg?camera_label=front"
    }],
    printify_url: "https://mystic-arcana-pop-up.printify.me/product/23439785",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cfaffb4a1cc466510fc110",
    title: "Alien DJ Graphic Tee — Neon Cosmic Retro Unisex Tee",
    description: "Retro sci-fi alien DJ design on comfortable unisex tee",
    brand: "Mystic Arcana",
    category: "Apparel",
    price: 2298,
    images: [{
      id: "img6",
      url: "https://images-api.printify.com/mockup/68cfaffb4a1cc466510fc110/18542/92547/alien-dj-graphic-tee-neon-cosmic-retro-unisex-tee.jpg?camera_label=front"
    }],
    printify_url: "https://mystic-arcana-pop-up.printify.me/products",
    status: "Available",
    urgent: false,
    featured: true
  },

  // EDM SHUFFLE BRAND - Featured Products
  {
    id: "68cfa59008ca4dcdc40590e6",
    title: "Galactic Adventure Men's Tank Top - AOP, Cosmic Apparel",
    description: "All-over print cosmic tank top for festival wear and summer outings",
    brand: "EDM Shuffle",
    category: "Apparel",
    price: 1799,
    images: [{
      id: "img7",
      url: "https://images-api.printify.com/mockup/68cfa59008ca4dcdc40590e6/79354/110529/galactic-adventure-mens-tank-top-aop-cosmic-apparel-festival-wear-summer-outing-space-lover-gift.jpg?camera_label=on-person-left"
    }],
    printify_url: "https://edm-shuffle-pop-up.printify.me/product/23367828",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cfa58f08ca4dcdc40590e5",
    title: "Elevate Your Style with Our 3I-ATLAS Feature Series- Alien Print Tote Bag",
    description: "Unique alien print tote bag with 3I/Atlas cosmic design",
    brand: "EDM Shuffle",
    category: "Accessories",
    price: 1423,
    images: [{
      id: "img8",
      url: "https://images-api.printify.com/mockup/68cfa58f08ca4dcdc40590e5/103599/100877/elevate-your-style-with-our-3i-atlas-feature-series-alien-print-tote-bag-aop.jpg?camera_label=front"
    }],
    printify_url: "https://edm-shuffle-pop-up.printify.me/product/23442430",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cfa58d08ca4dcdc40590e3",
    title: "Soundwaves and Starships- Alien DJ Sweatshirt",
    description: "Intergalactic music voyager sweatshirt with space aesthetic and EDM streetwear style",
    brand: "EDM Shuffle",
    category: "Apparel",
    price: 3947,
    images: [{
      id: "img9",
      url: "https://images-api.printify.com/mockup/68cfa58d08ca4dcdc40590e3/25458/98502/soundwaves-and-starships-alien-dj-sweatshirt-intergalactic-music-voyager-space-aesthetic-edm-streetwear-sci-fi-vibes-unisex-style-festival-ready-fit.jpg?camera_label=front"
    }],
    printify_url: "https://edm-shuffle-pop-up.printify.me/product/23442325",
    status: "Available",
    urgent: false,
    featured: true
  },

  // BIRTHDAYGEN BRAND - Featured Products
  {
    id: "68cfa726c4e7b96d000a2f3c",
    title: "Cosmic Wanderer's Warp: 3I/ATLAS Inspired Pink Alien Fanny Pack",
    description: "Unique fanny pack with 3I/Atlas inspired pink alien design",
    brand: "BirthdayGen",
    category: "Accessories",
    price: 3350,
    images: [{
      id: "img10",
      url: "https://images-api.printify.com/mockup/68cfa726c4e7b96d000a2f3c/65045/6109/cosmic-wanderers-warp-3iatlas-inspired-pink-alien-fanny-pack.jpg?camera_label=front"
    }],
    printify_url: "https://birthdaygen-popup.printify.me/product/23367533",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cfa47353401ee3a2084130",
    title: "Galactic Adventure Men's Tank Top - AOP, Cosmic Apparel",
    description: "All-over print cosmic tank top perfect for birthday celebrations and summer outings",
    brand: "BirthdayGen",
    category: "Apparel",
    price: 1703,
    images: [{
      id: "img11",
      url: "https://images-api.printify.com/mockup/68cfa47353401ee3a2084130/79354/110529/galactic-adventure-mens-tank-top-aop-cosmic-apparel-festival-wear-summer-outing-space-lover-gift.jpg?camera_label=on-person-left"
    }],
    printify_url: "https://birthdaygen-popup.printify.me/products",
    status: "Available",
    urgent: false,
    featured: true
  },
  {
    id: "68cfa47253401ee3a208412f",
    title: "Elevate Your Style with Our 3I-ATLAS Feature Series- Alien Print Tote Bag",
    description: "Birthday celebration tote bag with cosmic alien print design",
    brand: "BirthdayGen",
    category: "Accessories",
    price: 1423,
    images: [{
      id: "img12",
      url: "https://images-api.printify.com/mockup/68cfa47253401ee3a208412f/103599/100877/elevate-your-style-with-our-3i-atlas-feature-series-alien-print-tote-bag-aop.jpg?camera_label=front"
    }],
    printify_url: "https://birthdaygen-popup.printify.me/products",
    status: "Available",
    urgent: false,
    featured: true
  }
]

// Export for backward compatibility
export const MOCK_PRODUCTS = REAL_PRODUCTS
