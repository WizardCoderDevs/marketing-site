'use client';

import { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);

  // Garante que só renderiza após a montagem no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Garante que o i18n seja inicializado e atualiza o lang do HTML
    if (!mounted || typeof window === 'undefined') return;

    // Aguarda um pequeno delay para garantir que o i18n está pronto
    const timer = setTimeout(() => {
      try {
        let savedLanguage = localStorage.getItem('language');
        
        // Se não há idioma salvo, detecta automaticamente
        if (!savedLanguage || (savedLanguage !== 'pt-BR' && savedLanguage !== 'en')) {
          savedLanguage = detectBrowserLanguage();
          localStorage.setItem('language', savedLanguage);
        }
        
        // Atualiza o idioma no i18n se necessário
        if (i18n.isInitialized && i18n.language !== savedLanguage) {
          i18n.changeLanguage(savedLanguage).catch(() => {
            // Ignora erros de mudança de idioma
          });
        }
        
        if (document.documentElement) {
          document.documentElement.lang = savedLanguage;
        }
      } catch (error) {
        // Em caso de erro, mantém o idioma padrão
        if (document.documentElement) {
          document.documentElement.lang = 'pt-BR';
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [i18n, mounted]);

  useEffect(() => {
    // Atualiza o atributo lang do HTML quando o idioma muda
    if (!mounted || typeof window === 'undefined' || !i18n.language) return;
    
    try {
      document.documentElement.lang = i18n.language;
    } catch (error) {
      // Ignora erros
    }
  }, [i18n.language, mounted]);

  // Renderiza children mesmo antes da montagem para evitar problemas de hidratação
  // O i18n já está inicializado com um idioma padrão
  return <>{children}</>;
}

