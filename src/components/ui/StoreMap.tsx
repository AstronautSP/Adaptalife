import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StoreMapProps {
  storeId?: string;
  productId?: string;
  className?: string;
  userLocation?: {x: number, y: number} | null;
}

const CATEGORIES = [
  { id: 'produce', name: 'Fruits & Légumes', color: 'bg-green-500' },
  { id: 'dairy', name: 'Produits Laitiers', color: 'bg-blue-200' },
  { id: 'meat', name: 'Viande & Poisson', color: 'bg-red-400' },
  { id: 'bakery', name: 'Boulangerie', color: 'bg-yellow-600' },
  { id: 'frozen', name: 'Surgelés', color: 'bg-cyan-400' },
  { id: 'beverages', name: 'Boissons', color: 'bg-indigo-400' },
  { id: 'health', name: 'Santé & Beauté', color: 'bg-pink-400' },
  { id: 'household', name: 'Maison', color: 'bg-gray-400' },
];

const StoreMap = ({ storeId, productId, className, userLocation }: StoreMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>(CATEGORIES.map(c => c.id));
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(productId || null);
  
  const storeSections = [
    { id: 'entrance', x: 50, y: 380, width: 70, height: 40, type: 'entrance', label: 'Entrée' },
    { id: 'checkout', x: 400, y: 380, width: 120, height: 40, type: 'checkout', label: 'Caisses' },
    
    { id: 'produce', x: 80, y: 80, width: 120, height: 100, type: 'produce', label: 'Fruits & Légumes' },
    { id: 'bakery', x: 80, y: 200, width: 120, height: 70, type: 'bakery', label: 'Boulangerie' },
    { id: 'meat', x: 220, y: 80, width: 100, height: 70, type: 'meat', label: 'Boucherie' },
    { id: 'fish', x: 220, y: 170, width: 100, height: 70, type: 'meat', label: 'Poissonnerie' },
    { id: 'dairy', x: 340, y: 80, width: 120, height: 100, type: 'dairy', label: 'Produits Laitiers' },
    { id: 'frozen', x: 340, y: 200, width: 120, height: 70, type: 'frozen', label: 'Surgelés' },
    
    { id: 'beverages', x: 80, y: 290, width: 120, height: 70, type: 'beverages', label: 'Boissons' },
    { id: 'health', x: 220, y: 260, width: 100, height: 100, type: 'health', label: 'Santé & Beauté' },
    { id: 'household', x: 340, y: 290, width: 120, height: 70, type: 'household', label: 'Maison' },
  ];

  const productLocation = { x: 370, y: 120, section: 'dairy' };

  const getSectionColor = (type: string) => {
    const category = CATEGORIES.find(c => c.id === type);
    return category ? category.color.replace('bg-', '') : 'gray-300';
  };

  const getCategoryById = (id: string) => {
    return CATEGORIES.find(c => c.id === id);
  };

  const toggleCategory = (categoryId: string) => {
    if (activeCategories.includes(categoryId)) {
      setActiveCategories(activeCategories.filter(id => id !== categoryId));
    } else {
      setActiveCategories([...activeCategories, categoryId]);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.scale(zoom, zoom);
    
    storeSections.forEach(section => {
      if (!['entrance', 'checkout'].includes(section.type) && !activeCategories.includes(section.type)) {
        return;
      }
      
      const isHighlighted = highlightedProduct && section.id === productLocation.section;
      
      if (['entrance', 'checkout'].includes(section.type)) {
        ctx.fillStyle = '#e5e7eb';
      } else {
        const colorName = getSectionColor(section.type);
        ctx.fillStyle = isHighlighted ? `#${colorName}` : `#${colorName}80`;
      }
      
      ctx.strokeStyle = isHighlighted ? '#000' : '#64748b';
      ctx.lineWidth = isHighlighted ? 2 : 1;
      
      const radius = 10;
      ctx.beginPath();
      ctx.moveTo(section.x + radius, section.y);
      ctx.lineTo(section.x + section.width - radius, section.y);
      ctx.arcTo(section.x + section.width, section.y, section.x + section.width, section.y + radius, radius);
      ctx.lineTo(section.x + section.width, section.y + section.height - radius);
      ctx.arcTo(section.x + section.width, section.y + section.height, section.x + section.width - radius, section.y + section.height, radius);
      ctx.lineTo(section.x + radius, section.y + section.height);
      ctx.arcTo(section.x, section.y + section.height, section.x, section.y + section.height - radius, radius);
      ctx.lineTo(section.x, section.y + radius);
      ctx.arcTo(section.x, section.y, section.x + radius, section.y, radius);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(section.label, section.x + section.width / 2, section.y + section.height / 2);
    });
    
    if (highlightedProduct && activeCategories.includes(productLocation.section)) {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(productLocation.x, productLocation.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(productLocation.x, productLocation.y, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Votre produit', productLocation.x, productLocation.y - 20);
    }
    
    if (userLocation) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(userLocation.x, userLocation.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(userLocation.x, userLocation.y, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Vous êtes ici', userLocation.x, userLocation.y - 20);
    }
    
    ctx.restore();
  }, [zoom, activeCategories, highlightedProduct, userLocation]);

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.2, 0.6));
  };

  return (
    <div className={cn("relative border rounded-lg bg-white overflow-hidden", className)}>
      <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Map className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">Plan du magasin</h3>
        </div>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.6}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom arrière</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={handleZoomIn}
                  disabled={zoom >= 2}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom avant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filtrer les rayons</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div 
        className={cn(
          "relative overflow-auto bg-slate-50 p-4",
          "transition-[height] duration-300 ease-in-out",
          showFilters ? "h-[280px]" : "h-[360px]"
        )}
      >
        <canvas 
          ref={canvasRef} 
          width="500" 
          height="450"
          className="mx-auto"
        />
      </div>
      
      <div 
        className={cn(
          "border-t p-3 overflow-hidden transition-all duration-300 ease-in-out",
          showFilters ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 p-0 border-t-0"
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">Filtrer par rayon</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setActiveCategories(CATEGORIES.map(c => c.id))}
            className="h-8 text-xs"
          >
            Tout afficher
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => {
            const isActive = activeCategories.includes(category.id);
            return (
              <Badge
                key={category.id}
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all",
                  isActive && category.color
                )}
                onClick={() => toggleCategory(category.id)}
              >
                {category.name}
                {!isActive && <X className="h-3 w-3 ml-1" />}
              </Badge>
            );
          })}
        </div>
      </div>
      
      <div className="border-t p-3 bg-muted/20">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">Votre produit</span>
          </div>
          {userLocation && (
            <div className="flex items-center space-x-2">
              <div className="flex h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Votre position</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
