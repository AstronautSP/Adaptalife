import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Tally1, AlertTriangle, Shirt, Droplet, Bath, ShoppingBag, Scissors } from 'lucide-react';
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
import { Product } from '@/components/ui/product/types';

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
    case 'sans-parfum': return 'Sans parfum';
    case 'hypoallergénique': return 'Hypoallergénique';
    case 'adapté-pmr': return 'Adapté PMR';
    case 'facile-à-enfiler': return 'Facile à enfiler';
    default: return tag;
  }
};

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'clothing':
    case 'adaptive':
    case 'underwear':
      return <Shirt className="h-4 w-4 mr-1" />;
    case 'cosmetics':
      return <Droplet className="h-4 w-4 mr-1" />;
    case 'hygiene':
      return <Bath className="h-4 w-4 mr-1" />;
    case 'hair':
      return <Scissors className="h-4 w-4 mr-1" />;
    case 'skin':
      return <Droplet className="h-4 w-4 mr-1" />;
    case 'oral':
      return <Bath className="h-4 w-4 mr-1" />;
    case 'accessories':
    case 'shoes':
      return <ShoppingBag className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

const getMainCategory = (category?: string): string => {
  const personalCareCategories = ['hygiene', 'cosmetics', 'hair', 'skin', 'oral'];
  const clothingCategories = ['clothing', 'shoes', 'accessories', 'adaptive', 'underwear'];
  
  if (!category) return 'food';
  if (personalCareCategories.includes(category)) return 'personal_care';
  if (clothingCategories.includes(category)) return 'clothing';
  return 'food';
};

const getScoreLabel = (product: Product) => {
  const mainCategory = getMainCategory(product.category);
  
  if (mainCategory === 'clothing') {
    return 'Score Matière';
  } else if (mainCategory === 'personal_care') {
    return 'Score Écologique';
  } else {
    return 'Score Nutri-Score';
  }
};

const getHealthInfo = (product: Product, isApparel: boolean) => {
  if (isApparel) {
    return {
      forLabel: 'Adapté pour',
      againstLabel: 'À éviter si'
    };
  } else {
    return {
      forLabel: 'Recommandé pour',
      againstLabel: 'À éviter si'
    };
  }
};

const ProductCard = ({ product, className, layout = 'grid' }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const mainCategory = getMainCategory(product.category);
  const isApparel = mainCategory === 'clothing' || mainCategory === 'personal_care';
  const healthInfo = getHealthInfo(product, isApparel);

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
        
        {/* Score badge */}
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
                <p>{getScoreLabel(product)}: {product.nutritionScore}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Category Label */}
        {product.category && (
          <div className="absolute top-2 left-2 z-10">
            <Badge 
              variant="secondary" 
              className={cn(
                "bg-black/60 text-white text-xs flex items-center",
                isApparel && "bg-primary/80"
              )}
            >
              {getCategoryIcon(product.category)}
              {product.category}
            </Badge>
          </div>
        )}
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
              {healthInfo.forLabel}:&nbsp;
              {product.isHealthyFor.slice(0, 1).join(', ')}
              {product.isHealthyFor.length > 1 && '...'}
            </div>
          )}
          
          {/* Health warnings */}
          {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              {healthInfo.againstLabel}:&nbsp;
              {product.notRecommendedFor.slice(0, 1).join(', ')}
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
