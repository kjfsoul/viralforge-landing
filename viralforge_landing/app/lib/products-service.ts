import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  images: { id: string; url: string }[];
  printify_url: string;
  status: string;
  urgent?: boolean;
  featured: boolean;
  tags?: string[];
}

export interface CSVProduct {
  shop_id: string;
  shop_title: string;
  product_id: string;
  product_title: string;
  product_description_text: string;
  tags: string;
  storefront_product_url: string;
  first_image_url: string;
  all_image_urls: string;
  variant_count: string;
  variant_ids: string;
  variant_titles: string;
  min_variant_price_cents: string;
  max_variant_price_cents: string;
  visible: string;
  is_locked: string;
  blueprint_id: string;
  print_provider_id: string;
  created_at: string;
  updated_at: string;
}

export class ProductsService {
  private static instance: ProductsService;
  private products: Product[] = [];
  private lastUpdated: Date | null = null;
  private csvPath: string;

  constructor() {
    this.csvPath = path.join(
      process.cwd(),
      "Popup_Store_Products__parsed_ (1).csv"
    );
  }

  static getInstance(): ProductsService {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }
    return ProductsService.instance;
  }

  private categorizeBrand(csvProduct: CSVProduct): string {
    // Direct mapping from CSV shop_title to brand names
    const shopTitle = csvProduct.shop_title?.trim();

    switch (shopTitle) {
      case "3iAtlas":
        return "3I/Atlas";
      case "Mystic Arcana Pop-up":
        return "Mystic Arcana";
      case "EDM Shuffle pop-up":
        return "EDM Shuffle";
      case "BirthdayGen Popup":
        return "BirthdayGen";
      default:
        // Fallback to content-based categorization for unknown shops
        const blob =
          `${csvProduct.product_title} ${csvProduct.product_description_text} ${csvProduct.tags}`.toLowerCase();

        if (
          blob.includes("mystic") ||
          blob.includes("tarot") ||
          blob.includes("oracle") ||
          blob.includes("astrology")
        ) {
          return "Mystic Arcana";
        }

        if (
          blob.includes("edm") ||
          blob.includes("rave") ||
          blob.includes("festival")
        ) {
          return "EDM Shuffle";
        }

        if (
          blob.includes("birthday") ||
          blob.includes("celebration") ||
          blob.includes("party")
        ) {
          return "BirthdayGen";
        }

        return "3I/Atlas";
    }
  }

  private parseCSV(): CSVProduct[] {
    try {
      if (!fs.existsSync(this.csvPath)) {
        console.log("CSV file not found:", this.csvPath);
        return [];
      }

      const raw = fs.readFileSync(this.csvPath, "utf8");
      const lines = raw.split("\n");
      const headers = lines[0].split(",");

      return lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          // Simple CSV parser that handles quoted fields
          const values: string[] = [];
          let current = "";
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
              values.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          values.push(current.trim());

          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = values[index] || "";
          });
          return obj as CSVProduct;
        });
    } catch (error) {
      console.error("Failed to parse CSV:", error);
      return [];
    }
  }

  private transformCSVToProducts(csvProducts: CSVProduct[]): Product[] {
    return csvProducts.map((row) => {
      const price = Number(row.min_variant_price_cents || 0) / 100; // Convert cents to dollars
      const firstImage = row.first_image_url || "/placeholder-product.jpg";

      // Parse all images from the all_image_urls field
      const allImages = row.all_image_urls
        ? row.all_image_urls.split(" | ").map((url, index) => ({
            id: `img-${index}`,
            url: url.trim(),
          }))
        : [{ id: "img-0", url: firstImage }];

      // Determine if product is urgent/featured based on content
      const isUrgent =
        row.product_title?.toLowerCase().includes("exclusive") ||
        row.product_title?.toLowerCase().includes("limited") ||
        row.product_title?.toLowerCase().includes("mars flyby");

      return {
        id: String(row.product_id),
        title: row.product_title || "",
        description: row.product_description_text || "",
        brand: this.categorizeBrand(row),
        category: this.determineCategory(row),
        price: price,
        images: allImages,
        printify_url:
          row.storefront_product_url || "https://3iatlas.printify.me/",
        status: row.visible === "True" ? "Available" : "Unavailable",
        urgent: isUrgent,
        featured: true,
        tags: (row.tags || "")
          .split("|")
          .map((t: string) => t.trim())
          .filter(Boolean),
      };
    });
  }

  private determineCategory(csvProduct: CSVProduct): string {
    const title = csvProduct.product_title?.toLowerCase() || "";
    const description =
      csvProduct.product_description_text?.toLowerCase() || "";

    if (
      title.includes("t-shirt") ||
      title.includes("shirt") ||
      title.includes("apparel")
    ) {
      return "Apparel";
    }
    if (
      title.includes("poster") ||
      title.includes("print") ||
      title.includes("art")
    ) {
      return "Art & Prints";
    }
    if (title.includes("phone case") || title.includes("case")) {
      return "Accessories";
    }
    if (title.includes("socks") || title.includes("sock")) {
      return "Accessories";
    }
    if (title.includes("tapestry") || title.includes("wall")) {
      return "Home Decor";
    }
    if (title.includes("mug") || title.includes("cup")) {
      return "Drinkware";
    }

    return "General";
  }

  async loadProducts(): Promise<Product[]> {
    try {
      console.log("Loading products from CSV...");
      const csvProducts = this.parseCSV();

      if (csvProducts.length === 0) {
        console.log("No products found in CSV, using fallback");
        return this.getFallbackProducts();
      }

      this.products = this.transformCSVToProducts(csvProducts);
      this.lastUpdated = new Date();

      console.log(`Loaded ${this.products.length} products from CSV`);
      return this.products;
    } catch (error) {
      console.error("Failed to load products:", error);
      return this.getFallbackProducts();
    }
  }

  // Load directly from Printify API (published storefront items across our shops)
  private async loadFromPrintify(): Promise<Product[]> {
    try {
      const { getPrintifyProductService } = await import(
        "./printify-product-service"
      );
      const service = getPrintifyProductService();
      // Read explicit allowlist from env
      const SHOP_IDS = {
        atlas: process.env.PRINTIFY_SHOP_ID_3IATLAS || "",
        mystic: process.env.PRINTIFY_SHOP_ID_MYSTIC_ARCANA || "",
        edm: process.env.PRINTIFY_SHOP_ID_EDM_SHUFFLE || "",
        birthday: process.env.PRINTIFY_SHOP_ID_BIRTHDAYGEN || "",
      };
      const SHOP_SUBDOMAINS: Record<string, string> = {
        [SHOP_IDS.atlas]:
          process.env.PRINTIFY_SHOP_SUBDOMAIN_3IATLAS || "3iatlas",
        [SHOP_IDS.mystic]:
          process.env.PRINTIFY_SHOP_SUBDOMAIN_MYSTIC_ARCANA || "mystic-arcana",
        [SHOP_IDS.edm]:
          process.env.PRINTIFY_SHOP_SUBDOMAIN_EDM_SHUFFLE || "edm-shuffle",
        [SHOP_IDS.birthday]:
          process.env.PRINTIFY_SHOP_SUBDOMAIN_BIRTHDAYGEN || "birthdaygen",
      };

      // If shop IDs are not provided, fall back to fetching all shops and filtering by title
      const shops: any[] = await service.getShops();
      const allowedShops = (shops || []).filter((s: any) => {
        const id = String(s?.id || "");
        if (
          SHOP_IDS.atlas ||
          SHOP_IDS.mystic ||
          SHOP_IDS.edm ||
          SHOP_IDS.birthday
        ) {
          return [
            SHOP_IDS.atlas,
            SHOP_IDS.mystic,
            SHOP_IDS.edm,
            SHOP_IDS.birthday,
          ]
            .filter(Boolean)
            .includes(id);
        }
        const t = (s?.title || s?.name || "").toLowerCase();
        return (
          t.includes("3iatlas") ||
          t.includes("mystic arcana") ||
          t.includes("edm shuffle") ||
          t.includes("birthdaygen")
        );
      });

      const allProducts: Product[] = [];
      for (const shop of allowedShops) {
        const shopId = String(shop.id);
        // Attempt to use a generic list method; if not available, the catch below will fallback
        const shopProducts: any[] = await service.getProducts(shopId);

        for (const p of shopProducts || []) {
          const isVisible =
            (p?.visible === true || p?.is_visible === true) &&
            (p?.status === "published" ||
              p?.sales_channel_properties?.some?.((scp: any) => scp?.active));
          const handle = p?.external?.handle || "";
          const subdomain =
            SHOP_SUBDOMAINS[shopId] ||
            (shop?.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const storefrontUrl = handle
            ? `https://${subdomain}.printify.me/product/${handle}`
            : "";
          const images = p?.images || p?.image || [];
          const firstImage =
            Array.isArray(images) && images.length > 0
              ? images[0]?.src || images[0]?.url
              : "";
          const minVariantPriceCents =
            p?.min_price_cents ||
            p?.min_variant_price ||
            p?.variants?.[0]?.price ||
            0;
          const price =
            typeof minVariantPriceCents === "number"
              ? minVariantPriceCents / 100
              : Number(minVariantPriceCents || 0) / 100;

          // Require a valid storefront handle URL to avoid non-product assets
          if (!isVisible || !firstImage || !storefrontUrl) continue;

          const brand = (() => {
            const id = shopId;
            if (id === SHOP_IDS.mystic) return "Mystic Arcana";
            if (id === SHOP_IDS.edm) return "EDM Shuffle";
            if (id === SHOP_IDS.birthday) return "BirthdayGen";
            return "3I/Atlas";
          })();

          const product: Product = {
            id: String(p.id || p.product_id),
            title: p.title || p.name || "",
            description: p.description || "",
            brand,
            category: "General",
            price,
            images:
              Array.isArray(images) && images.length
                ? images.map((img: any, idx: number) => ({
                    id: `img-${idx}`,
                    url: img?.src || img?.url,
                  }))
                : [{ id: "img-0", url: firstImage }],
            printify_url: storefrontUrl,
            status: "Available",
            urgent: false,
            featured: true,
            tags: Array.isArray(p?.tags) ? p.tags : [],
          };
          allProducts.push(product);
        }
      }

      this.products = allProducts;
      this.lastUpdated = new Date();
      return this.products;
    } catch (err) {
      console.warn("Printify live load failed, falling back to CSV:", err);
      return await this.loadProducts();
    }
  }

  // Public method to force refresh from Printify
  async refreshFromPrintify(): Promise<Product[]> {
    this.products = [];
    this.lastUpdated = null;
    return await this.loadFromPrintify();
  }

  async getProducts(filters?: {
    featured?: boolean;
    brand?: string;
    category?: string;
    context?: string;
    limit?: number;
  }): Promise<Product[]> {
    // Load products if not already loaded or if cache is stale
    if (this.products.length === 0 || this.shouldRefreshCache()) {
      await this.loadProducts();
    }

    // Start with only valid, storefront-ready products from our four shops
    let filteredProducts = this.products.filter((product) => {
      const imageUrl = product.images?.[0]?.url || "";
      const hasValidImage =
        typeof imageUrl === "string" &&
        (imageUrl.includes("images-api.printify.com") ||
          imageUrl.includes("images.printify.com") ||
          imageUrl.includes("cdn.printify.com"));

      const storefrontUrl = product.printify_url || "";
      const isStorefront =
        typeof storefrontUrl === "string" &&
        storefrontUrl.includes("printify.me");

      const isVisible = product.status === "Available";
      const isKnownBrand = [
        "3I/Atlas",
        "Mystic Arcana",
        "EDM Shuffle",
        "BirthdayGen",
      ].includes(product.brand);
      return hasValidImage && isStorefront && isVisible && isKnownBrand;
    });

    // Apply filters
    if (filters?.featured) {
      filteredProducts = filteredProducts.filter((product) => product.featured);
    }

    if (filters?.brand) {
      filteredProducts = filteredProducts.filter((product) =>
        product.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters?.category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    // Context-based filtering
    if (filters?.context) {
      switch (filters.context) {
        case "oracle":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.brand === "Mystic Arcana" ||
              (product.tags?.includes("mystical") ?? false) ||
              (product.tags?.includes("oracle") ?? false)
          );
          break;
        case "trajectory":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.brand === "3I/Atlas" ||
              (product.tags?.includes("trajectory") ?? false) ||
              (product.tags?.includes("mars") ?? false)
          );
          break;
        case "hero":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.urgent ||
              product.status.includes("Exclusive") ||
              product.status.includes("Limited")
          );
          break;
        case "rave":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.brand === "EDM Shuffle" ||
              (product.tags?.includes("rave") ?? false) ||
              (product.tags?.includes("festival") ?? false)
          );
          break;
        case "celebration":
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.brand === "BirthdayGen" ||
              (product.tags?.includes("celebration") ?? false) ||
              (product.tags?.includes("party") ?? false)
          );
          break;
      }
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    // Apply limit
    if (filters?.limit) {
      filteredProducts = filteredProducts.slice(0, filters.limit);
    }

    return filteredProducts;
  }

  private shouldRefreshCache(): boolean {
    if (!this.lastUpdated) return true;

    // Refresh cache every 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return this.lastUpdated < fiveMinutesAgo;
  }

  private getFallbackProducts(): Product[] {
    return [
      {
        id: "atlas-tshirt-cosmic",
        title: "3I/Atlas Cosmic Journey T-Shirt",
        description:
          "Commemorate the historic Mars flyby with this exclusive 3I/Atlas design featuring the interstellar visitor's trajectory.",
        brand: "3I/Atlas",
        category: "Apparel",
        price: 24.99,
        images: [
          {
            id: "atlas-1",
            url: "https://upload.wikimedia.org/wikipedia/commons/1/10/3I-ATLAS_noirlab2525b_crop.png",
          },
        ],
        printify_url: "https://3iatlas.printify.me/",
        status: "Mars Flyby Exclusive",
        urgent: true,
        featured: true,
        tags: ["mars", "flyby", "interstellar", "commemorative"],
      },
    ];
  }

  // Printify API integration
  async syncWithPrintify(
    shopId: string,
    blueprintId: number,
    printProviderId: number,
    variantId: number
  ): Promise<any[]> {
    try {
      const { getPrintifyProductService } = await import(
        "./printify-product-service"
      );
      const printifyService = getPrintifyProductService();

      const products = await this.getProducts();
      const syncResults = await printifyService.syncProducts(
        products,
        shopId,
        blueprintId,
        printProviderId,
        variantId
      );

      return syncResults;
    } catch (error) {
      console.error("Printify sync failed:", error);
      throw error;
    }
  }

  // Get products ready for Printify sync
  async getProductsForPrintifySync(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(
      (product) =>
        product.images &&
        product.images.length > 0 &&
        product.title &&
        product.description
    );
  }

  // Method to force refresh products
  async refreshProducts(): Promise<Product[]> {
    this.products = [];
    this.lastUpdated = null;
    return await this.loadProducts();
  }
}
