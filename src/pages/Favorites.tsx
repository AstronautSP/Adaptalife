
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/data/products';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites);
      const favProducts = products.filter(product => favoriteIds.includes(product.id));
      setFavoriteProducts(favProducts);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              <h1 className="text-3xl font-bold">Mes favoris</h1>
            </div>
            <p className="text-muted-foreground">
              Retrouvez tous vos produits préférés
            </p>
          </div>
          
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Aucun favori pour le moment</h2>
              <p className="text-muted-foreground">
                Ajoutez des produits à vos favoris en cliquant sur le cœur
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
