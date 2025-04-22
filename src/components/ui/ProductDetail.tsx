
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type Product } from './product/types';
import { ProductHeader } from './product/ProductHeader';
import { ProductImage } from './product/ProductImage';
import { ProductHealthInfo } from './product/ProductHealthInfo';
import { ProductTabs } from './product/ProductTabs';

interface ProductDetailProps {
  product: Product;
  className?: string;
}

const ProductDetail = ({ product, className }: ProductDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      <ProductHeader product={product} />
      
      <div className="flex flex-col lg:flex-row">
        <ProductImage product={product} />
        
        <div className="lg:w-1/2 p-6">
          <Separator className="my-4" />
          
          <ProductHealthInfo product={product} />
          
          <Separator className="my-6" />
          
          <ProductTabs 
            product={product}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <div className="mt-8">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => toast.success("Produit ajouté à votre liste de courses")}
            >
              Ajouter à ma liste de courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
