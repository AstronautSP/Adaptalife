
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

// Mock data pour les recettes
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Smoothie énergétique',
    description: 'Un smoothie sain et délicieux pour bien commencer la journée.',
    preparationTime: '5 minutes',
    difficulty: 'Facile'
  },
  {
    id: '2',
    title: 'Bowl protéiné',
    description: 'Un repas équilibré riche en protéines et nutriments essentiels.',
    preparationTime: '15 minutes',
    difficulty: 'Moyen'
  },
  {
    id: '3',
    title: 'Salade vitaminée',
    description: 'Une salade fraîche et colorée pleine de vitamines.',
    preparationTime: '10 minutes',
    difficulty: 'Facile'
  }
];

interface HealthyRecipesProps {
  productName: string;
}

const HealthyRecipes = ({ productName }: HealthyRecipesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Book className="h-5 w-5" />
        <h3 className="text-lg font-medium">Recettes santé avec {productName}</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRecipes.map((recipe) => (
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
