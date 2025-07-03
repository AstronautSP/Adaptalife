import { useState } from 'react';
import { Play, Pause, RotateCcw, Monitor, Smartphone, Users, Eye, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DemoScenario {
  id: string;
  title: string;
  persona: string;
  description: string;
  steps: string[];
  duration: string;
  features: string[];
}

const Demo = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('marie');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoMode, setDemoMode] = useState<'desktop' | 'mobile'>('mobile');

  // Modes de démonstration
  const [sensoryShield, setSensoryShield] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [voiceOver, setVoiceOver] = useState(false);

  const scenarios: DemoScenario[] = [
    {
      id: 'marie',
      title: 'Marie, 65 ans - Diabétique',
      persona: '👵 Personne âgée avec diabète',
      description: 'Marie cherche des produits adaptés à son régime diabétique pour sa semaine',
      duration: '3 minutes',
      features: ['Filtres santé', 'Mode senior', 'Recommandations personnalisées'],
      steps: [
        'Marie ouvre l\'application et active le mode senior',
        'Elle utilise la recherche vocale : "Produits pour diabétiques"',
        'L\'app filtre automatiquement les produits à IG bas',
        'Elle consulte les fiches détaillées avec scoring santé',
        'Marie ajoute ses favoris et reçoit des recommandations'
      ]
    },
    {
      id: 'jean',
      title: 'Jean, 42 ans - Malvoyant',
      persona: '👁️ Déficience visuelle',
      description: 'Jean fait ses courses en autonomie grâce à l\'assistance vocale',
      duration: '4 minutes',
      features: ['Synthèse vocale', 'Navigation audio', 'Lecture d\'étiquettes'],
      steps: [
        'Jean active le lecteur d\'écran et la navigation vocale',
        'Il recherche "yaourt grec" par commande vocale',
        'L\'app lit les résultats et détails nutritionnels',
        'Jean navigue dans les options avec des gestes',
        'Il localise le produit dans le magasin via GPS audio'
      ]
    },
    {
      id: 'lucas',
      title: 'Lucas, 28 ans - Autiste',
      persona: '🧩 Trouble du spectre autistique',
      description: 'Lucas utilise le bouclier sensoriel pour faire ses courses sereinement',
      duration: '2 minutes',
      features: ['Bouclier sensoriel', 'Interface simplifiée', 'Réduction des stimuli'],
      steps: [
        'Lucas active le bouclier sensoriel (niveau modéré)',
        'L\'interface devient plus calme, moins colorée',
        'Il browse les produits sans surcharge visuelle',
        'Les animations sont désactivées automatiquement',
        'Lucas peut se concentrer sur ses achats'
      ]
    },
    {
      id: 'sophie',
      title: 'Sophie, 35 ans - Mobilité réduite',
      persona: '♿ Fauteuil roulant',
      description: 'Sophie planifie ses courses et localise les produits accessibles',
      duration: '3 minutes',
      features: ['Plan 3D', 'Accessibilité magasin', 'Assistance courses'],
      steps: [
        'Sophie consulte le plan 3D du magasin',
        'Elle identifie les rayons accessibles en fauteuil',
        'L\'app calcule le meilleur itinéraire',
        'Sophie demande de l\'aide via le bouton assistance',
        'Un employé reçoit sa liste et l\'aide'
      ]
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < currentScenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Démonstration Interactive</h1>
        <p className="text-muted-foreground">
          Découvrez Handiview à travers des scénarios d'usage réels
        </p>
      </div>

      <Tabs defaultValue="scenarios" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios">Scénarios</TabsTrigger>
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
          <TabsTrigger value="settings">Paramètres démo</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sélection du scénario */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Choisir un persona</h3>
              {scenarios.map((scenario) => (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all ${
                    selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{scenario.persona.split(' ')[0]}</span>
                      <div>
                        <h4 className="font-semibold text-sm">{scenario.title}</h4>
                        <p className="text-xs text-muted-foreground">{scenario.duration}</p>
                      </div>
                    </div>
                    <p className="text-xs">{scenario.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Détails du scénario */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{currentScenario.title}</CardTitle>
                      <CardDescription>{currentScenario.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={demoMode === 'mobile' ? () => setDemoMode('desktop') : () => setDemoMode('mobile')}
                      >
                        {demoMode === 'mobile' ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Fonctionnalités mises en avant */}
                  <div>
                    <h4 className="font-semibold mb-2">Fonctionnalités démontrées :</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentScenario.features.map((feature) => (
                        <Badge key={feature} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Étapes du scénario */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Étapes du scénario :</h4>
                      <div className="flex gap-2">
                        {!isPlaying ? (
                          <Button onClick={startDemo} size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Démarrer
                          </Button>
                        ) : (
                          <Button onClick={pauseDemo} size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                        )}
                        <Button onClick={resetDemo} size="sm" variant="outline">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {currentScenario.steps.map((step, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border transition-all ${
                            index === currentStep && isPlaying
                              ? 'bg-primary/10 border-primary'
                              : index < currentStep
                              ? 'bg-success/10 border-success'
                              : 'bg-muted/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                              index === currentStep && isPlaying
                                ? 'bg-primary text-white'
                                : index < currentStep
                                ? 'bg-success text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <p className="text-sm">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {isPlaying && currentStep < currentScenario.steps.length - 1 && (
                      <Button onClick={nextStep} className="w-full mt-4">
                        Étape suivante
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Accessibilité universelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Interface adaptative selon le handicap</li>
                  <li>• Navigation clavier complète</li>
                  <li>• Compatible lecteurs d'écran</li>
                  <li>• Normes WCAG 2.1 AA</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Assistance visuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Contraste élevé configurable</li>
                  <li>• Tailles de police adaptables</li>
                  <li>• Couleurs différenciées</li>
                  <li>• Mode sombre/clair</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Assistance audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Synthèse vocale multilingue</li>
                  <li>• Commandes vocales</li>
                  <li>• Navigation audio</li>
                  <li>• Feedback sonore</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>🛡️ Bouclier Sensoriel - Innovation mondiale</CardTitle>
                <CardDescription>
                  Première technologie dédiée aux personnes avec troubles sensoriels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Réductions visuelles</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Luminosité adaptée</li>
                      <li>• Animations réduites</li>
                      <li>• Couleurs apaisées</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Réductions sonores</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Volume automatique</li>
                      <li>• Sons essentiels only</li>
                      <li>• Fréquences filtrées</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Interface simplifiée</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Éléments réduits</li>
                      <li>• Navigation linéaire</li>
                      <li>• Feedback minimal</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de démonstration</CardTitle>
              <CardDescription>
                Configurez les options d'accessibilité pour la démo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Modes d'accessibilité</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bouclier sensoriel</Label>
                      <p className="text-sm text-muted-foreground">Mode apaisant pour personnes autistes</p>
                    </div>
                    <Switch checked={sensoryShield} onCheckedChange={setSensoryShield} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Contraste élevé</Label>
                      <p className="text-sm text-muted-foreground">Pour malvoyants</p>
                    </div>
                    <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Texte agrandi</Label>
                      <p className="text-sm text-muted-foreground">Pour personnes âgées</p>
                    </div>
                    <Switch checked={largeText} onCheckedChange={setLargeText} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Synthèse vocale</Label>
                      <p className="text-sm text-muted-foreground">Lecture automatique</p>
                    </div>
                    <Switch checked={voiceOver} onCheckedChange={setVoiceOver} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Aperçu en temps réel</h4>
                  <div className={`p-4 rounded-lg border transition-all ${
                    sensoryShield ? 'bg-muted/20 border-muted' : 'bg-background'
                  } ${
                    highContrast ? 'border-foreground border-2' : ''
                  }`}>
                    <h5 className={`font-semibold mb-2 ${
                      largeText ? 'text-lg' : 'text-base'
                    }`}>
                      Exemple de produit
                    </h5>
                    <p className={`text-muted-foreground ${
                      largeText ? 'text-base' : 'text-sm'
                    }`}>
                      Yaourt grec nature bio - Score nutritionnel A
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={sensoryShield ? 'bg-muted text-muted-foreground' : ''}>
                        Sans lactose
                      </Badge>
                      <Badge variant="outline" className={sensoryShield ? 'border-muted' : ''}>
                        Riche en protéines
                      </Badge>
                    </div>
                    {voiceOver && (
                      <p className="text-xs text-primary mt-2">🔊 Lecture en cours...</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <Button size="lg" className="mr-4">
                  Appliquer à la démo
                </Button>
                <Button variant="outline" size="lg">
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Demo;