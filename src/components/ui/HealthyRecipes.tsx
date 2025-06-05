
import React from 'react';
import { Book, Utensils, ChefHat } from 'lucide-react';
import { Card } from './card';

interface Recipe {
  id: string;
  title: string;
  description: string;
  preparationTime: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}

interface HealthyRecipesProps {
  productName: string;
}

const getProductRecipes = (productName: string): Recipe[] => {
  const lowerProductName = productName.toLowerCase();
  
  // Pommes
  if (lowerProductName.includes('pomme')) {
    return [
      {
        id: '1',
        title: 'Compote de pommes maison',
        description: 'Compote sans sucre ajouté, parfaite pour les enfants.',
        preparationTime: '20 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Tarte aux pommes allégée',
        description: 'Tarte avec pâte à l\'avoine et moins de sucre.',
        preparationTime: '45 minutes',
        difficulty: 'Moyen'
      },
      {
        id: '3',
        title: 'Smoothie pomme-cannelle',
        description: 'Boisson énergétique pour bien commencer la journée.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      }
    ];
  }

  // Pain sans gluten
  if (lowerProductName.includes('pain') && lowerProductName.includes('gluten')) {
    return [
      {
        id: '1',
        title: 'Toast à l\'avocat et graines',
        description: 'Petit-déjeuner nutritif et sans gluten.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Croque-monsieur végétarien',
        description: 'Version sans gluten du classique français.',
        preparationTime: '15 minutes',
        difficulty: 'Moyen'
      },
      {
        id: '3',
        title: 'Pain perdu aux fruits',
        description: 'Dessert gourmand adapté aux cœliaques.',
        preparationTime: '25 minutes',
        difficulty: 'Moyen'
      }
    ];
  }

  // Yogourt
  if (lowerProductName.includes('yogourt') || lowerProductName.includes('yaourt')) {
    return [
      {
        id: '1',
        title: 'Parfait aux fruits et granola',
        description: 'Petit-déjeuner équilibré en protéines.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Smoothie bowl protéiné',
        description: 'Bowl nutritif pour les sportifs.',
        preparationTime: '10 minutes',
        difficulty: 'Facile'
      },
      {
        id: '3',
        title: 'Sauce yogourt aux herbes',
        description: 'Accompagnement parfait pour les crudités.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      }
    ];
  }

  // Carottes
  if (lowerProductName.includes('carotte')) {
    return [
      {
        id: '1',
        title: 'Soupe de carottes au gingembre',
        description: 'Velouté réconfortant et vitaminé.',
        preparationTime: '30 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Bâtonnets crus avec houmous',
        description: 'Collation saine et croquante.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      },
      {
        id: '3',
        title: 'Cake aux carottes sans sucre',
        description: 'Dessert healthy aux légumes.',
        preparationTime: '50 minutes',
        difficulty: 'Moyen'
      }
    ];
  }

  // Lait d'amande
  if (lowerProductName.includes('amande')) {
    return [
      {
        id: '1',
        title: 'Porridge d\'avoine au lait d\'amande',
        description: 'Petit-déjeuner végétalien nourrissant.',
        preparationTime: '10 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Smoothie vert détox',
        description: 'Boisson purifiante aux épinards.',
        preparationTime: '5 minutes',
        difficulty: 'Facile'
      },
      {
        id: '3',
        title: 'Chia pudding vanille',
        description: 'Dessert riche en oméga-3.',
        preparationTime: '5 min + 2h repos',
        difficulty: 'Facile'
      }
    ];
  }

  // Poulet
  if (lowerProductName.includes('poulet')) {
    return [
      {
        id: '1',
        title: 'Poulet grillé aux herbes',
        description: 'Recette simple et savoureuse.',
        preparationTime: '25 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Curry de poulet léger',
        description: 'Plat épicé avec lait de coco.',
        preparationTime: '35 minutes',
        difficulty: 'Moyen'
      },
      {
        id: '3',
        title: 'Salade César protéinée',
        description: 'Salade complète et équilibrée.',
        preparationTime: '15 minutes',
        difficulty: 'Facile'
      }
    ];
  }

  // Pâtes complètes
  if (lowerProductName.includes('pâtes') || lowerProductName.includes('pasta')) {
    return [
      {
        id: '1',
        title: 'Pasta aux légumes grillés',
        description: 'Plat coloré et riche en fibres.',
        preparationTime: '25 minutes',
        difficulty: 'Facile'
      },
      {
        id: '2',
        title: 'Salade de pâtes méditerranéenne',
        description: 'Fraîcheur estivale garantie.',
        preparationTime: '20 minutes',
        difficulty: 'Facile'
      },
      {
        id: '3',
        title: 'Bolognaise végétarienne',
        description: 'Version végétale du classique italien.',
        preparationTime: '40 minutes',
        difficulty: 'Moyen'
      }
    ];
  }

  // Chocolat noir
  if (lowerProductName.includes('chocolat')) {
    return [
      {
        id: '1',
        title: 'Mousse au chocolat allégée',
        description: 'Dessert gourmand avec moins de calories.',
        preparationTime: '15 min + 2h repos',
        difficulty: 'Moyen'
      },
      {
        id: '2',
        title: 'Truffes maison healthy',
        description: 'Petites douceurs aux dattes.',
        preparationTime: '20 minutes',
        difficulty: 'Facile'
      },
      {
        id: '3',
        title: 'Fondue de fruits au chocolat',
        description: 'Dessert convivial et fruité.',
        preparationTime: '10 minutes',
        difficulty: 'Facile'
      }
    ];
  }

  // Recettes par défaut pour les autres produits
  return [
    {
      id: '1',
      title: `Recette santé avec ${productName}`,
      description: 'Une préparation simple et nutritive.',
      preparationTime: '15 minutes',
      difficulty: 'Facile'
    },
    {
      id: '2',
      title: `${productName} en version gourmande`,
      description: 'Une recette savoureuse et équilibrée.',
      preparationTime: '25 minutes',
      difficulty: 'Moyen'
    },
    {
      id: '3',
      title: `Collation énergétique au ${productName}`,
      description: 'Parfait pour une pause nutritive.',
      preparationTime: '10 minutes',
      difficulty: 'Facile'
    }
  ];
};

const HealthyRecipes = ({ productName }: HealthyRecipesProps) => {
  const recipes = getProductRecipes(productName);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Book className="h-5 w-5" />
        <h3 className="text-lg font-medium">Recettes santé avec {productName}</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col">
            <div className="p-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="h-4 w-4 text-primary" />
                <h4 className="font-medium">{recipe.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4" />
                  <span>{recipe.preparationTime}</span>
                </div>
                <span className="text-muted-foreground">Difficulté: {recipe.difficulty}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthyRecipes;
