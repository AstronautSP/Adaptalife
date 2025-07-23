import React, { useRef, useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  SlidersHorizontal,
  X,
  View,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import TemporalControls from './TemporalControls';
import { TemporalDataService, TemporalStoreData } from '@/services/temporalDataService';

interface StoreMap3DProps {
  storeId?: string;
  productId?: string;
  className?: string;
  userLocation?: {x: number, y: number} | null;
}

const CATEGORIES = [
  { id: 'produce', name: 'Fruits & Légumes', color: '#10b981' },
  { id: 'dairy', name: 'Produits Laitiers', color: '#3b82f6' },
  { id: 'meat', name: 'Viande & Poisson', color: '#ef4444' },
  { id: 'bakery', name: 'Boulangerie', color: '#f59e0b' },
  { id: 'frozen', name: 'Surgelés', color: '#06b6d4' },
  { id: 'beverages', name: 'Boissons', color: '#8b5cf6' },
  { id: 'health', name: 'Santé & Beauté', color: '#ec4899' },
  { id: 'household', name: 'Maison', color: '#6b7280' },
];

const StoreMap3D = ({ storeId, productId, className, userLocation }: StoreMap3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [showFilters, setShowFilters] = useState(false);
  const [show4DControls, setShow4DControls] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>(CATEGORIES.map(c => c.id));
  const [is3DView, setIs3DView] = useState(true);
  
  // 4D Temporal controls
  const [currentTime, setCurrentTime] = useState(14); // 14h par défaut
  const [isPlaying, setIsPlaying] = useState(false);
  const [temporalData, setTemporalData] = useState<TemporalStoreData>(
    TemporalDataService.generateTemporalData(14)
  );
  
  // 3D scene variables
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState({ x: -0.5, y: 0 });

  const storeSections = [
    { id: 'entrance', x: 2, z: 19, width: 3, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
    { id: 'checkout', x: 16, z: 19, width: 6, height: 1, depth: 2, type: 'checkout', label: 'Caisses', color: '#e5e7eb' },
    
    { id: 'produce', x: 3, z: 4, width: 6, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
    { id: 'bakery', x: 3, z: 10, width: 6, height: 2, depth: 3.5, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
    { id: 'meat', x: 11, z: 4, width: 5, height: 2, depth: 3.5, type: 'meat', label: 'Boucherie', color: '#ef4444' },
    { id: 'fish', x: 11, z: 8.5, width: 5, height: 2, depth: 3.5, type: 'meat', label: 'Poissonnerie', color: '#ef4444' },
    { id: 'dairy', x: 17, z: 4, width: 6, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
    { id: 'frozen', x: 17, z: 10, width: 6, height: 2, depth: 3.5, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
    
    { id: 'beverages', x: 3, z: 14.5, width: 6, height: 2, depth: 3.5, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
    { id: 'health', x: 11, z: 13, width: 5, height: 2, depth: 5, type: 'health', label: 'Santé & Beauté', color: '#ec4899' },
    { id: 'household', x: 17, z: 14.5, width: 6, height: 2, depth: 3.5, type: 'household', label: 'Maison', color: '#6b7280' },
  ];

  // 4D temporal effects
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.25;
          return newTime > 22 ? 8 : newTime;
        });
      }, 1000); // Avance de 15 minutes chaque seconde
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    const newTemporalData = TemporalDataService.generateTemporalData(currentTime);
    setTemporalData(newTemporalData);
  }, [currentTime]);

  const initializeThreeJS = () => {
    if (!canvasRef.current || typeof window === 'undefined') return;

    // Import Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      const THREE = (window as Record<string, any>).THREE;
      
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf8fafc);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
      camera.position.set(12, 15, 25);
      camera.lookAt(12, 0, 12);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true });
      renderer.setSize(800, 600);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(20, 20, 20);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      // Floor
      const floorGeometry = new THREE.PlaneGeometry(30, 25);
      const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      // Create store sections with 4D crowd visualization
      storeSections.forEach(section => {
        if (!['entrance', 'checkout'].includes(section.type) && !activeCategories.includes(section.type)) {
          return;
        }

        // Get crowd intensity for this section
        const crowdIntensity = temporalData.sectionCrowds[section.type] || 0;
        const heightMultiplier = 1 + (crowdIntensity / 100) * 0.5; // Hauteur varie avec affluence
        const opacity = 0.6 + (crowdIntensity / 100) * 0.4; // Opacité varie avec affluence

        const geometry = new THREE.BoxGeometry(section.width, section.height * heightMultiplier, section.depth);
        const material = new THREE.MeshLambertMaterial({ 
          color: section.color,
          transparent: true,
          opacity: opacity
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(section.x, (section.height * heightMultiplier) / 2, section.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        scene.add(mesh);

        // Add crowd visualization spheres
        if (crowdIntensity > 30) {
          const numPeople = Math.floor(crowdIntensity / 20);
          for (let i = 0; i < numPeople; i++) {
            const personGeometry = new THREE.SphereGeometry(0.2, 8, 8);
            const personMaterial = new THREE.MeshLambertMaterial({ 
              color: crowdIntensity > 70 ? 0xff4444 : crowdIntensity > 50 ? 0xffaa00 : 0x44ff44
            });
            const person = new THREE.Mesh(personGeometry, personMaterial);
            
            person.position.set(
              section.x + (Math.random() - 0.5) * section.width * 0.8,
              0.5,
              section.z + (Math.random() - 0.5) * section.depth * 0.8
            );
            
            scene.add(person);
          }
        }
      });

      // Add user location marker if available
      if (userLocation) {
        const markerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const markerMaterial = new THREE.MeshLambertMaterial({ color: 0x3b82f6 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(userLocation.x / 20, 2, userLocation.y / 20);
        scene.add(marker);
      }

      // Start animation loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    };
    
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (is3DView) {
      initializeThreeJS();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [is3DView, activeCategories, userLocation, temporalData]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !cameraRef.current) return;

    const deltaX = e.movementX * 0.01;
    const deltaY = e.movementY * 0.01;

    setRotation(prev => ({
      x: Math.max(-Math.PI/2, Math.min(0, prev.x + deltaY)),
      y: prev.y + deltaX
    }));

    const camera = cameraRef.current;
    const radius = 25;
    camera.position.x = 12 + radius * Math.cos(rotation.y) * Math.cos(rotation.x);
    camera.position.y = 15 + radius * Math.sin(rotation.x);
    camera.position.z = 12 + radius * Math.sin(rotation.y) * Math.cos(rotation.x);
    camera.lookAt(12, 0, 12);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const resetCamera = () => {
    if (!cameraRef.current) return;
    
    setRotation({ x: -0.5, y: 0 });
    const camera = cameraRef.current;
    camera.position.set(12, 15, 25);
    camera.lookAt(12, 0, 12);
  };

  const toggleCategory = (categoryId: string) => {
    if (activeCategories.includes(categoryId)) {
      setActiveCategories(activeCategories.filter(id => id !== categoryId));
    } else {
      setActiveCategories([...activeCategories, categoryId]);
    }
  };

  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(14);
    setIsPlaying(false);
  };

  return (
    <div className={cn("relative border rounded-lg bg-white overflow-hidden", className)}>
      <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Map className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">Plan du magasin {is3DView ? '4D' : '2D'}</h3>
        </div>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShow4DControls(!show4DControls)}
                >
                  <Clock className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contrôles temporels 4D</p>
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
                  onClick={() => setIs3DView(!is3DView)}
                >
                  <View className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Basculer vue {is3DView ? '2D' : '3D'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {is3DView && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    onClick={resetCamera}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Réinitialiser la vue</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
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

      {show4DControls && (
        <div className="border-b p-3">
          <TemporalControls 
            currentTime={currentTime}
            onTimeChange={handleTimeChange}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            crowdData={temporalData.crowdData}
          />
        </div>
      )}
      
      <div 
        className={cn(
          "relative overflow-hidden bg-slate-50 p-4",
          "transition-[height] duration-300 ease-in-out",
          showFilters ? "h-[280px]" : "h-[360px]"
        )}
      >
        {is3DView ? (
          <canvas 
            ref={canvasRef}
            width={800}
            height={600}
            className="mx-auto cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Vue 2D (à implémenter si nécessaire)</p>
          </div>
        )}
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
                  isActive && "border-current"
                )}
                style={isActive ? { backgroundColor: category.color, borderColor: category.color } : {}}
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
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-muted-foreground">Affluence faible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-muted-foreground">Affluence modérée</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-muted-foreground">Affluence élevée</span>
          </div>
          {is3DView && (
            <div className="text-xs text-muted-foreground pt-1">
              Cliquez et faites glisser pour faire tourner la vue. Utilisez les contrôles temporels pour voir l'évolution dans le temps.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreMap3D;
