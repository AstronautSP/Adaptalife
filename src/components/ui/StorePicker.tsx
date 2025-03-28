
import { useState } from 'react';
import { Store, MapPin, ChevronDown, Globe, Volume2, Tractor, Apple, Carrot, Egg, Flag } from 'lucide-react';
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
  type?: 'supermarket' | 'farm' | 'market' | 'bakery' | 'seafood';
  products?: string[];
  organic?: boolean;
}

// Liste de magasins et producteurs en France et à l'international
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
  
  // Saint-Médard-en-Jalles (Nouvelle Aquitaine)
  { id: '201', name: 'Intermarché Super', brand: 'Intermarché', address: '2 avenue Montaigne, Saint-Médard-en-Jalles', country: 'France', distance: 1.2, type: 'supermarket' },
  { id: '202', name: 'Leclerc', brand: 'Leclerc', address: '104 avenue Montesquieu, Saint-Médard-en-Jalles', country: 'France', distance: 0.8, type: 'supermarket' },
  { id: '203', name: 'Carrefour Market', brand: 'Carrefour', address: '35 rue François Mitterrand, Saint-Médard-en-Jalles', country: 'France', distance: 1.5, type: 'supermarket' },
  { id: '204', name: 'Lidl', brand: 'Lidl', address: '17 avenue du Haillan, Saint-Médard-en-Jalles', country: 'France', distance: 2.0, type: 'supermarket' },
  { id: '205', name: 'Aldi', brand: 'Aldi', address: '28 avenue de Magudas, Saint-Médard-en-Jalles', country: 'France', distance: 2.3, type: 'supermarket' },
  { id: '206', name: 'Bio c\' Bon', brand: 'Bio c\' Bon', address: '12 place de la République, Saint-Médard-en-Jalles', country: 'France', distance: 0.5, type: 'supermarket', organic: true },
  
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
  
  // Agriculteur près de Saint-Médard-en-Jalles
  { id: 'f20', name: 'Ferme de la Forêt', brand: 'Ferme de la Forêt', address: 'Route de Lacanau, Saint-Médard-en-Jalles', country: 'France', distance: 3.5, type: 'farm', products: ['Légumes', 'Fruits', 'Miel'], organic: true },
  { id: 'f21', name: 'Les Jardins Médocains', brand: 'Jardins Médocains', address: 'Chemin des Vignes, Saint-Médard-en-Jalles', country: 'France', distance: 2.8, type: 'farm', products: ['Légumes bio', 'Herbes aromatiques'], organic: true },
  { id: 'f22', name: 'Élevage du Taillan', brand: 'Élevage du Taillan', address: '45 route de Saint-Aubin, Saint-Médard-en-Jalles', country: 'France', distance: 4.2, type: 'farm', products: ['Volailles', 'Œufs fermiers'], organic: false },
  
  // Nouveaux producteurs d'huîtres et fruits de mer - Littoral atlantique
  { id: 'o1', name: 'Huîtres du Bassin', brand: 'Huîtres du Bassin', address: 'Port ostréicole, Arcachon', country: 'France', distance: 45.0, type: 'seafood', products: ['Huîtres', 'Palourdes', 'Moules'], organic: false },
  { id: 'o2', name: 'Cabane à Huîtres', brand: 'Cabane à Huîtres', address: 'Jetée Thiers, Arcachon', country: 'France', distance: 46.0, type: 'seafood', products: ['Huîtres', 'Crevettes', 'Bulots'], organic: false },
  { id: 'o3', name: 'Établissement Marennes-Oléron', brand: 'Marennes-Oléron', address: 'Port de la Cayenne, Marennes', country: 'France', distance: 130.0, type: 'seafood', products: ['Huîtres', 'Coquillages divers'], organic: false },
  { id: 'o4', name: 'Ostréiculteur Bio de la Pointe', brand: 'Bio de la Pointe', address: 'Pointe du Cap Ferret, Lège-Cap-Ferret', country: 'France', distance: 55.0, type: 'seafood', products: ['Huîtres bio', 'Palourdes bio'], organic: true },
  
  // Poissonneries et fruits de mer - Bordeaux et région
  { id: 's1', name: 'Poissonnerie du Port', brand: 'Poissonnerie du Port', address: '15 quai des Chartrons, Bordeaux', country: 'France', distance: 18.0, type: 'seafood', products: ['Poissons frais', 'Fruits de mer', 'Crustacés'], organic: false },
  { id: 's2', name: 'Marée Fraîche', brand: 'Marée Fraîche', address: '8 place du Marché, Bordeaux', country: 'France', distance: 15.5, type: 'seafood', products: ['Poissons', 'Plateaux de fruits de mer'], organic: false },
  
  // Poissonnier local de Saint-Médard-en-Jalles
  { id: 's10', name: 'Poissonnerie de Saint-Médard', brand: 'Poissonnerie de Saint-Médard', address: '25 rue Jean Dupérier, Saint-Médard-en-Jalles', country: 'France', distance: 0.7, type: 'seafood', products: ['Poissons frais', 'Huîtres', 'Crevettes'], organic: false },
  
  // Boulangeries traditionnelles - France
  { id: 'b1', name: 'Boulangerie Tartine et Pain Frais', brand: 'Tartine et Pain Frais', address: '45 rue du Four, Paris', country: 'France', distance: 1.8, type: 'bakery', products: ['Pain traditionnel', 'Viennoiseries', 'Pâtisseries'], organic: false },
  { id: 'b2', name: 'Maison Leblanc', brand: 'Maison Leblanc', address: '12 rue des Boulangeries, Lyon', country: 'France', distance: 2.3, type: 'bakery', products: ['Pain au levain', 'Baguettes', 'Tartes'], organic: false },
  { id: 'b3', name: 'La Mie Bio', brand: 'La Mie Bio', address: '7 place du Village, Nantes', country: 'France', distance: 1.5, type: 'bakery', products: ['Pain biologique', 'Viennoiseries bio', 'Pâtisseries artisanales'], organic: true },
  
  // Boulangeries à Saint-Médard-en-Jalles
  { id: 'b10', name: 'Boulangerie du Centre', brand: 'Boulangerie du Centre', address: '5 place de l\'Église, Saint-Médard-en-Jalles', country: 'France', distance: 0.4, type: 'bakery', products: ['Pains spéciaux', 'Pâtisseries', 'Viennoiseries'], organic: false },
  { id: 'b11', name: 'Fournil de Saint-Médard', brand: 'Fournil de Saint-Médard', address: '18 avenue Montesquieu, Saint-Médard-en-Jalles', country: 'France', distance: 0.9, type: 'bakery', products: ['Pain au levain', 'Pain de campagne', 'Pâtisseries fines'], organic: false },
  { id: 'b12', name: 'Le Pain d\'Antan', brand: 'Le Pain d\'Antan', address: '22 rue Jean Jaurès, Saint-Médard-en-Jalles', country: 'France', distance: 1.1, type: 'bakery', products: ['Pain traditionnel', 'Spécialités régionales', 'Sandwichs'], organic: false },
  { id: 'b13', name: 'La Mie d\'Or', brand: 'La Mie d\'Or', address: '3 avenue de la Boétie, Saint-Médard-en-Jalles', country: 'France', distance: 1.7, type: 'bakery', products: ['Baguette tradition', 'Pain de seigle', 'Pâtisseries artisanales'], organic: false },
  
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
  
  // Marché local de Saint-Médard-en-Jalles
  { id: 'm10', name: 'Marché de Saint-Médard', brand: 'Marché de Saint-Médard', address: 'Place de la République, Saint-Médard-en-Jalles', country: 'France', distance: 0.3, type: 'market', products: ['Produits frais', 'Produits locaux'] },
  
  // International - Europe
  { id: 'eu1', name: 'Delhaize', brand: 'Delhaize', address: '45 rue Neuve, Bruxelles', country: 'Belgique', distance: 320.0, type: 'supermarket' },
  { id: 'eu2', name: 'Albert Heijn', brand: 'Albert Heijn', address: 'Damrak 57, Amsterdam', country: 'Pays-Bas', distance: 510.0, type: 'supermarket' },
  { id: 'eu3', name: 'Mercadona', brand: 'Mercadona', address: 'Calle Gran Vía 50, Madrid', country: 'Espagne', distance: 850.0, type: 'supermarket' },
  { id: 'eu4', name: 'Edeka', brand: 'Edeka', address: 'Hauptstraße 10, Berlin', country: 'Allemagne', distance: 880.0, type: 'supermarket' },
  { id: 'eu5', name: 'Waitrose', brand: 'Waitrose', address: 'Oxford Street 120, Londres', country: 'Royaume-Uni', distance: 340.0, type: 'supermarket' },
  { id: 'eu6', name: 'Coop', brand: 'Coop', address: 'Via Roma 25, Rome', country: 'Italie', distance: 1100.0, type: 'supermarket' },
  { id: 'eu7', name: 'Migros', brand: 'Migros', address: 'Bahnhofstrasse 15, Zurich', country: 'Suisse', distance: 580.0, type: 'supermarket' },
  
  // International - Amérique du Nord
  { id: 'na1', name: 'Whole Foods Market', brand: 'Whole Foods', address: '10 Columbus Circle, New York', country: 'États-Unis', distance: 5840.0, type: 'supermarket', organic: true },
  { id: 'na2', name: 'Trader Joe\'s', brand: 'Trader Joe\'s', address: '72 Boylston Street, Boston', country: 'États-Unis', distance: 5520.0, type: 'supermarket' },
  { id: 'na3', name: 'Safeway', brand: 'Safeway', address: '1335 Webster St, San Francisco', country: 'États-Unis', distance: 8960.0, type: 'supermarket' },
  { id: 'na4', name: 'Loblaw', brand: 'Loblaw', address: '396 St. Clair Ave W, Toronto', country: 'Canada', distance: 5930.0, type: 'supermarket' },
  
  // International - Asie
  { id: 'as1', name: 'AEON', brand: 'AEON', address: '1-5-1 Nakase, Mihama-ku, Chiba', country: 'Japon', distance: 9720.0, type: 'supermarket' },
  { id: 'as2', name: 'E-Mart', brand: 'E-Mart', address: '50 Seocho-daero, Seocho-gu, Seoul', country: 'Corée du Sud', distance: 9150.0, type: 'supermarket' },
  { id: 'as3', name: 'FairPrice', brand: 'FairPrice', address: '80 Marine Parade Road, Singapore', country: 'Singapour', distance: 10850.0, type: 'supermarket' },
  
  // International - Océanie
  { id: 'oc1', name: 'Woolworths', brand: 'Woolworths', address: '500 Oxford Street, Sydney', country: 'Australie', distance: 16900.0, type: 'supermarket' },
  { id: 'oc2', name: 'Countdown', brand: 'Countdown', address: '76 Victoria Street, Wellington', country: 'Nouvelle-Zélande', distance: 18970.0, type: 'supermarket' },
  
  // Fermes et producteurs internationaux
  { id: 'if1', name: 'Toscana Agricola', brand: 'Toscana Agricola', address: 'Via delle Vigne 45, Toscane', country: 'Italie', distance: 1020.0, type: 'farm', products: ['Huile d\'olive', 'Vin', 'Tomates'], organic: true },
  { id: 'if2', name: 'Swiss Mountain Dairy', brand: 'Swiss Mountain Dairy', address: 'Bergstrasse 22, Interlaken', country: 'Suisse', distance: 650.0, type: 'farm', products: ['Fromage', 'Lait', 'Yaourt'], organic: true },
  { id: 'if3', name: 'Dehesa Extremadura', brand: 'Dehesa Extremadura', address: 'Carretera EX-101 km 35, Extremadura', country: 'Espagne', distance: 980.0, type: 'farm', products: ['Jamón ibérico', 'Chorizo', 'Fromage'], organic: false },
  { id: 'if4', name: 'Greek Olive Grove', brand: 'Greek Olive Grove', address: 'Leoforos Kalamatas 78, Kalamata', country: 'Grèce', distance: 2350.0, type: 'farm', products: ['Huile d\'olive', 'Olives', 'Feta'], organic: true },
];

// Grouper les magasins par pays et type
const storesByCountryAndType = STORES.reduce((acc, store) => {
  const country = store.country || 'International';
  const type = store.type || 'supermarket';
  
  if (!acc[country]) {
    acc[country] = {};
  }
  
  if (!acc[country][type]) {
    acc[country][type] = [];
  }
  
  acc[country][type].push(store);
  return acc;
}, {} as Record<string, Record<string, Store[]>>);

// Déterminer les régions françaises
const getFrenchRegion = (address: string): string => {
  if (address.includes('Paris') || address.includes('Île-de-France') || address.includes('Yvelines') || 
      address.includes('Seine') || address.includes('Val-d\'Oise') || address.includes('Essonne')) {
    return 'Île-de-France';
  } else if (address.includes('Lyon') || address.includes('Rhône') || address.includes('Grenoble') || 
            address.includes('Rhône-Alpes') || address.includes('Annecy') || address.includes('Clermont-Ferrand')) {
    return 'Auvergne-Rhône-Alpes';
  } else if (address.includes('Marseille') || address.includes('Provence') || address.includes('Aix') || 
            address.includes('Toulon') || address.includes('Bouches-du-Rhône')) {
    return 'Provence-Alpes-Côte d\'Azur';
  } else if (address.includes('Bordeaux') || address.includes('Médoc') || 
            address.includes('Saint-Médard-en-Jalles') || address.includes('Aquitaine')) {
    return 'Nouvelle-Aquitaine';
  } else if (address.includes('Lille') || address.includes('Nord') || 
            address.includes('Picardie') || address.includes('Hauts-de-France')) {
    return 'Hauts-de-France';
  } else if (address.includes('Strasbourg') || address.includes('Metz') || 
            address.includes('Alsace') || address.includes('Lorraine')) {
    return 'Grand Est';
  } else if (address.includes('Toulouse') || address.includes('Montpellier') || 
            address.includes('Occitanie')) {
    return 'Occitanie';
  } else if (address.includes('Nantes') || address.includes('Angers') || 
            address.includes('Loire')) {
    return 'Pays de la Loire';
  } else if (address.includes('Rennes') || address.includes('Brest') || 
            address.includes('Bretagne')) {
    return 'Bretagne';
  } else if (address.includes('Normandie')) {
    return 'Normandie';
  } else if (address.includes('Dijon') || address.includes('Bourgogne')) {
    return 'Bourgogne-Franche-Comté';
  } else {
    return 'Autre région française';
  }
};

// Grouper les magasins français par région et type
const frenchStoresByRegionAndType = STORES.filter(store => store.country === 'France').reduce((acc, store) => {
  const region = getFrenchRegion(store.address);
  const type = store.type || 'supermarket';
  
  if (!acc[region]) {
    acc[region] = {};
  }
  
  if (!acc[region][type]) {
    acc[region][type] = [];
  }
  
  acc[region][type].push(store);
  return acc;
}, {} as Record<string, Record<string, Store[]>>);

interface StorePickerProps {
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const StorePicker = ({ onStoreSelect, className }: StorePickerProps) => {
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [textToSpeech, setTextToSpeech] = useState<boolean>(false);
  const [storeType, setStoreType] = useState<'all' | 'supermarket' | 'farm' | 'market' | 'bakery' | 'seafood'>('all');
  const [country, setCountry] = useState<'all' | 'France' | 'international'>('all');

  const handleStoreChange = (value: string) => {
    setSelectedStore(value);
    onStoreSelect?.(value);
    
    // Synthèse vocale si activée
    if (textToSpeech) {
      const store = getStoreById(value);
      if (store) {
        const message = `Vous avez sélectionné ${store.brand} - ${store.name}, situé à ${store.address}${store.country !== 'France' ? ' en ' + store.country : ''}`;
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

  // Filtrer les magasins selon le type et le pays sélectionnés
  const getFilteredStores = () => {
    // Filtrer par type de magasin
    const filteredByType = storeType === 'all' 
      ? STORES 
      : STORES.filter(store => store.type === storeType);
    
    // Ensuite filtrer par pays
    let filteredStores = filteredByType;
    if (country === 'France') {
      filteredStores = filteredByType.filter(store => store.country === 'France');
    } else if (country === 'international') {
      filteredStores = filteredByType.filter(store => store.country !== 'France');
    }
    
    // Organiser par pays/région et type
    return filteredStores.reduce((acc, store) => {
      const storeCountry = store.country || 'Autre';
      const storeType = store.type || 'supermarket';
      
      // Pour la France, grouper par région
      if (storeCountry === 'France') {
        const region = getFrenchRegion(store.address);
        
        if (!acc[`France - ${region}`]) {
          acc[`France - ${region}`] = {};
        }
        
        if (!acc[`France - ${region}`][storeType]) {
          acc[`France - ${region}`][storeType] = [];
        }
        
        acc[`France - ${region}`][storeType].push(store);
      } else {
        // Pour l'international, grouper par pays
        if (!acc[storeCountry]) {
          acc[storeCountry] = {};
        }
        
        if (!acc[storeCountry][storeType]) {
          acc[storeCountry][storeType] = [];
        }
        
        acc[storeCountry][storeType].push(store);
      }
      
      return acc;
    }, {} as Record<string, Record<string, Store[]>>);
  };

  const getStoreIcon = (type?: 'supermarket' | 'farm' | 'market' | 'bakery' | 'seafood') => {
    switch (type) {
      case 'farm':
        return <Tractor className="h-4 w-4 mr-1" />;
      case 'market':
        return <Apple className="h-4 w-4 mr-1" />;
      case 'bakery':
        return <Egg className="h-4 w-4 mr-1" />;
      case 'seafood':
        return <Carrot className="h-4 w-4 mr-1" />;
      case 'supermarket':
      default:
        return <Store className="h-4 w-4 mr-1" />;
    }
  };

  // Obtenir les données filtrées pour l'affichage
  const filteredStoreData = getFilteredStores();

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
      
      {/* Filtres par pays */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button 
          variant={country === 'all' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setCountry('all')}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          Tous les pays
        </Button>
        <Button 
          variant={country === 'France' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setCountry('France')}
        >
          <Flag className="h-3.5 w-3.5 mr-1" />
          France
        </Button>
        <Button 
          variant={country === 'international' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setCountry('international')}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          International
        </Button>
      </div>
      
      {/* Filtres par type */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button 
          variant={storeType === 'all' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('all')}
        >
          <Globe className="h-3.5 w-3.5 mr-1" />
          Tous les types
        </Button>
        <Button 
          variant={storeType === 'supermarket' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('supermarket')}
        >
          <Store className="h-3.5 w-3.5 mr-1" />
          Supermarchés
        </Button>
        <Button 
          variant={storeType === 'farm' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('farm')}
        >
          <Tractor className="h-3.5 w-3.5 mr-1" />
          Agriculteurs
        </Button>
        <Button 
          variant={storeType === 'market' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('market')}
        >
          <Apple className="h-3.5 w-3.5 mr-1" />
          Marchés
        </Button>
        <Button 
          variant={storeType === 'bakery' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('bakery')}
        >
          <Egg className="h-3.5 w-3.5 mr-1" />
          Boulangeries
        </Button>
        <Button 
          variant={storeType === 'seafood' ? "default" : "outline"} 
          size="sm" 
          className="text-xs"
          onClick={() => setStoreType('seafood')}
        >
          <Carrot className="h-3.5 w-3.5 mr-1" />
          Fruits de mer
        </Button>
      </div>
      
      <Select value={selectedStore} onValueChange={handleStoreChange}>
        <SelectTrigger className="bg-background/80 backdrop-blur border shadow-sm">
          <SelectValue placeholder="Choisir un point de vente" />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {Object.entries(filteredStoreData).sort().map(([location, types]) => (
            <div key={location}>
              {Object.entries(types).map(([type, stores]) => (
                <SelectGroup key={`${location}-${type}`}>
                  <SelectLabel className="flex items-center">
                    {type === 'farm' && <Tractor className="h-3.5 w-3.5 mr-1" />}
                    {type === 'market' && <Apple className="h-3.5 w-3.5 mr-1" />}
                    {type === 'bakery' && <Egg className="h-3.5 w-3.5 mr-1" />}
                    {type === 'seafood' && <Carrot className="h-3.5 w-3.5 mr-1" />}
                    {type === 'supermarket' && <Store className="h-3.5 w-3.5 mr-1" />}
                    {type === 'farm' ? 'Producteurs - ' : 
                     type === 'market' ? 'Marchés - ' : 
                     type === 'bakery' ? 'Boulangeries - ' : 
                     type === 'seafood' ? 'Fruits de mer - ' : 
                     type === 'supermarket' ? 'Supermarchés - ' : ''}{location}
                  </SelectLabel>
                  {stores.map((store) => (
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
                {getStoreById(selectedStore)?.country !== 'France' && 
                  <span className="ml-1 font-medium">({getStoreById(selectedStore)?.country})</span>
                }
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
