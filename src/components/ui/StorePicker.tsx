
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

// Sample data
const STORES: Store[] = [
  { id: '1', name: 'Leclerc', brand: 'Leclerc', address: '123 rue de Paris, Paris', distance: 0.8 },
  { id: '2', name: 'Carrefour City', brand: 'Carrefour', address: '45 avenue des Champs, Paris', distance: 1.2 },
  { id: '3', name: 'Super U', brand: 'Super U', address: '78 boulevard Haussmann, Paris', distance: 2.4 },
  { id: '4', name: 'Aldi', brand: 'Aldi', address: '15 rue de Rivoli, Paris', distance: 3.1 },
  { id: '5', name: 'Lidl', brand: 'Lidl', address: '99 rue Saint-Antoine, Paris', distance: 3.5 },
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
