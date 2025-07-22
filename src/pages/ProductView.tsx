import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Map, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductDetail from '@/components/ui/ProductDetail';
import StoreMap3D from '@/components/ui/StoreMap3D';
import { products } from '@/data/products';
import { type Product } from '@/components/ui/product/types';

const ProductView = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('product');

  // Fetch product details based on productId
  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-6">
              <div className="bg-gray-200 rounded-lg aspect-square"></div>
            </div>
            <div className="lg:w-1/2 p-6">
              <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-1 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="text-muted-foreground mb-6">Le produit demandé n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="hidden sm:flex items-center text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to="/products" className="hover:text-foreground">Produits</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">{product.name}</span>
      </div>
      
      <div className="mb-6 sm:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="product" className="flex items-center gap-1">
              <Store className="h-4 w-4" />
              <span>Produit</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1">
              <Map className="h-4 w-4" />
              <span>Localisation</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${activeTab !== 'product' && 'hidden sm:block'}`}>
          <ProductDetail product={product} />
        </div>
        
        <div className={`lg:col-span-1 ${activeTab !== 'map' && 'hidden sm:block'}`}>
          <StoreMap3D productId={product.id} />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux produits
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ProductView;
