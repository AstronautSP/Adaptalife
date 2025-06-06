
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Percent, Clock, Copy, Check } from 'lucide-react';

interface Coupon {
  id: string;
  title: string;
  brand: string;
  discount: string;
  code: string;
  description: string;
  validUntil: string;
  category: string;
  minPurchase?: string;
  isLimited?: boolean;
  usageCount?: number;
  maxUsage?: number;
}

const coupons: Coupon[] = [
  {
    id: 'always-serviettes',
    title: '30% de réduction sur les serviettes Always',
    brand: 'Always',
    discount: '30%',
    code: 'ALWAYS30',
    description: 'Réduction sur toute la gamme de serviettes Always Ultra',
    validUntil: '31/12/2024',
    category: 'Hygiène féminine',
    minPurchase: '15€',
    isLimited: true,
    usageCount: 45,
    maxUsage: 100
  },
  {
    id: 'nana-tampons',
    title: '25% sur les tampons Nana',
    brand: 'Nana',
    discount: '25%',
    code: 'NANA25',
    description: 'Offre valable sur tous les tampons Nana, toutes tailles',
    validUntil: '15/01/2025',
    category: 'Hygiène féminine',
    minPurchase: '12€',
    isLimited: false
  },
  {
    id: 'tampax-pack',
    title: '2 achetés = 1 offert sur Tampax',
    brand: 'Tampax',
    discount: '33%',
    code: 'TAMPAX3',
    description: 'Achetez 2 boîtes de tampons Tampax et recevez la 3ème gratuitement',
    validUntil: '28/02/2025',
    category: 'Hygiène féminine',
    minPurchase: '20€',
    isLimited: true,
    usageCount: 28,
    maxUsage: 50
  },
  {
    id: 'vania-serviettes',
    title: '20% de réduction Vania',
    brand: 'Vania',
    discount: '20%',
    code: 'VANIA20',
    description: 'Réduction sur toute la gamme Vania serviettes et protège-slips',
    validUntil: '10/03/2025',
    category: 'Hygiène féminine',
    minPurchase: '10€',
    isLimited: false
  },
  {
    id: 'saforelle-intime',
    title: '15% sur les soins intimes Saforelle',
    brand: 'Saforelle',
    discount: '15%',
    code: 'SAFO15',
    description: 'Gels lavants et lingettes intimes Saforelle',
    validUntil: '30/04/2025',
    category: 'Hygiène féminine',
    minPurchase: '8€',
    isLimited: false
  },
  {
    id: 'organyc-bio',
    title: '35% sur Organyc Bio',
    brand: 'Organyc',
    discount: '35%',
    code: 'BIO35',
    description: 'Serviettes et tampons 100% coton biologique Organyc',
    validUntil: '20/01/2025',
    category: 'Hygiène féminine',
    minPurchase: '18€',
    isLimited: true,
    usageCount: 12,
    maxUsage: 30
  }
];

const DiscountCoupons = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`Code ${code} copié dans le presse-papiers !`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie du code');
    }
  };

  const useCoupon = (coupon: Coupon) => {
    copyCode(coupon.code);
    toast.success(`Bon de réduction ${coupon.brand} activé !`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Bons de réduction hygiène féminine</h2>
        <p className="text-muted-foreground">
          Économisez sur vos produits d'hygiène féminine essentiels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">{coupon.title}</CardTitle>
                  <CardDescription className="text-sm">{coupon.brand}</CardDescription>
                </div>
                <Badge variant="secondary" className="ml-2 text-lg font-bold">
                  {coupon.discount}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{coupon.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Code :</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
                      {coupon.code}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyCode(coupon.code)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedCode === coupon.code ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Jusqu'au {coupon.validUntil}</span>
                  </div>
                </div>

                {coupon.minPurchase && (
                  <p className="text-xs text-muted-foreground">
                    Achat minimum : {coupon.minPurchase}
                  </p>
                )}

                {coupon.isLimited && coupon.usageCount && coupon.maxUsage && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Offre limitée : {coupon.usageCount}/{coupon.maxUsage} utilisations
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <Button 
                onClick={() => useCoupon(coupon)} 
                className="w-full"
                size="sm"
              >
                <Percent className="mr-2 h-4 w-4" />
                Utiliser ce bon
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>💡 Astuce : Cliquez sur "Utiliser ce bon" pour copier automatiquement le code</p>
        <p>Les codes sont valables dans nos magasins partenaires et en ligne</p>
      </div>
    </div>
  );
};

export default DiscountCoupons;
