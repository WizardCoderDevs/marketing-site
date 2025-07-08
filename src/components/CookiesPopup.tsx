'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CookiesPopupProps {
  redirectUrl: string;
}

const CookiesPopup: React.FC<CookiesPopupProps> = ({ redirectUrl }) => {
  const handleRedirect = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleRedirect}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleRedirect}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl">🍪</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Cookie Notice</h3>
          <p className="text-gray-600">
            We use cookies to enhance your experience and analyze our traffic. By
            continuing to use this site, you consent to our use of cookies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRedirect}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleRedirect}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            Reject
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking any button, you agree to our{' '}
          <a href="#" onClick={handleRedirect} className="underline hover:text-green-600">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="#" onClick={handleRedirect} className="underline hover:text-green-600">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
};

export default CookiesPopup;
