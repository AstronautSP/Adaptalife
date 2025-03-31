
import { useState } from 'react';
import { MapPin, Map as MapIcon } from 'lucide-react';
import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { useToast } from '@/hooks/use-toast';

const STORE_LOCATIONS = [
  { id: 'paris-1', name: 'Paris - La Défense', address: '12 Avenue des Champs-Élysées, 75008 Paris', coordinates: { lat: 48.8738, lng: 2.2950 } },
  { id: 'paris-2', name: 'Paris - Montparnasse', address: '25 Rue du Départ, 75014 Paris', coordinates: { lat: 48.8417, lng: 2.3226 } },
  { id: 'lyon-1', name: 'Lyon - Part-Dieu', address: '17 Rue du Docteur Bouchut, 69003 Lyon', coordinates: { lat: 45.7597, lng: 4.8589 } },
  { id: 'marseille-1', name: 'Marseille - Vieux Port', address: '33 Quai des Belges, 13001 Marseille', coordinates: { lat: 43.2965, lng: 5.3698 } },
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

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
      <h3 className="flex items-center gap-2 font-medium">
        <MapPin className="h-4 w-4 text-primary" />
        Sélectionner un magasin
      </h3>
      
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
