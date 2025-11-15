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

// Inicializa o i18n com um idioma padrão (sempre 'pt-BR' no servidor)
// O idioma será atualizado no cliente após a montagem via I18nProvider
// IMPORTANTE: Sempre inicializa com 'pt-BR' para evitar problemas de hidratação
// O idioma correto será carregado no cliente via I18nProvider
const defaultLanguage = 'pt-BR';

// Verifica se já está inicializado para evitar reinicialização
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;

