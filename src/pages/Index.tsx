
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section - Modern design with curved edges */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 overflow-hidden rounded-b-[3rem]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Simplifiez vos courses quotidiennes
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Des choix alimentaires <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">adaptés à vos besoins</span>
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Trouvez des produits adaptés à vos conditions de santé, allergies et préférences alimentaires, puis localisez-les facilement dans votre supermarché.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="w-full sm:w-auto rounded-full shadow-lg transform transition-transform hover:translate-y-[-2px]">
                    Explorer les produits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full">
                    Comment ça marche
                  </Button>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="relative z-0 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="HandiView application" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-accent/20 filter blur-xl"></div>
                <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-primary/20 filter blur-xl"></div>
              </div>
            </div>
          </div>
          
          {/* Wave decoration at bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
              <path fill="#ffffff" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Product Search Section - With floating cards */}
        <section className="py-16 -mt-10">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-6">Explorez nos produits</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre large gamme de produits alimentaires et d'hygiène adaptés à vos besoins spécifiques.
              </p>
            </div>
            
            {/* Floating filter card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 transform -translate-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <SearchBar 
                    placeholder="Rechercher par nom, marque, ou ingrédient..." 
                    onChange={handleSearch} 
                  />
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
            
            {/* Categories */}
            <div className="mb-8">
              <CategoryPicker 
                activeCategory={activeCategory} 
                onChange={setActiveCategory}
                className="mb-8"
              />
            </div>
            
            {/* Products */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  {activeCategory === 'all' 
                    ? 'Tous les produits' 
                    : productCategories.find(cat => cat.id === activeCategory)?.name || 'Produits'} 
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({filteredProducts.length})</span>
                </h3>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedAllergens([]);
                    setSelectedHealthConditions([]);
                    setSearchQuery('');
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Réinitialiser les filtres
                </Button>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <Card key={i} className="animate-pulse border-0 shadow-md hover:shadow-lg transition-all duration-300">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-2xl border border-muted/30">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-30" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucun produit ne correspond à votre recherche.
                  </p>
                  <Button 
                    variant="outline"
                    className="rounded-full"
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
                <div className="text-center mt-10">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Voir plus de produits 
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs ml-2">
                      {filteredProducts.length - 8}
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Features Section - Card-based */}
        <section className="py-16 bg-gradient-to-b from-white to-primary/5 rounded-t-[3rem]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Fonctionnalités principales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                VitaForce vous accompagne à chaque étape de vos courses pour une expérience simplifiée et adaptée à vos besoins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section - With gradient background */}
        <section className="py-16 bg-gradient-to-br from-primary to-accent rounded-b-[3rem] text-white">
          <div className="container max-w-6xl mx-auto px-4 text-center relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white opacity-10 rounded-full filter blur-xl"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre expérience de courses ?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-white/80">
                Rejoignez des milliers d'utilisateurs qui profitent déjà d'une expérience de shopping adaptée à leurs besoins spécifiques.
              </p>
              
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-full shadow-lg transform transition-transform hover:translate-y-[-2px]">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
