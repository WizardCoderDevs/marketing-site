'use client';

import React from 'react';

import CookiesPopup from '@/components/CookiesPopup';

const JavaBurnPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CookiesPopup redirectUrl="https://967b5gu8hhilv9ebimex8ctx6s.hop.clickbank.net" />

      <div className="w-full h-screen">
        <iframe
          src="https://morningcoffeeritual.net/welcome?hop=ntnaraujo"
          className="w-full h-full border-0"
          title="Java Burn - Morning Coffee Ritual"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default JavaBurnPage;
