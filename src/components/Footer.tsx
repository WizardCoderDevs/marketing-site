'use client';

import { useConversion } from '@/hooks/useConversion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();
  const { trackWhatsAppClick } = useConversion();
  
  return (
    <footer role="contentinfo" className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-white/10">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <Image
                  src="/lightning-icon.svg"
                  alt="Brands - Logo"
                  width={32}
                  height={32}
                  className="relative w-8 h-8 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                />
              </div>
              <h4 className="text-2xl font-bold font-poppins bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                BRANDS
              </h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Coluna 2: Contato */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              {t('footer.contact')}
            </h4>
            <div className="space-y-3 flex flex-col">
              <a
                href="mailto:contato@brands.ppg.br"
                role="text"
                aria-label="Email de contato"
                className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 transition-all duration-200 p-3 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <span className="font-medium">contato@brands.ppg.br</span>
              </a>
              <a 
                href="https://wa.me/551231232601" 
                target="_blank" 
                rel="noopener noreferrer" 
                role="text" 
                aria-label="Telefone de contato" 
                onClick={() => trackWhatsAppClick('Footer')}
                className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 transition-all duration-200 p-3 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors">
                  <FaPhone className="w-5 h-5" />
                </div>
                <span className="font-medium">(12) 3123 2601</span>
              </a>
            </div>
          </div>

          {/* Coluna 3: Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog/artigos" 
                  className="group relative inline-block text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-200 py-2"
                >
                  {t('header.articles')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog/noticias" 
                  className="group relative inline-block text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-200 py-2"
                >
                  {t('header.news')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/#sobre" 
                  className="group relative inline-block text-slate-600 dark:text-slate-400 hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-200 py-2"
                >
                  {t('header.aboutUs')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória decorativa */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-violet-600 to-blue-600"></div>
          </div>
        </div>

        {/* Copyright */}
        <div role="contentinfo" className="pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-500 dark:text-slate-400">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} BRANDS. Todos os direitos reservados.
            </p>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <Link
              href="/politica-de-privacidade"
              className="group relative text-sm hover:text-violet-700 dark:hover:text-violet-400 transition-colors duration-200"
            >
              Política de Privacidade
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </footer>
  );
}
