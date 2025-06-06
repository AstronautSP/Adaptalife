
import React, { useState } from 'react';
import { Book, Utensils, ChefHat, Clock, Users, ArrowLeft } from 'lucide-react';
import { Card } from './card';
import { Button } from './button';

interface Recipe {
  id: string;
  title: string;
  description: string;
  preparationTime: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips?: string;
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
        difficulty: 'Facile',
        servings: 4,
        ingredients: [
          '6 pommes Golden ou Gala',
          '1 cuillère à soupe d\'eau',
          '1 pincée de cannelle en poudre',
          'Le jus d\'un demi-citron',
          '1 cuillère à café de miel (optionnel)'
        ],
        instructions: [
          'Épluchez et coupez les pommes en petits morceaux.',
          'Placez les morceaux de pommes dans une casserole avec l\'eau.',
          'Faites cuire à feu moyen pendant 15 minutes en remuant régulièrement.',
          'Ajoutez la cannelle et le jus de citron.',
          'Écrasez à la fourchette pour obtenir la texture désirée.',
          'Goûtez et ajoutez le miel si nécessaire.',
          'Laissez refroidir avant de servir.'
        ],
        tips: 'Vous pouvez conserver cette compote au réfrigérateur pendant 3-4 jours.'
      },
      {
        id: '2',
        title: 'Tarte aux pommes allégée',
        description: 'Tarte avec pâte à l\'avoine et moins de sucre.',
        preparationTime: '45 minutes',
        difficulty: 'Moyen',
        servings: 8,
        ingredients: [
          '150g de flocons d\'avoine',
          '100g de farine complète',
          '80g de beurre fondu',
          '2 cuillères à soupe de miel',
          '5 pommes moyennes',
          '1 œuf',
          '1 cuillère à café de cannelle',
          '50ml de lait d\'amande'
        ],
        instructions: [
          'Préchauffez le four à 180°C.',
          'Mélangez les flocons d\'avoine, la farine et une pincée de sel.',
          'Ajoutez le beurre fondu et 1 cuillère à soupe de miel. Mélangez.',
          'Étalez cette pâte dans un moule à tarte beurré.',
          'Épluchez et émincez les pommes. Disposez-les sur la pâte.',
          'Battez l\'œuf avec le lait d\'amande, la cannelle et le miel restant.',
          'Versez ce mélange sur les pommes.',
          'Enfournez 30 minutes jusqu\'à ce que la surface soit dorée.'
        ],
        tips: 'Servez tiède avec une boule de yaourt grec pour plus de protéines.'
      },
      {
        id: '3',
        title: 'Smoothie pomme-cannelle',
        description: 'Boisson énergétique pour bien commencer la journée.',
        preparationTime: '5 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 pomme rouge',
          '200ml de lait d\'avoine',
          '1 cuillère à soupe de flocons d\'avoine',
          '1/2 cuillère à café de cannelle',
          '1 cuillère à café de miel',
          '4-5 glaçons'
        ],
        instructions: [
          'Lavez et coupez la pomme en quartiers (gardez la peau).',
          'Placez tous les ingrédients dans un blender.',
          'Mixez pendant 1 minute jusqu\'à obtenir une texture lisse.',
          'Goûtez et ajustez le miel si nécessaire.',
          'Servez immédiatement dans un grand verre.'
        ],
        tips: 'Ajoutez une poignée d\'épinards pour plus de vitamines sans changer le goût.'
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
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '2 tranches de pain sans gluten',
          '1 avocat mûr',
          '1 cuillère à soupe de graines de tournesol',
          '1 cuillère à café d\'huile d\'olive',
          'Sel et poivre',
          'Quelques gouttes de citron'
        ],
        instructions: [
          'Faites griller les tranches de pain sans gluten.',
          'Écrasez l\'avocat à la fourchette avec le citron.',
          'Assaisonnez avec sel et poivre.',
          'Tartinez généreusement sur le pain grillé.',
          'Parsemez de graines de tournesol.',
          'Arrosez d\'un filet d\'huile d\'olive et servez.'
        ],
        tips: 'Ajoutez une tomate cerise coupée en deux pour plus de fraîcheur.'
      },
      {
        id: '2',
        title: 'Croque-monsieur végétarien',
        description: 'Version sans gluten du classique français.',
        preparationTime: '15 minutes',
        difficulty: 'Moyen',
        servings: 2,
        ingredients: [
          '4 tranches de pain sans gluten',
          '100g de fromage râpé',
          '2 tranches de jambon végétal',
          '200ml de lait d\'amande',
          '2 cuillères à soupe de farine sans gluten',
          '20g de beurre',
          'Muscade, sel et poivre'
        ],
        instructions: [
          'Préparez une béchamel : faites fondre le beurre, ajoutez la farine.',
          'Versez progressivement le lait en fouettant.',
          'Assaisonnez avec muscade, sel et poivre.',
          'Tartinez 2 tranches de pain avec la béchamel.',
          'Ajoutez le jambon végétal et du fromage.',
          'Recouvrez des autres tranches et nappez de béchamel.',
          'Parsemez de fromage et gratinez au four 8 minutes.'
        ]
      },
      {
        id: '3',
        title: 'Pain perdu aux fruits',
        description: 'Dessert gourmand adapté aux cœliaques.',
        preparationTime: '25 minutes',
        difficulty: 'Moyen',
        servings: 4,
        ingredients: [
          '6 tranches de pain sans gluten rassis',
          '300ml de lait d\'amande',
          '2 œufs',
          '2 cuillères à soupe de sucre de coco',
          '1 cuillère à café de vanille',
          '2 pommes',
          '20g de beurre',
          'Cannelle en poudre'
        ],
        instructions: [
          'Battez les œufs avec le lait, le sucre et la vanille.',
          'Trempez chaque tranche de pain dans ce mélange.',
          'Faites cuire dans une poêle beurrée 3 minutes de chaque côté.',
          'Épluchez et émincez les pommes.',
          'Faites-les revenir avec un peu de beurre et de cannelle.',
          'Servez le pain perdu chaud avec les pommes caramelisées.'
        ],
        tips: 'Accompagnez d\'un yaourt grec et d\'un trait de miel.'
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
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '200g de yaourt grec nature',
          '3 cuillères à soupe de granola maison',
          '100g de fruits rouges mélangés',
          '1 cuillère à soupe de miel',
          '1 cuillère à soupe d\'amandes effilées',
          'Quelques feuilles de menthe'
        ],
        instructions: [
          'Dans un verre ou un bol, déposez une couche de yaourt.',
          'Ajoutez une couche de fruits rouges.',
          'Parsemez de granola et d\'amandes.',
          'Répétez les couches selon la taille du contenant.',
          'Terminez par un filet de miel.',
          'Décorez avec les feuilles de menthe et servez.'
        ],
        tips: 'Préparez la veille pour un petit-déjeuner express.'
      },
      {
        id: '2',
        title: 'Smoothie bowl protéiné',
        description: 'Bowl nutritif pour les sportifs.',
        preparationTime: '10 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '150g de yaourt grec',
          '1 banane congelée',
          '100g de fruits rouges congelés',
          '1 cuillère à soupe de protéine en poudre vanille',
          '1 cuillère à soupe de graines de chia',
          'Toppings : noix, granola, fruits frais'
        ],
        instructions: [
          'Mixez le yaourt avec la banane et les fruits rouges congelés.',
          'Ajoutez la protéine en poudre et mixez encore.',
          'Versez dans un bol.',
          'Disposez harmonieusement vos toppings préférés.',
          'Saupoudrez de graines de chia.',
          'Servez immédiatement avec une cuillère.'
        ],
        tips: 'Variez les toppings selon vos goûts et la saison.'
      },
      {
        id: '3',
        title: 'Sauce yogourt aux herbes',
        description: 'Accompagnement parfait pour les crudités.',
        preparationTime: '5 minutes',
        difficulty: 'Facile',
        servings: 4,
        ingredients: [
          '200g de yaourt grec',
          '2 cuillères à soupe de ciboulette hachée',
          '1 cuillère à soupe d\'aneth frais',
          '1 gousse d\'ail écrasée',
          '1 cuillère à café de jus de citron',
          'Sel et poivre',
          '1 cuillère à café d\'huile d\'olive'
        ],
        instructions: [
          'Mélangez le yaourt avec l\'ail écrasé.',
          'Ajoutez les herbes fraîches hachées.',
          'Incorporez le jus de citron et l\'huile d\'olive.',
          'Assaisonnez avec sel et poivre.',
          'Mélangez bien et laissez reposer 30 minutes au frais.',
          'Servez avec des légumes crus ou du pain pita.'
        ]
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
      difficulty: 'Facile',
      servings: 2,
      ingredients: [
        `${productName} (quantité selon besoin)`,
        'Ingrédients complémentaires selon goût',
        'Épices et aromates au choix'
      ],
      instructions: [
        'Préparez tous vos ingrédients.',
        'Suivez les étapes de préparation.',
        'Ajustez l\'assaisonnement selon vos goûts.',
        'Servez et dégustez.'
      ]
    }
  ];
};

const HealthyRecipes = ({ productName }: HealthyRecipesProps) => {
  const recipes = getProductRecipes(productName);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (selectedRecipe) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux recettes
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
              <p className="text-muted-foreground">{selectedRecipe.description}</p>
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{selectedRecipe.preparationTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{selectedRecipe.servings} portion{selectedRecipe.servings > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                <span>{selectedRecipe.difficulty}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Ingrédients</h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Préparation</h3>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {selectedRecipe.tips && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">💡 Conseil du chef</h4>
                <p className="text-sm">{selectedRecipe.tips}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Book className="h-5 w-5" />
        <h3 className="text-lg font-medium">Recettes santé avec {productName}</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col cursor-pointer hover:shadow-md transition-shadow">
            <div className="p-4 flex-1" onClick={() => setSelectedRecipe(recipe)}>
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
            <div className="p-4 pt-0">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectedRecipe(recipe)}
              >
                Voir la recette détaillée
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthyRecipes;
