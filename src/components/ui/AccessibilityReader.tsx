
import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface AccessibilityReaderProps {
  className?: string;
}

const AccessibilityReader = ({ className }: AccessibilityReaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [speed, setSpeed] = useState<number>(1);
  const [voice, setVoice] = useState<string>('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Charger les voix disponibles
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Définir la voix par défaut en français si disponible
        const frenchVoice = voices.find(v => v.lang.includes('fr'));
        if (frenchVoice) {
          setVoice(frenchVoice.name);
        } else if (voices.length) {
          setVoice(voices[0].name);
        }
      };
      
      // Chrome nécessite un événement pour charger les voix
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      loadVoices();
    }
  }, []);

  const toggleReader = () => {
    const newState = !isActive;
    setIsActive(newState);
    
    const message = newState 
      ? "Mode de lecture pour malvoyants activé" 
      : "Mode de lecture pour malvoyants désactivé";
    
    toast.info(message);
    
    if (newState) {
      speak("Mode de lecture pour malvoyants activé. Je peux maintenant lire le contenu de la page pour vous.");
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window && isActive) {
      window.speechSynthesis.cancel(); // Arrêter toute lecture en cours
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Appliquer les paramètres
      utterance.volume = volume / 100;
      utterance.rate = speed;
      
      // Définir la voix si sélectionnée
      if (voice) {
        const selectedVoice = availableVoices.find(v => v.name === voice);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const handleTest = () => {
    speak("Ceci est un test du mode de lecture pour personnes malvoyantes. Si vous entendez ce message, tout fonctionne correctement.");
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Button
          variant={isActive ? "default" : "outline"}
          size="icon"
          onClick={toggleReader}
          className="h-10 w-10 rounded-full"
          title={isActive ? "Désactiver le mode lecture" : "Activer le mode lecture pour malvoyants"}
        >
          {isActive ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              title="Paramètres de lecture"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Paramètres de lecture vocale</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="reader-active">Activer la lecture vocale</Label>
                <Switch 
                  id="reader-active" 
                  checked={isActive} 
                  onCheckedChange={setIsActive} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reader-voice">Voix</Label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger id="reader-voice">
                    <SelectValue placeholder="Sélectionner une voix" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map((v) => (
                      <SelectItem key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reader-volume">Volume: {volume}%</Label>
                </div>
                <Slider
                  id="reader-volume"
                  min={0}
                  max={100}
                  step={5}
                  value={[volume]}
                  onValueChange={(values) => setVolume(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reader-speed">Vitesse: {speed}x</Label>
                </div>
                <Slider
                  id="reader-speed"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[speed]}
                  onValueChange={(values) => setSpeed(values[0])}
                />
              </div>
              
              <Button onClick={handleTest} className="w-full">
                Tester la lecture
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccessibilityReader;
