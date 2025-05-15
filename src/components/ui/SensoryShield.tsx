
import { useState, useEffect } from 'react';
import { ShieldAlert, Volume2, VolumeX, SunDim, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface SensoryShieldProps {
  className?: string;
}

const SensoryShield = ({ className }: SensoryShieldProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [lightFilter, setLightFilter] = useState<number>(30); // 0-100%
  const [soundFilter, setSoundFilter] = useState<number>(40); // 0-100%
  const [filterMode, setFilterMode] = useState<'low' | 'medium' | 'high'>('medium');
  const { toast } = useToast();

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    if (!isActive) {
      // Désactiver tous les filtres
      document.documentElement.style.removeProperty('--light-filter');
      document.documentElement.style.removeProperty('--sound-filter');
      document.documentElement.classList.remove('sensory-shield-active');
      return;
    }

    // Appliquer les filtres actifs
    document.documentElement.style.setProperty('--light-filter', `${lightFilter}%`);
    document.documentElement.style.setProperty('--sound-filter', `${soundFilter}%`);
    document.documentElement.classList.add('sensory-shield-active');

    // Ajouter les styles CSS pour les filtres
    const styleId = 'sensory-shield-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Définir les styles CSS pour les filtres
    styleEl.innerHTML = `
      .sensory-shield-active {
        transition: all 0.5s ease-out;
      }
      
      .sensory-shield-active body {
        filter: brightness(${100 - lightFilter * 0.7}%) contrast(${90 - lightFilter * 0.2}%);
      }
      
      /* Réduire les animations */
      .sensory-shield-active * {
        animation-duration: 0.001s !important;
        transition-duration: 0.3s !important;
      }
      
      /* Style spécifique pour le bouclier actif */
      .sensory-shield-button.active {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      
      /* Overlay pour réduire la luminosité globale */
      .sensory-shield-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, ${lightFilter / 200});
        pointer-events: none;
        z-index: 100;
        transition: background-color 0.5s ease;
      }
    `;
    
    // Gérer le volume audio pour les éléments media
    const mediaElements = document.querySelectorAll('audio, video') as NodeListOf<HTMLMediaElement>;
    mediaElements.forEach(media => {
      media.volume = 1 - (soundFilter / 100);
    });

  }, [isActive, lightFilter, soundFilter, filterMode]);

  // Activer/désactiver le bouclier sensoriel
  const toggleShield = () => {
    const newState = !isActive;
    setIsActive(newState);

    if (newState) {
      // Appliquer les préréglages selon le mode
      switch (filterMode) {
        case 'low':
          setLightFilter(20);
          setSoundFilter(30);
          break;
        case 'medium':
          setLightFilter(40);
          setSoundFilter(50);
          break;
        case 'high':
          setLightFilter(60);
          setSoundFilter(70);
          break;
      }

      // Créer l'overlay pour réduire la luminosité
      const overlayId = 'sensory-shield-overlay';
      let overlayEl = document.getElementById(overlayId);
      
      if (!overlayEl) {
        overlayEl = document.createElement('div');
        overlayEl.id = overlayId;
        overlayEl.className = 'sensory-shield-overlay';
        document.body.appendChild(overlayEl);
      }
      
      toast({
        title: "Bouclier sensoriel activé",
        description: "Les stimuli visuels et sonores sont réduits",
      });
    } else {
      // Supprimer l'overlay
      const overlayEl = document.getElementById('sensory-shield-overlay');
      if (overlayEl) {
        overlayEl.remove();
      }
      
      toast({
        title: "Bouclier sensoriel désactivé",
        description: "Retour aux paramètres normaux",
      });
    }
  };

  // Préréglages rapides
  const setPreset = (preset: 'low' | 'medium' | 'high') => {
    setFilterMode(preset);
    
    // Appliquer les préréglages
    switch (preset) {
      case 'low':
        setLightFilter(20);
        setSoundFilter(30);
        break;
      case 'medium':
        setLightFilter(40);
        setSoundFilter(50);
        break;
      case 'high':
        setLightFilter(60);
        setSoundFilter(70);
        break;
    }
    
    if (!isActive) {
      toggleShield();
    }
  };

  return (
    <>
      <Card className={`${className} border-2 ${isActive ? 'border-primary' : 'border-muted'}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            Bouclier Sensoriel
          </CardTitle>
          <Button
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={toggleShield}
            className={`sensory-shield-button ${isActive ? 'active' : ''}`}
            title={isActive ? "Désactiver le bouclier sensoriel" : "Activer le bouclier sensoriel"}
          >
            {isActive ? "Activé" : "Désactivé"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Intensité</h4>
              <ToggleGroup type="single" value={filterMode} onValueChange={(value) => value && setPreset(value as 'low' | 'medium' | 'high')} className="justify-center">
                <ToggleGroupItem value="low" aria-label="Faible">Faible</ToggleGroupItem>
                <ToggleGroupItem value="medium" aria-label="Moyenne">Moyenne</ToggleGroupItem>
                <ToggleGroupItem value="high" aria-label="Élevée">Élevée</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" /> 
                  Filtre de lumière
                </span>
                <span className="text-sm">{lightFilter}%</span>
              </div>
              <Slider
                value={[lightFilter]}
                min={0}
                max={80}
                step={5}
                onValueChange={(values) => setLightFilter(values[0])}
                disabled={!isActive}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <Volume2 className="h-4 w-4" /> 
                  Filtre sonore
                </span>
                <span className="text-sm">{soundFilter}%</span>
              </div>
              <Slider
                value={[soundFilter]}
                min={0}
                max={90}
                step={5}
                onValueChange={(values) => setSoundFilter(values[0])}
                disabled={!isActive}
              />
            </div>
            
            {isActive && (
              <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                <p className="flex items-center gap-1">
                  <SunDim className="h-3 w-3" />
                  Le bouclier sensoriel réduit les stimuli visuels et sonores. 
                  Vous pouvez l'ajuster à tout moment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SensoryShield;
