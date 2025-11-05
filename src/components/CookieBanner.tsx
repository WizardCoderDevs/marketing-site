'use client';

import type { CookieCategory } from '@/contexts/CookieContext';
import { useCookies } from '@/hooks/useCookies';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const { hasConsent, acceptAll, rejectAll, cookiePreferences, acceptCategory, rejectCategory } = useCookies();
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  // Não mostrar se já tiver consentimento
  if (hasConsent) {
    return null;
  }

  const cookieCategories: Array<{ id: CookieCategory; name: string; description: string }> = [
    {
      id: 'necessary',
      name: t('cookies.necessary.name'),
      description: t('cookies.necessary.description'),
    },
    {
      id: 'analytics',
      name: t('cookies.analytics.name'),
      description: t('cookies.analytics.description'),
    },
    {
      id: 'marketing',
      name: t('cookies.marketing.name'),
      description: t('cookies.marketing.description'),
    },
    {
      id: 'preferences',
      name: t('cookies.preferences.name'),
      description: t('cookies.preferences.description'),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
      >
        <div className="container mx-auto px-6 py-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Conteúdo Principal */}
            <div className="flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-violet-600 dark:text-violet-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3
                    id="cookie-banner-title"
                    className="text-lg font-poppins font-bold text-slate-900 dark:text-white mb-2"
                  >
                    {t('cookies.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {t('cookies.description')}
                  </p>

                  {/* Detalhes Expandidos */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          {cookieCategories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-start justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                                    {category.name}
                                  </h4>
                                  {category.id === 'necessary' && (
                                    <span className="text-xs bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded">
                                      {t('cookies.required')}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300">
                                  {category.description}
                                </p>
                              </div>
                              <label className={`relative inline-flex items-center ${category.id === 'necessary' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                <input
                                  type="checkbox"
                                  checked={cookiePreferences[category.id]}
                                  onChange={(e) => {
                                    if (category.id === 'necessary') return;
                                    if (e.target.checked) {
                                      acceptCategory(category.id);
                                    } else {
                                      rejectCategory(category.id);
                                    }
                                  }}
                                  disabled={category.id === 'necessary'}
                                  className="sr-only peer"
                                />
                                <div className={`w-11 h-6 rounded-full peer relative transition-colors ${
                                  cookiePreferences[category.id]
                                    ? 'bg-violet-600'
                                    : 'bg-slate-300 dark:bg-slate-600'
                                } ${category.id === 'necessary' ? 'opacity-50' : ''}`}>
                                  <div className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white rounded-full transition-transform ${
                                    cookiePreferences[category.id]
                                      ? 'translate-x-5'
                                      : 'translate-x-0'
                                  }`}></div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
              {!showDetails ? (
                <>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <Cog6ToothIcon className="w-4 h-4" />
                    {t('cookies.customize')}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-6 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    {t('cookies.rejectAll')}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shadow-lg"
                  >
                    {t('cookies.acceptAll')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    {t('cookies.close')}
                  </button>
                  <button
                    onClick={rejectAll}
                    className="px-6 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    {t('cookies.rejectAll')}
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shadow-lg"
                  >
                    {t('cookies.savePreferences')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

