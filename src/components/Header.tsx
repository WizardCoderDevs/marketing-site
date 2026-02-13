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
      className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 sticky top-0 z-50 shadow-lg shadow-slate-200/50 dark:shadow-black/20"
      role="banner"
    >
      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      
      <nav
        className="container mx-auto px-3 min-[321px]:px-6 py-3 relative z-50"
        role="navigation"
        aria-label={t('header.home')}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            <Link
              href="/"
              className="group relative text-3xl font-extrabold font-poppins flex items-center transition-all duration-300"
              aria-label={`BRANDS - ${t('header.home')}`}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-violet-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                <Image
                  src="/lightning-icon.svg"
                  alt="Brands - Logo"
                  width={28}
                  height={28}
                  className="relative w-7 h-7 mr-2 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                  aria-hidden="true"
                />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:from-violet-600 group-hover:to-blue-600 dark:group-hover:from-violet-400 dark:group-hover:to-blue-400 transition-all duration-300 whitespace-nowrap">
                BRANDS
              </span>
            </Link>
          </h1>
          <div
            className="hidden md:flex items-center space-x-8"
            role="menubar"
            aria-label={t('header.mainNavLabel')}
          >
            <div role="none">
              <Link
                href="/blog/artigos"
                className="relative text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors duration-200 group py-2 whitespace-nowrap"
              >
                {t('header.articles')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
            <div role="none">
              <Link
                href="/blog/noticias"
                className="relative text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors duration-200 group py-2 whitespace-nowrap"
              >
                {t('header.news')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
            <div role="none">
              <Link
                href="/politica-de-privacidade"
                className="relative text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors duration-200 group py-2 text-sm"
              >
                {t('header.privacyPolicy')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
            <div role="none">
              <Link
                href={getNavigationLink('agendar')}
                className="relative text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 font-medium transition-colors duration-200 group py-2 whitespace-nowrap"
              >
                {t('header.contact')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
            <div role="none">
              <LanguageToggle />
            </div>
            <div role="none">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex items-center space-x-2 xs:space-x-4 md:hidden shrink-0">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 dark:text-slate-200 focus:outline-none relative z-50 p-2"
              aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
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
        <>
          {/* Backdrop (Overlay) */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md md:hidden z-40 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Mobile */}
          <div
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:hidden px-6 py-10 space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300"
            role="menu"
            aria-label={t('header.mobileMenuLabel')}
            aria-orientation="vertical"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href="/blog/artigos"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 font-medium transition-all duration-200 px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.articles')}
              </Link>
              <Link
                href="/blog/noticias"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 font-medium transition-all duration-200 px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.news')}
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 font-medium transition-all duration-200 px-4 py-3 rounded-lg text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.privacyPolicy')}
              </Link>
              <Link
                href={getNavigationLink('agendar')}
                className="text-slate-700 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 font-medium transition-all duration-200 px-4 py-3 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
