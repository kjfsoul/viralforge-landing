#!/bin/bash

# This script replaces all remaining hardcoded values with configuration values

# Create a backup directory
mkdir -p backup

# Find all TypeScript/React files with hardcoded values
FILES=$(find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v ".next" | xargs grep -l "https://")

# Process each file
for file in $FILES; do
    echo "Processing $file..."
    cp "$file" "backup/$(basename "$file")"
    
    # Replace schema.org URLs (these are standard and should remain as is)
    # Replace Twitter share URL
    sed -i '' 's|https://twitter.com/intent/tweet|config.social.twitterShareUrl|g' "$file"
    
    # Replace remaining image URLs
    sed -i '' 's|https://cdn\.abacus\.ai/images/f7568d5f-de1e-4130-adf6-280256d622c6\.png|getImageUrl("f7568d5f-de1e-4130-adf6-280256d622c6")|g' "$file"
    
    # Replace Printify API URL
    sed -i '' 's|https://api\.printify\.com/v1|config.printify.apiUrl|g' "$file"
    
    # Replace mock product URLs
    sed -i '' 's|https://i\.pinimg\.com/736x/28/a8/cf/28a8cf1db2d2e087f11604aff2197ca9\.jpg|config.mockImages.pinimg1|g' "$file"
    sed -i '' 's|https://i\.pinimg\.com/736x/37/9d/51/379d515b9a7f858d9da361970e43160d\.jpg|config.mockImages.pinimg2|g' "$file"
    sed -i '' 's|https://m\.media-amazon\.com/images/I/81hDbMK6uIL\.jpg|config.mockImages.amazon1|g' "$file"
    sed -i '' 's|https://m\.media-amazon\.com/images/I/71pnCj9wQjL\._AC_SY350_QL65_\.jpg|config.mockImages.amazon2|g' "$file"
    sed -i '' 's|https://images\.teepublic\.com/derived/production/designs/335480_1/1447944103/i_m:bi_production_blanks_e6cc3yohhabggbsez5ct_1697685424,c_70_285_416x,bc_3d3d3d,s_630,q_90\.jpg|config.mockImages.teepublic|g' "$file"
    sed -i '' 's|https://i\.etsystatic\.com/22621809/r/il/48fc6b/3234608599/il_fullxfull\.3234608599_6qv5\.jpg|config.mockImages.etsy|g' "$file"
    
    # Replace Printify store URLs
    sed -i '' 's|https://mysticarcana\.printify\.me/product/|config.printify.mysticArcanaProductUrl|g' "$file"
    sed -i '' 's|https://edmshuffle\.printify\.me/product/|config.printify.edmShuffleProductUrl|g' "$file"
    sed -i '' 's|https://birthdaygen\.printify\.me/product/|config.printify.birthdayGenProductUrl|g' "$file"
    
    # Add import statement if not already present
    if ! grep -q "import { config" "$file"; then
        sed -i '' '1i\
import { config, getImageUrl } from "@/lib/config"
' "$file"
    fi
done

echo "All files have been updated successfully!"
