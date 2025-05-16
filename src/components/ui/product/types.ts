
export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  nutritionScore: 'A' | 'B' | 'C' | 'D' | 'E';
  allergens: string[];
  healthTags?: string[];
  isHealthyFor?: string[];
  notRecommendedFor?: string[];
  category?: string;
  description?: string;
  ingredients?: string[];
  material?: string;
  careInstructions?: string;
  sustainability?: string[];
  sizes?: string[];
  certifications?: string[];
}

export interface ProductHeaderProps {
  product: Product;
}

export interface ProductImageProps {
  product: Product;
}

export interface ProductHealthInfoProps {
  product: Product;
}

export interface ProductTabsProps {
  product: Product;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface MainCategory {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  mainCategory: string;
}
