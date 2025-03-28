import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, HeartPulse, Store, Map, Filter, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import AllergensFilter from '@/components/ui/AllergensFilter';
import HealthConditionFilter from '@/components/ui/HealthConditionFilter';
import StorePicker from '@/components/ui/StorePicker';
import ProductCard from '@/components/ui/ProductCard';
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
        
        {/* Product Search Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tous nos produits</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explorez notre large gamme de produits alimentaires et d'hygiène adaptés à vos besoins spécifiques.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <SearchBar placeholder="Rechercher par nom, marque, ou catégorie..." onSearch={handleSearch} />
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
                <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium flex items-center mb-2">
                      <Filter className="h-4 w-4 mr-2" />
                      Catégories
                    </h3>
                    <div className="space-y-1">
                      <Button 
                        variant={activeCategory === 'all' ? "default" : "ghost"} 
                        className="w-full justify-start" 
                        onClick={() => setActiveCategory('all')}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Tous les produits ({products.length})
                      </Button>
                      {productCategories.map(category => (
                        <Button 
                          key={category.id}
                          variant={activeCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start" 
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.name} ({products.filter(p => p.category === category.id).length})
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <StorePicker />
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">
                    {activeCategory === 'all' 
                      ? 'Tous les produits' 
                      : productCategories.find(cat => cat.id === activeCategory)?.name || 'Produits'} 
                    ({filteredProducts.length})
                  </h3>
                </div>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      Aucun produit ne correspond à votre recherche.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
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
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section - Keep this section to explain app features */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                HandiView vous accompagne à chaque étape de vos courses pour une expérience simplifiée et adaptée à vos besoins.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
