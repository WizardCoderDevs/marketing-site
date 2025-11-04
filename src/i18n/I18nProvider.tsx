'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Garante que o i18n seja inicializado e atualiza o lang do HTML
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') || 'pt-BR';
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  useEffect(() => {
    // Atualiza o atributo lang do HTML quando o idioma muda
    if (typeof window !== 'undefined' && i18n.language) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  return <>{children}</>;
}

