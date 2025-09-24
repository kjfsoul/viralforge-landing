/**
 * Printify Configuration
 * Centralized configuration for Printify API integration
 */

export interface PrintifyConfig {
  apiToken: string;
  defaultShopId?: string;
  defaultBlueprintId: number;
  defaultPrintProviderId: number;
  defaultVariantId: number;
  defaultPosition: string;
  defaultScale: number;
  defaultAngle: number;
  userAgent: string;
}

export function getPrintifyConfig(): PrintifyConfig {
  const apiToken = process.env.PRINTIFY_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('PRINTIFY_API_TOKEN environment variable is required');
  }

  return {
    apiToken,
    defaultShopId: process.env.PRINTIFY_DEFAULT_SHOP_ID,
    defaultBlueprintId: parseInt(process.env.PRINTIFY_DEFAULT_BLUEPRINT_ID || '5'), // T-shirt
    defaultPrintProviderId: parseInt(process.env.PRINTIFY_DEFAULT_PRINT_PROVIDER_ID || '1'),
    defaultVariantId: parseInt(process.env.PRINTIFY_DEFAULT_VARIANT_ID || '4011'), // S size
    defaultPosition: process.env.PRINTIFY_DEFAULT_POSITION || 'front',
    defaultScale: parseInt(process.env.PRINTIFY_DEFAULT_SCALE || '100'),
    defaultAngle: parseInt(process.env.PRINTIFY_DEFAULT_ANGLE || '0'),
    userAgent: '3IAtlas-API/1.0'
  };
}

// Common Printify product types and their IDs
export const PRINTIFY_BLUEPRINTS = {
  TSHIRT: 5,
  HOODIE: 1,
  MUG: 2,
  POSTER: 3,
  STICKER: 4,
  PHONE_CASE: 6,
  TOTE_BAG: 7,
  SOCKS: 8,
  FANNY_PACK: 9,
  WALL_TAPESTRY: 10
} as const;

// Common print providers
export const PRINTIFY_PRINT_PROVIDERS = {
  GILDAN: 1,
  BELLA_CANVAS: 2,
  NEXT_LEVEL: 3,
  COMFORT_COLORS: 4,
  AMERICAN_APPAREL: 5
} as const;

// Common variant IDs for different sizes
export const PRINTIFY_VARIANTS = {
  // T-shirt sizes
  TSHIRT_XS: 4010,
  TSHIRT_S: 4011,
  TSHIRT_M: 4012,
  TSHIRT_L: 4013,
  TSHIRT_XL: 4014,
  TSHIRT_2XL: 4015,
  TSHIRT_3XL: 4016,
  
  // Hoodie sizes
  HOODIE_XS: 4020,
  HOODIE_S: 4021,
  HOODIE_M: 4022,
  HOODIE_L: 4023,
  HOODIE_XL: 4024,
  HOODIE_2XL: 4025,
  
  // Mug sizes
  MUG_11OZ: 4030,
  MUG_15OZ: 4031,
  
  // Poster sizes
  POSTER_8X10: 4040,
  POSTER_11X14: 4041,
  POSTER_12X16: 4042,
  POSTER_16X20: 4043,
  POSTER_18X24: 4044,
  
  // Phone case sizes
  PHONE_CASE_IPHONE_12: 4050,
  PHONE_CASE_IPHONE_13: 4051,
  PHONE_CASE_IPHONE_14: 4052,
  PHONE_CASE_SAMSUNG_GALAXY_S21: 4053,
  
  // Tote bag sizes
  TOTE_BAG_13X13: 4060,
  TOTE_BAG_15X15: 4061,
  
  // Sock sizes
  SOCKS_ONE_SIZE: 4070,
  
  // Fanny pack sizes
  FANNY_PACK_ONE_SIZE: 4080,
  
  // Wall tapestry sizes
  WALL_TAPESTRY_26X36: 4090,
  WALL_TAPESTRY_50X60: 4091,
  WALL_TAPESTRY_68X80: 4092,
  WALL_TAPESTRY_88X104: 4093
} as const;

// Position constants for print areas
export const PRINTIFY_POSITIONS = {
  FRONT: 'front',
  BACK: 'back',
  LEFT: 'left',
  RIGHT: 'right',
  SLEEVE_LEFT: 'sleeve_left',
  SLEEVE_RIGHT: 'sleeve_right'
} as const;
