'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumbs from './Breadcrumbs';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const isHomePage = pathname === '/';

  const getNavigationLink = (section: string) => {
    if (isHomePage) {
      return `#${section}`;
    }
    return `/#${section}`;
  };

  return (
    <header
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-50"
      role="banner"
    >
      <nav
        className="container mx-auto px-6 py-3"
        role="navigation"
        aria-label={t('header.home')}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            <Link
              href="/"
              className="text-3xl font-extrabold font-poppins text-slate-900 dark:text-white flex items-center"
              aria-label={`BRANDS - ${t('header.home')}`}
            >
              <Image
                src="/lightning-icon.svg"
                alt="Brands - Logo"
                width={24}
                height={24}
                className="inline-block w-6 h-6 mr-1 -mt-1"
                aria-hidden="true"
              />
              <span className="text-slate-900 dark:text-white">BRANDS</span>
            </Link>
          </h1>
          <div
            className="hidden md:flex items-center space-x-8"
            role="menubar"
            aria-label="Menu de navegação principal"
          >
            <div role="none">
              <Link
                href={getNavigationLink('servicos')}
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                {t('header.services')}
              </Link>
            </div>
            <div role="none">
              <Link
                href={getNavigationLink('impact-section')}
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                {t('header.impact')}
              </Link>
            </div>
            <div role="none">
              <Link
                href={getNavigationLink('contact-section')}
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                {t('header.contact')}
              </Link>
            </div>
            <div role="none">
              <Link
                href="/apresentacao"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Nosso Método
              </Link>
            </div>
            <div role="none">
              <Link
                href="/blog/artigos"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Artigos
              </Link>
            </div>
            <div role="none">
              <Link
                href="/blog/noticias"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
              >
                Notícias
              </Link>
            </div>
            <div role="none">
              <Link
                href="/politica-de-privacidade"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors text-sm"
              >
                Política de Privacidade
              </Link>
            </div>
            <div role="none">
              <LanguageToggle />
            </div>
            <div role="none">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 dark:text-slate-200 focus:outline-none"
              aria-label="Abrir menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
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
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {!isHomePage && (
          <div className="mt-2 border-t border-slate-200 dark:border-slate-800 pt-2">
            <Breadcrumbs />
          </div>
        )}
      </nav>
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pt-2 pb-4 space-y-2"
          role="menu"
          aria-label="Menu mobile"
          aria-orientation="vertical"
        >
          <div className="flex flex-col space-y-4">
            <Link
              href={getNavigationLink('servicos')}
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              {t('header.services')}
            </Link>
            <Link
              href={getNavigationLink('impact-section')}
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              {t('header.impact')}
            </Link>
            <Link
              href={getNavigationLink('contact-section')}
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              {t('header.contact')}
            </Link>
            <Link
              href="/apresentacao"
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              Nosso Método
            </Link>
            {/* <Link
              href="/blog/artigos"
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              Artigos
            </Link> */}
            <Link
              href="/blog/noticias"
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors"
            >
              Notícias
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors text-sm"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
