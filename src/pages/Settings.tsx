import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

const healthFormSchema = z.object({
  healthConditions: z.string().array().optional(),
  allergies: z.string().array().optional(),
  dietaryPreferences: z.string().array().optional(),
});

const accessibilityFormSchema = z.object({
  textSize: z.string().optional(),
  contrast: z.string().optional(),
  preferences: z.object({
    autoReadLabels: z.boolean().optional(),
    simplifiedUI: z.boolean().optional(),
    seniorMode: z.boolean().optional(),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type HealthFormValues = z.infer<typeof healthFormSchema>;
type AccessibilityFormValues = z.infer<typeof accessibilityFormSchema>;

interface FormValues {
  profile: ProfileFormValues;
  health: HealthFormValues;
  accessibility: AccessibilityFormValues;
}

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    profile: { name: '', email: '' },
    health: { healthConditions: [], allergies: [], dietaryPreferences: [] },
    accessibility: { textSize: 'medium', contrast: 'normal', preferences: { autoReadLabels: false, simplifiedUI: false, seniorMode: false } },
  });

  useEffect(() => {
    // Simulate loading data from localStorage or an API
    setTimeout(() => {
      setFormValues({
        profile: { name: 'John Doe', email: 'john.doe@example.com' },
        health: { healthConditions: ['diabetes-2', 'heart-disease'], allergies: ['gluten'], dietaryPreferences: ['vegetarian'] },
        accessibility: { textSize: 'medium', contrast: 'normal', preferences: { autoReadLabels: false, simplifiedUI: false, seniorMode: false } },
      });
    }, 500);
  }, []);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: formValues.profile,
    mode: "onChange",
  });

  const healthForm = useForm<HealthFormValues>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: formValues.health,
    mode: "onChange",
  });

  const accessibilityForm = useForm<AccessibilityFormValues>({
    resolver: zodResolver(accessibilityFormSchema),
    defaultValues: formValues.accessibility,
    mode: "onChange",
  });

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormValues(prev => ({ ...prev, profile: values }));
    setIsLoading(false);
    toast.success("Profil mis à jour.");
  };

  const handleHealthSubmit = async (values: HealthFormValues) => {
    setIsLoading(true);
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormValues(prev => ({ ...prev, health: values }));
    setIsLoading(false);
    toast.success("Préférences de santé mises à jour.");
  };

  const handleAccessibilitySubmit = async (values: AccessibilityFormValues) => {
    setIsLoading(true);
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormValues(prev => ({ ...prev, accessibility: values }));
    setIsLoading(false);
    toast.success("Préférences d'accessibilité mises à jour.");
  };

  const handleAddHealthCondition = (condition: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        healthConditions: [...prev.health.healthConditions, condition],
      },
    }));
  };

  const handleRemoveHealthCondition = (condition: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        healthConditions: prev.health.healthConditions.filter(c => c !== condition),
      },
    }));
  };

  const handleAddAllergy = (allergy: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        allergies: [...prev.health.allergies, allergy],
      },
    }));
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        allergies: prev.health.allergies.filter(a => a !== allergy),
      },
    }));
  };

  const handleAddDietaryPreference = (preference: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        dietaryPreferences: [...prev.health.dietaryPreferences, preference],
      },
    }));
  };

  const handleRemoveDietaryPreference = (preference: string) => {
    setFormValues(prev => ({
      ...prev,
      health: {
        ...prev.health,
        dietaryPreferences: prev.health.dietaryPreferences.filter(d => d !== preference),
      },
    }));
  };

  const handleInputChange = (group: string, name: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [group]: {
        ...prev[group as keyof FormValues],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Préférences mises à jour.");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez les paramètres de votre compte et vos préférences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="health">Santé</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibilité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations du profil</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : 'Mettre à jour le profil'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="health" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conditions de santé</CardTitle>
              <CardDescription>
                Gérez les conditions de santé pour lesquelles vous souhaitez des recommandations adaptées.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Conditions médicales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'diabetes-1', label: 'Diabète type 1' },
                    { id: 'diabetes-2', label: 'Diabète type 2' },
                    { id: 'heart-disease', label: 'Maladie cardiaque' },
                    { id: 'hypertension', label: 'Hypertension' },
                    { id: 'cholesterol', label: 'Cholestérol élevé' },
                    { id: 'stroke', label: 'AVC (passé)' },
                    { id: 'visually-impaired', label: 'Malvoyance' },
                    { id: 'autism', label: 'Trouble du spectre autistique' },
                    { id: 'senior', label: 'Personne âgée (65+)' },
                  ].map(condition => (
                    <div 
                      key={condition.id} 
                      className="flex items-center space-x-2"
                    >
                      <Checkbox 
                        id={`condition-${condition.id}`} 
                        checked={formValues.health.healthConditions.includes(condition.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleAddHealthCondition(condition.id);
                          } else {
                            handleRemoveHealthCondition(condition.id);
                          }
                        }}
                      />
                      <Label 
                        htmlFor={`condition-${condition.id}`}
                        className="text-sm font-normal"
                      >
                        {condition.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Allergies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'gluten', label: 'Gluten' },
                    { id: 'lactose', label: 'Lactose' },
                    { id: 'nuts', label: 'Fruits à coque' },
                    { id: 'soy', label: 'Soja' },
                    { id: 'eggs', label: 'Oeufs' },
                    { id: 'fish', label: 'Poisson' },
                  ].map(allergy => (
                    <div 
                      key={allergy.id} 
                      className="flex items-center space-x-2"
                    >
                      <Checkbox 
                        id={`allergy-${allergy.id}`} 
                        checked={formValues.health.allergies.includes(allergy.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleAddAllergy(allergy.id);
                          } else {
                            handleRemoveAllergy(allergy.id);
                          }
                        }}
                      />
                      <Label 
                        htmlFor={`allergy-${allergy.id}`}
                        className="text-sm font-normal"
                      >
                        {allergy.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Préférences alimentaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'vegetarian', label: 'Végétarien' },
                    { id: 'vegan', label: 'Végan' },
                    { id: 'pescetarian', label: 'Pescetarien' },
                    { id: ' Halal', label: 'Halal' },
                    { id: ' Kosher', label: 'Casher' },
                  ].map(preference => (
                    <div 
                      key={preference.id} 
                      className="flex items-center space-x-2"
                    >
                      <Checkbox 
                        id={`preference-${preference.id}`} 
                        checked={formValues.health.dietaryPreferences.includes(preference.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleAddDietaryPreference(preference.id);
                          } else {
                            handleRemoveDietaryPreference(preference.id);
                          }
                        }}
                      />
                      <Label 
                        htmlFor={`preference-${preference.id}`}
                        className="text-sm font-normal"
                      >
                        {preference.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Autres paramètres de santé</CardTitle>
              <CardDescription>
                Paramètres supplémentaires liés à votre santé.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Aucun paramètre supplémentaire pour le moment.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'accessibilité</CardTitle>
              <CardDescription>
                Personnalisez l'interface pour une meilleure accessibilité.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="text-size">Taille du texte</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="text-size"
                      value={formValues.accessibility.textSize}
                      onChange={e => handleInputChange('accessibility', 'textSize', e.target.value)}
                    >
                      <option value="small">Petite</option>
                      <option value="medium">Moyenne</option>
                      <option value="large">Grande</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="contrast">Contraste</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="contrast"
                      value={formValues.accessibility.contrast}
                      onChange={e => handleInputChange('accessibility', 'contrast', e.target.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="high">Élevé</option>
                    </select>
                  </div>
                </div>
              
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lecture automatique des étiquettes</Label>
                    <p className="text-sm text-muted-foreground">
                      Utilise la synthèse vocale pour lire les étiquettes des produits
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.accessibility.preferences?.autoReadLabels}
                    onCheckedChange={checked => handleInputChange('accessibility', 'preferences', { ...formValues.accessibility.preferences, autoReadLabels: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode simplifié pour TSA</Label>
                    <p className="text-sm text-muted-foreground">
                      Interface simplifiée pour personnes avec trouble du spectre autistique
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.accessibility.preferences?.simplifiedUI}
                    onCheckedChange={checked => handleInputChange('accessibility', 'preferences', { ...formValues.accessibility.preferences, simplifiedUI: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode senior</Label>
                    <p className="text-sm text-muted-foreground">
                      Interface adaptée avec police plus grande et contrastes renforcés
                    </p>
                  </div>
                  <Switch 
                    checked={formValues.accessibility.preferences?.seniorMode}
                    onCheckedChange={checked => handleInputChange('accessibility', 'preferences', { ...formValues.accessibility.preferences, seniorMode: checked })}
                  />
                </div>
              </div>
              
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : 'Enregistrer les préférences'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {formValues && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60]">
          <div className="container h-full flex items-center justify-center">
            <div className="flex flex-col items-center bg-white/10 rounded-lg backdrop-blur-md p-4 text-white border border-white/20">
              <p className="text-sm">Form values:</p>
              <pre className="text-xs">{JSON.stringify(formValues, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
