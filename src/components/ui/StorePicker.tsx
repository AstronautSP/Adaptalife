
import { useState } from 'react';
import { Store, MapPin, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Store {
  id: string;
  name: string;
  brand: string;
  address: string;
  distance?: number;
}

// Expanded list of stores
const STORES: Store[] = [
  { id: '1', name: 'Leclerc', brand: 'Leclerc', address: '123 rue de Paris, Paris', distance: 0.8 },
  { id: '2', name: 'Carrefour City', brand: 'Carrefour', address: '45 avenue des Champs, Paris', distance: 1.2 },
  { id: '3', name: 'Super U', brand: 'Super U', address: '78 boulevard Haussmann, Paris', distance: 2.4 },
  { id: '4', name: 'Aldi', brand: 'Aldi', address: '15 rue de Rivoli, Paris', distance: 3.1 },
  { id: '5', name: 'Lidl', brand: 'Lidl', address: '99 rue Saint-Antoine, Paris', distance: 3.5 },
  { id: '6', name: 'Intermarché', brand: 'Intermarché', address: '27 rue du Faubourg Saint-Martin, Paris', distance: 1.7 },
  { id: '7', name: 'Monoprix', brand: 'Monoprix', address: '158 avenue des Ternes, Paris', distance: 2.2 },
  { id: '8', name: 'Casino', brand: 'Casino', address: '35 boulevard de Clichy, Paris', distance: 2.8 },
  { id: '9', name: 'Franprix', brand: 'Franprix', address: '42 rue de la Roquette, Paris', distance: 1.5 },
  { id: '10', name: 'Auchan', brand: 'Auchan', address: '240 avenue Daumesnil, Paris', distance: 3.9 },
  { id: '11', name: 'Carrefour Market', brand: 'Carrefour', address: '18 rue de Passy, Paris', distance: 2.6 },
  { id: '12', name: 'Biocoop', brand: 'Biocoop', address: '52 rue de Paradis, Paris', distance: 1.9 },
  { id: '13', name: 'Naturalia', brand: 'Naturalia', address: '89 rue Montorgueil, Paris', distance: 1.3 },
  { id: '14', name: 'Picard', brand: 'Picard', address: '64 rue du Bac, Paris', distance: 2.1 },
  { id: '15', name: 'G20', brand: 'G20', address: '113 rue Oberkampf, Paris', distance: 2.9 },
];

interface StorePickerProps {
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const StorePicker = ({ onStoreSelect, className }: StorePickerProps) => {
  const [selectedStore, setSelectedStore] = useState<string>('');

  const handleStoreChange = (value: string) => {
    setSelectedStore(value);
    onStoreSelect?.(value);
  };

  const getStoreById = (id: string) => {
    return STORES.find(store => store.id === id);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
        <Store className="h-4 w-4" />
        <span>Sélectionnez un magasin</span>
      </div>
      
      <Select value={selectedStore} onValueChange={handleStoreChange}>
        <SelectTrigger className="bg-background/80 backdrop-blur border shadow-sm">
          <SelectValue placeholder="Choisir un magasin" />
        </SelectTrigger>
        <SelectContent>
          {STORES.map((store) => (
            <SelectItem 
              key={store.id} 
              value={store.id}
              className="focus:bg-primary/10"
            >
              <div className="flex justify-between items-center w-full">
                <span>{store.brand} - {store.name}</span>
                {store.distance && (
                  <span className="text-xs text-muted-foreground">
                    {store.distance} km
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedStore && (
        <div className="bg-muted/50 p-3 rounded-md border animate-fade-in">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium text-sm">
                {getStoreById(selectedStore)?.brand} - {getStoreById(selectedStore)?.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {getStoreById(selectedStore)?.address}
              </p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-xs text-primary"
              >
                Voir sur la carte
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2 text-xs flex items-center justify-center"
      >
        <MapPin className="h-3.5 w-3.5 mr-1" />
        Utiliser ma position
      </Button>
    </div>
  );
};

export default StorePicker;
