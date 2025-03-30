
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, HeartPulse, Store, Map, Filter, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import AllergensFilter from '@/components/ui/AllergensFilter';
import HealthConditionFilter from '@/components/ui/HealthConditionFilter';
import StorePicker from '@/components/ui/StorePicker';
import ProductCard from '@/components/ui/ProductCard';
import CategoryPicker from '@/components/ui/CategoryPicker';
import { products, productCategories } from '@/data/products';

const Index = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter products based on selected category, allergens, health conditions, and search query
    let filtered = products;
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    if (selectedAllergens.length > 0) {
      filtered = filtered.filter(product => 
        !product.allergens.some(allergen => selectedAllergens.includes(allergen.toLowerCase()))
      );
    }
    
    if (selectedHealthConditions.length > 0) {
      filtered = filtered.filter(product => 
        product.isHealthyFor?.some(condition => 
          selectedHealthConditions.includes(condition.toLowerCase())
        )
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [activeCategory, selectedAllergens, selectedHealthConditions, searchQuery]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section - Modernisé */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 overflow-hidden">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Simplifiez vos courses quotidiennes
                </div>
                
                <h1 className="hero-title">
                  Des choix alimentaires <span className="gradient-text">adaptés à vos besoins</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Trouvez des produits adaptés à vos conditions de santé, allergies et préférences alimentaires, puis localisez-les facilement dans votre supermarché.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="w-full sm:w-auto button-hover-effect">
                    Explorer les produits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Comment ça marche
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="relative z-0 rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="HandiView application" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-accent/5 rounded-full filter blur-3xl" />
        </section>
        
        {/* Product Search Section - Amélioré avec CategoryPicker */}
        <section className="py-16 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="section-title mb-6">Explorez nos produits</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre large gamme de produits alimentaires et d'hygiène adaptés à vos besoins spécifiques.
              </p>
            </div>
            
            {/* Filtre amélioré */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <SearchBar placeholder="Rechercher par nom, marque, ou ingrédient..." onSearch={handleSearch} />
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
            
            {/* Catégories et Produits */}
            <div className="mb-6">
              <CategoryPicker 
                activeCategory={activeCategory} 
                onChange={setActiveCategory}
                className="mb-8"
              />
            </div>
            
            {/* Produits */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {activeCategory === 'all' 
                    ? 'Tous les produits' 
                    : productCategories.find(cat => cat.id === activeCategory)?.name || 'Produits'} 
                  ({filteredProducts.length})
                </h3>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedAllergens([]);
                    setSelectedHealthConditions([]);
                    setSearchQuery('');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
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
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProducts.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-xl">
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucun produit ne correspond à votre recherche.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedAllergens([]);
                      setSelectedHealthConditions([]);
                      setSearchQuery('');
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
              
              {filteredProducts.length > 8 && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    Voir plus de produits ({filteredProducts.length - 8})
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section - Modernisé */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title mb-6">Fonctionnalités principales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                VitaForce vous accompagne à chaque étape de vos courses pour une expérience simplifiée et adaptée à vos besoins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="feature-card">
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
              
              <Card className="feature-card">
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
              
              <Card className="feature-card">
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
        
        {/* CTA Section - Modernisé */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre expérience de courses ?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/80">
              Rejoignez des milliers d'utilisateurs qui profitent déjà d'une expérience de shopping adaptée à leurs besoins spécifiques.
            </p>
            
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 button-hover-effect">
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
