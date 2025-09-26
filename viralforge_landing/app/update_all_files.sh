#!/bin/bash

# This script replaces all hardcoded values with configuration values in a single command

# Create a backup directory
mkdir -p backup

# Find all TypeScript/React files with hardcoded values
FILES=$(find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v ".next" | xargs grep -l "https://")

# Process each file
for file in $FILES; do
    echo "Processing $file..."
    cp "$file" "backup/$(basename "$file")"
    
    # Replace image URLs with helper functions
    sed -i '' 's|https://cdn\.abacus\.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5\.png|getHeroImageUrl()|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042\.png|getOracleImageUrls()[1]|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580\.png|getOracleImageUrls()[2]|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/554503fc-f3d3-4064-a8ae-eda83a5dc1a3\.png|getEnhancedFaqImageUrl()|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/ee292963-6c15-4b8b-a97d-bbcb51419d71\.png|getProductShowcaseImageUrls()[0]|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/18c61f33-c02e-4f50-892c-0f2d9f485a4b\.png|getProductShowcaseImageUrls()[1]|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/9f5c8620-0ec3-4392-9c16-ab9aa2f6ef1f\.png|getProductShowcaseImageUrls()[2]|g' "$file"
    sed -i '' 's|https://cdn\.abacus\.ai/images/ff55bffe-a3dd-4031-a90d-0c25faf0d017\.png|getFaqImageUrl()|g' "$file"
    
    # Replace external URLs with config values
    sed -i '' 's|https://mysticarcana\.com|config.external.mysticArcana|g' "$file"
    sed -i '' 's|https://edmshuffle\.com|config.external.edmShuffle|g' "$file"
    sed -i '' 's|https://3iatlas\.printify\.me|config.printify.storeUrl|g' "$file"
    sed -i '' 's|https://etsy\.com/shop/MysticArcana3I|config.external.etsyMysticArcana|g' "$file"
    sed -i '' 's|https://amazon\.com/stores/MysticArcana|config.external.amazonMysticArcana|g' "$file"
    sed -i '' 's|https://redbubble\.com/people/MysticArcana|config.external.redbubbleMysticArcana|g' "$file"
    sed -i '' 's|https://etsy\.com/shop/EDMShuffle3I|config.external.etsyEDMShuffle|g' "$file"
    sed -i '' 's|https://amazon\.com/stores/EDMShuffle|config.external.amazonEDMShuffle|g' "$file"
    sed -i '' 's|https://discord\.gg/3iatlas|config.social.discord|g' "$file"
    
    # Add import statement if not already present
    if ! grep -q "import { config" "$file"; then
        sed -i '' '1i\
import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl } from "@/lib/config"
' "$file"
    fi
done

echo "All files have been updated successfully!"
