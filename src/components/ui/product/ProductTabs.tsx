
import { Book, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import HealthyRecipes from "../HealthyRecipes";
import { type ProductTabsProps } from "./types";

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
    <div className="mt-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-12 bg-background border border-border rounded-lg p-1 shadow-sm">
          <TabsTrigger 
            value="overview" 
            className="flex-1 h-10 rounded-md transition-all duration-200 hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm font-medium text-sm"
          >
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger 
            value="nutrition" 
            className="flex-1 h-10 rounded-md transition-all duration-200 hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm font-medium text-sm"
          >
            Nutrition
          </TabsTrigger>
          <TabsTrigger 
            value="ingredients" 
            className="flex-1 h-10 rounded-md transition-all duration-200 hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm font-medium text-sm"
          >
            Ingrédients
          </TabsTrigger>
          <TabsTrigger 
            value="recipes" 
            className="flex-1 h-10 rounded-md transition-all duration-200 hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm font-medium text-sm flex items-center justify-center gap-1"
          >
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Recettes</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="overview" className="space-y-0 m-0 animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Nutri-Score {product.nutritionScore}
                </h3>
                <div className={cn(
                  "p-4 rounded-lg text-sm border-l-4",
                  product.nutritionScore === 'A' && "bg-green-50 border-l-green-500 text-green-800",
                  product.nutritionScore === 'B' && "bg-lime-50 border-l-lime-500 text-lime-800", 
                  product.nutritionScore === 'C' && "bg-yellow-50 border-l-yellow-500 text-yellow-800",
                  product.nutritionScore === 'D' && "bg-orange-50 border-l-orange-500 text-orange-800",
                  product.nutritionScore === 'E' && "bg-red-50 border-l-red-500 text-red-800"
                )}>
                  <p className="font-medium">{getNutritionScoreDescription(product.nutritionScore)}</p>
                </div>
              </div>
              
              {product.healthTags && product.healthTags.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Propriétés nutritionnelles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.healthTags.map((tag, index) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-0 m-0 animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center border-b border-border pb-2">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Valeurs nutritionnelles pour 100g
              </h3>
              
              <div className="bg-muted/30 rounded-lg overflow-hidden border">
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
                        "flex justify-between items-center py-3 px-4 transition-colors hover:bg-muted/50",
                        index % 2 === 0 ? "bg-background" : "bg-muted/20"
                      )}
                    >
                      <span className="text-sm font-medium text-muted-foreground">{label}</span>
                      <span className="font-semibold text-foreground">{value} {unit}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ingredients" className="space-y-0 m-0 animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">
                Liste complète des ingrédients
              </h3>
              <div className="bg-muted/30 border rounded-lg p-4">
                <p className="text-sm leading-relaxed text-foreground mb-4">
                  {ingredients}
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                    Les allergènes sont indiqués en MAJUSCULES dans la liste des ingrédients.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recipes" className="space-y-0 m-0 animate-fade-in">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <HealthyRecipes productName={product.name} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
