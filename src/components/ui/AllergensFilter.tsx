
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Allergen {
  id: string;
  name: string;
  icon?: string;
}

const ALLERGENS: Allergen[] = [
  { id: 'gluten', name: 'Gluten' },
  { id: 'crustaceans', name: 'Crustacés' },
  { id: 'eggs', name: 'Œufs' },
  { id: 'fish', name: 'Poisson' },
  { id: 'peanuts', name: 'Arachides' },
  { id: 'soy', name: 'Soja' },
  { id: 'milk', name: 'Lait' },
  { id: 'nuts', name: 'Fruits à coque' },
  { id: 'celery', name: 'Céleri' },
  { id: 'mustard', name: 'Moutarde' },
  { id: 'sesame', name: 'Graines de sésame' },
  { id: 'sulphites', name: 'Sulfites' },
  { id: 'lupin', name: 'Lupin' },
  { id: 'molluscs', name: 'Mollusques' },
];

interface AllergensFilterProps {
  onChange?: (selectedAllergens: string[]) => void;
  className?: string;
}

const AllergensFilter = ({ onChange, className }: AllergensFilterProps) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAllergenToggle = (allergenId: string) => {
    let newSelection: string[];
    
    if (selectedAllergens.includes(allergenId)) {
      newSelection = selectedAllergens.filter(id => id !== allergenId);
    } else {
      newSelection = [...selectedAllergens, allergenId];
    }
    
    setSelectedAllergens(newSelection);
    onChange?.(newSelection);
  };

  const handleClearAll = () => {
    setSelectedAllergens([]);
    onChange?.([]);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="border-dashed justify-between w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>
              {selectedAllergens.length === 0 ? (
                "Filtrer par allergènes"
              ) : (
                `${selectedAllergens.length} allergène${selectedAllergens.length > 1 ? 's' : ''} sélectionné${selectedAllergens.length > 1 ? 's' : ''}`
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Allergènes</h4>
              {selectedAllergens.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-sm text-muted-foreground"
                  onClick={handleClearAll}
                >
                  Tout effacer
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sélectionnez les allergènes à exclure
            </p>
          </div>
          <div className="max-h-[300px] overflow-auto p-3 space-y-1">
            {ALLERGENS.map((allergen) => {
              const isSelected = selectedAllergens.includes(allergen.id);
              return (
                <div
                  key={allergen.id}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors",
                    isSelected ? "bg-primary/10" : "hover:bg-muted"
                  )}
                  onClick={() => handleAllergenToggle(allergen.id)}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                  )}>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <span className="text-sm">{allergen.name}</span>
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t">
            <Button 
              className="w-full" 
              onClick={() => setIsOpen(false)}
            >
              Appliquer le filtre
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Badges for selected allergens */}
      {selectedAllergens.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedAllergens.map(allergenId => {
            const allergen = ALLERGENS.find(a => a.id === allergenId);
            return (
              <Badge 
                key={allergenId}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {allergen?.name}
                <button
                  onClick={() => handleAllergenToggle(allergenId)}
                  className="ml-1 rounded-full hover:bg-accent/20 p-0.5"
                >
                  <Check className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllergensFilter;
