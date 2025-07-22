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
import BlurInfo from "@/components/ui/BlurInfo";

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

  const handleInputChange = (
    group: string, 
    name: string, 
    value: string | boolean | { autoReadLabels?: boolean; simplifiedUI?: boolean; seniorMode?: boolean; }
  ) => {
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
      <BlurInfo />
      
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {[
                    // Maladies cardiovasculaires
                    { id: 'hypertension', label: 'Hypertension artérielle' },
                    { id: 'heart-disease', label: 'Maladie cardiaque' },
                    { id: 'stroke', label: 'AVC (antécédent)' },
                    { id: 'arrhythmia', label: 'Arythmie cardiaque' },
                    { id: 'heart-failure', label: 'Insuffisance cardiaque' },
                    { id: 'atherosclerosis', label: 'Athérosclérose' },
                    
                    // Diabète et métabolisme
                    { id: 'diabetes-1', label: 'Diabète type 1' },
                    { id: 'diabetes-2', label: 'Diabète type 2' },
                    { id: 'gestational-diabetes', label: 'Diabète gestationnel' },
                    { id: 'prediabetes', label: 'Prédiabète' },
                    { id: 'cholesterol', label: 'Cholestérol élevé' },
                    { id: 'triglycerides', label: 'Triglycérides élevés' },
                    { id: 'metabolic-syndrome', label: 'Syndrome métabolique' },
                    { id: 'obesity', label: 'Obésité' },
                    { id: 'hypoglycemia', label: 'Hypoglycémie' },
                    
                    // Maladies digestives
                    { id: 'ibs', label: 'Syndrome de l\'intestin irritable' },
                    { id: 'crohns', label: 'Maladie de Crohn' },
                    { id: 'ulcerative-colitis', label: 'Rectocolite hémorragique' },
                    { id: 'celiac', label: 'Maladie cœliaque' },
                    { id: 'gerd', label: 'Reflux gastro-œsophagien' },
                    { id: 'peptic-ulcer', label: 'Ulcère peptique' },
                    { id: 'gallstones', label: 'Calculs biliaires' },
                    { id: 'liver-disease', label: 'Maladie hépatique' },
                    { id: 'pancreatitis', label: 'Pancréatite' },
                    
                    // Maladies rénales
                    { id: 'kidney-disease', label: 'Maladie rénale chronique' },
                    { id: 'kidney-stones', label: 'Calculs rénaux' },
                    { id: 'dialysis', label: 'Dialyse' },
                    { id: 'nephritis', label: 'Néphrite' },
                    
                    // Maladies respiratoires
                    { id: 'asthma', label: 'Asthme' },
                    { id: 'copd', label: 'BPCO' },
                    { id: 'emphysema', label: 'Emphysème' },
                    { id: 'bronchitis', label: 'Bronchite chronique' },
                    { id: 'sleep-apnea', label: 'Apnée du sommeil' },
                    { id: 'pulmonary-fibrosis', label: 'Fibrose pulmonaire' },
                    
                    // Troubles neurologiques
                    { id: 'epilepsy', label: 'Épilepsie' },
                    { id: 'parkinsons', label: 'Maladie de Parkinson' },
                    { id: 'alzheimers', label: 'Maladie d\'Alzheimer' },
                    { id: 'dementia', label: 'Démence' },
                    { id: 'multiple-sclerosis', label: 'Sclérose en plaques' },
                    { id: 'migraine', label: 'Migraine chronique' },
                    { id: 'neuropathy', label: 'Neuropathie' },
                    { id: 'als', label: 'Sclérose latérale amyotrophique' },
                    { id: 'huntingtons', label: 'Maladie de Huntington' },
                    
                    // Troubles mentaux
                    { id: 'depression', label: 'Dépression' },
                    { id: 'anxiety', label: 'Troubles anxieux' },
                    { id: 'bipolar', label: 'Trouble bipolaire' },
                    { id: 'schizophrenia', label: 'Schizophrénie' },
                    { id: 'ptsd', label: 'Trouble de stress post-traumatique' },
                    { id: 'ocd', label: 'Troubles obsessionnels compulsifs' },
                    { id: 'eating-disorders', label: 'Troubles alimentaires' },
                    { id: 'adhd', label: 'TDAH' },
                    { id: 'autism', label: 'Trouble du spectre autistique' },
                    
                    // Maladies auto-immunes
                    { id: 'rheumatoid-arthritis', label: 'Polyarthrite rhumatoïde' },
                    { id: 'lupus', label: 'Lupus érythémateux systémique' },
                    { id: 'hashimoto', label: 'Thyroïdite de Hashimoto' },
                    { id: 'graves', label: 'Maladie de Basedow' },
                    { id: 'psoriasis', label: 'Psoriasis' },
                    { id: 'scleroderma', label: 'Sclérodermie' },
                    { id: 'sjogren', label: 'Syndrome de Sjögren' },
                    { id: 'inflammatory-bowel', label: 'Maladie inflammatoire intestinale' },
                    
                    // Cancers
                    { id: 'breast-cancer', label: 'Cancer du sein' },
                    { id: 'prostate-cancer', label: 'Cancer de la prostate' },
                    { id: 'lung-cancer', label: 'Cancer du poumon' },
                    { id: 'colon-cancer', label: 'Cancer colorectal' },
                    { id: 'skin-cancer', label: 'Cancer de la peau' },
                    { id: 'blood-cancer', label: 'Cancer du sang' },
                    { id: 'cancer-survivor', label: 'Survivant du cancer' },
                    
                    // Troubles hormonaux
                    { id: 'hypothyroidism', label: 'Hypothyroïdie' },
                    { id: 'hyperthyroidism', label: 'Hyperthyroïdie' },
                    { id: 'pcos', label: 'Syndrome des ovaires polykystiques' },
                    { id: 'menopause', label: 'Ménopause' },
                    { id: 'osteoporosis', label: 'Ostéoporose' },
                    { id: 'addisons', label: 'Maladie d\'Addison' },
                    { id: 'cushings', label: 'Syndrome de Cushing' },
                    
                    // Maladies musculo-squelettiques
                    { id: 'arthritis', label: 'Arthrite' },
                    { id: 'osteoarthritis', label: 'Arthrose' },
                    { id: 'fibromyalgia', label: 'Fibromyalgie' },
                    { id: 'chronic-pain', label: 'Douleur chronique' },
                    { id: 'back-pain', label: 'Mal de dos chronique' },
                    { id: 'spondylitis', label: 'Spondylarthrite ankylosante' },
                    { id: 'muscular-dystrophy', label: 'Dystrophie musculaire' },
                    
                    // Handicaps et déficiences
                    { id: 'visually-impaired', label: 'Déficience visuelle' },
                    { id: 'hearing-impaired', label: 'Déficience auditive' },
                    { id: 'mobility-impaired', label: 'Déficience motrice' },
                    { id: 'intellectual-disability', label: 'Déficience intellectuelle' },
                    { id: 'spinal-cord-injury', label: 'Lésion de la moelle épinière' },
                    { id: 'amputation', label: 'Amputation' },
                    { id: 'cerebral-palsy', label: 'Paralysie cérébrale' },
                    
                    // Maladies infectieuses chroniques
                    { id: 'hiv', label: 'VIH/SIDA' },
                    { id: 'hepatitis-b', label: 'Hépatite B chronique' },
                    { id: 'hepatitis-c', label: 'Hépatite C chronique' },
                    { id: 'tuberculosis', label: 'Tuberculose' },
                    { id: 'chronic-fatigue', label: 'Syndrome de fatigue chronique' },
                    
                    // Conditions spécifiques
                    { id: 'pregnancy', label: 'Grossesse' },
                    { id: 'breastfeeding', label: 'Allaitement' },
                    { id: 'senior', label: 'Personne âgée (65+)' },
                    { id: 'pediatric', label: 'Pédiatrique (enfant)' },
                    { id: 'rare-disease', label: 'Maladie rare' },
                    { id: 'transplant', label: 'Transplantation d\'organe' },
                    { id: 'immunocompromised', label: 'Immunodépression' },
                    
                    // Troubles du sommeil
                    { id: 'insomnia', label: 'Insomnie chronique' },
                    { id: 'narcolepsy', label: 'Narcolepsie' },
                    { id: 'restless-leg', label: 'Syndrome des jambes sans repos' },
                    
                    // Maladies de la peau
                    { id: 'eczema', label: 'Eczéma' },
                    { id: 'dermatitis', label: 'Dermatite' },
                    { id: 'rosacea', label: 'Rosacée' },
                    { id: 'vitiligo', label: 'Vitiligo' },
                    
                    // Maladies des yeux
                    { id: 'glaucoma', label: 'Glaucome' },
                    { id: 'cataracts', label: 'Cataracte' },
                    { id: 'macular-degeneration', label: 'Dégénérescence maculaire' },
                    { id: 'diabetic-retinopathy', label: 'Rétinopathie diabétique' },
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
                    { id: 'halal', label: 'Halal' },
                    { id: 'kosher', label: 'Casher' },
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
