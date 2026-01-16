'use client';

import { motion } from 'framer-motion';
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
      className="content-visibility-auto py-20 bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-slate-900 dark:text-white mb-6">
            {t('contactCta.title')}
          </h3>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            {t('contactCta.description')}
          </p>
          <motion.button
            onClick={handleOpenForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
          >
            {t('contactCta.button')}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

