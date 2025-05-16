
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productCategories, mainCategories } from '@/data/products';
import { cn } from '@/lib/utils';
import { CheckIcon, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

interface CategoryPickerProps {
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

const CategoryPicker = ({ activeCategory, onChange, className }: CategoryPickerProps) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState('all');

  // Filtre les catégories en fonction de la catégorie principale sélectionnée
  const filteredCategories = productCategories.filter(category => {
    if (selectedMainCategory === 'all') return true;
    return category.mainCategory === selectedMainCategory;
  });

  // Détermine les catégories à afficher en fonction de showAll
  const displayCategories = showAll ? filteredCategories : filteredCategories.slice(0, 6);

  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value);
    onChange('all');
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <h3 className="text-lg font-medium">Catégories</h3>
        
        {/* Menu déroulant pour les catégories principales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {mainCategories.find(cat => cat.id === selectedMainCategory)?.name || 'Toutes les catégories'}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px]">
            <DropdownMenuRadioGroup value={selectedMainCategory} onValueChange={handleMainCategoryChange}>
              {mainCategories.map(category => (
                <DropdownMenuRadioItem key={category.id} value={category.id} className="cursor-pointer">
                  {category.name}
                  {selectedMainCategory === category.id && <CheckIcon className="h-4 w-4 ml-auto" />}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeCategory} onValueChange={onChange} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto p-1 gap-1 bg-muted/80">
          <TabsTrigger 
            value="all" 
            className="flex-grow rounded data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Tous
          </TabsTrigger>
          {displayCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex-grow rounded data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {filteredCategories.length > 6 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-2" 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Voir moins
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Voir plus ({filteredCategories.length - 6} catégories)
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default CategoryPicker;
