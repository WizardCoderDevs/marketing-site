'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NewsletterSignupPopup() {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasTriggeredRef = useRef(false);
  const hasUserScrolledRef = useRef(false);
  const initialScrollRef = useRef(0);
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const isEnglish = currentLanguage.startsWith('en');
  const formSrc = isEnglish
    ? 'https://91a85d3e.sibforms.com/serve/MUIFAO2N4vGquurnKWV-8nHqy4LcHdpz5fyGjscYes1ZOvKV3ay9rjgk9Y4gSdMBUy9KI00QHUN-U0VT9vRIysxuM-TGtteelUdf2p_F_CaFw1r6HP9hYz06RZdrhXNxz8NWaLUEBR8McN6W8nVU9XK4xphmi2fk96uS4CRaPTqxCcS-Db9Qu-37hTT4ZSrRpD3PsOkwvOyUvkxILA=='
    : 'https://91a85d3e.sibforms.com/serve/MUIFAIdULk3-ToAizaJDpZ73HS2X8VkOWHGz7EfZUE4X8wnp2XaBtJTr3DH77SOm7v-qYD76NcDjEx4XiJDSzGzgX7w3O_u80sMUa9voV5tPSXau6uu-c_86Uw-rc7jk4LrLUqHIXNnYBD12N5T26VWS64ZyWSwc-ta_yhHSfeAU2EviP997_-6PWJu00KlU24Nsu7p6PR5RgeKyOg==';

  useEffect(() => {
    if (!pathname) return;
    setIsOpen(false);
    hasTriggeredRef.current = false;
    hasUserScrolledRef.current = false;
    setIsReady(false);
    initialScrollRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

    setIsEligible(true);
  }, [pathname]);

  useEffect(() => {
    if (!isEligible) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 300;

    const waitForArticle = () => {
      if (cancelled) return;
      const article = document.getElementById('post-article');
      if (!article || article.offsetHeight === 0) {
        attempts += 1;
        if (attempts < maxAttempts) {
          requestAnimationFrame(waitForArticle);
        }
        return;
      }
      setIsReady(true);
    };

    requestAnimationFrame(waitForArticle);

    return () => {
      cancelled = true;
    };
  }, [isEligible]);

  useEffect(() => {
    if (!isEligible || !isReady || isOpen) return;

    const handleScroll = () => {
      if (hasTriggeredRef.current || !pathname) return;
      const article = document.getElementById('post-article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const currentScroll = window.scrollY;
      if (currentScroll > initialScrollRef.current + 10) {
        hasUserScrolledRef.current = true;
      }

      if (!hasUserScrolledRef.current) {
        return;
      }

      const viewed = currentScroll + window.innerHeight - articleTop;

      if (articleHeight > 0 && viewed >= articleHeight * 0.5) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isEligible, isReady, isOpen, pathname]);

  useEffect(() => {
    if (!isEligible || !isReady || isOpen) return;

    const timer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setIsOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isEligible, isReady, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-md transition-colors hover:bg-white dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Fechar"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <iframe
          key={formSrc}
          src={formSrc}
          className="h-[520px] w-full rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          title="Newsletter signup"
          loading="lazy"
        />
      </div>
    </div>
  );
}

