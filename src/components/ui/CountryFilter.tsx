import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface CountryFilterProps {
  onChange: (countries: string[]) => void;
}

const COUNTRIES = [
  { id: 'france', name: 'France', flag: '🇫🇷' },
  { id: 'belgium', name: 'Belgique', flag: '🇧🇪' },
  { id: 'switzerland', name: 'Suisse', flag: '🇨🇭' },
  { id: 'luxembourg', name: 'Luxembourg', flag: '🇱🇺' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦' },
];

const CountryFilter = ({ onChange }: CountryFilterProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['france']);

  const toggleCountry = (countryId: string) => {
    const newSelection = selectedCountries.includes(countryId)
      ? selectedCountries.filter(id => id !== countryId)
      : [...selectedCountries, countryId];
    
    setSelectedCountries(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Globe className="h-4 w-4" />
        <span>Pays disponibles</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {COUNTRIES.map((country) => (
          <Button
            key={country.id}
            variant={selectedCountries.includes(country.id) ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleCountry(country.id)}
            className="gap-2"
          >
            <span className="text-lg">{country.flag}</span>
            {country.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CountryFilter;
