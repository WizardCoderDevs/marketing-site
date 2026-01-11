'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieContextType {
  hasConsent: boolean;
  cookiePreferences: CookiePreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptCategory: (category: CookieCategory) => void;
  rejectCategory: (category: CookieCategory) => void;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  resetConsent: () => void;
  hasAcceptedCategory: (category: CookieCategory) => boolean;
}

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_PREFERENCES_KEY = 'cookie_preferences';

const defaultPreferences: CookiePreferences = {
  necessary: true, // Sempre true, não pode ser desabilitado
  analytics: false,
  marketing: false,
  preferences: false,
};

export const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(defaultPreferences);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Garante que só acessa localStorage após a montagem no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Carregar preferências do localStorage na inicialização
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    try {
      const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

      if (savedConsent === 'true') {
        setHasConsent(true);
      }

      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences) as CookiePreferences;
        setCookiePreferences({ ...defaultPreferences, ...parsed });
      }
    } catch (error) {
      console.error('Error loading cookie preferences:', error);
    } finally {
      setIsInitialized(true);
    }
  }, [mounted]);

  // Salvar preferências no localStorage
  const savePreferences = useCallback((preferences: CookiePreferences) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setCookiePreferences(allAccepted);
    setHasConsent(true);
    savePreferences(allAccepted);
  }, [savePreferences]);

  const rejectAll = useCallback(() => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setCookiePreferences(onlyNecessary);
    setHasConsent(true);
    savePreferences(onlyNecessary);
  }, [savePreferences]);

  const acceptCategory = useCallback(
    (category: CookieCategory) => {
      if (category === 'necessary') return; // Não pode ser alterado

      const updated = {
        ...cookiePreferences,
        [category]: true,
      };
      setCookiePreferences(updated);
      setHasConsent(true);
      savePreferences(updated);
    },
    [cookiePreferences, savePreferences]
  );

  const rejectCategory = useCallback(
    (category: CookieCategory) => {
      if (category === 'necessary') return; // Não pode ser alterado

      const updated = {
        ...cookiePreferences,
        [category]: false,
      };
      setCookiePreferences(updated);
      setHasConsent(true);
      savePreferences(updated);
    },
    [cookiePreferences, savePreferences]
  );

  const updatePreferences = useCallback(
    (preferences: Partial<CookiePreferences>) => {
      const updated = {
        ...cookiePreferences,
        ...preferences,
        necessary: true, // Sempre manter necessário como true
      };
      setCookiePreferences(updated);
      setHasConsent(true);
      savePreferences(updated);
    },
    [cookiePreferences, savePreferences]
  );

  const resetConsent = useCallback(() => {
    setHasConsent(false);
    setCookiePreferences(defaultPreferences);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    }
  }, []);

  const hasAcceptedCategory = useCallback(
    (category: CookieCategory) => {
      return cookiePreferences[category] === true;
    },
    [cookiePreferences]
  );

  return (
    <CookieContext.Provider
      value={{
        hasConsent,
        cookiePreferences,
        acceptAll,
        rejectAll,
        acceptCategory,
        rejectCategory,
        updatePreferences,
        resetConsent,
        hasAcceptedCategory,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

