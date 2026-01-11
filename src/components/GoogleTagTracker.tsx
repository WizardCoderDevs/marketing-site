'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Componente que rastreia mudanças de rota no Next.js e atualiza o Google Tag
 * Isso garante que todas as páginas, incluindo rotas dinâmicas do blog, sejam rastreadas
 */
export default function GoogleTagTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
    
    if (!googleTagId || typeof window === 'undefined') return;

    // Aguarda o gtag estar disponível
    const updatePageView = () => {
      if ((window as any).gtag) {
        // Usa window.location para incluir query params se houver
        const pagePath = window.location.pathname + window.location.search;
        
        // Atualiza o page_path no Google Tag para rastrear a navegação
        (window as any).gtag('config', googleTagId, {
          page_path: pagePath,
          page_title: document.title,
          send_page_view: true,
        });
      }
    };

    // Tenta atualizar imediatamente
    updatePageView();

    // Se o gtag não estiver disponível, tenta novamente após delays progressivos
    const timeouts: NodeJS.Timeout[] = [];
    if (!(window as any).gtag) {
      [100, 500, 1000].forEach((delay) => {
        const timeout = setTimeout(updatePageView, delay);
        timeouts.push(timeout);
      });
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}

