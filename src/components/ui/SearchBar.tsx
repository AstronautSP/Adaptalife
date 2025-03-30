
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onClose?: () => void;
  placeholder?: string;
  className?: string;
  onChange?: (query: string) => void;
}

const SearchBar = ({
  onClose,
  placeholder = "Rechercher un produit, une catégorie, ou un magasin...",
  className,
  onChange
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submit logic here
    console.log('Search submitted:', query);
  };

  // Call onChange prop when query changes
  useEffect(() => {
    if (onChange) {
      onChange(query);
    }
  }, [query, onChange]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative group",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center bg-background/80 backdrop-blur border rounded-full overflow-hidden transition-all duration-300",
          isFocused ? "ring-2 ring-primary/30" : "hover:bg-muted/80"
        )}
      >
        <div className="pl-4">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 py-2 px-3 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
        />
        
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 mx-1 text-muted-foreground hover:text-foreground focus:outline-none rounded-full hover:bg-muted"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-background rounded-lg shadow-lg border animate-fade-in z-10">
          <div className="text-xs text-muted-foreground mb-2">Suggestions</div>
          <div className="space-y-1">
            {/* Example suggestions - would be dynamic based on query */}
            <div className="px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
              Produits sans gluten
            </div>
            <div className="px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
              Aliments pour diabétiques
            </div>
            <div className="px-3 py-2 rounded-md hover:bg-muted cursor-pointer">
              Leclerc à proximité
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
