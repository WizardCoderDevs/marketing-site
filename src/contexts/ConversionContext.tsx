'use client';

import type { ReactNode } from 'react';
import { createContext, useCallback } from 'react';

interface ConversionContextType {
  trackConversion: (eventName: string, options?: ConversionOptions) => void;
  trackWhatsAppClick: (source?: string) => void;
}

interface ConversionOptions {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  send_to?: string;
  [key: string]: any;
}

export const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

interface ConversionProviderProps {
  children: ReactNode;
}

export function ConversionProvider({ children }: ConversionProviderProps) {
  const trackConversion = useCallback((eventName: string, options?: ConversionOptions) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const defaultOptions: ConversionOptions = {
        event_category: 'engagement',
        currency: 'BRL',
        value: 1,
        ...options,
      };

      // Evento de conversão para Google Ads (se configurado)
      const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
      if (options?.send_to || googleTagId) {
        (window as any).gtag('event', 'conversion', {
          send_to: options?.send_to || googleTagId,
          event_category: defaultOptions.event_category,
          event_label: defaultOptions.event_label || eventName,
          value: defaultOptions.value,
          currency: defaultOptions.currency,
          ...options,
        });
      }

      // Evento customizado para Google Analytics 4
      (window as any).gtag('event', eventName, {
        event_category: defaultOptions.event_category,
        event_label: defaultOptions.event_label || eventName,
        value: defaultOptions.value,
        ...options,
      });
    }
  }, []);

  const trackWhatsAppClick = useCallback((source?: string) => {
    trackConversion('whatsapp_click', {
      event_label: source ? `WhatsApp Click - ${source}` : 'WhatsApp Click',
      event_category: 'engagement',
      value: 1,
    });
  }, [trackConversion]);

  return (
    <ConversionContext.Provider value={{ trackConversion, trackWhatsAppClick }}>
      {children}
    </ConversionContext.Provider>
  );
}

