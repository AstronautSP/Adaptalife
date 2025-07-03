import { useState } from 'react';
import { Clock, Users, Target, Lightbulb, CheckCircle, AlertCircle, Star, TrendingUp, Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PresentationGuide = () => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setCompletedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const presentationStructure = [
    {
      id: 'intro',
      title: 'Introduction',
      duration: '3 min',
      icon: <Lightbulb className="h-4 w-4" />,
      keyPoints: [
        'Statistique choc : 12 millions de personnes handicapées en France',
        'Question d\'accroche : "Connaissez-vous une personne handicapée ?"',
        'Problématique : Les défis du shopping pour les personnes handicapées'
      ],
      speakerNotes: 'Commencez par une histoire personnelle ou un témoignage pour créer un lien émotionnel avec l\'audience.'
    },
    {
      id: 'target',
      title: 'Public cible et besoins',
      duration: '4 min',
      icon: <Users className="h-4 w-4" />,
      keyPoints: [
        'Personas concrets : Marie (65 ans, diabétique), Jean (malvoyant), Lucas (autiste)',
        'Besoins spécifiques pour chaque groupe',
        'Marché inexploité de 60 milliards d\'euros'
      ],
      speakerNotes: 'Utilisez des histoires réelles. Rendez les besoins tangibles avec des scénarios concrets.'
    },
    {
      id: 'demo',
      title: 'Démonstration',
      duration: '15 min',
      icon: <Target className="h-4 w-4" />,
      keyPoints: [
        'Navigation et recherche (3 min)',
        'Fiche produit et recommandations (3 min)',
        'Bouclier sensoriel en action (4 min)',
        'Carte handicap numérique (2 min)',
        'Localisation 3D (3 min)'
      ],
      speakerNotes: 'Démonstration LIVE recommandée. Préparez des scénarios de fallback si la démo plante.'
    },
    {
      id: 'advantages',
      title: 'Avantages concurrentiels',
      duration: '3 min',
      icon: <Star className="h-4 w-4" />,
      keyPoints: [
        'Première mondiale avec bouclier sensoriel',
        'Technologie inclusive unique',
        'Partenariats stratégiques (MDPH, grandes surfaces)'
      ],
      speakerNotes: 'Insistez sur l\'innovation du bouclier sensoriel - c\'est votre différenciateur clé !'
    },
    {
      id: 'technical',
      title: 'Aspects techniques',
      duration: '2 min',
      icon: <CheckCircle className="h-4 w-4" />,
      keyPoints: [
        'PWA multi-plateforme',
        'Conformité WCAG 2.1',
        'IA pour recommandations personnalisées'
      ],
      speakerNotes: 'Restez concis sur la technique. Focus sur les bénéfices utilisateurs.'
    },
    {
      id: 'impact',
      title: 'Impact social et marché',
      duration: '2 min',
      icon: <TrendingUp className="h-4 w-4" />,
      keyPoints: [
        'Marché de 60Md€ en France',
        '85% des personnes handicapées ont besoin d\'aide aux courses',
        'Expansion européenne prévue'
      ],
      speakerNotes: 'Montrez la taille du marché et l\'impact social positif.'
    },
    {
      id: 'conclusion',
      title: 'Conclusion et perspectives',
      duration: '1 min',
      icon: <Rocket className="h-4 w-4" />,
      keyPoints: [
        'Roadmap : IA avancée, réalité augmentée',
        'Appel à l\'action : tests utilisateurs, feedback',
        'Message final : "Pour tous, par tous"'
      ],
      speakerNotes: 'Terminez par un appel à l\'action fort. Engagez votre audience !'
    }
  ];

  const tips = [
    {
      category: 'Storytelling',
      tips: [
        'Commencez par un témoignage utilisateur touchant',
        'Utilisez des personas concrets et nommés',
        'Racontez des scénarios d\'usage réels',
        'Créez un lien émotionnel avec l\'audience'
      ]
    },
    {
      category: 'Support visuel',
      tips: [
        'Screenshots de l\'app en live',
        'Démonstration temps réel sur mobile',
        'Vidéos courtes des fonctionnalités',
        'Slides avec peu de texte, beaucoup de visuels'
      ]
    },
    {
      category: 'Interaction',
      tips: [
        'Posez des questions à l\'audience',
        'Faites tester le bouclier sensoriel',
        'Quiz rapide sur l\'accessibilité',
        'Collectez les retours en temps réel'
      ]
    },
    {
      category: 'Messages clés',
      tips: [
        '"Pour tous, par tous" - Inclusivité totale',
        '"Autonomie retrouvée" - Indépendance',
        '"Innovation sociale" - Impact positif',
        '"Première mondiale" - Bouclier sensoriel'
      ]
    }
  ];

  const troubleshooting = [
    {
      problem: 'Demo qui plante',
      solutions: [
        'Préparez des screenshots de sauvegarde',
        'Ayez une vidéo de démo prête',
        'Testez votre connexion internet avant',
        'Préparez un second device'
      ]
    },
    {
      problem: 'Questions difficiles',
      solutions: [
        'Préparez les FAQ communes',
        'Ayez des statistiques précises',
        'Reconnaissez si vous ne savez pas',
        'Proposez un suivi après la présentation'
      ]
    },
    {
      problem: 'Temps qui manque',
      solutions: [
        'Priorisez le bouclier sensoriel',
        'Réduisez la partie technique',
        'Focalisez sur 2-3 personas max',
        'Gardez la démo pour la fin'
      ]
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold">Guide de Présentation</h1>
        <p className="text-muted-foreground">
          Tout ce qu'il faut savoir pour réussir votre présentation de 30 minutes
        </p>
      </div>

      <Tabs defaultValue="structure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="tips">Conseils</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="troubleshooting">Dépannage</TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Structure de présentation (30 min)</h2>
              <Badge variant="outline">
                {completedSections.length}/{presentationStructure.length} complétés
              </Badge>
            </div>

            {presentationStructure.map((section) => (
              <Card key={section.id} className={`transition-all ${
                completedSections.includes(section.id) ? 'bg-success/5 border-success' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {section.duration}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant={completedSections.includes(section.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                    >
                      {completedSections.includes(section.id) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        'Marquer fait'
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Points clés :</h4>
                      <ul className="space-y-1">
                        {section.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-warning/10 p-3 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Notes pour l'orateur :
                      </h4>
                      <p className="text-sm text-muted-foreground">{section.speakerNotes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-success">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>🎯 Phrases d'accroche recommandées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Ouverture :</h4>
                  <ul className="text-sm space-y-1">
                    <li>"Imaginez ne pas pouvoir lire une étiquette..."</li>
                    <li>"12 millions de personnes handicapées en France..."</li>
                    <li>"Et si faire ses courses était un défi quotidien ?"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fermeture :</h4>
                  <ul className="text-sm space-y-1">
                    <li>"Ensemble, construisons un monde plus accessible"</li>
                    <li>"L'accessibilité n'est pas une option, c'est un droit"</li>
                    <li>"Votre feedback peut changer des vies"</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📋 Avant la présentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Tester la connexion internet',
                    'Charger tous les appareils',
                    'Préparer les slides de secours',
                    'Tester l\'app sur mobile',
                    'Préparer les personas en détail',
                    'Répéter la démo 3 fois minimum',
                    'Préparer les réponses aux FAQ',
                    'Avoir les statistiques à jour'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎤 Pendant la présentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Regarder l\'audience, pas l\'écran',
                    'Faire des pauses pour les questions',
                    'Utiliser des gestes pour illustrer',
                    'Adapter le rythme selon l\'audience',
                    'Montrer de l\'enthousiasme',
                    'Interagir avec le public',
                    'Noter les questions importantes',
                    'Conclure par un appel à l\'action'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>📱 Matériel nécessaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Equipement :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Ordinateur portable</li>
                    <li>• Smartphone chargé</li>
                    <li>• Tablette (backup)</li>
                    <li>• Câbles HDMI/USB-C</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Fichiers :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Slides de présentation</li>
                    <li>• Vidéos de démo</li>
                    <li>• Screenshots de backup</li>
                    <li>• Statistiques récentes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Accessoires :</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Pointeur laser</li>
                    <li>• Cartes de visite</li>
                    <li>• Flyers informatifs</li>
                    <li>• Formulaires de contact</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">🚨 Guide de dépannage</h2>
            
            {troubleshooting.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-destructive">
                    Problème : {item.problem}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Solutions :</h4>
                  <ul className="space-y-1">
                    {item.solutions.map((solution, sIndex) => (
                      <li key={sIndex} className="text-sm flex items-start gap-2">
                        <span className="text-success">✓</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>💡 Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Q: Comment vous différenciez-vous des autres apps ?</h4>
                    <p className="text-sm text-muted-foreground">R: Le bouclier sensoriel est une première mondiale. Nous sommes les seuls à nous concentrer spécifiquement sur l'alimentation pour les personnes handicapées.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Q: Quel est votre modèle économique ?</h4>
                    <p className="text-sm text-muted-foreground">R: Freemium avec partenariats magasins, commissions sur les ventes, abonnements premium pour fonctionnalités avancées.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold">Q: Comment garantissez-vous l'accessibilité ?</h4>
                    <p className="text-sm text-muted-foreground">R: Tests avec des utilisateurs réels, conformité WCAG 2.1, partenariats avec associations de personnes handicapées.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PresentationGuide;