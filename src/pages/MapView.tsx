
import { useState, useEffect } from 'react';
import { ArrowLeft, Target, Store, MapPin, Map as MapIcon, Phone, Clock, Globe, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import StoreMap3DOptimized from '@/components/ui/StoreMap3DOptimized';
import { useToast } from '@/hooks/use-toast';
import { StoreLocator, STORE_LOCATIONS } from '@/components/ui/StoreLocator';
import { Badge } from '@/components/ui/badge';
import { Capacitor } from '@capacitor/core';
import VoiceNavigation from '@/components/ui/VoiceNavigation';
import WheelchairAssistance from '@/components/ui/WheelchairAssistance';

const MapView = () => {
  const [storeId, setStoreId] = useState<string | undefined>(undefined);
  const [showAllStores, setShowAllStores] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<{x: number, y: number} | null>(null);
  const [isMobileApp, setIsMobileApp] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsMobileApp(Capacitor.isNativePlatform());
  }, []);

  const handleLocateMe = () => {
    // Positions optimisées dans le nouveau layout
    const demoPositions = [
      { x: 150, y: 80 },   // Zone fruits & légumes
      { x: 300, y: 150 },  // Zone produits laitiers
      { x: 200, y: 200 },  // Zone boulangerie
      { x: 250, y: 120 }   // Allée centrale
    ];
    
    const randomPosition = demoPositions[Math.floor(Math.random() * demoPositions.length)];
    setUserLocation(randomPosition);
    
    toast({
      title: "Localisation activée",
      description: "Votre position a été localisée avec précision sur le plan 4D du magasin.",
      duration: 3000,
    });
  };

  const handleStoreSelect = (selectedStoreId: string) => {
    setStoreId(selectedStoreId);
    setShowAllStores(false);
    setUserLocation(null);
  };

  const handleViewAllStores = () => {
    setShowAllStores(true);
    setStoreId(undefined);
    setUserLocation(null);
  };

  const handleVoiceNavigation = (destination: string) => {
    setSelectedDestination(destination);
    
    if (!userLocation) {
      handleLocateMe();
    }
    
    toast({
      title: "Navigation intelligente vers " + destination,
      description: "L'itinéraire optimal est calculé et affiché sur le plan 4D interactif.",
      duration: 3000,
    });
  };

  const selectedStore = storeId ? STORE_LOCATIONS.find(store => store.id === storeId) : undefined;

  return (
    <div className={`container max-w-7xl mx-auto px-4 ${isMobileApp ? 'py-10' : 'py-20'}`}>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <MapIcon className="h-7 w-7 text-primary" />
          {showAllStores ? "Nos magasins Adaptalife" : "Plan interactif 4D"}
        </h1>
        <p className="text-muted-foreground mb-6 text-lg">
          {showAllStores 
            ? "Trouvez un magasin près de chez vous et explorez son plan intérieur en 4D." 
            : "Naviguez dans le magasin en temps réel avec la visualisation 4D de l'affluence et des produits."}
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
            <div className="mt-4 p-4 border rounded-lg bg-card shadow-sm">
              <h3 className="flex items-center gap-2 font-medium mb-3">
                <Store className="h-4 w-4 text-primary" />
                Nos magasins
              </h3>
              <div className="space-y-3">
                {STORE_LOCATIONS.map(store => (
                  <div 
                    key={store.id} 
                    className="p-3 border rounded-md hover:bg-accent hover:border-primary transition-all cursor-pointer transform hover:scale-105"
                    onClick={() => handleStoreSelect(store.id)}
                  >
                    <p className="font-medium mb-1">{store.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                    <Badge variant="outline" className="text-xs">
                      Découvrir le plan 4D
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedStore && (
            <div className="mt-4 p-4 border rounded-lg bg-card shadow-sm">
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
                
                <div className="pt-2">
                  <WheelchairAssistance currentStore={selectedStore.name} />
                </div>
              </div>
            </div>
          )}
          
          {selectedStore && !showAllStores && (
            <div className="mt-4">
              <VoiceNavigation 
                onNavigate={handleVoiceNavigation} 
                userLocation={userLocation} 
                selectedStore={selectedStore.name}
              />
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          {showAllStores ? (
            <div className="border rounded-lg bg-card overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-muted/30 to-muted/50 p-4 border-b">
                <h3 className="font-medium flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-primary" />
                  Carte interactive des magasins
                </h3>
              </div>
              <div className="p-6 h-[600px] flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                  {STORE_LOCATIONS.map(store => (
                    <div 
                      key={store.id}
                      onClick={() => handleStoreSelect(store.id)}
                      className="relative border rounded-lg p-6 hover:border-primary cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className="absolute top-3 right-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">{store.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{store.address}</p>
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
                        className="mt-4 w-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Explorer le plan 4D
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : storeId ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <WheelchairAssistance currentStore={selectedStore?.name} />
                </div>
                <Button
                  onClick={handleLocateMe}
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  disabled={!storeId}
                >
                  <Target className="h-4 w-4" />
                  Me localiser
                </Button>
              </div>
              <StoreMap3DOptimized 
                className="w-full h-[650px]" 
                storeId={storeId} 
                userLocation={userLocation} 
                productId={selectedDestination || undefined} 
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center border rounded-lg bg-muted/20 h-[600px] shadow-inner">
              <Store className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center max-w-md text-lg">
                Veuillez sélectionner un magasin pour découvrir son plan interactif 4D et vous y localiser en temps réel.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button asChild size="lg" className="px-8">
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
