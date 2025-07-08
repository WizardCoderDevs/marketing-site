import type { Metadata } from 'next';

import CookiesPopup from '../../components/CookiesPopup';

export const metadata: Metadata = {
  title:
    'ProDentim - Revolutionary Probiotics for Oral Health | 3.5 Billion Good Bacteria',
  description:
    'Discover ProDentim: the only formula with 3.5 billion probiotics specifically developed for the health of your teeth and gums. Based on 2022 scientific research.',
  keywords:
    'ProDentim, probiotics, oral health, dental health, good bacteria, gums, teeth',
  openGraph: {
    title: 'ProDentim - Revolutionary Probiotics for Oral Health',
    description: '3.5 billion probiotics for healthy teeth and gums',
    type: 'website',
  },
};

export default function ProDentimPage() {
  return (
    <div className="min-h-screen bg-white">
      <CookiesPopup redirectUrl="https://ba35bh3igicsmhcg2js9ulvcft.hop.clickbank.net" />

      {/* Full-screen iframe */}
      <iframe
        src="https://prodentim101.com/text.php?hopId=b3080564-4035-471d-9c75-35e5a40433af&hop=ntnaraujo"
        className="w-full h-screen border-0"
        title="ProDentim - Revolutionary Probiotics for Oral Health"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
