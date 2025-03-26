
import { useState } from 'react';
import { ArrowLeft, Heart, AlertTriangle, CheckCircle, Info, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import FavoriteButton from './FavoriteButton';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { type Product } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  className?: string;
}

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

const ProductDetail = ({ product, className }: ProductDetailProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock nutritional values
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
  
  // Mock ingredient list
  const ingredients = "Eau, farine de BLÉ 24%, beurre (LAIT), œufs frais 10.6%, sucre, poudre à lever (diphosphate de sodium, carbonate acide de sodium, phosphate monocalcique), sel, arôme naturel de vanille.";
  
  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      <div className="sm:hidden sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold truncate pr-9">{product.name}</h1>
        <div className="absolute right-4">
          <FavoriteButton productId={product.id} />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Product Image */}
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
        
        {/* Product Information */}
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
          
          <Separator className="my-4" />
          
          {/* Health Recommendations */}
          <div className="space-y-3 mb-6">
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
          </div>
          
          {/* Allergen Information */}
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
          
          <Separator className="my-6" />
          
          {/* Tabs for Detailed Information */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
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
          </Tabs>
          
          <div className="mt-8">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => toast.success("Produit ajouté à votre liste de courses")}
            >
              Ajouter à ma liste de courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
