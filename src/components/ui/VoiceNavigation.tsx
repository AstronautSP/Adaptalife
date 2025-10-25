
import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Navigation, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { STORE_LOCATIONS } from './StoreLocator';

interface VoiceNavigationProps {
  onNavigate?: (destination: string) => void;
  className?: string;
  userLocation?: { x: number, y: number } | null;
  selectedStore?: string;
}

const VoiceNavigation = ({ 
  onNavigate, 
  className, 
  userLocation, 
  selectedStore 
}: VoiceNavigationProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [destinations, setDestinations] = useState<string[]>([]);
  const [lastInstruction, setLastInstruction] = useState('');
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  // Récupérer les destinations du magasin sélectionné
  const selectedStoreData = STORE_LOCATIONS.find(store => store.id === selectedStore);
  const storeDestinations = selectedStoreData?.destinations.map(d => d.name) || [];
  const storeName = selectedStoreData?.name || 'ce magasin';

  // Instructions pour guider l'utilisateur malvoyant
  const getNavInstructions = (destination: string): string => {
    if (!userLocation) {
      return "Veuillez d'abord activer votre localisation dans le magasin pour recevoir des instructions de navigation.";
    }

    if (!selectedStoreData) {
      return "Veuillez sélectionner un magasin pour recevoir des instructions de navigation.";
    }

    // Trouver les instructions spécifiques au magasin
    const destinationData = selectedStoreData.destinations.find(
      d => d.name.toLowerCase() === destination.toLowerCase()
    );

    if (destinationData) {
      return destinationData.instructions;
    }

    return `Je n'ai pas trouvé "${destination}" dans ${storeName}. Les destinations disponibles sont : ${storeDestinations.join(', ')}.`;
  };

  // Configuration de la reconnaissance vocale
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);

        if (result.isFinal) {
          processVoiceCommand(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event) => {
        toast({
          title: "Erreur de reconnaissance vocale",
          description: "Impossible de reconnaître votre commande. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsListening(false);
      };
    } else {
      toast({
        title: "Non supporté",
        description: "La reconnaissance vocale n'est pas supportée par votre navigateur.",
        variant: "destructive",
      });
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Traitement des commandes vocales
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Recherche des destinations mentionnées
    const foundDestinations = storeDestinations.filter(dest => 
      lowerCommand.includes(dest) || lowerCommand.includes(`aller ${dest}`) || 
      lowerCommand.includes(`trouver ${dest}`) || lowerCommand.includes(`où est ${dest}`)
    );
    
    if (foundDestinations.length > 0) {
      const destination = foundDestinations[0];
      setDestinations(prev => [...prev, destination]);
      
      if (onNavigate) {
        onNavigate(destination);
      }

      const instructions = getNavInstructions(destination);
      setLastInstruction(instructions);
      
      // Utilisation de la synthèse vocale pour répondre
      speak(instructions);
      
      toast({
        title: `Navigation vers: ${destination}`,
      });
    } else if (lowerCommand.includes('aide') || lowerCommand.includes('help')) {
      const availableDestinations = storeDestinations.length > 0 
        ? storeDestinations.slice(0, 3).join(', ') 
        : 'fruits et légumes, boulangerie, caisses';
      const helpMessage = `Je peux vous aider à naviguer dans ${storeName}. Dites par exemple 'Où sont les ${availableDestinations}'.`;
      speak(helpMessage);
      setLastInstruction(helpMessage);
    } else {
      const availableDestinations = storeDestinations.length > 0 
        ? storeDestinations.slice(0, 3).join(', ') 
        : 'fruits et légumes, boulangerie';
      const noUnderstand = `Je n'ai pas compris votre demande. Dans ${storeName}, vous pouvez demander : ${availableDestinations}.`;
      speak(noUnderstand);
      setLastInstruction(noUnderstand);
    }
  };

  // Fonction pour la synthèse vocale
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      
      // Sélectionner une voix française si disponible
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }
      
      window.speechSynthesis.cancel(); // Arrêter toute lecture en cours
      window.speechSynthesis.speak(utterance);
    }
  };

  // Démarrer/arrêter la reconnaissance vocale
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      toast({
        title: "Assistant vocal désactivé",
      });
    } else {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.start();
            setIsListening(true);
            toast({
              title: "Assistant vocal activé",
              description: "Parlez maintenant",
            });
            
            // Message d'accueil
            const welcomeMessage = selectedStoreData 
              ? `Navigation vocale activée pour ${storeName}. Comment puis-je vous aider ?` 
              : "Navigation vocale activée. Veuillez d'abord sélectionner un magasin.";
            
            speak(welcomeMessage);
          } catch (e) {
            toast({
              title: "Erreur",
              description: "Impossible de démarrer la reconnaissance vocale",
              variant: "destructive",
            });
          }
        }
      } else {
        toast({
          title: "Non supporté",
          description: "La reconnaissance vocale n'est pas supportée par votre navigateur.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Navigation className="h-5 w-5 text-primary" />
          Navigation Vocale
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Assistant GPS vocal</span>
            <Button
              variant={isListening ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={toggleListening}
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Désactiver
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Activer
                </>
              )}
            </Button>
          </div>
          
          {isListening && (
            <div className="border rounded p-3 bg-muted/30 flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-primary/30 animate-ping"></div>
                <div className="relative bg-primary rounded-full h-2 w-2"></div>
              </div>
              <span className="text-sm">
                {transcript ? transcript : "Écoutant vos commandes vocales..."}
              </span>
            </div>
          )}
          
          {lastInstruction && (
            <div className="text-sm border-l-4 border-l-primary pl-3 py-2 mt-2">
              <div className="flex items-center gap-1 mb-1">
                <Volume2 className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Dernières instructions:</span>
              </div>
              <p>{lastInstruction}</p>
            </div>
          )}
          
          {destinations.length > 0 && (
            <div className="mt-2">
              <p className="text-sm mb-2">Destinations récentes:</p>
              <div className="flex flex-wrap gap-1">
                {destinations.slice(-3).map((dest, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {dest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
            <p>
              <strong>Destinations dans {storeName}:</strong>{' '}
              {storeDestinations.length > 0 
                ? storeDestinations.join(', ') 
                : 'Veuillez sélectionner un magasin'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceNavigation;
