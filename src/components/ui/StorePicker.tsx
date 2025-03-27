
import { useState } from 'react';
import { Store, MapPin, ChevronDown, Globe, Volume2, Tractor, Apple, Carrot, Egg } from 'lucide-react';
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
  type?: 'supermarket' | 'farm' | 'market';
  products?: string[];
  organic?: boolean;
}

// Liste mondiale de supermarchés
const STORES: Store[] = [
  // France - Paris
  { id: '1', name: 'Leclerc', brand: 'Leclerc', address: '123 rue de Paris, Paris', country: 'France', distance: 0.8, type: 'supermarket' },
  { id: '2', name: 'Carrefour City', brand: 'Carrefour', address: '45 avenue des Champs, Paris', country: 'France', distance: 1.2, type: 'supermarket' },
  { id: '3', name: 'Super U', brand: 'Super U', address: '78 boulevard Haussmann, Paris', country: 'France', distance: 2.4, type: 'supermarket' },
  { id: '4', name: 'Aldi', brand: 'Aldi', address: '15 rue de Rivoli, Paris', country: 'France', distance: 3.1, type: 'supermarket' },
  { id: '5', name: 'Lidl', brand: 'Lidl', address: '99 rue Saint-Antoine, Paris', country: 'France', distance: 3.5, type: 'supermarket' },
  
  // France - Autres régions
  { id: '101', name: 'Carrefour Hypermarché', brand: 'Carrefour', address: '10 avenue du Commerce, Lyon', country: 'France', distance: 1.3, type: 'supermarket' },
  { id: '102', name: 'E.Leclerc Hypermarché', brand: 'Leclerc', address: '25 rue des Grands Magasins, Marseille', country: 'France', distance: 2.1, type: 'supermarket' },
  { id: '103', name: 'Auchan', brand: 'Auchan', address: '5 boulevard de l\'Europe, Lille', country: 'France', distance: 0.9, type: 'supermarket' },
  { id: '104', name: 'Intermarché Super', brand: 'Intermarché', address: '17 rue de la République, Bordeaux', country: 'France', distance: 1.7, type: 'supermarket' },
  { id: '105', name: 'Géant Casino', brand: 'Casino', address: '3 place du Marché, Nice', country: 'France', distance: 2.5, type: 'supermarket' },
  { id: '106', name: 'Cora', brand: 'Cora', address: '8 avenue Jean Moulin, Strasbourg', country: 'France', distance: 3.2, type: 'supermarket' },
  { id: '107', name: 'Grand Frais', brand: 'Grand Frais', address: '12 rue des Primeurs, Toulouse', country: 'France', distance: 1.8, type: 'supermarket' },
  { id: '108', name: 'Biocoop', brand: 'Biocoop', address: '22 rue des Plantes, Montpellier', country: 'France', distance: 2.3, type: 'supermarket' },
  { id: '109', name: 'Système U Hyper', brand: 'Super U', address: '7 avenue de la Mer, Nantes', country: 'France', distance: 1.5, type: 'supermarket' },
  { id: '110', name: 'Aldi', brand: 'Aldi', address: '14 rue du Discount, Rennes', country: 'France', distance: 2.7, type: 'supermarket' },
  { id: '111', name: 'Lidl', brand: 'Lidl', address: '9 avenue des Prix Bas, Grenoble', country: 'France', distance: 2.0, type: 'supermarket' },
  { id: '112', name: 'Netto', brand: 'Netto', address: '3 rue des Économies, Dijon', country: 'France', distance: 1.6, type: 'supermarket' },
  { id: '113', name: 'Carrefour Market', brand: 'Carrefour', address: '16 rue du Commerce, Reims', country: 'France', distance: 2.9, type: 'supermarket' },
  { id: '114', name: 'Monoprix', brand: 'Monoprix', address: '20 rue Centrale, Annecy', country: 'France', distance: 1.4, type: 'supermarket' },
  { id: '115', name: 'Franprix', brand: 'Franprix', address: '11 avenue des Boutiques, Toulon', country: 'France', distance: 2.2, type: 'supermarket' },
  { id: '116', name: 'Spar', brand: 'Spar', address: '5 place du Village, Angers', country: 'France', distance: 0.7, type: 'supermarket' },
  { id: '117', name: 'Colruyt', brand: 'Colruyt', address: '4 rue de Belgique, Metz', country: 'France', distance: 1.9, type: 'supermarket' },
  { id: '118', name: 'Naturalia', brand: 'Naturalia', address: '8 rue des Plantes, Aix-en-Provence', country: 'France', distance: 2.4, type: 'supermarket' },
  { id: '119', name: 'Picard', brand: 'Picard', address: '13 rue des Surgelés, Clermont-Ferrand', country: 'France', distance: 1.1, type: 'supermarket' },
  { id: '120', name: 'La Vie Claire', brand: 'La Vie Claire', address: '6 rue des Vitamines, Brest', country: 'France', distance: 2.6, type: 'supermarket' },
  
  // Paris (conservés de la liste originale)
  { id: '6', name: 'Intermarché', brand: 'Intermarché', address: '27 rue du Faubourg Saint-Martin, Paris', country: 'France', distance: 1.7, type: 'supermarket' },
  { id: '7', name: 'Monoprix', brand: 'Monoprix', address: '158 avenue des Ternes, Paris', country: 'France', distance: 2.2, type: 'supermarket' },
  { id: '8', name: 'Casino', brand: 'Casino', address: '35 boulevard de Clichy, Paris', country: 'France', distance: 2.8, type: 'supermarket' },
  { id: '9', name: 'Franprix', brand: 'Franprix', address: '42 rue de la Roquette, Paris', country: 'France', distance: 1.5, type: 'supermarket' },
  { id: '10', name: 'Auchan', brand: 'Auchan', address: '240 avenue Daumesnil, Paris', country: 'France', distance: 3.9, type: 'supermarket' },
  { id: '11', name: 'Carrefour Market', brand: 'Carrefour', address: '18 rue de Passy, Paris', country: 'France', distance: 2.6, type: 'supermarket' },
  { id: '12', name: 'Biocoop', brand: 'Biocoop', address: '52 rue de Paradis, Paris', country: 'France', distance: 1.9, type: 'supermarket' },
  { id: '13', name: 'Naturalia', brand: 'Naturalia', address: '89 rue Montorgueil, Paris', country: 'France', distance: 1.3, type: 'supermarket' },
  { id: '14', name: 'Picard', brand: 'Picard', address: '64 rue du Bac, Paris', country: 'France', distance: 2.1, type: 'supermarket' },
  { id: '15', name: 'G20', brand: 'G20', address: '113 rue Oberkampf, Paris', country: 'France', distance: 2.9, type: 'supermarket' },
  
  // Agriculteurs et producteurs locaux - France
  { id: 'f1', name: 'Ferme Bio du Vexin', brand: 'Ferme Bio du Vexin', address: 'Route de Gisors, Vexin', country: 'France', distance: 35.0, type: 'farm', products: ['Légumes', 'Fruits', 'Œufs'], organic: true },
  { id: 'f2', name: 'Les Vergers de la Vallée', brand: 'Les Vergers de la Vallée', address: 'Chemin des Pommiers, Normandie', country: 'France', distance: 120.0, type: 'farm', products: ['Pommes', 'Poires', 'Cidre'], organic: true },
  { id: 'f3', name: 'Ferme des Quatre Saisons', brand: 'Ferme des Quatre Saisons', address: 'Route de la campagne, Picardie', country: 'France', distance: 85.0, type: 'farm', products: ['Légumes de saison', 'Herbes aromatiques'], organic: true },
  { id: 'f4', name: 'Le Potager d\'Émilie', brand: 'Le Potager d\'Émilie', address: '15 chemin des Cultures, Île-de-France', country: 'France', distance: 25.0, type: 'farm', products: ['Légumes bio', 'Paniers hebdomadaires'], organic: true },
  { id: 'f5', name: 'La Ferme de Martin', brand: 'La Ferme de Martin', address: '8 rue des Champs, Val-d\'Oise', country: 'France', distance: 40.0, type: 'farm', products: ['Viande de bœuf', 'Volaille fermière'], organic: false },
  { id: 'f6', name: 'Les Ruches d\'Île-de-France', brand: 'Les Ruches d\'Île-de-France', address: '3 chemin des Abeilles, Yvelines', country: 'France', distance: 38.0, type: 'farm', products: ['Miel', 'Produits de la ruche'], organic: true },
  { id: 'f7', name: 'Fromagerie Artisanale du Brie', brand: 'Fromagerie du Brie', address: '45 route du Lait, Seine-et-Marne', country: 'France', distance: 65.0, type: 'farm', products: ['Fromages', 'Produits laitiers'], organic: false },
  { id: 'f8', name: 'Champignonnière de la Seine', brand: 'Champignonnière de la Seine', address: '22 rue des Carrières, Essonne', country: 'France', distance: 30.0, type: 'farm', products: ['Champignons', 'Compost bio'], organic: true },
  { id: 'f9', name: 'Les Terres Maraîchères', brand: 'Terres Maraîchères', address: '17 allée des Maraîchers, Hauts-de-Seine', country: 'France', distance: 15.0, type: 'farm', products: ['Légumes de saison', 'Fruits rouges'], organic: true },
  
  // Agriculteurs - Lyon et région
  { id: 'f10', name: 'Ferme Bio du Rhône', brand: 'Ferme du Rhône', address: 'Route des Coteaux, Rhône-Alpes', country: 'France', distance: 20.0, type: 'farm', products: ['Légumes', 'Fruits'], organic: true },
  { id: 'f11', name: 'La Chèvrerie de Lyon', brand: 'Chèvrerie de Lyon', address: '8 chemin des Chèvres, Lyon', country: 'France', distance: 18.0, type: 'farm', products: ['Fromages de chèvre', 'Yaourts'], organic: false },
  
  // Agriculteurs - Marseille et région
  { id: 'f12', name: 'Le Potager Provençal', brand: 'Potager Provençal', address: 'Route de Cassis, Marseille', country: 'France', distance: 12.0, type: 'farm', products: ['Légumes méditerranéens', 'Herbes de Provence'], organic: true },
  { id: 'f13', name: 'Oliveraie de Provence', brand: 'Oliveraie de Provence', address: '23 chemin des Oliviers, Bouches-du-Rhône', country: 'France', distance: 25.0, type: 'farm', products: ['Huile d\'olive', 'Olives', 'Tapenades'], organic: true },
  
  // Agriculteurs - Bordeaux et région
  { id: 'f14', name: 'Vignoble Bio de Bordeaux', brand: 'Vignoble Bio', address: '45 route des Vignes, Bordeaux', country: 'France', distance: 15.0, type: 'farm', products: ['Vin bio', 'Raisin de table'], organic: true },
  { id: 'f15', name: 'La Ferme du Médoc', brand: 'Ferme du Médoc', address: '12 allée des Pins, Médoc', country: 'France', distance: 40.0, type: 'farm', products: ['Légumes', 'Canard', 'Foie gras'], organic: false },
  
  // Marchés locaux
  { id: 'm1', name: 'Marché d\'Aligre', brand: 'Marché d\'Aligre', address: 'Place d\'Aligre, Paris', country: 'France', distance: 2.5, type: 'market', products: ['Produits frais', 'Produits locaux'] },
  { id: 'm2', name: 'Marché de Rungis', brand: 'Marché de Rungis', address: 'Avenue de Fontainebleau, Rungis', country: 'France', distance: 12.0, type: 'market', products: ['Produits frais', 'Produits en gros'] },
  { id: 'm3', name: 'Marché Bio de Batignolles', brand: 'Marché Bio', address: 'Boulevard des Batignolles, Paris', country: 'France', distance: 3.0, type: 'market', products: ['Produits bio', 'Produits locaux'], organic: true },
  
  // États-Unis
  { id: '16', name: 'Walmart', brand: 'Walmart', address: '123 Main St, New York', country: 'USA', distance: 1.5, type: 'supermarket' },
  { id: '17', name: 'Target', brand: 'Target', address: '456 Broadway, New York', country: 'USA', distance: 2.3, type: 'supermarket' },
  { id: '18', name: 'Kroger', brand: 'Kroger', address: '789 5th Ave, New York', country: 'USA', distance: 3.1, type: 'supermarket' },
  { id: '19', name: 'Whole Foods', brand: 'Whole Foods', address: '101 7th Ave, New York', country: 'USA', distance: 1.8, type: 'supermarket' },
  { id: '20', name: 'Costco', brand: 'Costco', address: '202 8th St, New York', country: 'USA', distance: 4.2, type: 'supermarket' },
  
  // Royaume-Uni
  { id: '21', name: 'Tesco', brand: 'Tesco', address: '10 Oxford St, London', country: 'UK', distance: 1.2, type: 'supermarket' },
  { id: '22', name: 'Sainsbury\'s', brand: 'Sainsbury\'s', address: '20 Regent St, London', country: 'UK', distance: 2.5, type: 'supermarket' },
  { id: '23', name: 'ASDA', brand: 'ASDA', address: '30 Baker St, London', country: 'UK', distance: 3.0, type: 'supermarket' },
  { id: '24', name: 'Morrisons', brand: 'Morrisons', address: '40 Bond St, London', country: 'UK', distance: 2.1, type: 'supermarket' },
  { id: '25', name: 'Waitrose', brand: 'Waitrose', address: '50 Carnaby St, London', country: 'UK', distance: 1.7, type: 'supermarket' },
  
  // Allemagne
  { id: '26', name: 'REWE', brand: 'REWE', address: 'Alexanderplatz 1, Berlin', country: 'Allemagne', distance: 1.3, type: 'supermarket' },
  { id: '27', name: 'Edeka', brand: 'Edeka', address: 'Friedrichstrasse 20, Berlin', country: 'Allemagne', distance: 2.2, type: 'supermarket' },
  { id: '28', name: 'Kaufland', brand: 'Kaufland', address: 'Potsdamer Platz 5, Berlin', country: 'Allemagne', distance: 3.5, type: 'supermarket' },
  
  // Espagne
  { id: '29', name: 'Mercadona', brand: 'Mercadona', address: 'Gran Via, Madrid', country: 'Espagne', distance: 1.1, type: 'supermarket' },
  { id: '30', name: 'El Corte Inglés', brand: 'El Corte Inglés', address: 'Sol 15, Madrid', country: 'Espagne', distance: 2.4, type: 'supermarket' },
  
  // Italie
  { id: '31', name: 'Coop', brand: 'Coop', address: 'Via Roma 10, Rome', country: 'Italie', distance: 1.6, type: 'supermarket' },
  { id: '32', name: 'Esselunga', brand: 'Esselunga', address: 'Via Veneto 25, Rome', country: 'Italie', distance: 2.8, type: 'supermarket' },
  
  // Japon
  { id: '33', name: '7-Eleven', brand: '7-Eleven', address: 'Shibuya 1-1, Tokyo', country: 'Japon', distance: 0.7, type: 'supermarket' },
  { id: '34', name: 'FamilyMart', brand: 'FamilyMart', address: 'Shinjuku 2-3, Tokyo', country: 'Japon', distance: 1.2, type: 'supermarket' },
  
  // Australie
  { id: '35', name: 'Woolworths', brand: 'Woolworths', address: 'George St 100, Sydney', country: 'Australie', distance: 1.9, type: 'supermarket' },
  { id: '36', name: 'Coles', brand: 'Coles', address: 'Pitt St 200, Sydney', country: 'Australie', distance: 2.6, type: 'supermarket' },
  
  // Canada
  { id: '37', name: 'Loblaws', brand: 'Loblaws', address: '123 Yonge St, Toronto', country: 'Canada', distance: 1.4, type: 'supermarket' },
  { id: '38', name: 'Sobeys', brand: 'Sobeys', address: '456 Queen St, Toronto', country: 'Canada', distance: 2.7, type: 'supermarket' },
  
  // Brésil
  { id: '39', name: 'Pão de Açúcar', brand: 'Pão de Açúcar', address: 'Av. Paulista 1000, São Paulo', country: 'Brésil', distance: 2.0, type: 'supermarket' },
  { id: '40', name: 'Carrefour', brand: 'Carrefour', address: 'Av. Brasil 2000, Rio de Janeiro', country: 'Brésil', distance: 3.2, type: 'supermarket' },
];

// Grouper les magasins par type et par pays
const storesByTypeAndCountry = STORES.reduce((acc, store) => {
  const type = store.type || 'supermarket';
  const country = store.country || 'Autre';
  
  if (!acc[type]) {
    acc[type] = {};
  }
  
  if (!acc[type][country]) {
    acc[type][country] = [];
  }
  
  acc[type][country].push(store);
  return acc;
}, {} as Record<string, Record<string, Store[]>>);

interface StorePickerProps {
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const StorePicker = ({ onStoreSelect, className }: StorePickerProps) => {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [textToSpeech, setTextToSpeech] = useState<boolean>(false);
  const [storeType, setStoreType] = useState<'all' | 'supermarket' | 'farm' | 'market'>('all');

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

  // Filtrer les magasins selon le type sélectionné
  const getFilteredStores = () => {
    if (storeType === 'all') {
      return storesByTypeAndCountry;
    }
    
    const filtered: Record<string, Record<string, Store[]>> = {};
    filtered[storeType] = storesByTypeAndCountry[storeType] || {};
    
    return filtered;
  };

  const getStoreIcon = (type?: 'supermarket' | 'farm' | 'market') => {
    switch (type) {
      case 'farm':
        return <Tractor className="h-4 w-4 mr-1" />;
      case 'market':
        return <Apple className="h-4 w-4 mr-1" />;
      case 'supermarket':
      default:
        return <Store className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Store className="h-4 w-4" />
          <span>Sélectionnez un point de vente</span>
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
      
      <div className="flex gap-2 mb-2">
        <Button 
          variant={storeType === 'all' ? "default" : "outline"} 
          size="sm" 
          className="text-xs flex-1"
          onClick={() => setStoreType('all')}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          Tous
        </Button>
        <Button 
          variant={storeType === 'supermarket' ? "default" : "outline"} 
          size="sm" 
          className="text-xs flex-1"
          onClick={() => setStoreType('supermarket')}
        >
          <Store className="h-3.5 w-3.5 mr-1" />
          Supermarchés
        </Button>
        <Button 
          variant={storeType === 'farm' ? "default" : "outline"} 
          size="sm" 
          className="text-xs flex-1"
          onClick={() => setStoreType('farm')}
        >
          <Tractor className="h-3.5 w-3.5 mr-1" />
          Agriculteurs
        </Button>
        <Button 
          variant={storeType === 'market' ? "default" : "outline"} 
          size="sm" 
          className="text-xs flex-1"
          onClick={() => setStoreType('market')}
        >
          <Carrot className="h-3.5 w-3.5 mr-1" />
          Marchés
        </Button>
      </div>
      
      <Select value={selectedStore} onValueChange={handleStoreChange}>
        <SelectTrigger className="bg-background/80 backdrop-blur border shadow-sm">
          <SelectValue placeholder="Choisir un point de vente" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.entries(getFilteredStores()).map(([type, countries]) => (
            <div key={type}>
              {Object.keys(countries).sort().map((country) => (
                <SelectGroup key={`${type}-${country}`}>
                  <SelectLabel className="flex items-center">
                    {type === 'farm' && <Tractor className="h-3.5 w-3.5 mr-1" />}
                    {type === 'market' && <Apple className="h-3.5 w-3.5 mr-1" />}
                    {type === 'supermarket' && <Store className="h-3.5 w-3.5 mr-1" />}
                    {type === 'farm' ? 'Producteurs - ' : type === 'market' ? 'Marchés - ' : ''}{country}
                  </SelectLabel>
                  {countries[country].map((store) => (
                    <SelectItem 
                      key={store.id} 
                      value={store.id}
                      className="focus:bg-primary/10"
                    >
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center">
                          {getStoreIcon(store.type)}
                          <span>{store.brand} - {store.name}</span>
                          {store.organic && <span className="ml-1 text-xs text-green-600 font-medium">Bio</span>}
                        </div>
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
            </div>
          ))}
        </SelectContent>
      </Select>
      
      {selectedStore && (
        <div className="bg-muted/50 p-3 rounded-md border animate-fade-in">
          <div className="flex items-start space-x-2">
            {getStoreIcon(getStoreById(selectedStore)?.type)}
            <div className="space-y-1">
              <h4 className="font-medium text-sm">
                {getStoreById(selectedStore)?.brand} - {getStoreById(selectedStore)?.name}
                {getStoreById(selectedStore)?.organic && <span className="ml-1 text-xs text-green-600 font-medium">Bio</span>}
              </h4>
              <p className="text-xs text-muted-foreground">
                {getStoreById(selectedStore)?.address}
                {getStoreById(selectedStore)?.country && (
                  <span> ({getStoreById(selectedStore)?.country})</span>
                )}
              </p>
              {getStoreById(selectedStore)?.products && (
                <p className="text-xs text-muted-foreground">
                  Produits: {getStoreById(selectedStore)?.products?.join(', ')}
                </p>
              )}
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
            speakText("Recherche de points de vente à proximité en utilisant votre position");
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
