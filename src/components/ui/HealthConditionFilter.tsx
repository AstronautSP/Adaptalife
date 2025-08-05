
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
  // Diabète et métabolisme
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
    id: 'hypoglycemia', 
    name: 'Hypoglycémie',
    description: 'Produits avec index glycémique adapté'
  },
  
  // Maladies cardiovasculaires
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
    id: 'stroke', 
    name: 'AVC',
    description: 'Régime recommandé post-AVC'
  },
  { 
    id: 'cholesterol', 
    name: 'Cholestérol élevé',
    description: 'Produits faibles en graisses saturées'
  },
  
  // Maladies rares et génétiques
  { 
    id: 'cystic-fibrosis', 
    name: 'Mucoviscidose',
    description: 'Régime hypercalorique, riche en protéines et suppléments'
  },
  { 
    id: 'huntington-disease', 
    name: 'Maladie de Huntington',
    description: 'Nutrition adaptée aux troubles de déglutition'
  },
  { 
    id: 'phenylketonuria', 
    name: 'Phénylcétonurie',
    description: 'Régime sans phénylalanine'
  },
  { 
    id: 'wilson-disease', 
    name: 'Maladie de Wilson',
    description: 'Régime pauvre en cuivre'
  },
  { 
    id: 'hemochromatosis', 
    name: 'Hémochromatose',
    description: 'Limitation du fer alimentaire'
  },
  { 
    id: 'marfan-syndrome', 
    name: 'Syndrome de Marfan',
    description: 'Surveillance cardiovasculaire et nutritionnelle'
  },
  { 
    id: 'ehlers-danlos', 
    name: 'Syndrome d\'Ehlers-Danlos',
    description: 'Nutrition pour troubles digestifs et articulations'
  },
  { 
    id: 'prader-willi', 
    name: 'Syndrome de Prader-Willi',
    description: 'Contrôle strict des portions et calories'
  },
  
  // Maladies auto-immunes
  { 
    id: 'celiac-disease', 
    name: 'Maladie cœliaque',
    description: 'Régime strictement sans gluten'
  },
  { 
    id: 'crohn-disease', 
    name: 'Maladie de Crohn',
    description: 'Régime anti-inflammatoire, pauvre en fibres'
  },
  { 
    id: 'ulcerative-colitis', 
    name: 'Rectocolite hémorragique',
    description: 'Régime adapté aux inflammations intestinales'
  },
  { 
    id: 'lupus', 
    name: 'Lupus érythémateux',
    description: 'Régime anti-inflammatoire, contrôle du sodium'
  },
  { 
    id: 'rheumatoid-arthritis', 
    name: 'Polyarthrite rhumatoïde',
    description: 'Régime anti-inflammatoire, oméga-3'
  },
  { 
    id: 'multiple-sclerosis', 
    name: 'Sclérose en plaques',
    description: 'Régime anti-inflammatoire méditerranéen'
  },
  
  // Troubles neurologiques
  { 
    id: 'epilepsy', 
    name: 'Épilepsie',
    description: 'Régime cétogène ou modifications alimentaires spécifiques'
  },
  { 
    id: 'parkinson', 
    name: 'Maladie de Parkinson',
    description: 'Régime riche en antioxydants, facilité de déglutition'
  },
  { 
    id: 'alzheimer', 
    name: 'Maladie d\'Alzheimer',
    description: 'Nutrition adaptée aux troubles cognitifs'
  },
  { 
    id: 'als', 
    name: 'Sclérose latérale amyotrophique',
    description: 'Adaptation texture et déglutition'
  },
  
  // Handicaps et déficiences
  { 
    id: 'visual-impairment', 
    name: 'Déficience visuelle',
    description: 'Produits avec étiquetage accessible et braille'
  },
  { 
    id: 'hearing-impairment', 
    name: 'Déficience auditive',
    description: 'Information visuelle renforcée sur les produits'
  },
  { 
    id: 'mobility-impairment', 
    name: 'Mobilité réduite',
    description: 'Produits faciles à manipuler et ouvrir'
  },
  { 
    id: 'intellectual-disability', 
    name: 'Déficience intellectuelle',
    description: 'Produits avec instructions simplifiées'
  },
  { 
    id: 'autism-spectrum', 
    name: 'Troubles du spectre autistique',
    description: 'Produits adaptés aux sensibilités sensorielles'
  },
  
  // Troubles alimentaires
  { 
    id: 'anorexia', 
    name: 'Anorexie mentale',
    description: 'Produits pour reprise nutritionnelle contrôlée'
  },
  { 
    id: 'bulimia', 
    name: 'Boulimie',
    description: 'Produits pour stabilisation alimentaire'
  },
  { 
    id: 'binge-eating', 
    name: 'Hyperphagie boulimique',
    description: 'Contrôle des portions et satiété'
  },
  { 
    id: 'pica', 
    name: 'Pica',
    description: 'Surveillance des ingestions non alimentaires'
  },
  
  // Intolérances et allergies
  { 
    id: 'lactose-intolerance', 
    name: 'Intolérance au lactose',
    description: 'Produits sans lactose ou à faible teneur'
  },
  { 
    id: 'fructose-intolerance', 
    name: 'Intolérance au fructose',
    description: 'Régime pauvre en fructose et sucrose'
  },
  { 
    id: 'histamine-intolerance', 
    name: 'Intolérance à l\'histamine',
    description: 'Éviter aliments riches en histamine'
  },
  { 
    id: 'fodmap-sensitivity', 
    name: 'Sensibilité aux FODMAPs',
    description: 'Régime pauvre en FODMAPs'
  },
  
  // Maladies rénales
  { 
    id: 'chronic-kidney-disease', 
    name: 'Insuffisance rénale chronique',
    description: 'Contrôle protéines, phosphore, potassium'
  },
  { 
    id: 'kidney-stones', 
    name: 'Calculs rénaux',
    description: 'Régime préventif selon type de calculs'
  },
  
  // Maladies hépatiques
  { 
    id: 'liver-cirrhosis', 
    name: 'Cirrhose hépatique',
    description: 'Régime pauvre en sodium, contrôle protéines'
  },
  { 
    id: 'hepatic-encephalopathy', 
    name: 'Encéphalopathie hépatique',
    description: 'Restriction protéique, suppléments spécifiques'
  },
  
  // Cancers et traitements
  { 
    id: 'cancer-treatment', 
    name: 'Traitement anticancéreux',
    description: 'Nutrition adaptée aux effets secondaires'
  },
  { 
    id: 'post-surgery', 
    name: 'Post-chirurgie digestive',
    description: 'Régime de transition progressive'
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
