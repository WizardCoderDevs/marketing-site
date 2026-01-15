'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { i18n, t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const isEnglish = i18n.language === 'en';
  const formSrc = isEnglish
    ? 'https://u63mo.share.hsforms.com/2ZPGcuR9DT8-rgp6pbKcKCw'
    : 'https://u63mo.share.hsforms.com/21z5ibCp2QvadYV4qLbfimQ';

  // Efeito para adicionar listeners de clique fora do modal e tecla ESC para fechar
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Efeito para animar a abertura do modal
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      setTimeout(() => modalContentRef.current?.classList.remove('scale-95'), 10);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
      data-language={i18n.language}
    >
        <div
          ref={modalContentRef}
          key={i18n.language}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95"
          role="document"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3
                  id="contact-modal-title"
                  className="text-2xl font-poppins font-bold text-slate-900 dark:text-white"
                >
                  {t('contactModal.title')}
                </h3>
                <p
                  id="contact-modal-description"
                  className="text-slate-600 dark:text-slate-300 mt-2"
                >
                  {t('contactModal.description')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                aria-label={t('contactModal.closeLabel')}
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            <div className="contact-form-container">
              <iframe
                key={formSrc}
                src={formSrc}
                className="w-full border-0 rounded-lg"
                style={{ minHeight: '600px' }}
                title={t('contactModal.iframeTitle')}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

