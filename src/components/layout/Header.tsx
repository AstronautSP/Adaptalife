
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  ShoppingCart, 
  Heart, 
  Settings,
  Home,
  HelpCircle,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SearchBar from '@/components/ui/SearchBar';
import { useToast } from '@/components/ui/use-toast';
import AdaptalifeLog from '@/components/ui/AdaptalifeLog';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Produits', path: '/products', icon: <ShoppingCart className="h-4 w-4" /> },
    { name: 'Plan', path: '/map', icon: <Map className="h-4 w-4" /> },
    { name: 'Favoris', path: '/favorites', icon: <Heart className="h-4 w-4" /> },
    { name: 'Paramètres', path: '/settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  const handleHelpRequest = () => {
    toast({
      title: "Assistance activée",
      description: "Un assistant va vous aider pour vos courses. Veuillez patienter.",
      duration: 5000,
    });
    // Ici on pourrait implémenter une logique plus avancée d'assistance
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 py-3",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <AdaptalifeLog size="md" showText={true} className="hidden sm:flex" />
          <AdaptalifeLog size="sm" showText={false} className="sm:hidden" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-full flex items-center space-x-1 transition-all",
                isActive(link.path)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Bouton d'assistance */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleHelpRequest}
            className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
            aria-label="Demander de l'aide pour mes courses"
            title="Demander de l'aide pour mes courses"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-full"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center space-x-1 rounded-full"
          >
            <User className="h-4 w-4" />
            <span>Compte</span>
          </Button>
        </div>
      </div>

      {/* Search Bar (expandable) */}
      <div
        className={cn(
          "absolute left-0 right-0 px-4 sm:px-6 transition-all duration-300 ease-in-out overflow-hidden",
          isSearchOpen ? "max-h-24 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="max-w-3xl mx-auto">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 transition-all duration-300 ease-in-out transform md:hidden pt-16",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg flex items-center space-x-3 transition-all",
                isActive(link.path)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <User className="h-4 w-4 mr-2" />
              <span>Mon compte</span>
            </Button>
            
            {/* Bouton d'assistance version mobile */}
            <Button
              variant="outline"
              className="w-full justify-start mt-2 bg-primary/10 text-primary hover:bg-primary/20"
              onClick={handleHelpRequest}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              <span>Demander de l'aide</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
