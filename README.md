# 3I Atlas Project

A Next.js e-commerce application for the 3I Atlas brand with product management and display functionality.

## Features

- Next.js 14 application with TypeScript
- Product data from CSV files
- Brand categorization (Mystic Arcana, EDM Shuffle, BirthdayGen, 3I/Atlas)
- Responsive design
- API endpoints for product management

## Project Structure

- `viralforge_landing/app/` - Main Next.js application
- `Popup_Store_Products__parsed_ (1).csv` - Product data source
- Various documentation and configuration files

## Getting Started

1. Navigate to the app directory:
   ```bash
   cd viralforge_landing/app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3002](http://localhost:3002) in your browser.

## API Endpoints

- `/api/products` - Get all products with brand categorization
- `/api/test` - Test endpoint

## Product Data

Products are loaded from CSV files and categorized by brand based on keywords in titles and descriptions:
- **Mystic Arcana**: tarot, oracle, astrology, mystic
- **EDM Shuffle**: edm, rave, festival
- **BirthdayGen**: birthday, celebration, party
- **3I/Atlas**: default category

## Development

The application uses:
- Next.js 14
- TypeScript
- Tailwind CSS
- Custom CSV parsing
- Brand categorization logic
