import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
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

const StoreMap3DOptimized = ({ storeId, productId, className, userLocation }: StoreMap3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const [threeLoaded, setThreeLoaded] = useState(false);
  
  const [showFilters, setShowFilters] = useState(false);
  const [show4DControls, setShow4DControls] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>(CATEGORIES.map(c => c.id));
  const [is3DView, setIs3DView] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [rotation, setRotation] = useState({ x: -0.5, y: 0 });
  
  // 4D Temporal controls optimisés
  const [currentTime, setCurrentTime] = useState(14);
  const [isPlaying, setIsPlaying] = useState(false);
  const [temporalData, setTemporalData] = useState<TemporalStoreData>(
    TemporalDataService.generateTemporalData(14)
  );

  // Layouts spécifiques pour chaque magasin avec superficies réalistes
  const storeSections = useMemo(() => {
    // Leclerc Courbevoie - Grand hypermarché de 3500m² avec galerie marchande
    if (storeId === 'leclerc-courbevoie') {
      return [
        { id: 'entrance', x: 2, z: 28, width: 8, height: 1, depth: 3, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'services', x: 12, z: 28, width: 6, height: 1, depth: 3, type: 'services', label: 'Accueil', color: '#94a3b8' },
        { id: 'checkout1', x: 4, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 1-3', color: '#94a3b8' },
        { id: 'checkout2', x: 7, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 4-6', color: '#94a3b8' },
        { id: 'checkout3', x: 10, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 7-9', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 18, width: 10, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 14, z: 18, width: 8, height: 2, depth: 5, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 2, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 9, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 16, z: 12, width: 8, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 26, z: 6, width: 3, height: 2, depth: 12, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 6, width: 10, height: 2, depth: 5, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }
    
    // Intermarché Paris 14ème - Supermarché compact de 800m² urbain
    if (storeId === 'intermarche-paris14') {
      return [
        { id: 'entrance', x: 2, z: 20, width: 4, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'checkout1', x: 14, z: 18, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 3, width: 6, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 2, z: 9, width: 6, height: 2, depth: 4, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 9, z: 3, width: 5, height: 2, depth: 4, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 9, z: 8, width: 5, height: 2, depth: 3, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 15, z: 3, width: 6, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 15, z: 9, width: 6, height: 2, depth: 4, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 14, width: 7, height: 2, depth: 3, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }

    // Super U Lyon Part-Dieu - Supermarché moyen de 1500m²
    if (storeId === 'super-u-lyon') {
      return [
        { id: 'entrance', x: 2, z: 22, width: 5, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'checkout1', x: 16, z: 20, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 1-4', color: '#94a3b8' },
        { id: 'checkout2', x: 19, z: 20, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses Auto', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 4, width: 7, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 2, z: 10, width: 7, height: 2, depth: 4, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 10, z: 4, width: 5, height: 2, depth: 4, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 10, z: 9, width: 5, height: 2, depth: 4, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 16, z: 4, width: 6, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 16, z: 10, width: 6, height: 2, depth: 5, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 15, width: 8, height: 2, depth: 3, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }

    // Leclerc Marseille Saint-Loup - Grand hypermarché de 4000m²
    if (storeId === 'leclerc-marseille') {
      return [
        { id: 'entrance', x: 2, z: 28, width: 8, height: 1, depth: 3, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'checkout1', x: 4, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 1-3', color: '#94a3b8' },
        { id: 'checkout2', x: 7, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 4-6', color: '#94a3b8' },
        { id: 'checkout3', x: 10, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 7-10', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 18, width: 12, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 16, z: 18, width: 8, height: 2, depth: 5, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 2, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 9, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 16, z: 12, width: 9, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 27, z: 6, width: 3, height: 2, depth: 12, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 6, width: 11, height: 2, depth: 5, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }

    // Intermarché Bordeaux Lac - Supermarché de taille moyenne 1200m²
    if (storeId === 'intermarche-bordeaux') {
      return [
        { id: 'entrance', x: 2, z: 21, width: 4, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'checkout1', x: 15, z: 19, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 4, width: 6, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 2, z: 10, width: 6, height: 2, depth: 4, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 9, z: 4, width: 5, height: 2, depth: 4, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 9, z: 9, width: 5, height: 2, depth: 3, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 15, z: 4, width: 6, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 15, z: 10, width: 6, height: 2, depth: 4, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 15, width: 8, height: 2, depth: 3, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }

    // Super U Lille Fives - Supermarché urbain de 1000m²
    if (storeId === 'super-u-lille') {
      return [
        { id: 'entrance', x: 2, z: 20, width: 5, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
        { id: 'checkout1', x: 14, z: 18, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 3, width: 7, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
        { id: 'bakery', x: 2, z: 9, width: 7, height: 2, depth: 4, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
        { id: 'butchery', x: 10, z: 3, width: 5, height: 2, depth: 4, type: 'meat', label: 'Boucherie', color: '#ef4444' },
        { id: 'fishmonger', x: 10, z: 8, width: 5, height: 2, depth: 4, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 16, z: 3, width: 6, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 16, z: 9, width: 6, height: 2, depth: 4, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 14, width: 8, height: 2, depth: 3, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }

    // Leclerc Saint-Médard-en-Jalles - Grand hypermarché de 3800m²
    if (storeId === 'leclerc-saint-medard') {
      return [
        { id: 'entrance', x: 2, z: 28, width: 8, height: 1, depth: 3, type: 'entrance', label: 'Entrée Principale', color: '#e5e7eb' },
        { id: 'services', x: 12, z: 28, width: 6, height: 1, depth: 3, type: 'services', label: 'Accueil & Services', color: '#94a3b8' },
        { id: 'checkout1', x: 4, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 1-3', color: '#94a3b8' },
        { id: 'checkout2', x: 7, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 4-6', color: '#94a3b8' },
        { id: 'checkout3', x: 10, z: 24, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses 7-9', color: '#94a3b8' },
        { id: 'produce', x: 2, z: 18, width: 12, height: 2, depth: 5, type: 'produce', label: 'Fruits & Légumes Bio', color: '#10b981' },
        { id: 'bakery', x: 16, z: 18, width: 8, height: 2, depth: 5, type: 'bakery', label: 'Boulangerie Pâtisserie', color: '#f59e0b' },
        { id: 'butchery', x: 2, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Boucherie Traditionnelle', color: '#ef4444' },
        { id: 'fishmonger', x: 9, z: 12, width: 6, height: 2, depth: 5, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
        { id: 'dairy', x: 16, z: 12, width: 9, height: 2, depth: 5, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
        { id: 'frozen', x: 27, z: 6, width: 3, height: 2, depth: 12, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
        { id: 'beverages', x: 2, z: 6, width: 11, height: 2, depth: 5, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
      ];
    }
    
    // Layout par défaut pour magasins non configurés
    return [
      { id: 'entrance', x: 2, z: 19, width: 4, height: 1, depth: 2, type: 'entrance', label: 'Entrée', color: '#e5e7eb' },
      { id: 'checkout1', x: 14, z: 18, width: 2, height: 1, depth: 1.5, type: 'checkout', label: 'Caisses', color: '#94a3b8' },
      { id: 'produce', x: 3, z: 3, width: 8, height: 2, depth: 6, type: 'produce', label: 'Fruits & Légumes', color: '#10b981' },
      { id: 'bakery', x: 3, z: 10, width: 8, height: 2, depth: 4, type: 'bakery', label: 'Boulangerie', color: '#f59e0b' },
      { id: 'meat', x: 13, z: 3, width: 5, height: 2, depth: 4, type: 'meat', label: 'Boucherie', color: '#ef4444' },
      { id: 'fish', x: 13, z: 8, width: 5, height: 2, depth: 4, type: 'meat', label: 'Poissonnerie', color: '#0ea5e9' },
      { id: 'dairy', x: 20, z: 3, width: 6, height: 2, depth: 6, type: 'dairy', label: 'Produits Laitiers', color: '#3b82f6' },
      { id: 'frozen', x: 20, z: 10, width: 6, height: 2, depth: 4, type: 'frozen', label: 'Surgelés', color: '#06b6d4' },
      { id: 'beverages', x: 3, z: 15, width: 8, height: 2, depth: 3, type: 'beverages', label: 'Boissons', color: '#8b5cf6' },
    ];
  }, [storeId]);

  // Animation temporelle optimisée
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 0.5; // Accélération plus fluide
          return newTime > 22 ? 8 : newTime;
        });
      }, 800); // Plus fluide
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    const newTemporalData = TemporalDataService.generateTemporalData(currentTime);
    setTemporalData(newTemporalData);
  }, [currentTime]);

  // Chargement sécurisé de Three.js
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Vérifier si Three.js est déjà chargé
    if ((window as Record<string, any>).THREE) {
      setThreeLoaded(true);
      return;
    }

    // Vérifier s'il y a déjà un script en cours de chargement
    const existingScript = document.querySelector('script[src*="three.min.js"]');
    if (existingScript) {
      const handleLoad = () => {
        if ((window as Record<string, any>).THREE) {
          setThreeLoaded(true);
        }
        existingScript.removeEventListener('load', handleLoad);
      };
      existingScript.addEventListener('load', handleLoad);
      return;
    }

    // Charger Three.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    const handleLoad = () => {
      if ((window as Record<string, any>).THREE) {
        setThreeLoaded(true);
      }
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
    
    const handleError = () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, []);

  const initializeThreeJS = useCallback(() => {
    if (!canvasRef.current || !threeLoaded || !(window as Record<string, any>).THREE) return;

    const THREE = (window as Record<string, any>).THREE;
    
    // Nettoyage de la scène précédente
    if (sceneRef.current && rendererRef.current) {
      // Nettoyer tous les objets de la scène
      while(sceneRef.current.children.length > 0) {
        sceneRef.current.remove(sceneRef.current.children[0]);
      }
      meshesRef.current = [];
    }
    
    try {
      // Configuration de la scène optimisée
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf8fafc);
      sceneRef.current = scene;

      // Caméra avec FOV optimisé selon la superficie du magasin
      const camera = new THREE.PerspectiveCamera(60, 800 / 600, 0.1, 1000);
      
      // Configuration caméra selon le magasin
      if (storeId === 'leclerc-saint-medard' || storeId === 'leclerc-marseille' || storeId === 'leclerc-courbevoie') {
        // Grands hypermarchés (3500-4000m²) - vue plus large
        camera.position.set(18, 25, 35);
        camera.lookAt(18, 0, 15);
      } else if (storeId === 'super-u-lyon' || storeId === 'intermarche-bordeaux' || storeId === 'super-u-lille') {
        // Supermarchés moyens (1000-1500m²) - vue standard
        camera.position.set(15, 20, 28);
        camera.lookAt(13, 0, 11);
      } else if (storeId === 'intermarche-paris14') {
        // Supermarché compact urbain (800m²) - vue rapprochée
        camera.position.set(12, 18, 25);
        camera.lookAt(11, 0, 10);
      } else {
        // Vue par défaut
        camera.position.set(15, 20, 30);
        camera.lookAt(15, 0, 12);
      }
      cameraRef.current = camera;

      // Renderer avec anti-aliasing optimisé
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current!, 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(800, 600);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0xf8fafc, 1);
      rendererRef.current = renderer;

      // Éclairage amélioré selon la taille du magasin
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
      
      // Position de l'éclairage selon le magasin
      if (storeId === 'leclerc-saint-medard' || storeId === 'leclerc-marseille' || storeId === 'leclerc-courbevoie') {
        directionalLight.position.set(35, 30, 35);
      } else if (storeId === 'super-u-lyon' || storeId === 'intermarche-bordeaux' || storeId === 'super-u-lille') {
        directionalLight.position.set(28, 25, 28);
      } else if (storeId === 'intermarche-paris14') {
        directionalLight.position.set(22, 22, 22);
      } else {
        directionalLight.position.set(25, 25, 25);
      }
      
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 100;
      scene.add(directionalLight);

      // Éclairage d'appoint pour plus de réalisme
      const spotLight = new THREE.SpotLight(0xffffff, 0.3);
      spotLight.position.set(18, 20, 18);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.1;
      scene.add(spotLight);

      // Sol avec texture adaptée à la superficie du magasin
      let floorGeometry;
      if (storeId === 'leclerc-saint-medard' || storeId === 'leclerc-marseille' || storeId === 'leclerc-courbevoie') {
        // Grands hypermarchés
        floorGeometry = new THREE.PlaneGeometry(40, 35);
      } else if (storeId === 'super-u-lyon' || storeId === 'intermarche-bordeaux' || storeId === 'super-u-lille') {
        // Supermarchés moyens
        floorGeometry = new THREE.PlaneGeometry(30, 26);
      } else if (storeId === 'intermarche-paris14') {
        // Supermarché compact
        floorGeometry = new THREE.PlaneGeometry(25, 22);
      } else {
        floorGeometry = new THREE.PlaneGeometry(35, 25);
      }
      
      const floorMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      // Murs du magasin adaptés à la superficie
      const wallHeight = 6;
      const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
      
      if (storeId === 'leclerc-saint-medard' || storeId === 'leclerc-marseille' || storeId === 'leclerc-courbevoie') {
        // Grands hypermarchés
        const backWallGeometry = new THREE.PlaneGeometry(40, wallHeight);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(20, wallHeight/2, 0);
        scene.add(backWall);
        
        const sideWallGeometry = new THREE.PlaneGeometry(35, wallHeight);
        const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        leftWall.position.set(0, wallHeight/2, 17.5);
        leftWall.rotation.y = Math.PI / 2;
        scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        rightWall.position.set(40, wallHeight/2, 17.5);
        rightWall.rotation.y = -Math.PI / 2;
        scene.add(rightWall);
      } else if (storeId === 'super-u-lyon' || storeId === 'intermarche-bordeaux' || storeId === 'super-u-lille') {
        // Supermarchés moyens
        const backWallGeometry = new THREE.PlaneGeometry(30, wallHeight);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(15, wallHeight/2, 0);
        scene.add(backWall);
        
        const sideWallGeometry = new THREE.PlaneGeometry(26, wallHeight);
        const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        leftWall.position.set(0, wallHeight/2, 13);
        leftWall.rotation.y = Math.PI / 2;
        scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        rightWall.position.set(30, wallHeight/2, 13);
        rightWall.rotation.y = -Math.PI / 2;
        scene.add(rightWall);
      } else if (storeId === 'intermarche-paris14') {
        // Supermarché compact
        const backWallGeometry = new THREE.PlaneGeometry(25, wallHeight);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(12.5, wallHeight/2, 0);
        scene.add(backWall);
        
        const sideWallGeometry = new THREE.PlaneGeometry(22, wallHeight);
        const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        leftWall.position.set(0, wallHeight/2, 11);
        leftWall.rotation.y = Math.PI / 2;
        scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        rightWall.position.set(25, wallHeight/2, 11);
        rightWall.rotation.y = -Math.PI / 2;
        scene.add(rightWall);
      } else {
        // Vue par défaut
        const backWallGeometry = new THREE.PlaneGeometry(35, wallHeight);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(17.5, wallHeight/2, 0);
        scene.add(backWall);
        
        const sideWallGeometry = new THREE.PlaneGeometry(25, wallHeight);
        const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        leftWall.position.set(0, wallHeight/2, 12.5);
        leftWall.rotation.y = Math.PI / 2;
        scene.add(leftWall);
        
        const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
        rightWall.position.set(35, wallHeight/2, 12.5);
        rightWall.rotation.y = -Math.PI / 2;
        scene.add(rightWall);
      }

      // Création des sections avec effets 4D
      storeSections.forEach(section => {
        if (!['entrance', 'checkout', 'aisle', 'services'].includes(section.type) && !activeCategories.includes(section.type)) {
          return;
        }

        const crowdIntensity = temporalData.sectionCrowds[section.type] || 0;
        const heightMultiplier = section.type === 'aisle' ? 1 : 1 + (crowdIntensity / 100) * 0.8;
        const opacity = section.type === 'aisle' ? 0.3 : 0.7 + (crowdIntensity / 100) * 0.3;

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
        meshesRef.current.push(mesh);

        // Visualisation des clients avec animation
        if (crowdIntensity > 20 && section.type !== 'aisle') {
          const numPeople = Math.floor(crowdIntensity / 15);
          for (let i = 0; i < numPeople; i++) {
            const personGeometry = new THREE.SphereGeometry(0.25, 8, 8);
            const crowdColor = crowdIntensity > 80 ? 0xff3333 : 
                             crowdIntensity > 60 ? 0xff8800 : 
                             crowdIntensity > 40 ? 0xffcc00 : 0x33ff33;
            
            const personMaterial = new THREE.MeshLambertMaterial({ 
              color: crowdColor,
              transparent: true,
              opacity: 0.8
            });
            const person = new THREE.Mesh(personGeometry, personMaterial);
            
            const randomX = section.x + (Math.random() - 0.5) * section.width * 0.7;
            const randomZ = section.z + (Math.random() - 0.5) * section.depth * 0.7;
            
            person.position.set(randomX, 0.5, randomZ);
            
            // Animation de mouvement subtile
            const time = Date.now() * 0.001;
            person.position.y = 0.5 + Math.sin(time + i) * 0.1;
            
            scene.add(person);
            meshesRef.current.push(person);
          }
        }
      });

      // Marqueur utilisateur avec animation
      if (userLocation) {
        const markerGeometry = new THREE.ConeGeometry(0.4, 1, 8);
        const markerMaterial = new THREE.MeshLambertMaterial({ color: 0x3b82f6 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(userLocation.x / 15, 1, userLocation.y / 15);
        
        // Animation de pulsation
        const pulseScale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
        marker.scale.set(pulseScale, 1, pulseScale);
        
        scene.add(marker);
        meshesRef.current.push(marker);
      }

      // Boucle d'animation optimisée
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        
        // Animation des éléments dynamiques
        meshesRef.current.forEach((mesh, index) => {
          if (mesh.geometry && mesh.geometry.type === 'SphereGeometry') {
            const time = Date.now() * 0.001;
            mesh.position.y = 0.5 + Math.sin(time + index) * 0.05;
          }
        });
        
        renderer.render(scene, camera);
      };
      animate();
    } catch (error) {
      // Error silently handled - Three.js initialization failed
    }
  }, [activeCategories, temporalData, userLocation, threeLoaded, storeId]);

  useEffect(() => {
    if (is3DView && threeLoaded) {
      initializeThreeJS();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [is3DView, initializeThreeJS]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMouseDown || !cameraRef.current) return;

    const deltaX = e.movementX * 0.005;
    const deltaY = e.movementY * 0.005;

    setRotation(prev => {
      const newRotation = {
        x: Math.max(-Math.PI/3, Math.min(0, prev.x + deltaY)),
        y: prev.y + deltaX
      };

      const camera = cameraRef.current;
      const radius = storeId === 'leclerc-saint-medard' ? 45 : 35;
      const centerX = storeId === 'leclerc-saint-medard' ? 18 : 15;
      const centerZ = storeId === 'leclerc-saint-medard' ? 15 : 12;
      
      const newX = centerX + radius * Math.cos(newRotation.y) * Math.cos(newRotation.x);
      const newY = 25 + radius * Math.sin(newRotation.x);
      const newZ = centerZ + radius * Math.sin(newRotation.y) * Math.cos(newRotation.x);
      
      camera.position.set(newX, newY, newZ);
      camera.lookAt(centerX, 0, centerZ);

      return newRotation;
    });
  }, [isMouseDown, storeId]);

  const resetCamera = useCallback(() => {
    if (!cameraRef.current) return;
    
    setRotation({ x: -0.5, y: 0 });
    const camera = cameraRef.current;
    
    if (storeId === 'leclerc-saint-medard') {
      camera.position.set(18, 25, 35);
      camera.lookAt(18, 0, 15);
    } else {
      camera.position.set(15, 20, 30);
      camera.lookAt(15, 0, 12);
    }
  }, [storeId]);

  const toggleCategory = useCallback((categoryId: string) => {
    setActiveCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  return (
    <div className={cn("relative border rounded-lg bg-card overflow-hidden shadow-lg", className)}>
      <div className="bg-muted/30 p-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Map className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">
            Plan du magasin {is3DView ? '4D Interactif' : '2D'}
            {storeId === 'leclerc-saint-medard' && (
              <span className="ml-2 text-sm text-muted-foreground">- Leclerc Saint-Médard-en-Jalles</span>
            )}
          </h3>
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
            onTimeChange={setCurrentTime}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={() => {
              setCurrentTime(14);
              setIsPlaying(false);
            }}
            crowdData={temporalData.crowdData}
          />
        </div>
      )}
      
      <div className={cn(
        "relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-300",
        showFilters ? "h-[320px]" : "h-[400px]"
      )}>
        {is3DView ? (
          threeLoaded ? (
            <canvas 
              ref={canvasRef}
              width={800}
              height={600}
              className="mx-auto cursor-move transition-opacity duration-300"
              onMouseDown={() => setIsMouseDown(true)}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setIsMouseDown(false)}
              onMouseLeave={() => setIsMouseDown(false)}
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Chargement de la vue 3D...</p>
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Vue 2D simplifiée (développement en cours)</p>
          </div>
        )}
      </div>
      
      {/* Filtres avec animation */}
      <div className={cn(
        "border-t overflow-hidden transition-all duration-300 ease-in-out",
        showFilters ? "max-h-[200px] opacity-100 p-3" : "max-h-0 opacity-0 p-0 border-t-0"
      )}>
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
                  "cursor-pointer transition-all duration-200 hover:scale-105",
                  isActive && "border-current shadow-md"
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
      
      {/* Légende améliorée */}
      <div className="border-t p-3 bg-gradient-to-r from-muted/10 to-muted/30">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-muted-foreground">Votre position</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Affluence faible (&lt;40%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-yellow-500"></div>
            <span className="text-muted-foreground">Affluence modérée (40-70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">Affluence élevée (&gt;70%)</span>
          </div>
        </div>
        {is3DView && (
          <div className="text-xs text-muted-foreground pt-2 border-t border-muted/20 mt-2">
            <strong>Navigation :</strong> Cliquez et faites glisser pour faire tourner la vue. 
            {storeId === 'leclerc-saint-medard' && (
              <span className="block mt-1">
                <strong>Leclerc Saint-Médard :</strong> Plan réaliste avec boulangerie, traiteur, et zones spécialisées.
              </span>
            )}
            Utilisez les contrôles temporels pour observer l'évolution de l'affluence en temps réel.
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreMap3DOptimized;
