
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StoreMap from '@/components/ui/StoreMap';

const MapView = () => {
  const [storeId, setStoreId] = useState<string | undefined>(undefined);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Plan du magasin</h1>
        <p className="text-muted-foreground mb-6">
          Utilisez ce plan pour vous orienter dans le magasin et trouver facilement les produits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <StoreMap className="w-full h-[600px]" storeId={storeId} />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MapView;
