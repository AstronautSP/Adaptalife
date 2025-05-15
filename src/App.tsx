
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ShieldAlert } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Index from "./pages/Index";
import ProductView from "./pages/ProductView";
import Settings from "./pages/Settings";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import MapView from "./pages/MapView";
import SensoryShield from "./components/ui/SensoryShield";

const queryClient = new QueryClient();

const App = () => {
  const [sensoryShieldOpen, setSensoryShieldOpen] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Bouton flottant pour le bouclier sensoriel - toujours accessible */}
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg border-2 hover:border-primary"
            onClick={() => setSensoryShieldOpen(true)}
            title="Bouclier sensoriel pour personnes autistes"
          >
            <ShieldAlert className="h-6 w-6" />
          </Button>
          
          <Dialog open={sensoryShieldOpen} onOpenChange={setSensoryShieldOpen}>
            <DialogContent className="max-w-md">
              <SensoryShield />
            </DialogContent>
          </Dialog>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:productId" element={<ProductView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/map" element={<MapView />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
