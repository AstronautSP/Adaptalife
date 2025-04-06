
import { useState, useEffect } from 'react';
import { ArrowLeft, Target, Store, MapPin, Map as MapIcon, Phone, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StoreMap from '@/components/ui/StoreMap';
import { useToast } from '@/hooks/use-toast';
import { StoreLocator, STORE_LOCATIONS } from '@/components/ui/StoreLocator';
import { Badge } from '@/components/ui/badge';
import { Capacitor } from '@capacitor/core';

const MapView = () => {
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [showAllStores, setShowAllStores] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<{x: number, y: number} | null>(null);
  const [isMobileApp, setIsMobileApp] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if running as a mobile app
    setIsMobileApp(Capacitor.isNativePlatform());
  }, []);

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

  const handleStoreSelect = (selectedStoreId: string) => {
    setStoreId(selectedStoreId);
    setShowAllStores(false);
    // Reset user location when changing stores
    setUserLocation(null);
  };

  const handleViewAllStores = () => {
    setShowAllStores(true);
    setStoreId(undefined);
    setUserLocation(null);
  };

  const selectedStore = storeId ? STORE_LOCATIONS.find(store => store.id === storeId) : undefined;

  return (
    <div className={`container max-w-6xl mx-auto px-4 ${isMobileApp ? 'py-10' : 'py-20'}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MapIcon className="h-6 w-6 text-primary" />
          {showAllStores ? "Tous nos magasins" : "Plan du magasin"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {showAllStores 
            ? "Trouvez un magasin près de chez vous et consultez son plan intérieur." 
            : "Utilisez ce plan pour vous orienter dans le magasin et trouver facilement les produits."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <StoreLocator 
            onSelectStore={handleStoreSelect} 
            selectedStoreId={storeId}
            onViewAllStores={handleViewAllStores}
            showAllStoresButton={!showAllStores}
          />
          
          {showAllStores && (
            <div className="mt-4 p-4 border rounded-lg bg-card">
              <h3 className="flex items-center gap-2 font-medium mb-3">
                <Store className="h-4 w-4 text-primary" />
                Nos magasins
              </h3>
              <div className="space-y-3">
                {STORE_LOCATIONS.map(store => (
                  <div 
                    key={store.id} 
                    className="p-3 border rounded-md hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => handleStoreSelect(store.id)}
                  >
                    <p className="font-medium mb-1">{store.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                    <Badge variant="outline" className="text-xs">
                      Voir le plan
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedStore && (
            <div className="mt-4 p-4 border rounded-lg bg-card">
              <h3 className="flex items-center gap-2 font-medium mb-2">
                <Store className="h-4 w-4 text-primary" />
                Informations du magasin
              </h3>
              <div className="text-sm space-y-3">
                <p className="font-medium">{selectedStore.name}</p>
                <p className="text-muted-foreground">{selectedStore.address}</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">9h-19h du lundi au samedi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {selectedStore.coordinates.lat.toFixed(4)}, {selectedStore.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          {showAllStores ? (
            <div className="border rounded-lg bg-card overflow-hidden">
              <div className="bg-muted/30 p-3 border-b">
                <h3 className="font-medium flex items-center gap-2">
                  <MapIcon className="h-4 w-4 text-primary" />
                  Carte des magasins
                </h3>
              </div>
              <div className="p-4 h-[600px] flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
                  {STORE_LOCATIONS.map(store => (
                    <div 
                      key={store.id}
                      onClick={() => handleStoreSelect(store.id)}
                      className="relative border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                    >
                      <div className="absolute top-2 right-2">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">{store.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{store.address}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {store.coordinates.lat.toFixed(4)}, {store.coordinates.lng.toFixed(4)}
                        </div>
                        {isMobileApp && (
                          <Globe className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3 w-full text-xs"
                      >
                        Voir le plan du magasin
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : storeId ? (
            <>
              <div className="flex justify-end mb-4">
                <Button
                  onClick={handleLocateMe}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={!storeId}
                >
                  <Target className="h-4 w-4" />
                  Me localiser
                </Button>
              </div>
              <StoreMap className="w-full h-[600px]" storeId={storeId} userLocation={userLocation} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center border rounded-lg bg-muted/20 h-[600px]">
              <Store className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground text-center max-w-xs">
                Veuillez sélectionner un magasin pour afficher son plan et vous y localiser.
              </p>
            </div>
          )}
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
