

import { useState } from 'react';
import { Accessibility, BellRing, CheckCircle, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface WheelchairAssistanceProps {
  className?: string;
  currentStore?: string;
}

const WheelchairAssistance = ({ className, currentStore }: WheelchairAssistanceProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [assistanceRequested, setAssistanceRequested] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  
  const storeAreas = [
    "Rayon fruits et légumes",
    "Rayon boulangerie",
    "Rayon produits laitiers",
    "Rayon épicerie",
    "Rayon boissons",
    "Rayon surgelés",
    "Rayon hygiène et beauté"
  ];

  const handleRequestAssistance = () => {
    if (!selectedArea) {
      toast.error("Veuillez sélectionner un rayon");
      return;
    }

    // Simuler le temps d'attente estimé (entre 2 et 5 minutes)
    const waitTime = Math.floor(Math.random() * 4) + 2;
    setEstimatedTime(waitTime);
    setAssistanceRequested(true);

    // Notification de confirmation
    toast.success(`Demande d'assistance envoyée pour le ${selectedArea}`);
  };

  const handleCancelRequest = () => {
    setAssistanceRequested(false);
    setEstimatedTime(null);
    toast.info("Demande d'assistance annulée");
  };

  const resetAndClose = () => {
    setSelectedArea("");
    setAssistanceRequested(false);
    setEstimatedTime(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
        onClick={() => setIsDialogOpen(true)}
      >
        <Accessibility className="h-4 w-4 text-blue-600" />
        <span className="text-blue-700">Assistance fauteuil roulant</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-primary" />
              Assistance fauteuil roulant
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {!assistanceRequested ? (
              <>
                <div className="bg-muted/30 p-3 rounded-lg text-sm">
                  <p>
                    Un membre de notre équipe viendra vous aider à récupérer les produits
                    en hauteur dans le rayon de votre choix.
                  </p>
                </div>
                
                {currentStore && (
                  <div className="flex items-center gap-2 text-sm">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Magasin : {currentStore}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="area-select" className="text-sm font-medium">
                    Sélectionnez le rayon où vous avez besoin d'aide
                  </label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger id="area-select" className="w-full">
                      <SelectValue placeholder="Choisir un rayon" />
                    </SelectTrigger>
                    <SelectContent>
                      {storeAreas.map(area => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <Card className="border-primary/30">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BellRing className="h-4 w-4 text-primary" />
                    Demande d'assistance en cours
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Statut</span>
                      <Badge variant="outline" className="bg-primary/10">
                        En attente
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rayon</span>
                      <span className="text-sm">{selectedArea}</span>
                    </div>
                    {estimatedTime && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Temps d'attente estimé</span>
                        <span className="text-sm">{estimatedTime} minutes</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-primary/30 animate-ping"></div>
                      <div className="relative bg-primary rounded-full h-3 w-3"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground"
                    onClick={handleCancelRequest}
                  >
                    Annuler la demande
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            {!assistanceRequested ? (
              <>
                <Button variant="outline" onClick={resetAndClose}>
                  Annuler
                </Button>
                <Button onClick={handleRequestAssistance}>
                  Demander assistance
                </Button>
              </>
            ) : (
              <Button 
                className="w-full flex items-center justify-center gap-2" 
                onClick={resetAndClose}
              >
                <CheckCircle className="h-4 w-4" />
                Terminer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WheelchairAssistance;

