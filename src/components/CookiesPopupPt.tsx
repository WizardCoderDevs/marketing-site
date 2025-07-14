'use client';

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CookiesPopupProps {
  redirectUrl: string;
}

const CookiesPopupPt: React.FC<CookiesPopupProps> = ({ redirectUrl }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRedirect = () => {
    window.location.href = redirectUrl;
  };

  // Don't render anything until the component is mounted on the client
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Dark overlay that blocks the page */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 cursor-pointer"
        onClick={handleRedirect}
      />

      {/* Cookie popup at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Aviso de Cookies</h3>
                <p className="text-sm text-gray-600">
                  Utilizamos cookies para melhorar sua experiência e analisar nosso
                  tráfego. Ao continuar a usar este site, você concorda com o uso de
                  cookies.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRedirect}
                className="bg-gray-600 text-white py-2 px-4 rounded font-medium hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto"
              >
                Aceitar
              </button>
              <button
                onClick={handleRedirect}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors text-sm w-full sm:w-auto"
              >
                Rejeitar
              </button>
              <button
                onClick={handleRedirect}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2">
            Ao clicar em qualquer botão, você concorda com nossa{' '}
            <a
              href="#"
              onClick={handleRedirect}
              className="underline hover:text-green-600"
            >
              Política de Privacidade
            </a>{' '}
            e{' '}
            <a
              href="#"
              onClick={handleRedirect}
              className="underline hover:text-green-600"
            >
              Termos de Serviço
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CookiesPopupPt;
