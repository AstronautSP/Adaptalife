
import { Product } from '@/components/ui/ProductCard';

export const productCategories = [
  { id: 'dairy', name: 'Produits laitiers' },
  { id: 'bakery', name: 'Boulangerie et pâtisserie' },
  { id: 'meat', name: 'Viandes et poissons' },
  { id: 'fruits', name: 'Fruits et légumes' },
  { id: 'snacks', name: 'Snacks et confiseries' },
  { id: 'beverages', name: 'Boissons' },
  { id: 'frozen', name: 'Surgelés' },
  { id: 'hygiene', name: 'Hygiène et soins' },
  { id: 'baby', name: 'Bébé et enfant' },
  { id: 'household', name: 'Produits ménagers' }
];

export const products: Product[] = [
  // Produits laitiers
  {
    id: '1',
    name: 'Yaourt nature Bio',
    brand: 'Activia',
    image: 'https://images.unsplash.com/photo-1562114608-fae413499105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.49,
    nutritionScore: 'A',
    allergens: ['Lait'],
    healthTags: ['Bio', 'Riche en protéines', 'Faible en sucre'],
    isHealthyFor: ['Diabète type 2', 'Régime hypocalorique'],
    notRecommendedFor: ['Intolérance au lactose'],
    category: 'dairy'
  },
  {
    id: '2',
    name: 'Fromage blanc 0%',
    brand: 'Danone',
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 1.89,
    nutritionScore: 'A',
    allergens: ['Lait'],
    healthTags: ['Faible en gras', 'Riche en protéines'],
    isHealthyFor: ['Régime hypocalorique', 'Sportifs'],
    notRecommendedFor: ['Intolérance au lactose'],
    category: 'dairy'
  },
  {
    id: '3',
    name: 'Camembert AOP',
    brand: 'Président',
    image: 'https://images.unsplash.com/photo-1452195100486-9d262538b5a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 3.25,
    nutritionScore: 'D',
    allergens: ['Lait'],
    healthTags: ['Riche en calcium'],
    isHealthyFor: ['Croissance osseuse'],
    notRecommendedFor: ['Régime hypocalorique', 'Cholestérol élevé'],
    category: 'dairy'
  },

  // Boulangerie et pâtisserie
  {
    id: '4',
    name: 'Pain de mie complet sans gluten',
    brand: 'Schär',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 3.95,
    nutritionScore: 'B',
    allergens: [],
    healthTags: ['Sans gluten', 'Source de fibres'],
    isHealthyFor: ['Maladie cœliaque', 'Sensibilité au gluten'],
    notRecommendedFor: [],
    category: 'bakery'
  },
  {
    id: '5',
    name: 'Croissants pur beurre',
    brand: 'Brioche Pasquier',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.75,
    nutritionScore: 'D',
    allergens: ['Gluten', 'Lait', 'Œuf'],
    healthTags: [],
    isHealthyFor: [],
    notRecommendedFor: ['Diabète', 'Régime hypocalorique', 'Intolérance au gluten'],
    category: 'bakery'
  },
  {
    id: '6',
    name: 'Cookies aux pépites de chocolat',
    brand: 'Michel et Augustin',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 3.49,
    nutritionScore: 'D',
    allergens: ['Gluten', 'Lait', 'Œuf', 'Fruits à coque'],
    healthTags: [],
    isHealthyFor: [],
    notRecommendedFor: ['Diabète', 'Régime hypocalorique', 'Intolérance au gluten'],
    category: 'bakery'
  },

  // Viandes et poissons
  {
    id: '7',
    name: 'Filet de poulet fermier',
    brand: 'Loué',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 6.75,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Riche en protéines', 'Faible en gras'],
    isHealthyFor: ['Diabète type 1', 'Diabète type 2', 'Régime protéiné'],
    notRecommendedFor: [],
    category: 'meat'
  },
  {
    id: '8',
    name: 'Pavé de saumon frais',
    brand: 'Criée',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 8.95,
    nutritionScore: 'A',
    allergens: ['Poisson'],
    healthTags: ['Riche en oméga-3', 'Protéines de qualité'],
    isHealthyFor: ['Santé cardiovasculaire', 'Diabète'],
    notRecommendedFor: ['Allergie aux poissons'],
    category: 'meat'
  },

  // Fruits et légumes
  {
    id: '9',
    name: 'Bananes Bio',
    brand: 'Terrabio',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.29,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Bio', 'Riche en potassium', 'Source de fibres'],
    isHealthyFor: ['Sportifs', 'Transit intestinal'],
    notRecommendedFor: ['Diabète avancé'],
    category: 'fruits'
  },
  {
    id: '10',
    name: 'Salade de jeunes pousses',
    brand: 'Bonduelle',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 1.95,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Faible en calories', 'Riche en vitamines'],
    isHealthyFor: ['Régime hypocalorique', 'Diabète'],
    notRecommendedFor: [],
    category: 'fruits'
  },

  // Snacks et confiseries
  {
    id: '11',
    name: 'Tablette de chocolat noir 70%',
    brand: 'Lindt',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.45,
    nutritionScore: 'C',
    allergens: ['Lait', 'Soja'],
    healthTags: ['Antioxydants', 'Faible index glycémique'],
    isHealthyFor: ['Consommation modérée'],
    notRecommendedFor: ['Diabète non contrôlé', 'Intolérance au lactose'],
    category: 'snacks'
  },
  {
    id: '12',
    name: 'Bonbons gélifiés sans sucre',
    brand: 'Haribo',
    image: 'https://images.unsplash.com/photo-1581798459219-789c7e52d1b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 1.89,
    nutritionScore: 'D',
    allergens: [],
    healthTags: ['Sans sucre'],
    isHealthyFor: ['Diabète (consommation modérée)'],
    notRecommendedFor: ['Syndrome du côlon irritable'],
    category: 'snacks'
  },
  {
    id: '13',
    name: 'Biscuits digestifs au chocolat',
    brand: 'Lu',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.15,
    nutritionScore: 'D',
    allergens: ['Gluten', 'Lait', 'Soja'],
    healthTags: [],
    isHealthyFor: [],
    notRecommendedFor: ['Diabète', 'Régime hypocalorique', 'Intolérance au gluten'],
    category: 'snacks'
  },

  // Boissons
  {
    id: '14',
    name: 'Eau minérale naturelle',
    brand: 'Evian',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 0.85,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Sans calories', 'Hydratation'],
    isHealthyFor: ['Tous', 'Diabète', 'Régime'],
    notRecommendedFor: [],
    category: 'beverages'
  },
  {
    id: '15',
    name: 'Jus d'orange pressée',
    brand: 'Tropicana',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 2.95,
    nutritionScore: 'C',
    allergens: [],
    healthTags: ['Riche en vitamine C'],
    isHealthyFor: ['Consommation modérée'],
    notRecommendedFor: ['Diabète sévère'],
    category: 'beverages'
  },

  // Surgelés
  {
    id: '16',
    name: 'Pizza margherita surgelée',
    brand: 'Buitoni',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 3.45,
    nutritionScore: 'C',
    allergens: ['Gluten', 'Lait'],
    healthTags: [],
    isHealthyFor: [],
    notRecommendedFor: ['Diabète', 'Régime hypocalorique', 'Intolérance au gluten'],
    category: 'frozen'
  },
  {
    id: '17',
    name: 'Légumes pour wok surgelés',
    brand: 'Picard',
    image: 'https://images.unsplash.com/photo-1567137827022-ftzfrj9da39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 3.95,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Riche en vitamines', 'Faible en calories'],
    isHealthyFor: ['Diabète', 'Régime hypocalorique'],
    notRecommendedFor: [],
    category: 'frozen'
  },

  // Hygiène et soins
  {
    id: '18',
    name: 'Shampoing solide bio',
    brand: 'Lamazuna',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 9.90,
    nutritionScore: 'A',
    allergens: ['Parfum'],
    healthTags: ['Bio', 'Zéro déchet', 'Sans sulfates'],
    isHealthyFor: ['Peau sensible', 'Cuir chevelu sensible'],
    notRecommendedFor: ['Allergie aux huiles essentielles'],
    category: 'hygiene'
  },
  {
    id: '19',
    name: 'Déodorant naturel',
    brand: 'Respire',
    image: 'https://images.unsplash.com/photo-1594387312551-7abaee8a87e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 10.50,
    nutritionScore: 'A',
    allergens: ['Parfum'],
    healthTags: ['Sans aluminium', 'Naturel'],
    isHealthyFor: ['Peau sensible'],
    notRecommendedFor: ['Allergie aux huiles essentielles'],
    category: 'hygiene'
  },
  {
    id: '20',
    name: 'Dentifrice bio en tube recyclable',
    brand: 'Bioseptyl',
    image: 'https://images.unsplash.com/photo-1635602739175-bab409a6e94c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 4.95,
    nutritionScore: 'A',
    allergens: ['Menthe'],
    healthTags: ['Bio', 'Sans fluor'],
    isHealthyFor: ['Gencives sensibles'],
    notRecommendedFor: ['Allergie à la menthe'],
    category: 'hygiene'
  },

  // Bébé et enfant
  {
    id: '21',
    name: 'Couches écologiques taille 3',
    brand: 'Love & Green',
    image: 'https://images.unsplash.com/photo-1563170423-121430e8deed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 12.95,
    nutritionScore: 'A',
    allergens: ['Parfum'],
    healthTags: ['Écologique', 'Sans chlore'],
    isHealthyFor: ['Peau sensible'],
    notRecommendedFor: ['Allergie aux parfums'],
    category: 'baby'
  },
  {
    id: '22',
    name: 'Lait infantile 2ème âge',
    brand: 'Gallia',
    image: 'https://images.unsplash.com/photo-1584779559297-c35c7a394e97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 17.90,
    nutritionScore: 'A',
    allergens: ['Lait'],
    healthTags: ['Enrichi en fer', 'Adapté aux besoins nutritionnels'],
    isHealthyFor: ['Nourrissons 6-12 mois'],
    notRecommendedFor: ['Allergie aux protéines de lait de vache'],
    category: 'baby'
  },

  // Produits ménagers
  {
    id: '23',
    name: 'Lessive écologique concentrée',
    brand: 'Ecover',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 8.45,
    nutritionScore: 'A',
    allergens: ['Parfum'],
    healthTags: ['Écologique', 'Biodégradable'],
    isHealthyFor: ['Peau sensible', 'Respiration sensible'],
    notRecommendedFor: ['Allergie aux enzymes'],
    category: 'household'
  },
  {
    id: '24',
    name: 'Tablettes lave-vaisselle tout-en-1',
    brand: 'Finish',
    image: 'https://images.unsplash.com/photo-1622446448080-03c3c4f05535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 9.95,
    nutritionScore: 'B',
    allergens: ['Parfum'],
    healthTags: ['Sans phosphates'],
    isHealthyFor: [],
    notRecommendedFor: ['Allergie aux parfums de synthèse'],
    category: 'household'
  }
];
