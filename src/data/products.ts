import { Product } from '@/components/ui/product/types';

export const mainCategories = [
  { id: 'all', name: 'Toutes les catégories' },
  { id: 'food', name: 'Alimentaire' },
  { id: 'personal_care', name: 'Hygiène & Beauté' },
  { id: 'clothing', name: 'Vêtements & Accessoires' }
];

export const productCategories = [
  // Catégories alimentaires
  { id: 'dairy', name: 'Produits laitiers', mainCategory: 'food' },
  { id: 'bakery', name: 'Boulangerie et pâtisserie', mainCategory: 'food' },
  { id: 'meat', name: 'Viandes et poissons', mainCategory: 'food' },
  { id: 'fruits', name: 'Fruits et légumes', mainCategory: 'food' },
  { id: 'snacks', name: 'Snacks et confiseries', mainCategory: 'food' },
  { id: 'beverages', name: 'Boissons', mainCategory: 'food' },
  { id: 'frozen', name: 'Surgelés', mainCategory: 'food' },
  { id: 'cereals', name: 'Céréales et petit-déjeuner', mainCategory: 'food' },
  { id: 'condiments', name: 'Condiments et sauces', mainCategory: 'food' },
  { id: 'organic', name: 'Produits bio', mainCategory: 'food' },
  { id: 'diabetic', name: 'Produits pour diabétiques', mainCategory: 'food' },
  { id: 'glutenfree', name: 'Sans gluten', mainCategory: 'food' },
  { id: 'vegan', name: 'Produits végans', mainCategory: 'food' },
  
  // Catégories hygiène et beauté
  { id: 'hygiene', name: 'Hygiène corporelle', mainCategory: 'personal_care' },
  { id: 'baby', name: 'Bébé et enfant', mainCategory: 'personal_care' },
  { id: 'household', name: 'Produits ménagers', mainCategory: 'personal_care' },
  { id: 'cosmetics', name: 'Cosmétiques', mainCategory: 'personal_care' },
  { id: 'oral', name: 'Hygiène bucco-dentaire', mainCategory: 'personal_care' },
  { id: 'hair', name: 'Soins capillaires', mainCategory: 'personal_care' },
  { id: 'skin', name: 'Soins de la peau', mainCategory: 'personal_care' },
  { id: 'feminine', name: 'Hygiène féminine', mainCategory: 'personal_care' },
  { id: 'fragrance', name: 'Parfums', mainCategory: 'personal_care' },
  { id: 'senior', name: 'Soins seniors', mainCategory: 'personal_care' },
  { id: 'mobility', name: 'Aides à la mobilité', mainCategory: 'personal_care' },
  
  // Catégories vêtements
  { id: 'clothing', name: 'Vêtements', mainCategory: 'clothing' },
  { id: 'shoes', name: 'Chaussures', mainCategory: 'clothing' },
  { id: 'accessories', name: 'Accessoires', mainCategory: 'clothing' },
  { id: 'adaptive', name: 'Vêtements adaptés', mainCategory: 'clothing' },
  { id: 'underwear', name: 'Sous-vêtements', mainCategory: 'clothing' },
  { id: 'sportswear', name: 'Vêtements de sport', mainCategory: 'clothing' },
  { id: 'outerwear', name: 'Manteaux et vestes', mainCategory: 'clothing' },
  { id: 'sleepwear', name: 'Vêtements de nuit', mainCategory: 'clothing' },
  { id: 'adaptive-shoes', name: 'Chaussures adaptées', mainCategory: 'clothing' },
  { id: 'maternity', name: 'Vêtements de maternité', mainCategory: 'clothing' }
];

export const products: Product[] = [
  // Produits laitiers
  {
    id: '1',
    name: 'Yaourt nature Bio',
    brand: 'Activia',
    image: 'https://images.unsplash.com/photo-1571458363626-dae1ea8db4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1634487169492-48a349cb9050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5ff425e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1595855759920-86582576b86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1623660053975-f74c8d5a8923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1584991260827-3eb4d825cbdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1546860255-26ef11e00a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    name: "Jus d'orange pressée",
    brand: 'Tropicana',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1627626775846-122eb61dbeb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1619451683374-2c29c173e97c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 9.90,
    nutritionScore: 'A',
    allergens: ['Parfum'],
    healthTags: ['Bio', 'Zéro déchet', 'Sans sulfates'],
    isHealthyFor: ['Peau sensible', 'Cuir chevelu sensible'],
    notRecommendedFor: ['Allergie aux huiles essentielles'],
    category: 'hair'
  },
  {
    id: '19',
    name: 'Déodorant naturel',
    brand: 'Respire',
    image: 'https://images.unsplash.com/photo-1626279235845-c697f8406e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 4.95,
    nutritionScore: 'A',
    allergens: ['Menthe'],
    healthTags: ['Bio', 'Sans fluor'],
    isHealthyFor: ['Gencives sensibles'],
    notRecommendedFor: ['Allergie à la menthe'],
    category: 'oral'
  },

  // Bébé et enfant
  {
    id: '21',
    name: 'Couches écologiques taille 3',
    brand: 'Love & Green',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1614267861476-0d129972a0f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1677465521010-1595ea379512?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
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
    image: 'https://images.unsplash.com/photo-1585413410666-910bbe936c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 9.95,
    nutritionScore: 'B',
    allergens: ['Parfum'],
    healthTags: ['Sans phosphates'],
    isHealthyFor: [],
    notRecommendedFor: ['Allergie aux parfums de synthèse'],
    category: 'household'
  },

  // Vêtements
  {
    id: '25',
    name: 'T-shirt en coton bio',
    brand: 'Éthique Style',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 19.99,
    nutritionScore: 'A',
    allergens: ['Latex'],
    healthTags: ['Bio', 'Commerce équitable', 'Tissus naturels'],
    isHealthyFor: ['Peau sensible', 'Dermatite atopique'],
    notRecommendedFor: ['Allergie au latex'],
    category: 'clothing'
  },
  {
    id: '26',
    name: 'Pantalon adaptable PMR',
    brand: 'AdaptaWear',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 49.95,
    nutritionScore: 'A',
    allergens: [],
    healthTags: ['Facile à enfiler', 'Adapté PMR', 'Confort'],
    isHealthyFor: ['Mobilité réduite', 'Arthrite'],
    notRecommendedFor: [],
    category: 'adaptive'
  },
  {
    id: '27',
    name: 'Pull sans étiquettes',
    brand: 'Sensory Comfort',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 34.50,
    nutritionScore: 'A',
    allergens: ['Laine'],
    healthTags: ['Sans étiquette', 'Douceur maximale'],
    isHealthyFor: ['Hypersensibilité sensorielle', 'Trouble du spectre autistique'],
    notRecommendedFor: ['Allergie à la laine'],
    category: 'clothing'
  },
  {
    id: '28',
    name: 'Chaussettes compressives',
    brand: 'ComfortSteps',
    image: 'https://images.unsplash.com/photo-1586350977771-99c5e9a03561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 15.99,
    nutritionScore: 'B',
    allergens: ['Élasthanne'],
    healthTags: ['Circulation sanguine', 'Compression graduée'],
    isHealthyFor: ['Problèmes circulatoires', 'Jambes lourdes'],
    notRecommendedFor: ['Plaies ouvertes'],
    category: 'clothing'
  },
  
  // Cosmétiques
  {
    id: '29',
    name: 'Crème hydratante sans parfum',
    brand: 'DermaSense',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 14.90,
    nutritionScore: 'A',
    allergens: ['Lanoline'],
    healthTags: ['Sans parfum', 'Hypoallergénique'],
    isHealthyFor: ['Peau sensible', 'Dermatite atopique'],
    notRecommendedFor: ['Allergie à la lanoline'],
    category: 'skin'
  },
  {
    id: '30',
    name: 'Shampoing solide pour cuir chevelu sensible',
    brand: 'NatureCare',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price: 9.95,
    nutritionScore: 'A',
    allergens: ['Huiles essentielles'],
    healthTags: ['pH neutre', 'Bio', 'Zéro déchet'],
    isHealthyFor: ['Cuir chevelu sensible', 'Psoriasis'],
    notRecommendedFor: ['Allergie aux huiles essentielles'],
    category: 'hair'
  },
  {
    id: '31',
    name: 'Déodorant adapté grande taille et prise facile',
    brand: 'EasyGrip',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    price
