# Printify API Setup Guide

## Quick Start

Your Printify API integration is now fully implemented! Here's how to set it up and use it.

## 1. Environment Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Printify API Configuration
PRINTIFY_API_TOKEN=your_printify_api_token_here
PRINTIFY_DEFAULT_SHOP_ID=your_default_shop_id
PRINTIFY_DEFAULT_BLUEPRINT_ID=5
PRINTIFY_DEFAULT_PRINT_PROVIDER_ID=1
PRINTIFY_DEFAULT_VARIANT_ID=4012
```

## 2. Getting Your Printify API Token

1. Go to [Printify API Settings](https://printify.com/app/api)
2. Click "Generate new token"
3. Copy the token and add it to your `.env.local` file

## 3. Finding Your Shop ID

1. Visit [Printify Shops](https://printify.com/app/shops)
2. Click on your shop
3. The shop ID is in the URL: `https://printify.com/app/shops/{SHOP_ID}`
4. Add this to your `.env.local` file

## 4. Testing the Integration

### Test API Connection
```bash
curl http://localhost:3002/api/printify/test
```

### Test Product Sync
```bash
curl -X POST http://localhost:3002/api/printify/sync \
  -H "Content-Type: application/json" \
  -d '{
    "products": [{"title": "Test Product", "description": "Test", "price": 25.00, "images": [{"id": "1", "url": "https://example.com/image.jpg"}]}],
    "shopId": "your_shop_id",
    "blueprintId": 5,
    "printProviderId": 1,
    "variantId": 4012
  }'
```

## 5. Using the Admin Panel

1. Start your development server: `pnpm dev`
2. Visit: `http://localhost:3002/admin/printify`
3. Use the admin panel to:
   - Test your API connection
   - Sync products from CSV to Printify
   - Publish products to make them live
   - Manage multiple shops

## 6. API Endpoints Available

### Shop Management
- `GET /api/printify/shops` - List all shops
- `GET /api/printify/blueprints` - List product types
- `GET /api/printify/print-providers?blueprintId=5` - List print providers
- `GET /api/printify/variants?blueprintId=5&printProviderId=1` - List variants

### Product Management
- `GET /api/printify/products?shopId=SHOP_ID` - List products in shop
- `POST /api/printify/products` - Create new product
- `PUT /api/printify/products/PRODUCT_ID?shopId=SHOP_ID` - Update product
- `DELETE /api/printify/products/PRODUCT_ID?shopId=SHOP_ID` - Delete product
- `POST /api/printify/products/PRODUCT_ID/publish?shopId=SHOP_ID` - Publish product

### Bulk Operations
- `POST /api/printify/sync` - Sync multiple products
- `GET /api/products?sync_printify=true` - Sync CSV products to Printify

## 7. Common Product Types and IDs

### Blueprints (Product Types)
- T-Shirt: 5
- Hoodie: 1
- Mug: 2
- Poster: 3
- Phone Case: 6
- Tote Bag: 7

### Print Providers
- Gildan: 1
- Bella Canvas: 2
- Next Level: 3

### T-Shirt Variants (Sizes)
- XS: 4010
- S: 4011
- M: 4012
- L: 4013
- XL: 4014
- 2XL: 4015

## 8. Integration with Your AI Assistant

Your AI assistant can now:

1. **Create products** in multiple Printify stores
2. **Update product information** across all stores
3. **Sync CSV products** to Printify automatically
4. **Publish products** to make them live
5. **Manage multiple shops** from one interface

### Example AI Commands:
- "Sync all CSV products to Printify"
- "Create a new t-shirt product in all stores"
- "Update the price of all products by 10%"
- "Publish all products in the main store"

## 9. Troubleshooting

### Common Issues:

1. **401 Unauthorized**: Check your API token
2. **405 Method Not Allowed**: Image upload endpoint issue (known limitation)
3. **Rate Limit Exceeded**: Wait and retry (600 requests/minute limit)
4. **Product Creation Fails**: Check that all required fields are provided

### Debug Steps:
1. Test connection: `curl http://localhost:3002/api/printify/test`
2. Check console logs for detailed error messages
3. Verify environment variables are set correctly
4. Ensure your Printify account has the necessary permissions

## 10. Next Steps

1. Set up your environment variables
2. Test the connection using the admin panel
3. Sync your existing CSV products to Printify
4. Configure your AI assistant to use the new API endpoints
5. Set up automated product management workflows

## Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your API token and shop ID are correct
3. Test individual endpoints to isolate the problem
4. Check the Printify API documentation for specific error codes

The integration is designed to be robust and will fall back to CSV-based products if Printify sync fails.
