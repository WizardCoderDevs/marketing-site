'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

// Função para detectar o idioma do navegador
const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'pt-BR';
  }

  const browserLang = navigator.language || (navigator as any).userLanguage || 'pt-BR';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  if (langCode === 'pt') {
    return 'pt-BR';
  }
  
  return 'en';
};

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Garante que o i18n seja inicializado e atualiza o lang do HTML
    if (typeof window !== 'undefined') {
      let savedLanguage = localStorage.getItem('language');
      
      // Se não há idioma salvo, detecta automaticamente
      if (!savedLanguage || (savedLanguage !== 'pt-BR' && savedLanguage !== 'en')) {
        savedLanguage = detectBrowserLanguage();
        localStorage.setItem('language', savedLanguage);
        
        // Atualiza o idioma no i18n se necessário
        if (i18n.language !== savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      }
      
      document.documentElement.lang = savedLanguage;
    }
  }, [i18n]);

  useEffect(() => {
    // Atualiza o atributo lang do HTML quando o idioma muda
    if (typeof window !== 'undefined' && i18n.language) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  return <>{children}</>;
}

