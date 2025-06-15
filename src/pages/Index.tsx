import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/ui/SearchBar";
import CategoryPicker from "@/components/ui/CategoryPicker";
import ProductCard from "@/components/ui/ProductCard";
import DiscountCoupons from "@/components/ui/DiscountCoupons";
import { products } from "@/data/products";
import { ShoppingCart, Heart, MapPin, Accessibility } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Afficher seulement les 6 premiers produits sur la page d'accueil
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground font-brand">
                Adaptalife
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Votre assistant alimentaire adaptatif pour une alimentation saine et personnalisée
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/products">
                  <Button size="lg" className="text-lg px-8 py-6">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Découvrir les produits
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    <MapPin className="mr-2 h-5 w-5" />
                    Trouver un magasin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar />
          </div>
        </section>

        {/* Discount Coupons Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DiscountCoupons />
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Produits populaires</h2>
              <p className="text-muted-foreground">Découvrez nos produits les plus appréciés</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/products">
                <Button variant="outline" size="lg">
                  Voir tous les produits
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Pourquoi choisir Adaptalife ?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Personnalisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Des recommandations adaptées à vos besoins nutritionnels et contraintes alimentaires
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Accessibility className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Accessible</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Interface adaptée aux personnes en situation de handicap avec assistance vocale
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Pratique</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Trouvez facilement vos produits et les magasins près de chez vous
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
