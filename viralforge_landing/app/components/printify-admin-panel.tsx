'use client';

import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, Loader2, Settings, ShoppingCart, Upload, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Shop {
  id: string;
  title: string;
  sales_channel: string;
}

interface Blueprint {
  id: number;
  title: string;
  brand: string;
  model: string;
}

interface PrintProvider {
  id: number;
  title: string;
  location: string;
}

interface Variant {
  id: number;
  title: string;
  options: number[];
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: { id: string; url: string }[];
  tags: string[];
}

interface SyncResult {
  success: boolean;
  printifyProductId?: string;
  error?: string;
  shopId?: string;
}

export default function PrintifyAdminPanel() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [printProviders, setPrintProviders] = useState<PrintProvider[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Configuration state
  const [selectedShop, setSelectedShop] = useState<string>('');
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>('');
  const [selectedPrintProvider, setSelectedPrintProvider] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  
  // Sync results
  const [syncResults, setSyncResults] = useState<SyncResult[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load print providers when blueprint changes
  useEffect(() => {
    if (selectedBlueprint) {
      loadPrintProviders(parseInt(selectedBlueprint));
    }
  }, [selectedBlueprint]);

  // Load variants when print provider changes
  useEffect(() => {
    if (selectedBlueprint && selectedPrintProvider) {
      loadVariants(parseInt(selectedBlueprint), parseInt(selectedPrintProvider));
    }
  }, [selectedBlueprint, selectedPrintProvider]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [shopsRes, blueprintsRes, productsRes] = await Promise.all([
        fetch('/api/printify/shops'),
        fetch('/api/printify/blueprints'),
        fetch('/api/products')
      ]);

      const [shopsData, blueprintsData, productsData] = await Promise.all([
        shopsRes.json(),
        blueprintsRes.json(),
        productsRes.json()
      ]);

      if (shopsData.success) setShops(shopsData.shops);
      if (blueprintsData.success) setBlueprints(blueprintsData.blueprints);
      if (productsData.success) setProducts(productsData.data);

      if (shopsData.shops.length > 0) {
        setSelectedShop(shopsData.shops[0].id);
      }
      if (blueprintsData.blueprints.length > 0) {
        setSelectedBlueprint(blueprintsData.blueprints[0].id.toString());
      }
    } catch (err) {
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadPrintProviders = async (blueprintId: number) => {
    try {
      const response = await fetch(`/api/printify/print-providers?blueprintId=${blueprintId}`);
      const data = await response.json();
      if (data.success) {
        setPrintProviders(data.printProviders);
        if (data.printProviders.length > 0) {
          setSelectedPrintProvider(data.printProviders[0].id.toString());
        }
      }
    } catch (err) {
      console.error('Failed to load print providers:', err);
    }
  };

  const loadVariants = async (blueprintId: number, printProviderId: number) => {
    try {
      const response = await fetch(`/api/printify/variants?blueprintId=${blueprintId}&printProviderId=${printProviderId}`);
      const data = await response.json();
      if (data.success) {
        setVariants(data.variants);
        if (data.variants.length > 0) {
          setSelectedVariant(data.variants[0].id.toString());
        }
      }
    } catch (err) {
      console.error('Failed to load variants:', err);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/printify/test');
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`Connection successful! Found ${data.shops} shops, ${data.blueprints} blueprints, and ${data.csv_products} CSV products.`);
      } else {
        setError(data.error || 'Connection test failed');
      }
    } catch (err) {
      setError('Failed to test connection');
    } finally {
      setLoading(false);
    }
  };

  const syncProducts = async () => {
    if (!selectedShop || !selectedBlueprint || !selectedPrintProvider || !selectedVariant) {
      setError('Please select all required options');
      return;
    }

    setIsSyncing(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/printify/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: products,
          shopId: selectedShop,
          blueprintId: parseInt(selectedBlueprint),
          printProviderId: parseInt(selectedPrintProvider),
          variantId: parseInt(selectedVariant)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSyncResults(data.results);
        const successCount = data.results.filter((r: SyncResult) => r.success).length;
        setSuccess(`Successfully synced ${successCount} out of ${data.results.length} products to Printify!`);
      } else {
        setError(data.error || 'Sync failed');
      }
    } catch (err) {
      setError('Failed to sync products');
    } finally {
      setIsSyncing(false);
    }
  };

  const publishAllProducts = async () => {
    if (!selectedShop) {
      setError('Please select a shop');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/printify/products?shopId=${selectedShop}`);
      const data = await response.json();
      
      if (data.success) {
        let publishedCount = 0;
        for (const product of data.products) {
          try {
            const publishResponse = await fetch(`/api/printify/products/${product.id}/publish?shopId=${selectedShop}`, {
              method: 'POST'
            });
            const publishData = await publishResponse.json();
            if (publishData.success) publishedCount++;
          } catch (err) {
            console.error(`Failed to publish product ${product.id}:`, err);
          }
        }
        setSuccess(`Published ${publishedCount} out of ${data.products.length} products!`);
      } else {
        setError('Failed to load products for publishing');
      }
    } catch (err) {
      setError('Failed to publish products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Printify Admin Panel</h1>
          <p className="text-gray-600">Manage your Printify products across multiple stores</p>
        </div>
        <Button onClick={testConnection} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
          Test Connection
        </Button>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shops.length}</div>
            <p className="text-sm text-gray-600">Available stores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-sm text-gray-600">CSV products ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blueprints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blueprints.length}</div>
            <p className="text-sm text-gray-600">Product types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {syncResults.filter(r => r.success).length}/{syncResults.length}
            </div>
            <p className="text-sm text-gray-600">Successful syncs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Select your Printify settings for product sync</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shop">Shop</Label>
              <Select value={selectedShop} onValueChange={setSelectedShop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a shop" />
                </SelectTrigger>
                <SelectContent>
                  {shops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.title} ({shop.sales_channel})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="blueprint">Product Type</Label>
              <Select value={selectedBlueprint} onValueChange={setSelectedBlueprint}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  {blueprints.map((blueprint) => (
                    <SelectItem key={blueprint.id} value={blueprint.id.toString()}>
                      {blueprint.title} ({blueprint.brand})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="printProvider">Print Provider</Label>
              <Select value={selectedPrintProvider} onValueChange={setSelectedPrintProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select print provider" />
                </SelectTrigger>
                <SelectContent>
                  {printProviders.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id.toString()}>
                      {provider.title} ({provider.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="variant">Variant</Label>
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  {variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id.toString()}>
                      {variant.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage your Printify products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={syncProducts} 
              disabled={isSyncing || !selectedShop || !selectedBlueprint || !selectedPrintProvider || !selectedVariant}
              className="w-full"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {isSyncing ? 'Syncing...' : 'Sync Products to Printify'}
            </Button>

            <Button 
              onClick={publishAllProducts} 
              disabled={loading || !selectedShop}
              variant="outline"
              className="w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
              Publish All Products
            </Button>

            <Button 
              onClick={loadInitialData} 
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
              Refresh Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {syncResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sync Results</CardTitle>
            <CardDescription>Results from the last product sync operation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {syncResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        {result.success ? 'Success' : 'Failed'}
                      </p>
                      {result.error && (
                        <p className="text-sm text-red-600">{result.error}</p>
                      )}
                      {result.printifyProductId && (
                        <p className="text-sm text-gray-600">
                          Printify ID: {result.printifyProductId}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={result.success ? 'default' : 'destructive'}>
                    {result.success ? 'Success' : 'Error'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
