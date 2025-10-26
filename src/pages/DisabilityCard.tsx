import { useState } from 'react';
import { IdCard, Plus, Edit3, QrCode, Download, Camera, Upload, Home, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DisabilityCardData {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  disabilityType: string;
  issueDate: string;
  photo?: string;
}

const DisabilityCard = () => {
  const [cardData, setCardData] = useState<DisabilityCardData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<DisabilityCardData>({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    disabilityType: '',
    issueDate: '',
  });

  const handleSaveCard = () => {
    if (!formData.fullName || !formData.cardNumber) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setCardData(formData);
    setIsEditing(false);
    toast.success("Carte d'handicapé enregistrée");
  };

  const handleEditCard = () => {
    if (cardData) {
      setFormData(cardData);
    }
    setIsEditing(true);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, photo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-4 flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Accueil
          </Link>
        </Button>
      </div>
      
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <IdCard className="h-6 w-6" />
          Carte d'handicapé numérique
        </h1>
        <p className="text-muted-foreground">
          Gérez votre carte d'handicapé de manière numérique et sécurisée
        </p>
      </div>

      <Tabs defaultValue="card" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="card">Ma carte</TabsTrigger>
          <TabsTrigger value="manage">Gérer</TabsTrigger>
        </TabsList>

        <TabsContent value="card">
          {cardData ? (
            <div className="space-y-6">
              {/* Carte numérique */}
              <Card className="max-w-md mx-auto bg-gradient-to-br from-primary to-primary/80 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">République Française</h3>
                    <IdCard className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm opacity-90">Carte Mobilité Inclusion</p>
                      <p className="font-bold text-lg">{cardData.fullName}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-90">N° de carte</p>
                        <p className="font-mono text-sm">{cardData.cardNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-90">Valide jusqu'au</p>
                        <p className="text-sm">{cardData.expiryDate}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs opacity-90">Type de handicap</p>
                      <Badge variant="secondary" className="mt-1">
                        {cardData.disabilityType}
                      </Badge>
                    </div>
                  </div>
                  
                  {cardData.photo && (
                    <div className="absolute top-4 right-4 w-16 h-20 rounded border-2 border-white overflow-hidden">
                      <img 
                        src={cardData.photo} 
                        alt="Photo d'identité" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={handleEditCard}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <Button variant="outline">
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>

              {/* Informations légales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Informations importantes</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>• Cette carte numérique a la même valeur légale que la carte physique</p>
                  <p>• Présentez-la sur demande aux autorités compétentes</p>
                  <p>• Vérifiez régulièrement la date d'expiration</p>
                  <p>• En cas de perte, contactez immédiatement votre MDPH</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <IdCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune carte enregistrée</h3>
                <p className="text-muted-foreground mb-4">
                  Ajoutez votre carte d'handicapé pour la consulter rapidement
                </p>
                <Button onClick={() => setIsEditing(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter ma carte
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing ? "Modifier ma carte" : "Ajouter ma carte"}
              </CardTitle>
              <CardDescription>
                Saisissez les informations de votre carte d'handicapé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Nom et prénom"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numéro de carte *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Date de délivrance</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Date d'expiration</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabilityType">Type de handicap</Label>
                <select
                  id="disabilityType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.disabilityType}
                  onChange={(e) => setFormData(prev => ({ ...prev, disabilityType: e.target.value }))}
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Mobilité réduite">Mobilité réduite</option>
                  <option value="Déficience visuelle">Déficience visuelle</option>
                  <option value="Déficience auditive">Déficience auditive</option>
                  <option value="Déficience intellectuelle">Déficience intellectuelle</option>
                  <option value="Handicap psychique">Handicap psychique</option>
                  <option value="Polyhandicap">Polyhandicap</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Photo d'identité (optionnel)</Label>
                <div className="flex items-center gap-4">
                  {formData.photo && (
                    <div className="w-20 h-24 rounded border overflow-hidden">
                      <img 
                        src={formData.photo} 
                        alt="Photo d'identité" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('photo-upload')?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Importer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Prendre une photo
                    </Button>
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveCard} className="flex-1">
                  Enregistrer la carte
                </Button>
                {isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisabilityCard;