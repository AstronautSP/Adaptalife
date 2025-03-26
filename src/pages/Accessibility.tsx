
import { useState } from 'react';
import { Headphones, Globe, Volume2, MicOff, Languages, Accessibility } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import LanguagePicker from "@/components/ui/LanguagePicker";
import AccessibilityReader from "@/components/ui/AccessibilityReader";

const AccessibilityPage = () => {
  const [textToSpeech, setTextToSpeech] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [screenReader, setScreenReader] = useState<boolean>(false);
  
  const toggleTextToSpeech = () => {
    const newState = !textToSpeech;
    setTextToSpeech(newState);
    toast.info(newState ? "Synthèse vocale activée" : "Synthèse vocale désactivée");
  };
  
  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    // Applique le mode contraste élevé à la racine du document
    if (newState) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    toast.info(newState ? "Mode contraste élevé activé" : "Mode contraste élevé désactivé");
  };
  
  const toggleLargeText = () => {
    const newState = !largeText;
    setLargeText(newState);
    // Applique le mode texte large à la racine du document
    if (newState) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    toast.info(newState ? "Mode texte large activé" : "Mode texte large désactivé");
  };
  
  const toggleScreenReader = () => {
    const newState = !screenReader;
    setScreenReader(newState);
    toast.info(newState ? "Mode lecteur d'écran activé" : "Mode lecteur d'écran désactivé");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Accessibility className="h-6 w-6" />
          Accessibilité
        </h1>
        <p className="text-muted-foreground">
          Paramètres d'accessibilité et de langue pour une meilleure expérience
        </p>
      </div>
      
      <div className="mt-6 flex items-center justify-center mb-8">
        <LanguagePicker />
      </div>
      
      <Tabs defaultValue="visual" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visual">Visuel</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="languages">Langues</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Options visuelles</CardTitle>
              <CardDescription>
                Adaptez l'apparence de l'application selon vos besoins visuels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Contraste élevé</Label>
                  <p className="text-sm text-muted-foreground">
                    Augmente le contraste des couleurs pour une meilleure lisibilité
                  </p>
                </div>
                <Switch checked={highContrast} onCheckedChange={toggleHighContrast} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Texte agrandi</Label>
                  <p className="text-sm text-muted-foreground">
                    Augmente la taille du texte dans toute l'application
                  </p>
                </div>
                <Switch checked={largeText} onCheckedChange={toggleLargeText} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audio" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Options audio</CardTitle>
              <CardDescription>
                Paramètres de synthèse vocale et d'assistance audio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mode lecture</Label>
                  <p className="text-sm text-muted-foreground">
                    Lit à haute voix le contenu de la page pour les personnes malvoyantes
                  </p>
                </div>
                <AccessibilityReader />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Description des images</Label>
                  <p className="text-sm text-muted-foreground">
                    Génère et lit la description des images automatiquement
                  </p>
                </div>
                <Switch checked={textToSpeech} onCheckedChange={toggleTextToSpeech} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="languages" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Langues et internationalisation</CardTitle>
              <CardDescription>
                Paramètres de langue et de traduction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Langue de l'application</Label>
                <LanguagePicker className="w-full" />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="space-y-0.5">
                  <Label>Traduction automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Traduit automatiquement le contenu dans votre langue préférée
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="space-y-0.5">
                  <Label>Voix de la synthèse vocale</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisissez la langue de la synthèse vocale indépendamment de la langue de l'interface
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilityPage;
