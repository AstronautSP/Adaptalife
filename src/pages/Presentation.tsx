import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Target, Lightbulb, TrendingUp, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  duration: string;
  icon: React.ReactNode;
}

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Introduction - Handiview Nutrition Helper",
      duration: "3 min",
      icon: <Rocket className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Handiview Nutrition Helper
            </h1>
            <p className="text-xl text-muted-foreground">
              Rendre l'alimentation accessible à tous
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-destructive mb-2">Problématique</h3>
              <p className="text-sm">Les défis du shopping pour les personnes en situation de handicap</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-primary mb-2">Mission</h3>
              <p className="text-sm">Rendre l'alimentation accessible à tous</p>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="font-semibold text-success mb-2">Vision</h3>
              <p className="text-sm">Une application inclusive qui révolutionne l'expérience d'achat</p>
            </Card>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Points clés à retenir :</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>12 millions</strong> de personnes handicapées en France</li>
              <li>• <strong>60% des handicaps</strong> sont invisibles</li>
              <li>• <strong>Première app</strong> dédiée à l'alimentation accessible</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Public cible et besoins",
      duration: "4 min",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Nos utilisateurs</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-3">👁️ Personnes malvoyantes</h3>
              <ul className="text-sm space-y-1">
                <li>• Lecture d'étiquettes par synthèse vocale</li>
                <li>• Navigation assistée en magasin</li>
                <li>• Descriptions audio des produits</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-3">♿ Mobilité réduite</h3>
              <ul className="text-sm space-y-1">
                <li>• Localisation précise des produits</li>
                <li>• Plans 3D accessibles</li>
                <li>• Assistance pour l'aide aux courses</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-3">👴 Personnes âgées</h3>
              <ul className="text-sm space-y-1">
                <li>• Interface simplifiée</li>
                <li>• Texte agrandi</li>
                <li>• Mode senior dédié</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold text-primary mb-3">🧩 Personnes autistes</h3>
              <ul className="text-sm space-y-1">
                <li>• Bouclier sensoriel unique</li>
                <li>• Réduction des stimuli</li>
                <li>• Environnement apaisé</li>
              </ul>
            </Card>
          </div>

          <Card className="p-4 bg-warning/10">
            <h3 className="font-semibold mb-2">💊 Conditions médicales</h3>
            <div className="flex flex-wrap gap-2">
              {['Diabète', 'Allergies', 'Hypertension', 'Cholestérol', 'Maladie cœliaque'].map(condition => (
                <Badge key={condition} variant="outline">{condition}</Badge>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 3,
      title: "Démonstration - Navigation et recherche",
      duration: "3 min",
      icon: <Play className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Fonctionnalités principales</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">🔍 Recherche intelligente</h3>
              <div className="space-y-3">
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm"><strong>Par nom :</strong> "Yaourt grec"</p>
                </div>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm"><strong>Par marque :</strong> "Danone bio"</p>
                </div>
                <div className="bg-muted/30 p-3 rounded">
                  <p className="text-sm"><strong>Par catégorie :</strong> "Produits laitiers"</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">🎯 Filtres avancés</h3>
              <div className="space-y-3">
                <div className="bg-success/10 p-3 rounded">
                  <p className="text-sm"><strong>Sans allergènes :</strong> Gluten, lactose, noix</p>
                </div>
                <div className="bg-primary/10 p-3 rounded">
                  <p className="text-sm"><strong>Pour diabétiques :</strong> Index glycémique bas</p>
                </div>
                <div className="bg-warning/10 p-3 rounded">
                  <p className="text-sm"><strong>Score nutritionnel :</strong> A et B uniquement</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">📊 Scores nutritionnels visuels</h3>
            <div className="flex gap-2 items-center">
              <Badge className="bg-success text-white">A</Badge>
              <Badge className="bg-lime-500 text-white">B</Badge>
              <Badge className="bg-warning text-white">C</Badge>
              <Badge className="bg-orange-500 text-white">D</Badge>
              <Badge className="bg-destructive text-white">E</Badge>
              <span className="text-sm ml-4">Classification immédiate</span>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 4,
      title: "Fonctionnalités d'accessibilité",
      duration: "4 min",
      icon: <Target className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Innovation : Bouclier Sensoriel</h2>
          
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                🛡️
              </div>
              <div>
                <h3 className="text-xl font-semibold">Bouclier Sensoriel</h3>
                <p className="text-sm text-muted-foreground">Première mondiale pour les personnes autistes</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Réductions appliquées :</h4>
                <ul className="text-sm space-y-1">
                  <li>• Luminosité : -40%</li>
                  <li>• Contraste : -30%</li>
                  <li>• Animations : Désactivées</li>
                  <li>• Sons : Volume réduit</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Préréglages :</h4>
                <div className="space-y-2">
                  <Badge variant="outline">Sensibilité légère</Badge>
                  <Badge variant="outline">Sensibilité modérée</Badge>
                  <Badge variant="outline">Sensibilité forte</Badge>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">🎨 Mode contraste</h3>
              <p className="text-sm">Contrastes renforcés pour les malvoyants</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">📖 Texte agrandi</h3>
              <p className="text-sm">Tailles de police adaptables</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold mb-2">🔊 Synthèse vocale</h3>
              <p className="text-sm">Lecture automatique du contenu</p>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Avantages concurrentiels",
      duration: "3 min",
      icon: <TrendingUp className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Ce qui nous rend uniques</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-primary">
              <h3 className="text-lg font-semibold text-primary mb-3">🥇 Première mondiale</h3>
              <p className="text-sm">Première application dédiée aux personnes handicapées pour l'alimentation avec bouclier sensoriel</p>
            </Card>
            
            <Card className="p-6 border-success">
              <h3 className="text-lg font-semibold text-success mb-3">🎯 Personnalisation poussée</h3>
              <p className="text-sm">Recommandations intelligentes selon le profil médical et les préférences</p>
            </Card>
            
            <Card className="p-6 border-warning">
              <h3 className="text-lg font-semibold text-warning mb-3">📱 Technologie inclusive</h3>
              <p className="text-sm">PWA compatible tous supports, fonctionne hors ligne, respecte WCAG 2.1</p>
            </Card>
            
            <Card className="p-6 border-destructive">
              <h3 className="text-lg font-semibold text-destructive mb-3">🤝 Partenariats solides</h3>
              <p className="text-sm">Collaborations avec MDPH, associations, grandes surfaces</p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-primary/10 to-success/10">
            <h3 className="text-lg font-semibold mb-4">📊 Marché et impact</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12M</div>
                <p className="text-sm">Personnes handicapées en France</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">60Md€</div>
                <p className="text-sm">Marché alimentaire accessible</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">85%</div>
                <p className="text-sm">Besoin d'assistance aux courses</p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 6,
      title: "Conclusion et perspectives",
      duration: "1 min",
      icon: <Lightbulb className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">L'avenir de l'accessibilité</h2>
          
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              "Pour tous, par tous"
            </h3>
            <p className="text-lg text-muted-foreground">Notre devise pour une société inclusive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <h4 className="font-semibold text-primary mb-2">🌍 Expansion</h4>
              <p className="text-sm">Extension européenne d'ici 2025</p>
            </Card>
            <Card className="p-4 text-center">
              <h4 className="font-semibold text-success mb-2">🤖 IA avancée</h4>
              <p className="text-sm">Assistant personnel intelligent</p>
            </Card>
            <Card className="p-4 text-center">
              <h4 className="font-semibold text-warning mb-2">🥽 Réalité augmentée</h4>
              <p className="text-sm">Navigation immersive en magasin</p>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary to-primary/60 text-white">
            <h3 className="text-xl font-semibold mb-4 text-center">Appel à l'action</h3>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div>
                <h4 className="font-semibold mb-2">🧪 Tests utilisateurs</h4>
                <p className="text-sm opacity-90">Rejoignez notre programme bêta</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💬 Feedback</h4>
                <p className="text-sm opacity-90">Votre avis compte pour nous améliorer</p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <p className="text-lg font-semibold">
              Ensemble, construisons un monde plus accessible ! 🌟
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Présentation Handiview</h1>
            <p className="text-muted-foreground">
              Slide {currentSlide + 1} sur {slides.length} • {slides[currentSlide].duration}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {slides[currentSlide].icon}
            <span className="font-medium">{slides[currentSlide].title}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Slide Content */}
        <Card className="min-h-[500px] mb-6">
          <CardContent className="p-8">
            {slides[currentSlide].content}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          <Button 
            variant="outline" 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Speaker Notes */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">💡 Notes pour l'orateur :</h3>
            <div className="text-sm text-muted-foreground">
              {currentSlide === 0 && "Accrochez l'audience avec des statistiques choc. Posez la question : 'Connaissez-vous une personne handicapée ?'"}
              {currentSlide === 1 && "Utilisez des personas concrets : 'Marie, 65 ans, diabétique' - Rendez les besoins tangibles"}
              {currentSlide === 2 && "Démo live recommandée - Montrez la recherche en action sur votre téléphone"}
              {currentSlide === 3 && "Point fort : Montrez le bouclier sensoriel en action. C'est votre différenciateur clé !"}
              {currentSlide === 4 && "Insistez sur le marché inexploité et les partenariats stratégiques"}
              {currentSlide === 5 && "Terminez par un appel à l'action fort - Engagez votre audience !"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Presentation;