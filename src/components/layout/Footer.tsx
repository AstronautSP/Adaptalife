
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">VitaForce</h3>
            <p className="text-sm text-muted-foreground">
              Améliorer l'expérience alimentaire des personnes en situation de handicap 
              avec des informations nutritionnelles détaillées et une navigation simplifiée.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Paramètres
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Favoris
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Pour toute question ou suggestion, n'hésitez pas à nous contacter.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
            >
              Nous contacter
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VitaForce. Tous droits réservés.
          </p>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <span className="text-sm text-muted-foreground inline-flex items-center">
              Conçu avec <Heart className="h-4 w-4 mx-1 text-red-500" /> pour l'accessibilité
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
