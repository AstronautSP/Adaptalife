
import { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  Shield, 
  HeartPulse, 
  AlertTriangle, 
  Store, 
  Eye, 
  CheckSquare, 
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user settings
  const [settings, setSettings] = useState({
    profile: {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
    },
    health: {
      conditions: ['diabetes-2', 'heart-disease'],
      allergens: ['gluten', 'peanuts'],
      mobilityAssistance: true,
    },
    preferences: {
      fontSize: 'medium',
      highContrast: false,
      reduceMotion: false,
      autoReadLabels: true,
    },
    notifications: {
      productAlerts: true,
      storeProximity: true,
      nutritionUpdates: false,
      promotions: true,
    },
    stores: {
      preferredStore: 'leclerc-paris',
      saveHistory: true,
      displayMap: true,
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(settings);
  
  // Reset form when active tab changes
  useEffect(() => {
    setFormValues(settings);
    setIsEditing(false);
  }, [activeTab, settings]);
  
  const handleInputChange = (section: string, field: string, value: any) => {
    setFormValues({
      ...formValues,
      [section]: {
        ...formValues[section as keyof typeof formValues],
        [field]: value
      }
    });
  };
  
  const handleSaveSettings = () => {
    setSettings(formValues);
    setIsEditing(false);
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Personnalisez l'application selon vos besoins et préférences
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-muted/30 p-1 rounded-lg">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="profile" className="flex items-center justify-center gap-1">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center justify-center gap-1">
              <HeartPulse className="h-4 w-4" />
              <span className="hidden md:inline">Santé</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center justify-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Accessibilité</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="flex items-center justify-center gap-1">
              <Store className="h-4 w-4" />
              <span className="hidden md:inline">Magasins</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Information personnelles
              </CardTitle>
              <CardDescription>
                Gérez vos informations de base et vos préférences de compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    value={formValues.profile.name} 
                    onChange={e => handleInputChange('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formValues.profile.email} 
                    onChange={e => handleInputChange('profile', 'email', e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="mt-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Sécurité et confidentialité
              </CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité et vos données personnelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Mot de passe</h4>
                  <p className="text-sm text-muted-foreground">
                    Dernière modification il y a 3 mois
                  </p>
                </div>
                <Button variant="outline">Modifier</Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoriser le partage anonyme des données</Label>
                    <p className="text-sm text-muted-foreground">
                      Contribue à améliorer l'accessibilité des produits
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.profile.dataSharing}
                    onCheckedChange={checked => handleInputChange('profile', 'dataSharing', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Partage des préférences entre appareils</Label>
                    <p className="text-sm text-muted-foreground">
                      Synchroniser vos paramètres sur tous vos appareils
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.profile.syncPreferences}
                    onCheckedChange={checked => handleInputChange('profile', 'syncPreferences', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Health Settings */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeartPulse className="h-5 w-5 mr-2" />
                Conditions médicales
              </CardTitle>
              <CardDescription>
                Ces informations nous aident à vous recommander des produits adaptés à vos besoins de santé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Conditions de santé</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {[
                    { id: 'diabetes-1', label: 'Diabète type 1' },
                    { id: 'diabetes-2', label: 'Diabète type 2' },
                    { id: 'heart-disease', label: 'Maladie cardiaque' },
                    { id: 'hypoglycemia', label: 'Hypoglycémie' },
                    { id: 'hypertension', label: 'Hypertension' },
                    { id: 'cholesterol', label: 'Cholestérol élevé' },
                    { id: 'stroke', label: 'AVC (passé)' },
                  ].map(condition => (
                    <div 
                      key={condition.id} 
                      className={cn(
                        "flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors",
                        formValues.health.conditions?.includes(condition.id) 
                          ? "bg-primary/10 border-primary" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => {
                        const conditions = formValues.health.conditions || [];
                        const newConditions = conditions.includes(condition.id)
                          ? conditions.filter(id => id !== condition.id)
                          : [...conditions, condition.id];
                        handleInputChange('health', 'conditions', newConditions);
                      }}
                    >
                      <CheckSquare 
                        className={cn(
                          "h-5 w-5",
                          formValues.health.conditions?.includes(condition.id) 
                            ? "text-primary" 
                            : "text-muted-foreground"
                        )} 
                      />
                      <span>{condition.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label>Allergènes</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {[
                    { id: 'gluten', label: 'Gluten' },
                    { id: 'lactose', label: 'Lactose' },
                    { id: 'peanuts', label: 'Arachides' },
                    { id: 'nuts', label: 'Fruits à coque' },
                    { id: 'eggs', label: 'Œufs' },
                    { id: 'soy', label: 'Soja' },
                    { id: 'fish', label: 'Poisson' },
                    { id: 'shellfish', label: 'Crustacés' },
                  ].map(allergen => (
                    <div 
                      key={allergen.id} 
                      className={cn(
                        "flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors",
                        formValues.health.allergens?.includes(allergen.id) 
                          ? "bg-red-50 border-red-300 text-red-700" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => {
                        const allergens = formValues.health.allergens || [];
                        const newAllergens = allergens.includes(allergen.id)
                          ? allergens.filter(id => id !== allergen.id)
                          : [...allergens, allergen.id];
                        handleInputChange('health', 'allergens', newAllergens);
                      }}
                    >
                      <AlertTriangle 
                        className={cn(
                          "h-5 w-5",
                          formValues.health.allergens?.includes(allergen.id) 
                            ? "text-red-500" 
                            : "text-muted-foreground"
                        )} 
                      />
                      <span>{allergen.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Assistance à la mobilité</Label>
                  <p className="text-sm text-muted-foreground">
                    Afficher des informations sur l'accessibilité dans les magasins
                  </p>
                </div>
                <Switch 
                  checked={formValues.health.mobilityAssistance}
                  onCheckedChange={checked => handleInputChange('health', 'mobilityAssistance', checked)}
                />
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="mt-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Accessibility Settings */}
        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Préférences d'affichage
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application pour faciliter votre utilisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Taille du texte</Label>
                <RadioGroup 
                  value={formValues.preferences.fontSize}
                  onValueChange={value => handleInputChange('preferences', 'fontSize', value)}
                  className="grid grid-cols-3 gap-2 mt-1"
                >
                  <div>
                    <RadioGroupItem value="small" id="small" className="sr-only" />
                    <Label 
                      htmlFor="small" 
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted cursor-pointer",
                        formValues.preferences.fontSize === "small" && "border-primary"
                      )}
                    >
                      <span className="text-sm">A</span>
                      <span className="text-xs mt-1">Petit</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="medium" id="medium" className="sr-only" />
                    <Label 
                      htmlFor="medium" 
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted cursor-pointer",
                        formValues.preferences.fontSize === "medium" && "border-primary"
                      )}
                    >
                      <span className="text-base">A</span>
                      <span className="text-xs mt-1">Moyen</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="large" id="large" className="sr-only" />
                    <Label 
                      htmlFor="large" 
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted cursor-pointer",
                        formValues.preferences.fontSize === "large" && "border-primary"
                      )}
                    >
                      <span className="text-lg">A</span>
                      <span className="text-xs mt-1">Grand</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode contraste élevé</Label>
                    <p className="text-sm text-muted-foreground">
                      Améliore la lisibilité avec des contrastes plus prononcés
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.preferences.highContrast}
                    onCheckedChange={checked => handleInputChange('preferences', 'highContrast', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Réduire les animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Diminue les effets visuels pour une expérience plus stable
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.preferences.reduceMotion}
                    onCheckedChange={checked => handleInputChange('preferences', 'reduceMotion', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lecture automatique des étiquettes</Label>
                    <p className="text-sm text-muted-foreground">
                      Active la lecture vocale des informations produits
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.preferences.autoReadLabels}
                    onCheckedChange={checked => handleInputChange('preferences', 'autoReadLabels', checked)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="mt-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Préférences de notifications
              </CardTitle>
              <CardDescription>
                Choisissez quelles notifications vous souhaitez recevoir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes sur les produits</Label>
                    <p className="text-sm text-muted-foreground">
                      Notification lorsqu'un produit ne correspond pas à vos besoins de santé
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.notifications.productAlerts}
                    onCheckedChange={checked => handleInputChange('notifications', 'productAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Magasins à proximité</Label>
                    <p className="text-sm text-muted-foreground">
                      Notification lorsque vous êtes proche d'un magasin partenaire
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.notifications.storeProximity}
                    onCheckedChange={checked => handleInputChange('notifications', 'storeProximity', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mises à jour nutritionnelles</Label>
                    <p className="text-sm text-muted-foreground">
                      Informations sur les changements de composition des produits
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.notifications.nutritionUpdates}
                    onCheckedChange={checked => handleInputChange('notifications', 'nutritionUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotions et offres</Label>
                    <p className="text-sm text-muted-foreground">
                      Offres spéciales sur les produits adaptés à vos besoins
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.notifications.promotions}
                    onCheckedChange={checked => handleInputChange('notifications', 'promotions', checked)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="mt-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Stores Settings */}
        <TabsContent value="stores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="h-5 w-5 mr-2" />
                Préférences des magasins
              </CardTitle>
              <CardDescription>
                Gérez vos magasins préférés et les paramètres liés aux commerces
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preferred-store">Magasin préféré</Label>
                <select
                  id="preferred-store"
                  value={formValues.stores.preferredStore}
                  onChange={e => handleInputChange('stores', 'preferredStore', e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none"
                >
                  <option value="leclerc-paris">Leclerc - Paris Centre</option>
                  <option value="carrefour-lyon">Carrefour - Lyon</option>
                  <option value="auchan-marseille">Auchan - Marseille</option>
                  <option value="intermarche-lille">Intermarché - Lille</option>
                  <option value="super-u-nantes">Super U - Nantes</option>
                </select>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mémoriser l'historique des magasins</Label>
                    <p className="text-sm text-muted-foreground">
                      Enregistrer les magasins visités récemment
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.stores.saveHistory}
                    onCheckedChange={checked => handleInputChange('stores', 'saveHistory', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Afficher les plans des magasins</Label>
                    <p className="text-sm text-muted-foreground">
                      Montrer les plans 3D pour localiser les produits
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.stores.displayMap}
                    onCheckedChange={checked => handleInputChange('stores', 'displayMap', checked)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleSaveSettings}
                className="mt-4"
              >
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
