
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
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="w-full grid grid-cols-4 gap-1 h-auto p-1 bg-muted/30">
        <TabsTrigger 
          value="overview" 
          className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-xs sm:text-sm font-medium"
        >
          Vue d'ensemble
        </TabsTrigger>
        <TabsTrigger 
          value="nutrition" 
          className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-xs sm:text-sm font-medium"
        >
          Nutrition
        </TabsTrigger>
        <TabsTrigger 
          value="ingredients" 
          className="transition-all duration-200 hover:scale-105 data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-xs sm:text-sm font-medium"
        >
          Ingrédients
        </TabsTrigger>
        <TabsTrigger 
          value="recipes" 
          className="flex items-center gap-1 transition-all duration-200 hover:scale-105 data-[state=active]:bg-background data-[state=active]:shadow-sm px-3 py-2 text-xs sm:text-sm font-medium"
        >
          <Book className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Recettes</span>
          <span className="sm:hidden">Rec.</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="pt-6 animate-fade-in">
        <div className="space-y-6">
          <div className="bg-muted/20 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.02]">
            <h3 className="font-semibold mb-3 text-foreground">Nutri-Score {product.nutritionScore}</h3>
            <div className={cn(
              "p-4 rounded-lg text-sm transition-all duration-300 border",
              product.nutritionScore === 'A' && "bg-green-50 border-green-200 text-green-800",
              product.nutritionScore === 'B' && "bg-lime-50 border-lime-200 text-lime-800", 
              product.nutritionScore === 'C' && "bg-yellow-50 border-yellow-200 text-yellow-800",
              product.nutritionScore === 'D' && "bg-orange-50 border-orange-200 text-orange-800",
              product.nutritionScore === 'E' && "bg-red-50 border-red-200 text-red-800"
            )}>
              <p className="font-medium">{getNutritionScoreDescription(product.nutritionScore)}</p>
            </div>
          </div>
          
          {product.healthTags && product.healthTags.length > 0 && (
            <div className="bg-muted/20 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="font-semibold mb-3 text-foreground">Propriétés nutritionnelles</h3>
              <div className="flex flex-wrap gap-2">
                {product.healthTags.map((tag, index) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="transition-all duration-200 hover:scale-110 animate-fade-in bg-primary/10 text-primary border-primary/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="nutrition" className="pt-6 animate-fade-in">
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="font-semibold mb-4 flex items-center text-foreground transition-all duration-300 hover:scale-[1.02]">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Valeurs nutritionnelles pour 100g
          </h3>
          
          <div className="bg-background rounded-lg overflow-hidden border transform transition-all duration-300 hover:scale-[1.01]">
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
                    "flex justify-between items-center py-3 px-4 transition-all duration-200 hover:bg-muted/30 animate-fade-in",
                    index % 2 === 0 ? "bg-transparent" : "bg-muted/10"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{value} {unit}</span>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="ingredients" className="pt-6 animate-fade-in">
        <div className="bg-muted/20 rounded-lg p-4">
          <h3 className="font-semibold mb-4 text-foreground transition-all duration-300 hover:scale-[1.02]">
            Liste complète des ingrédients
          </h3>
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <div className="bg-background border rounded-lg p-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                {ingredients}
              </p>
              <div className="mt-4 pt-3 border-t border-muted">
                <p className="text-xs text-muted-foreground flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
                  Les allergènes sont indiqués en MAJUSCULES dans la liste des ingrédients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="recipes" className="pt-6 animate-fade-in">
        <div className="bg-muted/20 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.01]">
          <HealthyRecipes productName={product.name} />
        </div>
      </TabsContent>
    </Tabs>
  );
};
