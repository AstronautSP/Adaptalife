
import { Book, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Product } from "../ProductCard";
import { cn } from "@/lib/utils";
import HealthyRecipes from "../HealthyRecipes";

interface ProductTabsProps {
  product: Product;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProductTabs = ({ product, activeTab, setActiveTab }: ProductTabsProps) => {
  const getNutritionScoreDescription = (score: string) => {
    switch (score) {
      case 'A': return 'Excellente qualité nutritionnelle';
      case 'B': return 'Bonne qualité nutritionnelle';
      case 'C': return 'Qualité nutritionnelle moyenne';
      case 'D': return 'Qualité nutritionnelle médiocre';
      case 'E': return 'Mauvaise qualité nutritionnelle';
      default: return 'Qualité nutritionnelle inconnue';
    }
  };

  const nutritionalValues = {
    calories: 250,
    proteins: 5.2,
    carbs: 30,
    sugar: 12,
    fat: 10,
    saturatedFat: 2.5,
    fiber: 3.5,
    salt: 0.8
  };
  
  const ingredients = "Eau, farine de BLÉ 24%, beurre (LAIT), œufs frais 10.6%, sucre, poudre à lever (diphosphate de sodium, carbonate acide de sodium, phosphate monocalcique), sel, arôme naturel de vanille.";

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="w-full grid grid-cols-4">
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
        <TabsTrigger value="recipes" className="flex items-center gap-1">
          <Book className="h-4 w-4" />
          <span>Recettes</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="pt-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Nutri-Score {product.nutritionScore}</h3>
            <div className={cn(
              "p-3 rounded-md text-sm",
              `bg-${product.nutritionScore.toLowerCase()}-100`
            )}>
              <p>{getNutritionScoreDescription(product.nutritionScore)}</p>
            </div>
          </div>
          
          {product.healthTags && product.healthTags.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Propriétés</h3>
              <div className="flex flex-wrap gap-2">
                {product.healthTags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="nutrition" className="pt-4">
        <div className="space-y-4">
          <h3 className="font-medium flex items-center">
            <BarChart3 className="h-4 w-4 mr-1.5" />
            Valeurs nutritionnelles (100g)
          </h3>
          
          <div className="bg-muted/30 rounded-md overflow-hidden">
            {Object.entries(nutritionalValues).map(([key, value], index) => {
              let label = key;
              let unit = 'g';
              
              if (key === 'calories') {
                label = 'Calories';
                unit = 'kcal';
              } else if (key === 'proteins') {
                label = 'Protéines';
              } else if (key === 'carbs') {
                label = 'Glucides';
              } else if (key === 'sugar') {
                label = 'dont Sucres';
              } else if (key === 'fat') {
                label = 'Matières grasses';
              } else if (key === 'saturatedFat') {
                label = 'dont Acides gras saturés';
              } else if (key === 'fiber') {
                label = 'Fibres';
              } else if (key === 'salt') {
                label = 'Sel';
              }
              
              return (
                <div 
                  key={key}
                  className={cn(
                    "flex justify-between py-2 px-3",
                    index % 2 === 0 ? "bg-transparent" : "bg-muted/30"
                  )}
                >
                  <span>{label}</span>
                  <span className="font-medium">{value} {unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="ingredients" className="pt-4">
        <div className="space-y-4">
          <h3 className="font-medium mb-2">Liste des ingrédients</h3>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {ingredients}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Les allergènes sont indiqués en MAJUSCULES.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="recipes" className="pt-4">
        <HealthyRecipes productName={product.name} />
      </TabsContent>
    </Tabs>
  );
};
