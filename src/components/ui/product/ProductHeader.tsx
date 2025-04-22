
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Product } from "../ProductCard";

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="sm:hidden sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold truncate pr-9">{product.name}</h1>
        <div className="absolute right-4">
          <FavoriteButton productId={product.id} />
        </div>
      </div>
      
      <div className="lg:w-1/2 p-6">
        <div className="hidden sm:block">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
        
        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-2xl font-bold">{product.price.toFixed(2)} €</span>
          <span className="text-sm text-muted-foreground">(prix indicatif)</span>
        </div>
      </div>
    </>
  );
};
