import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';

const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  en: {
    translation: en,
  },
};

// Função para detectar o idioma do navegador
const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'pt-BR';
  }

  // Tenta obter o idioma do navegador
  const browserLang = navigator.language || (navigator as any).userLanguage || 'pt-BR';
  
  // Normaliza o código de idioma (ex: 'pt-BR', 'pt', 'en-US', 'en')
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  // Mapeia para os idiomas suportados
  // Se começar com 'pt', usa português, caso contrário usa inglês
  if (langCode === 'pt') {
    return 'pt-BR';
  }
  
  // Para qualquer outro idioma, usa inglês como padrão
  return 'en';
};

// Função para obter o idioma salvo ou detectar automaticamente
const getSavedLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language');
    
    // Se já existe um idioma salvo, usa ele
    if (saved && (saved === 'pt-BR' || saved === 'en')) {
      return saved;
    }
    
    // Se não existe, detecta o idioma do navegador
    const detectedLang = detectBrowserLanguage();
    
    // Salva o idioma detectado para futuras visitas
    localStorage.setItem('language', detectedLang);
    
    return detectedLang;
  }
  return 'pt-BR';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

