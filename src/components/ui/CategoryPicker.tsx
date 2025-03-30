
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productCategories } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategoryPickerProps {
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

const CategoryPicker = ({ activeCategory, onChange, className }: CategoryPickerProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium mb-2">Catégories</h3>
      <Tabs value={activeCategory} onValueChange={onChange} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto p-1 gap-1 bg-muted/80">
          <TabsTrigger 
            value="all" 
            className="flex-grow rounded data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Tous
          </TabsTrigger>
          {productCategories.map(category => (
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
    </div>
  );
};

export default CategoryPicker;
