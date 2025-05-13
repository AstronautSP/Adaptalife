
import React from 'react';
import { Carrot, Apple, LeafyGreen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AdaptafoodLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true,
  className
}) => {
  const iconSizes = {
    sm: { primary: 16, secondary: 12 },
    md: { primary: 24, secondary: 18 },
    lg: { primary: 32, secondary: 24 }
  };
  
  const sizeValues = iconSizes[size];
  
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex items-center justify-center bg-primary/10 p-2 rounded-full">
        <Apple 
          className="text-primary" 
          size={sizeValues.primary}
        />
        <Carrot 
          className="absolute text-accent opacity-70 -bottom-1 -right-1 transform rotate-45" 
          size={sizeValues.secondary}
        />
        <LeafyGreen 
          className="absolute text-green-500 opacity-70 -top-1 -right-1 transform -rotate-15" 
          size={sizeValues.secondary}
        />
      </div>
      {showText && (
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Adaptafood
        </span>
      )}
    </div>
  );
};

export default AdaptafoodLogo;
