#!/bin/bash

# Navigate to the app directory
cd "/Users/kfitz/Mystic Arcana/3IAtlas/3IAtlasSite/viralforge_landing/app"

# Remove node_modules if it exists
if [ -d "node_modules" ]; then
    echo "Removing node_modules directory..."
    rm -rf node_modules
fi

# Remove .next if it exists
if [ -d ".next" ]; then
    echo "Removing .next directory..."
    rm -rf .next
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files to git..."
git add .

# Check status
echo "Git status:"
git status --porcelain | wc -l

# Commit
echo "Committing changes..."
git commit -m "Initial commit: 3IAtlas Next.js app with CSV product data"

echo "Done!"
