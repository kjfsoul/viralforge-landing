# Printify API Integration Guide for AI Assistant

This guide provides comprehensive instructions for managing products across multiple Printify stores using the API integration.

## Overview

The Printify API integration allows you to:
- Manage multiple shops (including popup stores) from a single account
- Create, update, and delete products programmatically
- Sync products across different stores
- Publish products to make them live
- Handle image uploads and product variants

## API Endpoints

### Base URL
```
https://api.printify.com/v1/
```

### Authentication
- **Header**: `Authorization: Bearer <YOUR_API_TOKEN>`
- **Header**: `User-Agent: 3IAtlas-API/1.0`

## Available API Routes

### 1. Shop Management
```http
GET /api/printify/shops
```
**Response**: List of all shops in the account
```json
{
  "success": true,
  "shops": [
    {
      "id": "shop_id_1",
      "title": "Main Store",
      "sales_channel": "printify"
    }
  ]
}
```

### 2. Product Types (Blueprints)
```http
GET /api/printify/blueprints
```
**Response**: Available product types (t-shirts, mugs, etc.)

### 3. Print Providers
```http
GET /api/printify/print-providers?blueprintId=5
```
**Response**: Available print providers for a specific product type

### 4. Product Variants
```http
GET /api/printify/variants?blueprintId=5&printProviderId=1
```
**Response**: Available variants (sizes, colors) for a product type and print provider

### 5. Product Management
```http
# Get all products in a shop
GET /api/printify/products?shopId=shop_id_1

# Create a new product
POST /api/printify/products
Content-Type: application/json
{
  "product": {
    "title": "My T-Shirt",
    "description": "A great t-shirt",
    "price": 25.00,
    "image_url": "https://example.com/image.jpg",
    "tags": ["tshirt", "custom"]
  },
  "shopId": "shop_id_1",
  "blueprintId": 5,
  "printProviderId": 1,
  "variantId": 4012,
  "imageId": "optional_printify_image_id"
}

# Update a product
PUT /api/printify/products/product_id?shopId=shop_id_1
Content-Type: application/json
{
  "updates": {
    "title": "Updated Title",
    "price": 30.00
  }
}

# Delete a product
DELETE /api/printify/products/product_id?shopId=shop_id_1
```

### 6. Product Publishing
```http
# Publish a product to make it live
POST /api/printify/products/product_id/publish?shopId=shop_id_1

# Unpublish a product
POST /api/printify/products/product_id/unpublish?shopId=shop_id_1
```

### 7. Bulk Product Sync
```http
POST /api/printify/sync
Content-Type: application/json
{
  "products": [
    {
      "title": "Product 1",
      "description": "Description 1",
      "price": 25.00,
      "image_url": "https://example.com/image1.jpg"
    }
  ],
  "shopId": "shop_id_1",
  "blueprintId": 5,
  "printProviderId": 1,
  "variantId": 4012
}
```

## Common Product Types and IDs

### Blueprints (Product Types)
- **T-Shirt**: 5
- **Hoodie**: 1
- **Mug**: 2
- **Poster**: 3
- **Sticker**: 4
- **Phone Case**: 6
- **Tote Bag**: 7
- **Socks**: 8
- **Fanny Pack**: 9
- **Wall Tapestry**: 10

### Print Providers
- **Gildan**: 1
- **Bella Canvas**: 2
- **Next Level**: 3
- **Comfort Colors**: 4
- **American Apparel**: 5

### Common Variants (T-Shirt Sizes)
- **XS**: 4010
- **S**: 4011
- **M**: 4012
- **L**: 4013
- **XL**: 4014
- **2XL**: 4015
- **3XL**: 4016

## Workflow Examples

### 1. Create a Product in Multiple Stores

```javascript
// 1. Get all shops
const shopsResponse = await fetch('/api/printify/shops');
const { shops } = await shopsResponse.json();

// 2. Create product in each shop
for (const shop of shops) {
  const productData = {
    product: {
      title: "Cosmic T-Shirt",
      description: "A mystical cosmic design",
      price: 29.99,
      image_url: "https://example.com/cosmic-tshirt.jpg",
      tags: ["cosmic", "mystical", "tshirt"]
    },
    shopId: shop.id,
    blueprintId: 5, // T-shirt
    printProviderId: 1, // Gildan
    variantId: 4012 // M size
  };

  const response = await fetch('/api/printify/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });

  const result = await response.json();
  if (result.success) {
    console.log(`Product created in ${shop.title}: ${result.product.id}`);
  }
}
```

### 2. Update Product Prices Across All Stores

```javascript
// 1. Get all shops
const shopsResponse = await fetch('/api/printify/shops');
const { shops } = await shopsResponse.json();

// 2. Get products from each shop
for (const shop of shops) {
  const productsResponse = await fetch(`/api/printify/products?shopId=${shop.id}`);
  const { products } = await productsResponse.json();

  // 3. Update each product
  for (const product of products) {
    const updateData = {
      updates: {
        price: product.price * 1.1 // 10% price increase
      }
    };

    await fetch(`/api/printify/products/${product.id}?shopId=${shop.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
  }
}
```

### 3. Publish All Products in a Store

```javascript
const shopId = "your_shop_id";

// 1. Get all products
const productsResponse = await fetch(`/api/printify/products?shopId=${shopId}`);
const { products } = await productsResponse.json();

// 2. Publish each product
for (const product of products) {
  const publishResponse = await fetch(`/api/printify/products/${product.id}/publish?shopId=${shopId}`, {
    method: 'POST'
  });
  
  const result = await publishResponse.json();
  console.log(`Product ${product.id} published: ${result.success}`);
}
```

### 4. Sync CSV Products to Printify

```javascript
// 1. Get products from CSV (using existing ProductsService)
const productsResponse = await fetch('/api/products');
const { data: products } = await productsResponse.json();

// 2. Sync to Printify
const syncData = {
  products: products,
  shopId: "your_shop_id",
  blueprintId: 5, // T-shirt
  printProviderId: 1, // Gildan
  variantId: 4012 // M size
};

const syncResponse = await fetch('/api/printify/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(syncData)
});

const syncResult = await syncResponse.json();
console.log('Sync results:', syncResult.results);
```

## Error Handling

All API responses follow this format:

```json
{
  "success": true|false,
  "error": "Error message if success is false",
  "data": "Response data if success is true"
}
```

Common error scenarios:
- **401 Unauthorized**: Invalid API token
- **400 Bad Request**: Missing required parameters
- **404 Not Found**: Shop or product not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

## Rate Limits

- **Global**: 600 requests per minute
- **Catalog endpoints**: 100 requests per minute
- **Product publishing**: 200 requests per 30 minutes

## Environment Variables Required

```bash
PRINTIFY_API_TOKEN=your_api_token_here
PRINTIFY_DEFAULT_SHOP_ID=your_default_shop_id
PRINTIFY_DEFAULT_BLUEPRINT_ID=5
PRINTIFY_DEFAULT_PRINT_PROVIDER_ID=1
PRINTIFY_DEFAULT_VARIANT_ID=4012
```

## Best Practices

1. **Always check for errors** in API responses
2. **Use appropriate rate limiting** to avoid hitting API limits
3. **Upload images first** before creating products
4. **Test with a single product** before bulk operations
5. **Keep track of product IDs** for future updates
6. **Use the sync endpoint** for bulk operations
7. **Publish products** after creation to make them live

## Integration with Existing Products

The system integrates with your existing CSV-based product system:

- Products from CSV can be synced to Printify using `/api/products?sync_printify=true`
- The existing `/api/products` endpoint now supports Printify sync
- All product data is maintained in both systems

## Support

For issues with the Printify API integration:
1. Check the console logs for detailed error messages
2. Verify your API token is correct
3. Ensure all required parameters are provided
4. Check rate limits if requests are failing

The integration is designed to be robust and will continue working even if Printify sync fails, falling back to the CSV-based system.
