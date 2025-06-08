import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-50"
      role="banner"
    >
      <nav
        className="container mx-auto px-6 py-3 flex justify-between items-center"
        role="navigation"
        aria-label="Menu principal"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          <a
            href="/"
            className="text-3xl font-extrabold font-poppins text-slate-900 dark:text-white flex items-center"
            aria-label="BRANDS - Página inicial"
          >
            <svg
              className="inline-block w-6 h-6 text-violet-700 dark:text-violet-400 mr-1 -mt-1 -rotate-90"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
            BRANDS
          </a>
        </h1>
        <div
          className="hidden md:flex items-center space-x-8"
          role="menubar"
          aria-label="Menu de navegação principal"
        >
          <a
            href="#servicos"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
            role="menuitem"
            aria-label="Ir para seção de serviços"
          >
            Serviços
          </a>
          <a
            href="#impacto"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
            role="menuitem"
            aria-label="Ir para seção de impacto"
          >
            Impacto
          </a>
          <a
            href="#ia-content-ideas"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
            role="menuitem"
            aria-label="Ir para seção de ideias com IA"
          >
            Ideias com IA
          </a>
          <a
            href="#processo"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
            role="menuitem"
            aria-label="Ir para seção de processo"
          >
            Processo
          </a>
          <a
            href="#contato"
            className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
            role="menuitem"
            aria-label="Ir para seção de contato"
          >
            Contato
          </a>
          <ThemeToggle />
        </div>
        <div className="flex items-center space-x-4 md:hidden">
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
      </nav>
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-6 pt-2 pb-4 space-y-2"
          role="menu"
          aria-label="Menu mobile"
          aria-orientation="vertical"
        >
          <a
            href="#servicos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
            role="menuitem"
            aria-label="Ir para seção de serviços"
          >
            Serviços
          </a>
          <a
            href="#impacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
            role="menuitem"
            aria-label="Ir para seção de impacto"
          >
            Impacto
          </a>
          <a
            href="#ia-content-ideas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
            role="menuitem"
            aria-label="Ir para seção de ideias com IA"
          >
            Ideias com IA
          </a>
          <a
            href="#processo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
            role="menuitem"
            aria-label="Ir para seção de processo"
          >
            Processo
          </a>
          <a
            href="#contato"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
            role="menuitem"
            aria-label="Ir para seção de contato"
          >
            Contato
          </a>
        </div>
      )}
    </header>
  );
}
