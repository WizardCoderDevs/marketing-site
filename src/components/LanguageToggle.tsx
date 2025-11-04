'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      if (savedLang !== i18n.language) {
        localStorage.setItem('language', i18n.language);
      }
    }
  }, [i18n.language, mounted]);

  if (!mounted) {
    return null;
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
    i18n.changeLanguage(newLang);
    
    // Atualiza o atributo lang do HTML
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors duration-200 font-medium text-sm"
      aria-label="Alternar idioma"
      title={i18n.language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
    >
      {i18n.language === 'pt-BR' ? 'EN' : 'PT'}
    </button>
  );
}

