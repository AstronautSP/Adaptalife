import { useState } from 'react';
import { Info, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const BlurInfo = () => {
  const [showInfo, setShowInfo] = useState(true);

  const disableAllBlur = () => {
    // Désactiver le bouclier sensoriel s'il est actif
    const body = document.body;
    body.classList.remove('sensory-shield-active');
    
    // Supprimer les overlays de flou
    const overlays = document.querySelectorAll('.sensory-shield-overlay');
    overlays.forEach(overlay => overlay.remove());
    
    // Réinitialiser les styles CSS
    document.documentElement.style.removeProperty('--light-filter');
    document.documentElement.style.removeProperty('--sound-filter');
    
    // Réinitialiser les filtres appliqués au body
    body.style.filter = '';
    
    toast.success("Tous les effets de flou ont été désactivés");
    setShowInfo(false);
  };

  if (!showInfo) return null;

  return (
    <Card className="mb-4 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-yellow-800">
          <Info className="h-4 w-4" />
          Effets de flou détectés
        </CardTitle>
        <CardDescription className="text-yellow-700">
          Votre application utilise actuellement le bouclier sensoriel qui peut causer du floutage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Badge variant="secondary" className="mr-2">🛡️ Bouclier sensoriel</Badge>
          <Badge variant="secondary" className="mr-2">🌟 Effets visuels</Badge>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={disableAllBlur}
            className="flex items-center gap-2"
          >
            <EyeOff className="h-4 w-4" />
            Désactiver le flou
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInfo(false)}
          >
            Masquer cette info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlurInfo;