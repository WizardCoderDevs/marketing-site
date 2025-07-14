'use client';

import CookiesPopupPt from '@/components/CookiesPopupPt';

export default function OzenFitCapsIframePage() {
  return (
    <div className="min-h-screen w-full">
      <CookiesPopupPt redirectUrl="https://ev.braip.com/ref?pv=prodzxk5&af=afi7g77xve" />
      <iframe
        src="https://ev.braip.com/ref?pv=prodzxk5&af=afi7g77xve"
        className="w-full h-screen border-0"
        title="Protocolo Neuro Reconquista"
        allowFullScreen
      />
    </div>
  );
}
