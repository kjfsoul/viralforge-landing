#!/usr/bin/env node

/**
 * Printify Setup Script
 * Helps configure the Printify API integration
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupPrintify() {
  console.log('🚀 Printify API Setup Script');
  console.log('============================\n');

  try {
    // Check if .env.local exists
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
      console.log('✅ Found existing .env.local file');
    } else {
      console.log('📝 Creating new .env.local file');
    }

    // Get Printify API token
    console.log('\n1. Printify API Token');
    console.log('   Get your token from: https://printify.com/app/api');
    const apiToken = await question('   Enter your Printify API token: ');
    
    if (!apiToken) {
      console.log('❌ API token is required');
      process.exit(1);
    }

    // Get shop ID
    console.log('\n2. Shop ID');
    console.log('   Find your shop ID at: https://printify.com/app/shops');
    const shopId = await question('   Enter your shop ID: ');
    
    if (!shopId) {
      console.log('❌ Shop ID is required');
      process.exit(1);
    }

    // Get blueprint ID (product type)
    console.log('\n3. Product Type (Blueprint)');
    console.log('   Common types: T-Shirt (5), Hoodie (1), Mug (2)');
    const blueprintId = await question('   Enter blueprint ID (default: 5 for T-Shirt): ') || '5';

    // Get print provider ID
    console.log('\n4. Print Provider');
    console.log('   Common providers: Gildan (1), Bella Canvas (2)');
    const printProviderId = await question('   Enter print provider ID (default: 1 for Gildan): ') || '1';

    // Get variant ID (size)
    console.log('\n5. Default Variant (Size)');
    console.log('   Common sizes: XS (4010), S (4011), M (4012), L (4013), XL (4014)');
    const variantId = await question('   Enter variant ID (default: 4012 for M): ') || '4012';

    // Update or create .env.local
    const newEnvVars = [
      `PRINTIFY_API_TOKEN=${apiToken}`,
      `PRINTIFY_DEFAULT_SHOP_ID=${shopId}`,
      `PRINTIFY_DEFAULT_BLUEPRINT_ID=${blueprintId}`,
      `PRINTIFY_DEFAULT_PRINT_PROVIDER_ID=${printProviderId}`,
      `PRINTIFY_DEFAULT_VARIANT_ID=${variantId}`,
      `PRINTIFY_DEFAULT_POSITION=front`,
      `PRINTIFY_DEFAULT_SCALE=100`,
      `PRINTIFY_DEFAULT_ANGLE=0`
    ];

    // Remove existing Printify vars and add new ones
    const lines = envContent.split('\n');
    const filteredLines = lines.filter(line => !line.startsWith('PRINTIFY_'));
    const updatedContent = [...filteredLines, ...newEnvVars].join('\n');

    fs.writeFileSync(envPath, updatedContent);
    console.log('\n✅ Configuration saved to .env.local');

    // Test the configuration
    console.log('\n6. Testing Configuration...');
    console.log('   Starting development server to test...');
    
    console.log('\n🎉 Setup Complete!');
    console.log('\nNext steps:');
    console.log('1. Start your dev server: pnpm dev');
    console.log('2. Visit: http://localhost:3002/admin/printify');
    console.log('3. Test your connection using the admin panel');
    console.log('4. Sync your products to Printify');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the setup
setupPrintify();
