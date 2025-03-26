
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  initialState?: boolean;
}

const FavoriteButton = ({
  productId,
  className,
  size = 'md',
  initialState = false
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(initialState);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate loading favorite state from storage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(productId));
    }
  }, [productId]);

  const toggleFavorite = () => {
    setIsAnimating(true);
    
    // Update state
    setIsFavorite(!isFavorite);
    
    // Simulate saving to storage
    const storedFavorites = localStorage.getItem('favorites');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (!isFavorite) {
      favorites.push(productId);
      toast.success('Produit ajouté aux favoris');
    } else {
      favorites = favorites.filter((id: string) => id !== productId);
      toast.info('Produit retiré des favoris');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={cn(
        'relative rounded-full bg-background/80 backdrop-blur border shadow-sm',
        'transition-all duration-300 hover:scale-105 active:scale-95',
        sizeClasses[size],
        className
      )}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart
        className={cn(
          iconSizes[size],
          'transition-all duration-300',
          isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground',
          isAnimating && 'scale-125'
        )}
      />
      
      {/* Animation overlay */}
      {isAnimating && (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heart
            className={cn(
              iconSizes[size],
              'absolute text-red-500 fill-red-500 animate-scale-out opacity-0'
            )}
          />
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
