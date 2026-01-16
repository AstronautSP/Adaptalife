import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Download, Smartphone, Check, Share, MoreVertical, PlusSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect device
    const userAgent = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
            <img 
              src="/adaptalife-logo.svg" 
              alt="Adaptalife" 
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Installer Adaptalife
          </h1>
          <p className="text-muted-foreground">
            Installez l'application sur votre téléphone pour un accès rapide
          </p>
        </div>

        {isInstalled ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-green-700">
                <Check className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Application installée !</p>
                  <p className="text-sm text-green-600">
                    Adaptalife est maintenant sur votre écran d'accueil
                  </p>
                </div>
              </div>
              <Link to="/">
                <Button className="w-full mt-4">
                  Retour à l'accueil
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Android - Chrome install button */}
            {deferredPrompt && (
              <Card className="mb-6 border-primary">
                <CardContent className="pt-6">
                  <Button 
                    onClick={handleInstallClick}
                    className="w-full h-14 text-lg gap-3"
                    size="lg"
                  >
                    <Download className="h-6 w-6" />
                    Installer l'application
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* iOS Instructions */}
            {isIOS && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Instructions pour iPhone/iPad
                  </CardTitle>
                  <CardDescription>
                    Safari ne propose pas l'installation automatique
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Appuyez sur le bouton Partager</p>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <Share className="h-5 w-5" />
                        <span className="text-sm">en bas de Safari</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Sélectionnez "Sur l'écran d'accueil"</p>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <PlusSquare className="h-5 w-5" />
                        <span className="text-sm">dans le menu qui s'affiche</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Appuyez sur "Ajouter"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        L'icône Adaptalife apparaîtra sur votre écran d'accueil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Android Instructions (fallback if no prompt) */}
            {isAndroid && !deferredPrompt && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Instructions pour Android
                  </CardTitle>
                  <CardDescription>
                    Installez depuis le menu du navigateur
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Ouvrez le menu du navigateur</p>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <MoreVertical className="h-5 w-5" />
                        <span className="text-sm">les trois points en haut à droite</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Sélectionnez "Installer l'application"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ou "Ajouter à l'écran d'accueil"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Confirmez l'installation</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        L'icône Adaptalife apparaîtra sur votre écran d'accueil
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Avantages de l'installation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Accès rapide depuis l'écran d'accueil</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Fonctionne hors connexion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Chargement plus rapide</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Expérience plein écran</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Navigation vocale disponible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Install;
