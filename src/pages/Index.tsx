
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShoppingCart, HeartPulse, Store, Map, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import AllergensFilter from '@/components/ui/AllergensFilter';
import HealthConditionFilter from '@/components/ui/HealthConditionFilter';
import StorePicker from '@/components/ui/StorePicker';
import ProductCard from '@/components/ui/ProductCard';

const Index = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Yaourt nature Bio',
      brand: 'Activia',
      image: 'https://images.unsplash.com/photo-1562114608-fae413499105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      price: 2.49,
      nutritionScore: 'A' as const,
      allergens: ['Lait'],
      healthTags: ['Bio', 'Riche en protéines', 'Faible en sucre'],
      isHealthyFor: ['Diabète type 2', 'Régime hypocalorique'],
      notRecommendedFor: ['Intolérance au lactose']
    },
    {
      id: '2',
      name: 'Pain de mie complet sans gluten',
      brand: 'Schär',
      image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      price: 3.95,
      nutritionScore: 'B' as const,
      allergens: [],
      healthTags: ['Sans gluten', 'Source de fibres'],
      isHealthyFor: ['Maladie cœliaque', 'Sensibilité au gluten'],
      notRecommendedFor: []
    },
    {
      id: '3',
      name: 'Filet de poulet fermier',
      brand: 'Loué',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      price: 6.75,
      nutritionScore: 'A' as const,
      allergens: [],
      healthTags: ['Riche en protéines', 'Faible en gras'],
      isHealthyFor: ['Diabète type 1', 'Diabète type 2', 'Régime protéiné'],
      notRecommendedFor: []
    },
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 overflow-hidden">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Une nouvelle façon de faire ses courses
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Des choix alimentaires <span className="text-primary">adaptés à vos besoins</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Découvrez des produits adaptés à vos conditions de santé et allergies, et localisez-les facilement dans votre supermarché.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explorer les produits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Comment ça marche
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="HandiView application" 
                  className="relative z-0 rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl" />
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                HandiView vous accompagne à chaque étape de vos courses pour une expérience simplifiée et adaptée à vos besoins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Filtrage par condition de santé</CardTitle>
                  <CardDescription>
                    Trouvez des produits adaptés au diabète, aux maladies cardiaques, et à d'autres conditions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    to="/products" 
                    className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                  >
                    Découvrir
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Compatible avec de nombreux magasins</CardTitle>
                  <CardDescription>
                    Fonctionne dans plusieurs enseignes comme Leclerc, Intermarché, Super U, Aldi, Lidl, et plus.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    to="/stores" 
                    className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                  >
                    Voir les magasins
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Map className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Plan 3D des magasins</CardTitle>
                  <CardDescription>
                    Localisez facilement les produits dans le magasin grâce à notre cartographie détaillée.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    to="/map" 
                    className="text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium"
                  >
                    Explorer la carte
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Product Search Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trouvez les produits adaptés à vos besoins</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Utilisez nos filtres pour découvrir des produits compatibles avec vos conditions de santé et préférences alimentaires.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <SearchBar placeholder="Rechercher par nom, marque, ou catégorie..." />
                </div>
                <div className="md:col-span-1">
                  <AllergensFilter 
                    onChange={setSelectedAllergens}
                  />
                </div>
                <div className="md:col-span-1">
                  <HealthConditionFilter 
                    onChange={setSelectedHealthConditions}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <StorePicker />
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Produits recommandés</h3>
                  <Button variant="outline" size="sm">
                    Voir tous les produits
                  </Button>
                </div>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="animate-pulse">
                        <div className="aspect-square bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-4">
                          <div className="h-4 bg-gray-200 rounded mb-2" />
                          <div className="h-6 bg-gray-200 rounded mb-2" />
                          <div className="h-4 bg-gray-200 rounded mb-4 w-1/3" />
                          <div className="h-10 bg-gray-200 rounded" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Suivez ces étapes simples pour une expérience de courses adaptée à vos besoins de santé.
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2 hidden md:block" />
              
              {/* Steps */}
              <div className="space-y-12 relative">
                {/* Step 1 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right">
                    <div className="bg-primary/10 text-primary inline-flex rounded-full w-8 h-8 items-center justify-center mb-4 font-bold">1</div>
                    <h3 className="text-xl font-bold mb-2">Définissez vos besoins de santé</h3>
                    <p className="text-muted-foreground">
                      Configurez votre profil avec vos conditions médicales et allergies pour des recommandations personnalisées.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 relative">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary hidden md:flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Profile setup" 
                      className="rounded-lg shadow-md w-full object-cover h-48 md:h-auto"
                    />
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:order-2">
                    <div className="bg-primary/10 text-primary inline-flex rounded-full w-8 h-8 items-center justify-center mb-4 font-bold">2</div>
                    <h3 className="text-xl font-bold mb-2">Choisissez votre magasin</h3>
                    <p className="text-muted-foreground">
                      Sélectionnez le supermarché que vous comptez visiter parmi nos nombreux partenaires.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 relative md:order-1">
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary hidden md:flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1561150169-371f366288f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Store selection" 
                      className="rounded-lg shadow-md w-full object-cover h-48 md:h-auto"
                    />
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right">
                    <div className="bg-primary/10 text-primary inline-flex rounded-full w-8 h-8 items-center justify-center mb-4 font-bold">3</div>
                    <h3 className="text-xl font-bold mb-2">Trouvez des produits adaptés</h3>
                    <p className="text-muted-foreground">
                      Parcourez notre catalogue filtré selon vos besoins avec des informations nutritionnelles détaillées.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 relative">
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary hidden md:flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Product search" 
                      className="rounded-lg shadow-md w-full object-cover h-48 md:h-auto"
                    />
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:order-2">
                    <div className="bg-primary/10 text-primary inline-flex rounded-full w-8 h-8 items-center justify-center mb-4 font-bold">4</div>
                    <h3 className="text-xl font-bold mb-2">Localisez-les dans le magasin</h3>
                    <p className="text-muted-foreground">
                      Utilisez notre carte 3D interactive pour trouver facilement vos produits dans les rayons.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 relative md:order-1">
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary hidden md:flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Store map" 
                      className="rounded-lg shadow-md w-full object-cover h-48 md:h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-16 bg-blue-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez comment HandiView transforme l'expérience des courses pour les personnes aux besoins spécifiques.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 mb-4"></div>
                    <h4 className="font-bold">Marie L.</h4>
                    <p className="text-sm text-muted-foreground">Diabétique type 1</p>
                  </div>
                  <p className="text-center italic text-muted-foreground">
                    "Cette application a révolutionné ma façon de faire les courses. Je trouve facilement des produits adaptés à mon diabète et je gagne beaucoup de temps."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 mb-4"></div>
                    <h4 className="font-bold">Thomas D.</h4>
                    <p className="text-sm text-muted-foreground">Parent d'enfant allergique</p>
                  </div>
                  <p className="text-center italic text-muted-foreground">
                    "Les filtres d'allergènes sont incroyablement précis. Je peux enfin faire les courses pour mon fils sans passer des heures à lire les étiquettes."
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 mb-4"></div>
                    <h4 className="font-bold">Sophie M.</h4>
                    <p className="text-sm text-muted-foreground">Utilisatrice de fauteuil roulant</p>
                  </div>
                  <p className="text-center italic text-muted-foreground">
                    "Le plan 3D du magasin m'aide énormément pour organiser mon parcours et éviter les zones difficiles d'accès. Une vraie libération !"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre expérience de courses ?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Rejoignez des milliers d'utilisateurs qui profitent déjà d'une expérience de shopping adaptée à leurs besoins spécifiques.
            </p>
            
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
