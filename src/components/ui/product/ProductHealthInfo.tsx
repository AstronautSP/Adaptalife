
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Product } from "../ProductCard";

interface ProductHealthInfoProps {
  product: Product;
}

export const ProductHealthInfo = ({ product }: ProductHealthInfoProps) => {
  return (
    <>
      {product.isHealthyFor && product.isHealthyFor.length > 0 && (
        <div className="flex items-start text-green-600">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Recommandé pour:</p>
            <ul className="list-disc pl-5 text-sm mt-1 space-y-0.5">
              {product.isHealthyFor.map(condition => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {product.notRecommendedFor && product.notRecommendedFor.length > 0 && (
        <div className="flex items-start text-amber-600">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Déconseillé pour:</p>
            <ul className="list-disc pl-5 text-sm mt-1 space-y-0.5">
              {product.notRecommendedFor.map(condition => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {product.allergens && product.allergens.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2 flex items-center">
            <Info className="h-4 w-4 mr-1.5 text-red-500" />
            Allergènes
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.allergens.map(allergen => (
              <Badge key={allergen} variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">
                {allergen}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
