import { useState } from 'react';
import { MapPin, Map as MapIcon, Info, Globe, Search, Clock } from 'lucide-react';
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

export interface StoreDestination {
  name: string;
  instructions: string;
}

export interface StoreOpeningHours {
  weekdays: string;
  sunday: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  phone: string;
  openingHours: StoreOpeningHours;
  destinations: StoreDestination[];
}

const STORE_LOCATIONS: StoreLocation[] = [
  { 
    id: 'leclerc-courbevoie', 
    name: 'Leclerc Courbevoie', 
    address: '186 Boulevard Saint-Denis, 92400 Courbevoie', 
    coordinates: { lat: 48.8738, lng: 2.2950 }, 
    phone: '01 47 88 42 30',
    openingHours: { weekdays: 'Lun-Sam 8h30-21h00', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, avancez tout droit sur 8 mètres, puis tournez à gauche. Le rayon se trouve sur votre droite." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez sur 12 mètres, puis tournez à droite. Vous sentirez l'odeur du pain frais." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez tout droit sur 18 mètres, puis tournez à droite et continuez 5 mètres." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez tout droit sur 18 mètres, puis tournez à droite et continuez sur 8 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez tout droit sur 15 mètres. Le rayon est au fond sur votre gauche." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, avancez tout droit sur 22 mètres, puis tournez à droite et continuez jusqu'au fond du magasin." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez tout droit sur 10 mètres, puis tournez à gauche et continuez sur 8 mètres." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée du magasin, faites demi-tour et avancez tout droit sur 25 mètres." },
      { name: 'caisses', instructions: "Pour aller aux caisses, faites demi-tour et avancez tout droit sur 20 mètres. Vous entendrez les bips des caisses." },
    ]
  },
  { 
    id: 'intermarche-paris14', 
    name: 'Intermarché Paris 14ème', 
    address: '85 Avenue du Maine, 75014 Paris', 
    coordinates: { lat: 48.8417, lng: 2.3226 }, 
    phone: '01 43 20 15 67',
    openingHours: { weekdays: 'Lun-Sam 8h00-21h00', sunday: 'Dim 9h00-13h00' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, tournez à gauche à l'entrée et avancez sur 6 mètres." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez tout droit sur 10 mètres depuis l'entrée." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez sur 15 mètres, puis tournez à gauche." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez sur 15 mètres, puis tournez à gauche et continuez 4 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez tout droit sur 20 mètres et tournez à droite." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, avancez au fond du magasin sur 25 mètres, c'est sur votre droite." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 12 mètres et tournez à gauche." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée, faites demi-tour et suivez le chemin principal." },
      { name: 'caisses', instructions: "Pour aller aux caisses, elles sont situées à l'entrée, faites demi-tour et avancez sur 15 mètres." },
    ]
  },
  { 
    id: 'super-u-lyon', 
    name: 'Super U Lyon Part-Dieu', 
    address: '17 Rue Maurice Flandin, 69003 Lyon', 
    coordinates: { lat: 45.7597, lng: 4.8589 }, 
    phone: '04 78 62 34 89',
    openingHours: { weekdays: 'Lun-Sam 8h30-20h30', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, tournez immédiatement à droite après l'entrée." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez sur 8 mètres et tournez à gauche. La boulangerie est juste devant vous." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez sur 20 mètres tout droit, puis tournez à droite." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez sur 20 mètres tout droit, puis tournez à droite et continuez 6 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez sur 18 mètres et regardez sur votre gauche." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, dirigez-vous au fond du magasin sur 28 mètres." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 14 mètres et tournez à gauche." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée, faites demi-tour et suivez le chemin principal." },
      { name: 'caisses', instructions: "Pour aller aux caisses, revenez vers l'entrée, elles sont sur votre gauche." },
    ]
  },
  { 
    id: 'leclerc-marseille', 
    name: 'Leclerc Marseille Saint-Loup', 
    address: 'Avenue de la Pinède, 13010 Marseille', 
    coordinates: { lat: 43.2965, lng: 5.3698 }, 
    phone: '04 91 89 45 23',
    openingHours: { weekdays: 'Lun-Sam 8h30-21h00', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, avancez tout droit sur 10 mètres, puis tournez à gauche." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez sur 14 mètres, puis tournez à droite." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez tout droit sur 22 mètres, puis tournez à droite." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez tout droit sur 22 mètres, puis tournez à droite et continuez sur 7 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez tout droit sur 17 mètres, puis tournez à droite." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, avancez au fond du magasin sur 30 mètres." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 12 mètres, puis tournez à gauche et continuez sur 10 mètres." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée du magasin, faites demi-tour et avancez tout droit sur 30 mètres." },
      { name: 'caisses', instructions: "Pour aller aux caisses, faites demi-tour et avancez sur 22 mètres." },
    ]
  },
  { 
    id: 'intermarche-bordeaux', 
    name: 'Intermarché Bordeaux Lac', 
    address: 'Avenue des 40 Journaux, 33300 Bordeaux', 
    coordinates: { lat: 44.8378, lng: -0.5792 }, 
    phone: '05 56 50 78 92',
    openingHours: { weekdays: 'Lun-Sam 8h30-20h30', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, tournez à droite après l'entrée et avancez 5 mètres." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez tout droit sur 11 mètres depuis l'entrée." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez sur 16 mètres, puis tournez à gauche." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez sur 16 mètres, puis tournez à gauche et continuez 5 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez sur 19 mètres et tournez à droite." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, dirigez-vous au fond sur 26 mètres, c'est sur votre droite." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 13 mètres et tournez à gauche." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée, faites demi-tour et suivez le chemin principal sur 18 mètres." },
      { name: 'caisses', instructions: "Pour aller aux caisses, revenez vers l'entrée sur 16 mètres." },
    ]
  },
  { 
    id: 'super-u-lille', 
    name: 'Super U Lille Fives', 
    address: '168 Rue Pierre Legrand, 59000 Lille', 
    coordinates: { lat: 50.6365, lng: 3.0635 }, 
    phone: '03 20 55 67 89',
    openingHours: { weekdays: 'Lun-Sam 8h30-20h00', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, avancez tout droit sur 7 mètres, c'est sur votre droite." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, tournez à gauche à l'entrée et avancez 9 mètres." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez sur 17 mètres tout droit, puis tournez à droite." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez sur 17 mètres tout droit, puis tournez à droite et continuez 6 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez sur 16 mètres et regardez sur votre gauche." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, dirigez-vous au fond du magasin sur 24 mètres." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 11 mètres et tournez à gauche." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée, faites demi-tour et suivez le chemin principal." },
      { name: 'caisses', instructions: "Pour aller aux caisses, elles sont près de l'entrée, faites demi-tour et avancez sur 14 mètres." },
    ]
  },
  { 
    id: 'leclerc-saint-medard', 
    name: 'Leclerc Saint-Médard-en-Jalles', 
    address: '34 Avenue Descartes, 33160 Saint-Médard-en-Jalles', 
    coordinates: { lat: 44.8969, lng: -0.7183 }, 
    phone: '05 56 05 42 10',
    openingHours: { weekdays: 'Lun-Sam 8h30-21h00', sunday: 'Dim 9h00-12h30' },
    destinations: [
      { name: 'fruits et légumes', instructions: "Pour aller aux fruits et légumes, avancez tout droit sur 9 mètres, puis tournez à gauche." },
      { name: 'boulangerie', instructions: "Pour aller à la boulangerie, avancez sur 13 mètres, puis tournez à droite." },
      { name: 'boucherie', instructions: "Pour aller à la boucherie, avancez tout droit sur 21 mètres, puis tournez à droite." },
      { name: 'poissonnerie', instructions: "Pour aller à la poissonnerie, avancez tout droit sur 21 mètres, puis tournez à droite et continuez sur 8 mètres." },
      { name: 'produits laitiers', instructions: "Pour aller aux produits laitiers, avancez tout droit sur 18 mètres, puis tournez à droite." },
      { name: 'surgelés', instructions: "Pour aller aux surgelés, avancez au fond du magasin sur 29 mètres." },
      { name: 'boissons', instructions: "Pour aller aux boissons, avancez sur 11 mètres, puis tournez à gauche et continuez sur 9 mètres." },
      { name: 'entrée', instructions: "Pour retourner à l'entrée du magasin, faites demi-tour et avancez tout droit sur 28 mètres." },
      { name: 'caisses', instructions: "Pour aller aux caisses, faites demi-tour et avancez sur 21 mètres." },
    ]
  },
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
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            {STORE_LOCATIONS.find(store => store.id === storeId)?.address}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Horaires:</span>
            <span className="text-muted-foreground">
              {STORE_LOCATIONS.find(store => store.id === storeId)?.openingHours.weekdays} | {STORE_LOCATIONS.find(store => store.id === storeId)?.openingHours.sunday}
            </span>
          </div>
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
