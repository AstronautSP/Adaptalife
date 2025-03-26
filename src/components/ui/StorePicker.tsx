
import { useState } from 'react';
import { Store, MapPin, ChevronDown, Globe, Volume2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Store {
  id: string;
  name: string;
  brand: string;
  address: string;
  distance?: number;
  country?: string;
}

// Liste mondiale de supermarchés
const STORES: Store[] = [
  // France
  { id: '1', name: 'Leclerc', brand: 'Leclerc', address: '123 rue de Paris, Paris', country: 'France', distance: 0.8 },
  { id: '2', name: 'Carrefour City', brand: 'Carrefour', address: '45 avenue des Champs, Paris', country: 'France', distance: 1.2 },
  { id: '3', name: 'Super U', brand: 'Super U', address: '78 boulevard Haussmann, Paris', country: 'France', distance: 2.4 },
  { id: '4', name: 'Aldi', brand: 'Aldi', address: '15 rue de Rivoli, Paris', country: 'France', distance: 3.1 },
  { id: '5', name: 'Lidl', brand: 'Lidl', address: '99 rue Saint-Antoine, Paris', country: 'France', distance: 3.5 },
  { id: '6', name: 'Intermarché', brand: 'Intermarché', address: '27 rue du Faubourg Saint-Martin, Paris', country: 'France', distance: 1.7 },
  { id: '7', name: 'Monoprix', brand: 'Monoprix', address: '158 avenue des Ternes, Paris', country: 'France', distance: 2.2 },
  { id: '8', name: 'Casino', brand: 'Casino', address: '35 boulevard de Clichy, Paris', country: 'France', distance: 2.8 },
  { id: '9', name: 'Franprix', brand: 'Franprix', address: '42 rue de la Roquette, Paris', country: 'France', distance: 1.5 },
  { id: '10', name: 'Auchan', brand: 'Auchan', address: '240 avenue Daumesnil, Paris', country: 'France', distance: 3.9 },
  { id: '11', name: 'Carrefour Market', brand: 'Carrefour', address: '18 rue de Passy, Paris', country: 'France', distance: 2.6 },
  { id: '12', name: 'Biocoop', brand: 'Biocoop', address: '52 rue de Paradis, Paris', country: 'France', distance: 1.9 },
  { id: '13', name: 'Naturalia', brand: 'Naturalia', address: '89 rue Montorgueil, Paris', country: 'France', distance: 1.3 },
  { id: '14', name: 'Picard', brand: 'Picard', address: '64 rue du Bac, Paris', country: 'France', distance: 2.1 },
  { id: '15', name: 'G20', brand: 'G20', address: '113 rue Oberkampf, Paris', country: 'France', distance: 2.9 },
  
  // États-Unis
  { id: '16', name: 'Walmart', brand: 'Walmart', address: '123 Main St, New York', country: 'USA', distance: 1.5 },
  { id: '17', name: 'Target', brand: 'Target', address: '456 Broadway, New York', country: 'USA', distance: 2.3 },
  { id: '18', name: 'Kroger', brand: 'Kroger', address: '789 5th Ave, New York', country: 'USA', distance: 3.1 },
  { id: '19', name: 'Whole Foods', brand: 'Whole Foods', address: '101 7th Ave, New York', country: 'USA', distance: 1.8 },
  { id: '20', name: 'Costco', brand: 'Costco', address: '202 8th St, New York', country: 'USA', distance: 4.2 },
  
  // Royaume-Uni
  { id: '21', name: 'Tesco', brand: 'Tesco', address: '10 Oxford St, London', country: 'UK', distance: 1.2 },
  { id: '22', name: 'Sainsbury\'s', brand: 'Sainsbury\'s', address: '20 Regent St, London', country: 'UK', distance: 2.5 },
  { id: '23', name: 'ASDA', brand: 'ASDA', address: '30 Baker St, London', country: 'UK', distance: 3.0 },
  { id: '24', name: 'Morrisons', brand: 'Morrisons', address: '40 Bond St, London', country: 'UK', distance: 2.1 },
  { id: '25', name: 'Waitrose', brand: 'Waitrose', address: '50 Carnaby St, London', country: 'UK', distance: 1.7 },
  
  // Allemagne
  { id: '26', name: 'REWE', brand: 'REWE', address: 'Alexanderplatz 1, Berlin', country: 'Allemagne', distance: 1.3 },
  { id: '27', name: 'Edeka', brand: 'Edeka', address: 'Friedrichstrasse 20, Berlin', country: 'Allemagne', distance: 2.2 },
  { id: '28', name: 'Kaufland', brand: 'Kaufland', address: 'Potsdamer Platz 5, Berlin', country: 'Allemagne', distance: 3.5 },
  
  // Espagne
  { id: '29', name: 'Mercadona', brand: 'Mercadona', address: 'Gran Via, Madrid', country: 'Espagne', distance: 1.1 },
  { id: '30', name: 'El Corte Inglés', brand: 'El Corte Inglés', address: 'Sol 15, Madrid', country: 'Espagne', distance: 2.4 },
  
  // Italie
  { id: '31', name: 'Coop', brand: 'Coop', address: 'Via Roma 10, Rome', country: 'Italie', distance: 1.6 },
  { id: '32', name: 'Esselunga', brand: 'Esselunga', address: 'Via Veneto 25, Rome', country: 'Italie', distance: 2.8 },
  
  // Japon
  { id: '33', name: '7-Eleven', brand: '7-Eleven', address: 'Shibuya 1-1, Tokyo', country: 'Japon', distance: 0.7 },
  { id: '34', name: 'FamilyMart', brand: 'FamilyMart', address: 'Shinjuku 2-3, Tokyo', country: 'Japon', distance: 1.2 },
  
  // Australie
  { id: '35', name: 'Woolworths', brand: 'Woolworths', address: 'George St 100, Sydney', country: 'Australie', distance: 1.9 },
  { id: '36', name: 'Coles', brand: 'Coles', address: 'Pitt St 200, Sydney', country: 'Australie', distance: 2.6 },
  
  // Canada
  { id: '37', name: 'Loblaws', brand: 'Loblaws', address: '123 Yonge St, Toronto', country: 'Canada', distance: 1.4 },
  { id: '38', name: 'Sobeys', brand: 'Sobeys', address: '456 Queen St, Toronto', country: 'Canada', distance: 2.7 },
  
  // Brésil
  { id: '39', name: 'Pão de Açúcar', brand: 'Pão de Açúcar', address: 'Av. Paulista 1000, São Paulo', country: 'Brésil', distance: 2.0 },
  { id: '40', name: 'Carrefour', brand: 'Carrefour', address: 'Av. Brasil 2000, Rio de Janeiro', country: 'Brésil', distance: 3.2 },
];

// Grouper les magasins par pays
const storesByCountry = STORES.reduce((acc, store) => {
  const country = store.country || 'Autre';
  if (!acc[country]) {
    acc[country] = [];
  }
  acc[country].push(store);
  return acc;
}, {} as Record<string, Store[]>);

interface StorePickerProps {
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const StorePicker = ({ onStoreSelect, className }: StorePickerProps) => {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [textToSpeech, setTextToSpeech] = useState<boolean>(false);

  const handleStoreChange = (value: string) => {
    setSelectedStore(value);
    onStoreSelect?.(value);
    
    // Synthèse vocale si activée
    if (textToSpeech) {
      const store = getStoreById(value);
      if (store) {
        const message = `Vous avez sélectionné ${store.brand} - ${store.name}, situé à ${store.address}`;
        speakText(message);
      }
    }
  };

  const getStoreById = (id: string) => {
    return STORES.find(store => store.id === id);
  };

  const toggleTextToSpeech = () => {
    const newState = !textToSpeech;
    setTextToSpeech(newState);
    
    const message = newState 
      ? "Mode de synthèse vocale activé pour les personnes malvoyantes" 
      : "Mode de synthèse vocale désactivé";
    
    toast.info(message);
    
    if (newState) {
      speakText("Mode de synthèse vocale activé pour les personnes malvoyantes");
    }
  };

  const speakText = (text: string) => {
    // Utilisation de l'API Web Speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Définir la langue en fonction de la préférence utilisateur
      utterance.lang = 'fr-FR'; // Par défaut français
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("La synthèse vocale n'est pas supportée par ce navigateur");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span>Sélectionnez un magasin</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("h-8 w-8", textToSpeech && "text-primary")}
          onClick={toggleTextToSpeech}
          title="Activer/désactiver la synthèse vocale"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>
      
      <Select value={selectedStore} onValueChange={handleStoreChange}>
        <SelectTrigger className="bg-background/80 backdrop-blur border shadow-sm">
          <SelectValue placeholder="Choisir un magasin" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.keys(storesByCountry).sort().map((country) => (
            <SelectGroup key={country}>
              <SelectLabel>{country}</SelectLabel>
              {storesByCountry[country].map((store) => (
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
            </SelectGroup>
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
                {getStoreById(selectedStore)?.country && (
                  <span> ({getStoreById(selectedStore)?.country})</span>
                )}
              </p>
              <Button 
                variant="link" 
                className="h-auto p-0 text-xs text-primary"
                onClick={() => {
                  if (textToSpeech) {
                    const store = getStoreById(selectedStore);
                    if (store) {
                      speakText(`${store.brand} - ${store.name}, situé à ${store.address}`);
                    }
                  }
                }}
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
        onClick={() => {
          if (textToSpeech) {
            speakText("Recherche de magasins à proximité en utilisant votre position");
          }
        }}
      >
        <MapPin className="h-3.5 w-3.5 mr-1" />
        Utiliser ma position
      </Button>
    </div>
  );
};

export default StorePicker;
