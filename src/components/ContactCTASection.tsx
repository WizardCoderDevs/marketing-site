'use client';

import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { useContactForm } from '@/contexts/ContactFormContext';

interface ContactCTASectionProps {
  onOpenForm?: () => void;
}

export default function ContactCTASection({ onOpenForm }: ContactCTASectionProps) {
  const { t } = useTranslation();
  const contactForm = useContactForm();
  const handleOpenForm = () => {
    if (onOpenForm) {
      onOpenForm();
      return;
    }
    contactForm?.openForm();
  };

  return (
    <section
      id="contact-cta-section"
      className="content-visibility-auto py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-white/5"
      style={{ '--cvis-size': '420px' } as CSSProperties}
    >
      {/* Decorative background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-slate-950 p-6 sm:p-12 md:p-20 rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl text-center space-y-10 relative overflow-hidden group">
            {/* Subtle internal gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 dark:text-white leading-tight tracking-tight break-words">
                {t('contactCta.title')}
              </h3>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                {t('contactCta.description')}
              </p>
            </div>

            <motion.button
              onClick={handleOpenForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-white dark:to-slate-100 text-white dark:text-slate-950 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.5)] dark:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_30px_70px_-15px_rgba(124,58,237,0.6)]"
            >
              {t('contactCta.button')}
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </motion.button>

            {/* Premium badge */}
            <div className="pt-8 flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em]">
              <span className="w-12 h-px bg-slate-200 dark:bg-slate-800"></span>
              BRANDS Elite Standard
              <span className="w-12 h-px bg-slate-200 dark:bg-slate-800"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

