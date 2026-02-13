import HomePageClient from '@/components/HomePageClient';
import { siteUrl, siteUrlWithSlash } from '@/utils/siteUrl';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    template: '%s | BRANDS',
  },
  description: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca e autoridade de mercado. Especialistas em posicionamento estratégico e gestão de autoridade para o mercado jurídico.',
  keywords: [
    'marketing jurídico',
    'brands marketing',
    'posicionamento estratégico advocacia',
    'gestão de autoridade',
    'marketing de elite',
    'marketing para escritórios de advocacia',
    'branding jurídico',
    'autoridade de mercado',
    'soberania de marca',
    // English mapping for international SEO
    'legal marketing',
    'law firm marketing',
    'legal branding',
    'law firm SEO',
    'attorney marketing',
    'legal authority management',
    'elite legal marketing',
    // Regional targeting: Portugal
    'marketing jurídico Portugal',
    'gestão de autoridade advocacia Portugal',
    'branding jurídico Portugal',
    'marketing para advogados Portugal',
    // Regional targeting: Canada
    'legal marketing Canada',
    'law firm marketing Canada',
    'legal branding Canada',
    'marketing juridique Canada',
    'marketing pour avocats Canada',
    // Regional targeting: Greenland
    'legal marketing Greenland',
    'law firm marketing Greenland',
    'advokatmarkedsføring Grønland',
    'marketing i Kalaallit Nunaat',
    'juridisk branding Grønland',
  ],
  alternates: {
    canonical: siteUrlWithSlash,
    languages: {
      'pt-BR': siteUrlWithSlash,
      'en': `${siteUrlWithSlash}?lang=en`,
      'en-US': `${siteUrlWithSlash}?lang=en`,
      'en-GB': `${siteUrlWithSlash}?lang=en`,
      'en-CA': `${siteUrlWithSlash}?lang=en`,
      'fr-CA': `${siteUrlWithSlash}?lang=en`,
      'en-AU': `${siteUrlWithSlash}?lang=en`,
      'pt-PT': siteUrlWithSlash,
      'kl-GL': `${siteUrlWithSlash}?lang=en`,
      'da-GL': `${siteUrlWithSlash}?lang=en`,
      'x-default': siteUrlWithSlash,
    },
  },
  openGraph: {
    title: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    description: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca e autoridade de mercado.',
    url: siteUrlWithSlash,
    siteName: 'BRANDS',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'en_GB', 'en_CA', 'fr_CA', 'en_AU', 'pt_PT', 'kl_GL', 'da_GL'],
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'BRANDS - Marketing Jurídico de Elite | Elite Legal Marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    description: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function HomePage() {
  return <HomePageClient />
}
