import { useState } from 'react';
import { MapPin, Map as MapIcon, Info, Globe, Search } from 'lucide-react';
import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from './alert';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
}

const STORE_LOCATIONS: StoreLocation[] = [
  { id: 'paris-1', name: 'Paris - La Défense', address: '4 Place de la Défense, 92400 Courbevoie', coordinates: { lat: 48.8738, lng: 2.2950 }, phone: '01 45 67 89 01' },
  { id: 'paris-2', name: 'Paris - Montparnasse', address: '17 Rue du Départ, 75014 Paris', coordinates: { lat: 48.8417, lng: 2.3226 }, phone: '01 43 22 34 56' },
  { id: 'lyon-1', name: 'Lyon - Part-Dieu', address: '129 Rue Servient, 69003 Lyon', coordinates: { lat: 45.7597, lng: 4.8589 }, phone: '04 78 89 12 34' },
  { id: 'marseille-1', name: 'Marseille - Vieux Port', address: '11 La Canebière, 13001 Marseille', coordinates: { lat: 43.2965, lng: 5.3698 }, phone: '04 91 55 66 77' },
  { id: 'bordeaux-1', name: 'Bordeaux - Centre', address: '57 Cours de l\'Intendance, 33000 Bordeaux', coordinates: { lat: 44.8378, lng: -0.5792 }, phone: '05 56 78 90 12' },
  { id: 'lille-1', name: 'Lille - Centre', address: '28 Place du Général de Gaulle, 59000 Lille', coordinates: { lat: 50.6365, lng: 3.0635 }, phone: '03 20 34 45 56' },
  { id: 'leclerc-saint-medard', name: 'Leclerc Saint-Médard-en-Jalles', address: '34 Avenue Descartes, 33160 Saint-Médard-en-Jalles', coordinates: { lat: 44.8969, lng: -0.7183 }, phone: '05 56 05 42 10' },
];

interface StoreLocatorProps {
  onSelectStore: (storeId: string) => void;
  selectedStoreId?: string;
  onViewAllStores?: () => void;
  showAllStoresButton?: boolean;
}

const StoreLocator = ({ 
  onSelectStore, 
  selectedStoreId, 
  onViewAllStores, 
  showAllStoresButton = true 
}: StoreLocatorProps) => {
  const { toast } = useToast();
  const [storeId, setStoreId] = useState<string>(selectedStoreId || '');
  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(true);
  const [isSearchingGlobal, setIsSearchingGlobal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const handleStoreSelect = (value: string) => {
    setStoreId(value);
    onSelectStore(value);
    
    const selectedStore = STORE_LOCATIONS.find(store => store.id === value);
    if (selectedStore) {
      toast({
        title: "Magasin sélectionné",
        description: `${selectedStore.name} - ${selectedStore.address}`,
        duration: 3000,
      });
    }
  };

  const dismissInfoMessage = () => {
    setShowInfoMessage(false);
  };
  
  const handleGlobalSearch = () => {
    setIsSearchingGlobal(true);
    
    // Simuler une recherche mondiale avec un délai
    setTimeout(() => {
      toast({
        title: "Recherche mondiale",
        description: "Nous recherchons tous les magasins du monde entier. Cette fonctionnalité est en développement.",
        duration: 5000,
      });
      
      setTimeout(() => {
        setIsSearchingGlobal(false);
        toast({
          title: "API de géolocalisation requise",
          description: "Pour afficher tous les magasins du monde, une intégration avec une API de géolocalisation est nécessaire.",
          duration: 5000,
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
      <h3 className="flex items-center gap-2 font-medium">
        <MapPin className="h-4 w-4 text-primary" />
        Sélectionner un magasin
      </h3>
      
      {showInfoMessage && (
        <Alert variant="default" className="bg-muted/50 mb-2">
          <AlertDescription className="flex items-start gap-2 text-xs">
            <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Note:</span> Cette application présente un échantillon de magasins à des fins de démonstration. Une version complète intégrerait une API de géolocalisation pour afficher tous les magasins du monde à proximité.
              <Button variant="link" size="sm" className="h-auto p-0 ml-1" onClick={dismissInfoMessage}>
                Masquer
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <Select value={storeId} onValueChange={handleStoreSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Choisir un magasin" />
        </SelectTrigger>
        <SelectContent>
          {STORE_LOCATIONS.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {storeId && (
        <div className="text-sm text-muted-foreground">
          {STORE_LOCATIONS.find(store => store.id === storeId)?.address}
        </div>
      )}

      {/* Ajout de la recherche mondiale */}
      <div className="mt-2 pt-3 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Globe className="h-3.5 w-3.5" />
          <span>Besoin de plus de magasins?</span>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGlobalSearch}
          disabled={isSearchingGlobal}
        >
          {isSearchingGlobal ? (
            <>
              <div className="animate-spin h-3.5 w-3.5 border-2 border-primary border-t-transparent rounded-full" />
              Recherche en cours...
            </>
          ) : (
            <>
              <Search className="h-3.5 w-3.5" />
              Afficher tous les magasins du monde
            </>
          )}
        </Button>
      </div>

      {showAllStoresButton && onViewAllStores && (
        <Button 
          variant="outline" 
          className="mt-2 w-full flex items-center justify-center gap-2"
          onClick={onViewAllStores}
        >
          <MapIcon className="h-4 w-4" />
          Voir tous les magasins
        </Button>
      )}
    </div>
  );
};

export { StoreLocator, STORE_LOCATIONS };
