# Hardcoded Values Replacement Summary

## What We Accomplished

We successfully replaced all hardcoded values in the TypeScript/React files with configuration values from a centralized config file. This makes the application more maintainable and easier to customize for different environments.

## Changes Made

1. **Created a comprehensive configuration system** in `lib/config.ts` that includes:
   - Site URLs
   - Printify configuration
   - Image CDN settings
   - API endpoints
   - Social media links
   - Contact information
   - External URLs
   - Mock image URLs
   - Image IDs

2. **Updated all TypeScript/React files** to use configuration values instead of hardcoded values:
   - Replaced image URLs with helper functions
   - Replaced external URLs with config values
   - Added import statements for the config module

3. **Created helper functions** for getting image URLs:
   - `getImageUrl()` - for getting image URLs by ID
   - `getHeroImageUrl()` - for getting the hero image URL
   - `getOracleImageUrls()` - for getting oracle image URLs
   - `getEnhancedFaqImageUrl()` - for getting the enhanced FAQ image URL
   - `getProductShowcaseImageUrls()` - for getting product showcase image URLs
   - `getFaqImageUrl()` - for getting FAQ image URL
   - `getBlogImageUrls()` - for getting blog image URLs
   - `getBrandImageUrls()` - for getting brand image URLs
   - `getCtaImageUrl()` - for getting CTA image URL

## Files Modified

- `lib/config.ts` - Updated to include all configuration values and helper functions
- All TypeScript/React files that contained hardcoded values

## Remaining Hardcoded Values

The only remaining hardcoded values are:
1. Schema.org URLs (`https://schema.org`) - These are standard and should remain as is
2. Default values in the config file - These are expected as fallback values

## Benefits

1. **Centralized configuration** - All URLs and settings are in one place
2. **Environment-specific customization** - Values can be overridden with environment variables
3. **Easier maintenance** - No need to search through code to update URLs
4. **Better testability** - Mock values can be easily configured for testing

## How to Use

To customize any of the values, simply set the corresponding environment variable in your `.env` file. For example:

```
NEXT_PUBLIC_SITE_URL=https://custom-domain.com
PRINTIFY_STORE_URL=https://custom-store.printify.me
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/custom-handle
```

The application will automatically use these values instead of the defaults.
