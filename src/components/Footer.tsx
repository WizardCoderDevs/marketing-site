'use client';

import { useConversion } from '@/hooks/useConversion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();
  const { trackWhatsAppClick } = useConversion();
  return (
    <footer role="contentinfo" className="text-white py-12 bg-violet-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 role="heading" className="text-xl font-bold mb-4">BRANDS</h4>
            <p className="text-slate-200">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 role="heading" className="text-xl font-bold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2 flex flex-col">
              <a
                href="mailto:contato@brands.ppg.br"
                role="text"
                aria-label="Email de contato"
                className="text-slate-200 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaEnvelope className="w-6 h-6" />
                <span>contato@brands.ppg.br</span>
              </a>
              <a 
                href="https://wa.me/551231232601" 
                target="_blank" 
                rel="noopener noreferrer" 
                role="text" 
                aria-label="Telefone de contato" 
                onClick={() => trackWhatsAppClick('Footer')}
                className="text-slate-200 hover:text-white transition-colors flex items-center gap-2"
              >
                <FaPhone className="w-6 h-6" />
                <span>(12) 3123 2601</span>
              </a>
            </div>
          </div>
          {/* <div>
            <h4 role="heading" className="text-xl font-bold mb-4">Redes Sociais</h4>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div> */}
        </div>
        <div role="contentinfo" className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-200">
            <p>&copy; {new Date().getFullYear()} BRANDS. Todos os direitos reservados.</p>
            <span className="hidden md:inline">|</span>
            <Link
              href="/politica-de-privacidade"
              className="text-slate-200 hover:text-white transition-colors underline"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
