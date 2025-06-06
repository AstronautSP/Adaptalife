
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

  // Carottes
  if (lowerProductName.includes('carotte')) {
    return [
      {
        id: '1',
        title: 'Soupe de carottes au gingembre',
        description: 'Soupe réconfortante et anti-inflammatoire.',
        preparationTime: '35 minutes',
        difficulty: 'Facile',
        servings: 4,
        ingredients: [
          '800g de carottes biologiques',
          '1 oignon moyen',
          '2 cm de gingembre frais',
          '1 litre de bouillon de légumes',
          '200ml de lait de coco',
          '2 cuillères à soupe d\'huile d\'olive',
          'Sel, poivre et coriandre fraîche'
        ],
        instructions: [
          'Épluchez et coupez les carottes en rondelles.',
          'Émincez l\'oignon et râpez le gingembre.',
          'Faites revenir l\'oignon dans l\'huile d\'olive.',
          'Ajoutez les carottes et le gingembre, faites revenir 5 minutes.',
          'Versez le bouillon, portez à ébullition et laissez mijoter 20 minutes.',
          'Mixez la soupe jusqu\'à consistance lisse.',
          'Incorporez le lait de coco et assaisonnez.',
          'Servez chaud avec de la coriandre fraîche.'
        ],
        tips: 'Ajoutez une pincée de cumin pour une saveur orientale.'
      },
      {
        id: '2',
        title: 'Bâtonnets de carottes au houmous',
        description: 'Snack sain et croquant.',
        preparationTime: '10 minutes',
        difficulty: 'Facile',
        servings: 2,
        ingredients: [
          '4 carottes moyennes',
          '200g de pois chiches cuits',
          '2 cuillères à soupe de tahini',
          '1 gousse d\'ail',
          '2 cuillères à soupe de jus de citron',
          '3 cuillères à soupe d\'huile d\'olive',
          'Paprika et persil pour garnir'
        ],
        instructions: [
          'Lavez et coupez les carottes en bâtonnets.',
          'Pour le houmous : mixez les pois chiches avec l\'ail.',
          'Ajoutez le tahini, le jus de citron et l\'huile d\'olive.',
          'Mixez jusqu\'à obtenir une texture crémeuse.',
          'Assaisonnez avec sel et poivre.',
          'Servez les bâtonnets avec le houmous.',
          'Saupoudrez de paprika et parsemez de persil.'
        ],
        tips: 'Le houmous se conserve 3 jours au réfrigérateur.'
      },
      {
        id: '3',
        title: 'Cake aux carottes sans sucre',
        description: 'Dessert sain sucré naturellement.',
        preparationTime: '1h15',
        difficulty: 'Moyen',
        servings: 8,
        ingredients: [
          '250g de carottes râpées',
          '200g de farine complète',
          '3 œufs',
          '120ml d\'huile de coco fondue',
          '150g de compote de pommes',
          '100g de noix hachées',
          '1 cuillère à café de cannelle',
          '1 cuillère à café de levure chimique'
        ],
        instructions: [
          'Préchauffez le four à 170°C.',
          'Battez les œufs avec l\'huile de coco et la compote.',
          'Ajoutez les carottes râpées et mélangez.',
          'Incorporez la farine, la cannelle et la levure.',
          'Ajoutez les noix hachées.',
          'Versez dans un moule beurré.',
          'Enfournez 45-50 minutes jusqu\'à ce qu\'un couteau ressorte propre.',
          'Laissez refroidir avant de démouler.'
        ],
        tips: 'Accompagnez d\'un glaçage au fromage blanc et miel.'
      }
    ];
  }

  // Lait d'amande
  if (lowerProductName.includes('lait') && lowerProductName.includes('amande')) {
    return [
      {
        id: '1',
        title: 'Porridge d\'avoine au lait d\'amande',
        description: 'Petit-déjeuner nourrissant et végétalien.',
        preparationTime: '10 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '50g de flocons d\'avoine',
          '250ml de lait d\'amande',
          '1 banane mûre',
          '1 cuillère à soupe de graines de chia',
          '1 cuillère à café de sirop d\'érable',
          'Fruits rouges et amandes effilées'
        ],
        instructions: [
          'Versez les flocons d\'avoine dans une casserole.',
          'Ajoutez le lait d\'amande et portez à ébullition.',
          'Réduisez le feu et laissez mijoter 5 minutes en remuant.',
          'Écrasez la banane et incorporez-la au porridge.',
          'Ajoutez les graines de chia et le sirop d\'érable.',
          'Versez dans un bol et garnissez de fruits rouges.',
          'Parsemez d\'amandes effilées avant de servir.'
        ],
        tips: 'Préparez la veille et réchauffez le matin pour gagner du temps.'
      },
      {
        id: '2',
        title: 'Smoothie vert au lait d\'amande',
        description: 'Boisson détox riche en vitamines.',
        preparationTime: '5 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '200ml de lait d\'amande',
          '1 poignée d\'épinards frais',
          '1/2 avocat',
          '1 banane',
          '1 cuillère à soupe de spiruline',
          '1 cuillère à café de miel',
          'Quelques glaçons'
        ],
        instructions: [
          'Lavez soigneusement les épinards.',
          'Placez tous les ingrédients dans un blender.',
          'Mixez pendant 1-2 minutes jusqu\'à consistance lisse.',
          'Goûtez et ajustez le miel si nécessaire.',
          'Servez immédiatement bien frais.',
          'Décorez avec quelques graines de tournesol.'
        ],
        tips: 'Congelez la banane la veille pour un smoothie plus onctueux.'
      },
      {
        id: '3',
        title: 'Chia pudding au lait d\'amande',
        description: 'Dessert sain à préparer la veille.',
        preparationTime: '5 min + 8h repos',
        difficulty: 'Facile',
        servings: 2,
        ingredients: [
          '300ml de lait d\'amande',
          '4 cuillères à soupe de graines de chia',
          '2 cuillères à soupe de sirop d\'agave',
          '1/2 cuillère à café d\'extrait de vanille',
          'Fruits frais pour garnir',
          'Granola maison (optionnel)'
        ],
        instructions: [
          'Mélangez le lait d\'amande avec les graines de chia.',
          'Ajoutez le sirop d\'agave et la vanille.',
          'Fouettez énergiquement pour éviter les grumeaux.',
          'Répartissez dans 2 verres ou bocaux.',
          'Réfrigérez toute la nuit.',
          'Le matin, mélangez à nouveau.',
          'Garnissez de fruits frais et de granola avant de servir.'
        ],
        tips: 'Variez les parfums avec du cacao ou des fruits mixés.'
      }
    ];
  }

  // Poulet biologique
  if (lowerProductName.includes('poulet') || lowerProductName.includes('volaille')) {
    return [
      {
        id: '1',
        title: 'Poulet grillé aux herbes de Provence',
        description: 'Plat principal savoureux et sain.',
        preparationTime: '45 minutes',
        difficulty: 'Moyen',
        servings: 4,
        ingredients: [
          '4 blancs de poulet bio',
          '2 cuillères à soupe d\'herbes de Provence',
          '3 cuillères à soupe d\'huile d\'olive',
          '2 gousses d\'ail écrasées',
          '1 citron (jus et zeste)',
          'Légumes de saison',
          'Sel et poivre'
        ],
        instructions: [
          'Mélangez l\'huile d\'olive, les herbes, l\'ail et le zeste de citron.',
          'Assaisonnez les blancs de poulet avec sel et poivre.',
          'Badigeonnez-les avec le mélange d\'herbes.',
          'Laissez mariner 30 minutes au réfrigérateur.',
          'Préchauffez le grill ou une poêle grill.',
          'Faites cuire le poulet 6-7 minutes de chaque côté.',
          'Arrosez de jus de citron et servez avec les légumes.'
        ],
        tips: 'Vérifiez la cuisson avec un thermomètre : 75°C à cœur.'
      },
      {
        id: '2',
        title: 'Curry de poulet léger au lait de coco',
        description: 'Plat exotique et équilibré.',
        preparationTime: '40 minutes',
        difficulty: 'Moyen',
        servings: 4,
        ingredients: [
          '600g de poulet bio coupé en dés',
          '400ml de lait de coco light',
          '2 cuillères à soupe de pâte de curry rouge',
          '1 oignon émincé',
          '2 poivrons coupés en lanières',
          '200g de haricots verts',
          'Coriandre fraîche et riz complet'
        ],
        instructions: [
          'Faites revenir l\'oignon dans une poêle antiadhésive.',
          'Ajoutez la pâte de curry et faites revenir 1 minute.',
          'Incorporez les morceaux de poulet et faites dorer.',
          'Versez le lait de coco et portez à ébullition.',
          'Ajoutez les légumes et laissez mijoter 20 minutes.',
          'Goûtez et rectifiez l\'assaisonnement.',
          'Servez avec du riz complet et de la coriandre.'
        ],
        tips: 'Ajoutez du gingembre frais pour plus de saveur.'
      },
      {
        id: '3',
        title: 'Salade César protéinée au poulet',
        description: 'Salade complète et rassasiante.',
        preparationTime: '25 minutes',
        difficulty: 'Facile',
        servings: 2,
        ingredients: [
          '2 blancs de poulet bio',
          '1 salade romaine',
          '50g de parmesan râpé',
          '2 tranches de pain complet',
          '2 cuillères à soupe de yaourt grec',
          '1 cuillère à soupe de moutarde',
          '1 gousse d\'ail, anchois (optionnel)'
        ],
        instructions: [
          'Faites griller le poulet assaisonné, puis émincez-le.',
          'Préparez des croûtons avec le pain complet grillé.',
          'Lavez et coupez la salade romaine.',
          'Pour la sauce : mélangez yaourt, moutarde et ail écrasé.',
          'Disposez la salade dans les assiettes.',
          'Ajoutez le poulet émincé et les croûtons.',
          'Nappez de sauce et parsemez de parmesan.'
        ],
        tips: 'Ajoutez des tomates cerises pour plus de vitamines.'
      }
    ];
  }

  // Pâtes complètes
  if (lowerProductName.includes('pâtes') || lowerProductName.includes('pasta')) {
    return [
      {
        id: '1',
        title: 'Pasta aux légumes grillés',
        description: 'Plat méditerranéen coloré et nutritif.',
        preparationTime: '30 minutes',
        difficulty: 'Facile',
        servings: 4,
        ingredients: [
          '400g de pâtes complètes',
          '2 courgettes coupées en dés',
          '1 aubergine coupée en dés',
          '2 poivrons rouges',
          '200g de tomates cerises',
          '3 cuillères à soupe d\'huile d\'olive',
          'Basilic frais et parmesan'
        ],
        instructions: [
          'Préchauffez le four à 200°C.',
          'Coupez tous les légumes en morceaux réguliers.',
          'Disposez-les sur une plaque, arrosez d\'huile d\'olive.',
          'Assaisonnez et enfournez 25 minutes.',
          'Faites cuire les pâtes selon les instructions.',
          'Mélangez les pâtes égouttées avec les légumes grillés.',
          'Ajoutez le basilic frais et servez avec du parmesan.'
        ],
        tips: 'Ajoutez des pignons de pin grillés pour plus de croquant.'
      },
      {
        id: '2',
        title: 'Salade de pâtes méditerranéenne',
        description: 'Salade fraîche parfaite pour l\'été.',
        preparationTime: '20 minutes',
        difficulty: 'Facile',
        servings: 4,
        ingredients: [
          '300g de pâtes complètes courtes',
          '200g de tomates cerises',
          '150g de mozzarella en dés',
          '100g d\'olives noires',
          '1/2 concombre en dés',
          '3 cuillères à soupe d\'huile d\'olive',
          'Basilic frais et vinaigre balsamique'
        ],
        instructions: [
          'Faites cuire les pâtes et laissez-les refroidir.',
          'Coupez les tomates cerises en deux.',
          'Préparez tous les légumes en petits dés.',
          'Mélangez les pâtes avec tous les ingrédients.',
          'Assaisonnez avec huile d\'olive et vinaigre.',
          'Ajoutez le basilic frais ciselé.',
          'Laissez reposer 30 minutes avant de servir.'
        ],
        tips: 'Cette salade se bonifie en reposant au réfrigérateur.'
      },
      {
        id: '3',
        title: 'Bolognaise végétarienne aux lentilles',
        description: 'Version saine de la bolognaise classique.',
        preparationTime: '45 minutes',
        difficulty: 'Moyen',
        servings: 4,
        ingredients: [
          '400g de pâtes complètes',
          '200g de lentilles vertes cuites',
          '400g de tomates concassées',
          '1 oignon, 2 carottes, 2 branches de céleri',
          '2 gousses d\'ail',
          '2 cuillères à soupe d\'huile d\'olive',
          'Herbes italiennes et parmesan'
        ],
        instructions: [
          'Émincez finement oignon, carottes et céleri.',
          'Faites revenir dans l\'huile d\'olive avec l\'ail.',
          'Ajoutez les lentilles et les tomates concassées.',
          'Assaisonnez avec les herbes italiennes.',
          'Laissez mijoter 25 minutes à feu doux.',
          'Faites cuire les pâtes selon les instructions.',
          'Servez la sauce sur les pâtes avec du parmesan.'
        ],
        tips: 'Mixez légèrement la sauce pour une texture plus fine.'
      }
    ];
  }

  // Chocolat noir
  if (lowerProductName.includes('chocolat')) {
    return [
      {
        id: '1',
        title: 'Mousse au chocolat allégée',
        description: 'Dessert léger et gourmand.',
        preparationTime: '20 min + 2h frais',
        difficulty: 'Moyen',
        servings: 4,
        ingredients: [
          '100g de chocolat noir 70%',
          '3 œufs',
          '2 cuillères à soupe de sucre de coco',
          '200ml de lait d\'amande',
          '1 cuillère à café d\'agar-agar',
          'Extrait de vanille'
        ],
        instructions: [
          'Faites fondre le chocolat au bain-marie.',
          'Séparez les blancs des jaunes d\'œufs.',
          'Mélangez les jaunes avec le chocolat fondu.',
          'Chauffez le lait avec l\'agar-agar jusqu\'à dissolution.',
          'Incorporez au mélange chocolat-jaunes.',
          'Montez les blancs en neige avec le sucre.',
          'Incorporez délicatement et répartissez dans des verrines.',
          'Réfrigérez 2 heures avant de servir.'
        ],
        tips: 'Décorez avec des copeaux de chocolat ou des fruits rouges.'
      },
      {
        id: '2',
        title: 'Truffes au chocolat maison',
        description: 'Confiseries artisanales et saines.',
        preparationTime: '30 min + 1h frais',
        difficulty: 'Moyen',
        servings: 20,
        ingredients: [
          '200g de chocolat noir 85%',
          '100ml de crème de coco',
          '2 cuillères à soupe de miel',
          'Cacao en poudre non sucré',
          'Noix de coco râpée',
          'Amandes hachées'
        ],
        instructions: [
          'Hachez finement le chocolat.',
          'Chauffez la crème de coco sans faire bouillir.',
          'Versez sur le chocolat et ajoutez le miel.',
          'Mélangez jusqu\'à obtenir une ganache lisse.',
          'Réfrigérez 1 heure jusqu\'à fermeté.',
          'Formez des boules avec vos mains.',
          'Roulez dans le cacao, la noix de coco ou les amandes.',
          'Conservez au frais.'
        ],
        tips: 'Variez les enrobages selon vos préférences.'
      },
      {
        id: '3',
        title: 'Fondue de fruits au chocolat',
        description: 'Dessert convivial et vitaminé.',
        preparationTime: '15 minutes',
        difficulty: 'Facile',
        servings: 6,
        ingredients: [
          '200g de chocolat noir',
          '150ml de lait d\'amande',
          'Fruits variés : fraises, bananes, pommes',
          'Marshmallows végétaliens',
          'Biscuits sans gluten',
          '1 cuillère à café d\'extrait de vanille'
        ],
        instructions: [
          'Coupez tous les fruits en morceaux faciles à tremper.',
          'Faites fondre le chocolat avec le lait au bain-marie.',
          'Ajoutez la vanille et mélangez jusqu\'à consistance lisse.',
          'Versez dans un caquelon ou un petit pot.',
          'Disposez les fruits et autres accompagnements.',
          'Trempez et dégustez immédiatement.',
          'Maintenez au chaud si nécessaire.'
        ],
        tips: 'Ajoutez une pincée de cannelle pour parfumer la fondue.'
      }
    ];
  }

  // Savon bio
  if (lowerProductName.includes('savon')) {
    return [
      {
        id: '1',
        title: 'Routine de soin visage au savon bio',
        description: 'Soin quotidien doux et naturel.',
        preparationTime: '10 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 savon bio doux',
          'Eau tiède',
          'Serviette propre en coton',
          'Huile végétale (jojoba ou amande douce)',
          'Hydrolat de rose ou camomille'
        ],
        instructions: [
          'Mouillez votre visage à l\'eau tiède.',
          'Faites mousser le savon entre vos mains.',
          'Appliquez délicatement sur le visage en évitant les yeux.',
          'Massez en mouvements circulaires pendant 30 secondes.',
          'Rincez abondamment à l\'eau tiède.',
          'Tamponnez avec la serviette sans frotter.',
          'Appliquez une huile végétale si nécessaire.',
          'Terminez par une brumisation d\'hydrolat.'
        ],
        tips: 'Utilisez matin et soir pour une peau éclatante.'
      },
      {
        id: '2',
        title: 'Gommage corporel au savon et sucre',
        description: 'Exfoliation naturelle hebdomadaire.',
        preparationTime: '15 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 savon bio râpé',
          '3 cuillères à soupe de sucre roux',
          '2 cuillères à soupe d\'huile d\'olive',
          '1 cuillère à café de miel',
          'Quelques gouttes d\'huile essentielle de lavande'
        ],
        instructions: [
          'Râpez finement le savon bio.',
          'Mélangez avec le sucre roux.',
          'Ajoutez l\'huile d\'olive et le miel.',
          'Incorporez l\'huile essentielle.',
          'Mélangez jusqu\'à obtenir une pâte homogène.',
          'Appliquez sur peau humide en massant.',
          'Insistez sur les zones rugueuses.',
          'Rincez à l\'eau tiède et hydratez.'
        ],
        tips: 'À utiliser une fois par semaine maximum.'
      },
      {
        id: '3',
        title: 'Shampoing doux au savon bio',
        description: 'Alternative naturelle aux shampoings classiques.',
        preparationTime: '5 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 savon bio sans parfum',
          'Eau de pluie ou filtrée',
          '1 cuillère à soupe de vinaigre de cidre',
          'Huile de coco (pour cheveux secs)',
          'Hydrolat de romarin (cheveux gras)'
        ],
        instructions: [
          'Mouillez abondamment vos cheveux.',
          'Frottez le savon directement sur le cuir chevelu.',
          'Massez pour faire mousser sans agresser.',
          'Répartissez la mousse sur les longueurs.',
          'Rincez très abondamment à l\'eau tiède.',
          'Effectuez un rinçage au vinaigre dilué.',
          'Rincez une dernière fois à l\'eau claire.',
          'Appliquez une huile sur les pointes si nécessaire.'
        ],
        tips: 'Période d\'adaptation de 2-3 semaines nécessaire.'
      }
    ];
  }

  // T-shirt adaptatif
  if (lowerProductName.includes('shirt') || lowerProductName.includes('adaptatif')) {
    return [
      {
        id: '1',
        title: 'Guide d\'habillage facilité',
        description: 'Techniques pour s\'habiller plus facilement.',
        preparationTime: '5 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 t-shirt adaptatif',
          'Chaise stable',
          'Aide-personne si nécessaire',
          'Miroir (optionnel)'
        ],
        instructions: [
          'Installez-vous confortablement sur la chaise.',
          'Ouvrez complètement les fermetures magnétiques du dos.',
          'Enfilez d\'abord un bras dans la manche.',
          'Passez le t-shirt par-dessus la tête.',
          'Enfilez le second bras.',
          'Ajustez le placement sur les épaules.',
          'Fermez les aimants dans le dos.',
          'Vérifiez le confort et l\'ajustement.'
        ],
        tips: 'Demandez de l\'aide pour fermer les aimants si nécessaire.'
      },
      {
        id: '2',
        title: 'Entretien du vêtement adaptatif',
        description: 'Conseils pour prolonger la durée de vie.',
        preparationTime: '45 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          'Lessive douce sans enzymes',
          'Eau tiède (30°C maximum)',
          'Filet de lavage',
          'Cintre adapté'
        ],
        instructions: [
          'Fermez toutes les fermetures magnétiques avant lavage.',
          'Placez le vêtement dans un filet de lavage.',
          'Utilisez un programme délicat à 30°C.',
          'Ajoutez une lessive douce sans agents agressifs.',
          'Évitez l\'essorage trop violent.',
          'Étendez à plat ou sur cintre adapté.',
          'Évitez le séchage direct au soleil.',
          'Repassez à température modérée si nécessaire.'
        ],
        tips: 'Vérifiez régulièrement l\'état des fermetures magnétiques.'
      },
      {
        id: '3',
        title: 'Coordination vestimentaire adaptée',
        description: 'Créer des tenues harmonieuses et pratiques.',
        preparationTime: '10 minutes',
        difficulty: 'Facile',
        servings: 1,
        ingredients: [
          '1 t-shirt adaptatif',
          'Pantalon à taille élastique',
          'Gilet ou cardigan ouvert',
          'Chaussures à scratch',
          'Accessoires faciles'
        ],
        instructions: [
          'Choisissez une couleur de base pour le t-shirt.',
          'Associez avec un pantalon dans une teinte complémentaire.',
          'Ajoutez une couche supplémentaire (gilet) si besoin.',
          'Optez pour des chaussures faciles à enfiler.',
          'Limitez les accessoires complexes.',
          'Privilégiez les matières confortables.',
          'Vérifiez que l\'ensemble permet une bonne mobilité.',
          'Adaptez selon la saison et l\'activité.'
        ],
        tips: 'Préparez plusieurs tenues à l\'avance pour simplifier le quotidien.'
      }
    ];
  }

  // Recettes par défaut pour les autres produits
  return [
    {
      id: '1',
      title: `Utilisation optimale de ${productName}`,
      description: 'Guide d\'utilisation et conseils pratiques.',
      preparationTime: '15 minutes',
      difficulty: 'Facile',
      servings: 1,
      ingredients: [
        `${productName} (selon besoin)`,
        'Ingrédients complémentaires adaptés',
        'Outils ou accessoires nécessaires'
      ],
      instructions: [
        'Préparez votre espace de travail ou d\'utilisation.',
        'Rassemblez tous les éléments nécessaires.',
        'Suivez les instructions spécifiques au produit.',
        'Adaptez selon vos besoins personnels.',
        'Nettoyez et rangez après utilisation.'
      ],
      tips: 'Consultez les recommandations du fabricant pour un usage optimal.'
    },
    {
      id: '2',
      title: `Entretien et conservation de ${productName}`,
      description: 'Conseils pour prolonger la durée de vie.',
      preparationTime: '10 minutes',
      difficulty: 'Facile',
      servings: 1,
      ingredients: [
        `${productName}`,
        'Produits d\'entretien adaptés',
        'Matériel de nettoyage doux'
      ],
      instructions: [
        'Nettoyez régulièrement selon les recommandations.',
        'Stockez dans un endroit approprié.',
        'Vérifiez périodiquement l\'état du produit.',
        'Remplacez si nécessaire pour maintenir la qualité.',
        'Respectez les dates de péremption le cas échéant.'
      ],
      tips: 'Un bon entretien garantit une utilisation optimale et durable.'
    },
    {
      id: '3',
      title: `Alternatives et variantes avec ${productName}`,
      description: 'Découvrez différentes façons d\'utiliser ce produit.',
      preparationTime: '20 minutes',
      difficulty: 'Moyen',
      servings: 1,
      ingredients: [
        `${productName}`,
        'Ingrédients variables selon l\'usage',
        'Créativité et imagination'
      ],
      instructions: [
        'Explorez différentes méthodes d\'utilisation.',
        'Adaptez selon vos préférences personnelles.',
        'Testez de nouvelles combinaisons.',
        'Notez les résultats pour reproduire les succès.',
        'Partagez vos découvertes avec d\'autres utilisateurs.'
      ],
      tips: 'N\'hésitez pas à expérimenter pour trouver ce qui vous convient le mieux.'
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
