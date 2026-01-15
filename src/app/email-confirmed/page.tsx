'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function EmailConfirmedPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main role="main" className="min-h-screen bg-stone-50 dark:bg-slate-900">
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <p className="text-sm uppercase tracking-widest text-violet-700 dark:text-violet-300 mb-3">
                {t('emailConfirmed.badge')}
              </p>
              <h1 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
                {t('emailConfirmed.title')}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {t('emailConfirmed.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {t('emailConfirmed.ctaPrimary')}
                </Link>
                <Link
                  href="/blog/artigos"
                  className="w-full sm:w-auto border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {t('emailConfirmed.ctaSecondary')}
                </Link>
              </div>

              <div className="mt-10 rounded-lg bg-violet-50 dark:bg-slate-700/60 p-4 text-sm text-slate-600 dark:text-slate-300">
                {t('emailConfirmed.helpPrefix')}{' '}
                <a
                  href="mailto:contato@brands.ppg.br"
                  className="font-semibold text-violet-700 dark:text-violet-300 hover:underline"
                >
                  contato@brands.ppg.br
                </a>
                {t('emailConfirmed.helpSuffix')}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

