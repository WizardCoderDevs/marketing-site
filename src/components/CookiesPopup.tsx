'use client';

import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface CookiesPopupProps {
  redirectUrl: string;
}

const CookiesPopup: React.FC<CookiesPopupProps> = ({ redirectUrl }) => {
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
                <h3 className="text-lg font-semibold text-gray-900">Cookie Notice</h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your experience and analyze our traffic. By
                  continuing to use this site, you consent to our use of cookies.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRedirect}
                className="bg-gray-600 text-white py-2 px-4 rounded font-medium hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto"
              >
                Accept
              </button>
              <button
                onClick={handleRedirect}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors text-sm w-full sm:w-auto"
              >
                Reject
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
            By clicking any button, you agree to our{' '}
            <a
              href="#"
              onClick={handleRedirect}
              className="underline hover:text-green-600"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="#"
              onClick={handleRedirect}
              className="underline hover:text-green-600"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default CookiesPopup;
