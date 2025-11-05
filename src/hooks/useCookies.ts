import { CookieContext } from '@/contexts/CookieContext';
import { useContext } from 'react';

export function useCookies() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
}

