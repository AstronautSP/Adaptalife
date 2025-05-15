
import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Navigation, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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

  // Liste des destinations possibles dans le magasin
  const storeDestinations = [
    'fruits et légumes', 'boulangerie', 'boucherie', 'poissonnerie',
    'produits laitiers', 'surgelés', 'boissons', 'santé et beauté', 'maison',
    'entrée', 'caisses'
  ];

  // Instructions pour guider l'utilisateur malvoyant
  const getNavInstructions = (destination: string): string => {
    if (!userLocation) {
      return "Veuillez d'abord activer votre localisation dans le magasin pour recevoir des instructions de navigation.";
    }

    // Simulation d'instructions de navigation basées sur la destination
    switch (destination.toLowerCase()) {
      case 'fruits et légumes':
        return "Pour aller aux fruits et légumes, avancez tout droit sur 10 mètres, puis tournez à gauche.";
      case 'boulangerie':
        return "Pour aller à la boulangerie, avancez sur 15 mètres, puis tournez à droite.";
      case 'boucherie':
        return "Pour aller à la boucherie, avancez tout droit sur 20 mètres, puis tournez à droite.";
      case 'poissonnerie':
        return "Pour aller à la poissonnerie, avancez tout droit sur 20 mètres, puis tournez à droite et continuez sur 5 mètres.";
      case 'produits laitiers':
        return "Pour aller aux produits laitiers, avancez tout droit sur 15 mètres, puis tournez à droite.";
      case 'surgelés':
        return "Pour aller aux surgelés, avancez tout droit sur 20 mètres, puis tournez à droite et continuez jusqu'au fond du magasin.";
      case 'boissons':
        return "Pour aller aux boissons, avancez tout droit sur 10 mètres, puis tournez à gauche et continuez sur 10 mètres.";
      case 'santé et beauté':
        return "Pour aller aux produits de santé et beauté, avancez tout droit sur 15 mètres, puis tournez à droite et continuez sur 5 mètres.";
      case 'maison':
        return "Pour aller aux produits pour la maison, avancez tout droit sur 20 mètres, puis tournez à gauche.";
      case 'entrée':
        return "Pour retourner à l'entrée du magasin, faites demi-tour et avancez tout droit sur 30 mètres.";
      case 'caisses':
        return "Pour aller aux caisses, faites demi-tour et avancez tout droit sur 20 mètres.";
      default:
        return `Je n'ai pas trouvé "${destination}" dans le magasin. Vous pouvez demander des directions vers les fruits et légumes, la boulangerie, la boucherie, etc.`;
    }
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
        console.error('Erreur de reconnaissance vocale:', event.error);
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
      const helpMessage = "Je peux vous aider à naviguer dans le magasin. Dites par exemple 'Où sont les fruits et légumes' ou 'Comment aller aux caisses'.";
      speak(helpMessage);
      setLastInstruction(helpMessage);
    } else {
      const noUnderstand = "Je n'ai pas compris votre demande. Vous pouvez demander où se trouvent les rayons comme 'fruits et légumes' ou 'boulangerie'.";
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
            const welcomeMessage = selectedStore 
              ? `Navigation vocale activée pour ${selectedStore}. Comment puis-je vous aider ?` 
              : "Navigation vocale activée. Comment puis-je vous aider ?";
            
            speak(welcomeMessage);
          } catch (e) {
            console.error(e);
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
              <strong>Commandes disponibles:</strong> "Où sont les fruits et légumes?", 
              "Comment aller aux caisses?", "Trouver la boulangerie", etc.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceNavigation;
