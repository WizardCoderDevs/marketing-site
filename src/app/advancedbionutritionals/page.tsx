'use client';

import CookiesPopup from '@/components/CookiesPopup';

export default function AdvancedBionutritionalsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CookiesPopup redirectUrl="https://www.advancedbionutritionals.com/DS24/Advanced-Mitochondrial/Too-Tired-To-Enjoy-It/HD.htm#aff=ntnaraujo" />

      <iframe
        src="https://www.advancedbionutritionals.com/DS24/Advanced-Mitochondrial/Too-Tired-To-Enjoy-It/HD.htm"
        className="w-full h-full border-0"
        title="Advanced Bionutritionals - Advanced Mitochondrial Formula"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
