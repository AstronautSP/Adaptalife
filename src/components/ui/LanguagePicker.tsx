
import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Liste complète des langues du monde avec leur code ISO
const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'jv', name: 'Basa Jawa' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'pl', name: 'Polski' },
  { code: 'uk', name: 'Українська' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ro', name: 'Română' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'sv', name: 'Svenska' },
  { code: 'hu', name: 'Magyar' },
  { code: 'cs', name: 'Čeština' },
  { code: 'fi', name: 'Suomi' },
  { code: 'da', name: 'Dansk' },
  { code: 'he', name: 'עברית' },
  { code: 'th', name: 'ไทย' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'am', name: 'አማርኛ' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ha', name: 'Hausa' }
];

interface LanguagePickerProps {
  className?: string;
  onLanguageChange?: (languageCode: string) => void;
}

const LanguagePicker = ({ className, onLanguageChange }: LanguagePickerProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr');

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange?.(languageCode);
    
    const language = LANGUAGES.find(lang => lang.code === languageCode);
    if (language) {
      toast.success(`Langue changée pour : ${language.name}`);
    }
  };

  const selectedLanguageName = LANGUAGES.find(lang => lang.code === selectedLanguage)?.name || 'Français';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1 px-2 bg-background/80 backdrop-blur border shadow-sm"
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-medium">{selectedLanguageName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex justify-between items-center cursor-pointer"
          >
            <span>{language.name}</span>
            {selectedLanguage === language.code && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguagePicker;
