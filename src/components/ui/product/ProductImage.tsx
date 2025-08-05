
import { useState } from "react";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { cn } from "@/lib/utils";
import { type ProductImageProps } from "./types";

export const ProductImage = ({ product }: ProductImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getNutritionScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-success text-success-foreground';
      case 'B': return 'bg-lime-500 text-success-foreground';
      case 'C': return 'bg-warning text-warning-foreground';
      case 'D': return 'bg-orange-500 text-warning-foreground';
      case 'E': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="lg:w-1/2 p-6">
      <div className="relative">
        {!imageError ? (
          <div className="relative">
            {!imageLoaded && (
              <div className="w-full aspect-square bg-muted animate-pulse rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-muted-foreground">Chargement...</span>
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className={cn(
                "w-full h-auto object-contain rounded-lg shadow-sm transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0 absolute top-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg shadow-sm flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
          </div>
        )}
        
        <div className="hidden sm:block absolute top-3 right-3">
          <FavoriteButton productId={product.id} size="lg" />
        </div>
        
        <div className="absolute bottom-3 left-3 flex items-center space-x-2">
          <div className={cn(
            "px-4 py-1 rounded-full font-bold shadow-md flex items-center space-x-2",
            getNutritionScoreColor(product.nutritionScore)
          )}>
            <span>Nutri-Score</span>
            <span className="text-xl">{product.nutritionScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
