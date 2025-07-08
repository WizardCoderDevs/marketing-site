import type { Metadata } from 'next';

import CookiesPopup from '@/components/CookiesPopup';

export const metadata: Metadata = {
  title: 'Quietum Plus - Discover the Secret to Healthier Ears | Pre-Launch',
  description:
    'Discover how thousands of people are naturally recovering their hearing. Revolutionary method with 97% proven efficacy. Limited time offer.',
  keywords:
    'quietum plus, hearing, hearing health, natural supplement, tinnitus, hearing loss',
  openGraph: {
    title: 'Quietum Plus - Recover Your Hearing Naturally',
    description: 'Revolutionary method with 97% efficacy. Limited time offer.',
    type: 'website',
  },
};

export default function QuietumPlusPage() {
  return (
    <div className="min-h-screen">
      {/* Cookies Popup */}
      <CookiesPopup redirectUrl="https://57890m8gokgrxf2izelsv55of0.hop.clickbank.net" />
      {/* Full-screen iframe */}
      <iframe
        src="https://quietumplus.com/text?hopId=ba82b5b4-6f3e-4865-ac6e-6b5e4469b27a&hop=ntnaraujo"
        className="w-full h-screen border-0"
        title="Quietum Plus"
        allowFullScreen
      />
    </div>
  );
}
