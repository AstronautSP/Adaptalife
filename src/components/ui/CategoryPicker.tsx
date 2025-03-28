
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { productCategories } from '@/data/products';

interface CategoryPickerProps {
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

const CategoryPicker = ({ activeCategory, onChange, className }: CategoryPickerProps) => {
  return (
    <div className={className}>
      <Tabs value={activeCategory} onValueChange={onChange} className="w-full">
        <TabsList className="w-full flex flex-wrap">
          <TabsTrigger value="all" className="flex-1">
            Tous
          </TabsTrigger>
          {productCategories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex-1"
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
