import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import homepageMockup from "@/assets/screenshots/homepage-mockup.jpg";
import productsMockup from "@/assets/screenshots/products-page-mockup.jpg";
import mapMockup from "@/assets/screenshots/map-page-mockup.jpg";
import accessibilityMockup from "@/assets/screenshots/accessibility-features-mockup.jpg";
import productDetailMockup from "@/assets/screenshots/product-detail-mockup.jpg";

const Screenshots = () => {
  const screenshots = [
    {
      title: "Page d'accueil",
      description: "Vue principale de l'application AdaptaLife",
      image: homepageMockup,
      alt: "Capture d'écran de la page d'accueil AdaptaLife"
    },
    {
      title: "Page des produits",
      description: "Catalogue avec filtres d'allergènes et conditions de santé",
      image: productsMockup,
      alt: "Capture d'écran de la page des produits avec filtres"
    },
    {
      title: "Carte des magasins",
      description: "Localisation des magasins partenaires",
      image: mapMockup,
      alt: "Capture d'écran de la carte des magasins"
    },
    {
      title: "Fonctionnalités d'accessibilité",
      description: "Outils d'aide pour personnes en situation de handicap",
      image: accessibilityMockup,
      alt: "Capture d'écran des fonctionnalités d'accessibilité"
    },
    {
      title: "Détail produit",
      description: "Informations détaillées sur un produit",
      image: productDetailMockup,
      alt: "Capture d'écran du détail d'un produit"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Captures d'écran AdaptaLife</h1>
        <p className="text-muted-foreground">
          Voici les captures d'écran de votre application pour votre projet professionnel.
          Cliquez droit sur les images pour les enregistrer.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((screenshot, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{screenshot.title}</CardTitle>
              <CardDescription>{screenshot.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <img 
                src={screenshot.image} 
                alt={screenshot.alt}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Screenshots;