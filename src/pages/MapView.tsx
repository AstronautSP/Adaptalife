
import { useState } from 'react';
import { ArrowLeft, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StoreMap from '@/components/ui/StoreMap';
import { useToast } from '@/components/ui/use-toast';

const MapView = () => {
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [userLocation, setUserLocation] = useState<{x: number, y: number} | null>(null);
  const { toast } = useToast();

  const handleLocateMe = () => {
    // Simuler la géolocalisation dans le magasin
    // Dans une application réelle, cela pourrait utiliser la géolocalisation interne
    // ou des balises Bluetooth/WiFi pour localiser l'utilisateur dans le magasin
    
    // Position aléatoire dans le magasin pour la démo
    const demoPositions = [
      { x: 100, y: 150 },
      { x: 250, y: 120 },
      { x: 350, y: 250 },
      { x: 180, y: 300 }
    ];
    
    const randomPosition = demoPositions[Math.floor(Math.random() * demoPositions.length)];
    setUserLocation(randomPosition);
    
    toast({
      title: "Localisation activée",
      description: "Votre position a été localisée sur le plan du magasin.",
      duration: 3000,
    });
  };

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
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleLocateMe}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Me localiser
            </Button>
          </div>
          <StoreMap className="w-full h-[600px]" storeId={storeId} userLocation={userLocation} />
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
