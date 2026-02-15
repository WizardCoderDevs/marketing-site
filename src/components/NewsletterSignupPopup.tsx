'use client';

import { getHubSpotCookie, submitToHubSpot } from '@/utils/hubspot';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

export default function NewsletterSignupPopup() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const hasTriggeredRef = useRef(false);
  const hasUserScrolledRef = useRef(false);
  const initialScrollRef = useRef(0);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
  });

  const HUBSPOT_FORM_ID = '1166cc61-e94b-4eab-96b4-82b514930eff';
  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  useEffect(() => {
    if (!pathname) return;
    setIsOpen(false);
    setIsSubmitted(false);
    setError(null);
    setRecaptchaToken(null);
    hasTriggeredRef.current = false;
    hasUserScrolledRef.current = false;
    setIsReady(false);
    initialScrollRef.current = typeof window !== 'undefined' ? window.scrollY : 0;

    // Only show on blog or articles
    if (pathname.includes('/blog/') || pathname.includes('/artigos/') || pathname.includes('/noticias/')) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!isEligible) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 300;

    const waitForArticle = () => {
      if (cancelled) return;
      const article = document.getElementById('post-article') || document.querySelector('.content-area');
      if (!article) {
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
      const article = document.getElementById('post-article') || document.querySelector('.content-area');
      if (!article) return;

      const element = article as HTMLElement;
      const articleTop = element.offsetTop;
      const articleHeight = element.offsetHeight;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError(t('newsletter.form.recaptchaError') || 'Por favor, complete o reCAPTCHA.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const fields = [
      { name: 'firstname', value: formData.nome },
      { name: 'email', value: formData.email },
      { name: 'hs_whatsapp_phone_number', value: formData.whatsapp },
    ];

    const context = {
      hutk: getHubSpotCookie(),
      pageUri: window.location.href,
      pageName: document.title,
    };

    const success = await submitToHubSpot({
      formGuid: HUBSPOT_FORM_ID,
      fields,
      context,
    });

    if (success) {
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } else {
      setError(t('newsletter.form.error'));
      // Reset recaptcha on error to require fresh interaction
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
      onClick={handleClose}
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Background Decorative Gradients */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Fechar"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative p-8 sm:p-12">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center animate-fade-in">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                <svg className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {t('newsletter.form.successTitle')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {t('newsletter.form.successDescription')}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 space-y-4">
                <div className="inline-flex items-center rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                  {t('newsletter.badge')}
                </div>
                <h2
                  id="newsletter-popup-title"
                  className="text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl"
                >
                  {t('newsletter.title')}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  {t('newsletter.description')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('newsletter.form.name')}*
                  </label>
                  <input
                    type="text"
                    id="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder={t('newsletter.form.namePlaceholder')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('newsletter.form.email')}*
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('newsletter.form.emailPlaceholder')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {t('newsletter.form.whatsapp')}
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder={t('newsletter.form.whatsappPlaceholder')}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-900 transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/20">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <div className="space-y-2 flex justify-center py-2">
                  {RECAPTCHA_SITE_KEY ? (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => setRecaptchaToken(token)}
                      theme="light"
                    />
                  ) : (
                    <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg border border-red-100">
                      reCAPTCHA Site Key não configurada no .env
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaToken}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-4 text-white transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)]"
                >
                  <span className="relative z-10 font-bold">
                    {isSubmitting ? t('newsletter.form.buttonLoading') : t('newsletter.form.button')}
                  </span>
                  {isSubmitting && (
                    <svg className="ml-3 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                </button>

                <p className="text-center text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {t('advocacia.form.securityNote')}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

