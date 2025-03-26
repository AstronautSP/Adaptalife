
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

interface HealthCondition {
  id: string;
  name: string;
  description: string;
}

const HEALTH_CONDITIONS: HealthCondition[] = [
  { 
    id: 'diabetes-1', 
    name: 'Diabète type 1',
    description: 'Filtrer les produits adaptés au diabète de type 1'
  },
  { 
    id: 'diabetes-2', 
    name: 'Diabète type 2',
    description: 'Filtrer les produits adaptés au diabète de type 2'
  },
  { 
    id: 'heart-disease', 
    name: 'Maladie cardiaque',
    description: 'Produits pour régime faible en sodium et graisses saturées'
  },
  { 
    id: 'hypertension', 
    name: 'Hypertension',
    description: 'Produits faibles en sodium'
  },
  { 
    id: 'hypoglycemia', 
    name: 'Hypoglycémie',
    description: 'Produits avec index glycémique adapté'
  },
  { 
    id: 'stroke', 
    name: 'AVC',
    description: 'Régime recommandé post-AVC'
  },
  { 
    id: 'cholesterol', 
    name: 'Cholestérol élevé',
    description: 'Produits faibles en graisses saturées'
  },
];

interface HealthConditionFilterProps {
  onChange?: (selectedConditions: string[]) => void;
  className?: string;
}

const HealthConditionFilter = ({ onChange, className }: HealthConditionFilterProps) => {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleConditionToggle = (conditionId: string) => {
    let newSelection: string[];
    
    if (selectedConditions.includes(conditionId)) {
      newSelection = selectedConditions.filter(id => id !== conditionId);
    } else {
      newSelection = [...selectedConditions, conditionId];
    }
    
    setSelectedConditions(newSelection);
    onChange?.(newSelection);
  };

  const handleClearAll = () => {
    setSelectedConditions([]);
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
              {selectedConditions.length === 0 ? (
                "Filtrer par condition de santé"
              ) : (
                `${selectedConditions.length} condition${selectedConditions.length > 1 ? 's' : ''} sélectionnée${selectedConditions.length > 1 ? 's' : ''}`
              )}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <div className="p-3 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Conditions de santé</h4>
              {selectedConditions.length > 0 && (
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
              Sélectionnez les conditions pour filtrer les produits adaptés
            </p>
          </div>
          <div className="max-h-[350px] overflow-auto p-3 space-y-2">
            {HEALTH_CONDITIONS.map((condition) => {
              const isSelected = selectedConditions.includes(condition.id);
              return (
                <div
                  key={condition.id}
                  className={cn(
                    "flex flex-col p-2 rounded-md cursor-pointer transition-colors",
                    isSelected ? "bg-primary/10" : "hover:bg-muted"
                  )}
                  onClick={() => handleConditionToggle(condition.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                      isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className="text-sm font-medium">{condition.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 ml-7">
                    {condition.description}
                  </p>
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
      
      {/* Badges for selected conditions */}
      {selectedConditions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedConditions.map(conditionId => {
            const condition = HEALTH_CONDITIONS.find(c => c.id === conditionId);
            return (
              <Badge 
                key={conditionId}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {condition?.name}
                <button
                  onClick={() => handleConditionToggle(conditionId)}
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

export default HealthConditionFilter;
