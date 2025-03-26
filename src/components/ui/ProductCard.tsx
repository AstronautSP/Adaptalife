
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Tally1, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import FavoriteButton from './FavoriteButton';
import { cn } from '@/lib/utils';

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
}

interface ProductCardProps {
  product: Product;
  className?: string;
  layout?: 'grid' | 'list';
}

const getNutritionScoreColor = (score: string) => {
  switch (score) {
    case 'A': return 'bg-green-500';
    case 'B': return 'bg-lime-500';
    case 'C': return 'bg-yellow-500';
    case 'D': return 'bg-orange-500';
    case 'E': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getHealthTag = (tag: string) => {
  switch (tag) {
    case 'low-sugar': return 'Faible en sucre';
    case 'low-salt': return 'Faible en sel';
    case 'low-fat': return 'Faible en gras';
    case 'high-protein': return 'Riche en protéines';
    case 'high-fiber': return 'Riche en fibres';
    case 'gluten-free': return 'Sans gluten';
    case 'organic': return 'Bio';
    default: return tag;
  }
};

const ProductCard = ({ product, className, layout = 'grid' }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg group",
        layout === 'list' ? "flex" : "h-full",
        className
      )}
    >
      {/* Product Image */}
      <div 
        className={cn(
          "relative overflow-hidden bg-muted/30",
          layout === 'list' ? "w-1/3" : "aspect-square"
        )}
      >
        <Link to={`/product/${product.id}`}>
          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              !isImageLoaded && "animate-pulse bg-muted"
            )}
          >
            {!isImageLoaded && <span className="sr-only">Chargement...</span>}
          </div>
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              !isImageLoaded && "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Link>
        
        {/* Favorite button */}
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton productId={product.id} size="sm" />
        </div>
        
        {/* Nutrition score badge */}
        <div className="absolute bottom-2 left-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md",
                  getNutritionScoreColor(product.nutritionScore)
                )}>
                  {product.nutritionScore}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Score Nutri-Score: {product.nutritionScore}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Product Content */}
      <CardContent 
        className={cn(
          "flex flex-col h-full",
          layout === 'list' ? "w-2/3 p-3" : "p-3"
        )}
      >
        <div className="flex-1">
          {/* Brand */}
          <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
          
          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
          </Link>
          
          {/* Price */}
          <div className="font-bold text-base mb-2">{product.price.toFixed(2)} €</div>
          
          {/* Health Tags */}
          {product.healthTags && product.healthTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.healthTags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-1 py-0 h-auto">
                  {getHealthTag(tag)}
                </Badge>
              ))}
              {product.healthTags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-auto">
                  +{product.healthTags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Health Indicators */}
        <div className="mt-auto pt-2 border-t text-xs">
          {/* Health recommendations */}
          {product.isHealthyFor && product.isHealthyFor.length > 0 && (
            <div className="flex items-center text-green-600 mb-1">
              <Tally1 className="h-3.5 w-3.5 mr-1" />
              Adapté pour: {product.isHealthyFor.slice(0, 1).join(', ')}
              {product.isHealthyFor.length > 1 && '...'}
            </div>
          )}
          
          {/* Health warnings */}
          {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              À éviter si: {product.notRecommendedFor.slice(0, 1).join(', ')}
              {product.notRecommendedFor.length > 1 && '...'}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <Button 
          size="sm" 
          className="w-full mt-3"
          asChild
        >
          <Link to={`/product/${product.id}`}>
            Voir détails
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
