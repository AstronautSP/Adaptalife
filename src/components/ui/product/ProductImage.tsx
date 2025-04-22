import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { cn } from "@/lib/utils";
import { type ProductImageProps } from "./types";

export const ProductImage = ({ product }: ProductImageProps) => {
  const getNutritionScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'bg-green-500 text-white';
      case 'B': return 'bg-lime-500 text-white';
      case 'C': return 'bg-yellow-500 text-white';
      case 'D': return 'bg-orange-500 text-white';
      case 'E': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="lg:w-1/2 p-6">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-auto object-contain rounded-lg shadow-sm"
        />
        
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
