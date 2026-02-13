import { englishMetadata } from '@/utils/multilingualMetadata';
import { siteUrl } from '@/utils/siteUrl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços de Marketing Jurídico | BRANDS',
  description: 'Soluções completas de marketing jurídico: gestão de tráfego pago, desenvolvimento de sites, gestão de redes sociais, landing pages otimizadas e muito mais para escritórios de advocacia de alto valor.',
  keywords: [
    'serviços marketing jurídico',
    'gestão de tráfego pago',
    'desenvolvimento de sites jurídicos',
    'gestão de redes sociais advocacia',
    'landing pages jurídicas',
    'marketing digital para escritórios',
    'brands serviços',
    // English keywords
    ...englishMetadata.services.keywords,
  ],
  alternates: {
    canonical: `${siteUrl}/servicos`,
    languages: {
      'pt-BR': `${siteUrl}/servicos`,
      'en': `${siteUrl}/servicos?lang=en`,
      'en-US': `${siteUrl}/servicos?lang=en`,
      'en-GB': `${siteUrl}/servicos?lang=en`,
      'en-CA': `${siteUrl}/servicos?lang=en`,
      'fr-CA': `${siteUrl}/servicos?lang=en`,
      'en-AU': `${siteUrl}/servicos?lang=en`,
      'pt-PT': `${siteUrl}/servicos`,
      'kl-GL': `${siteUrl}/servicos?lang=en`,
      'da-GL': `${siteUrl}/servicos?lang=en`,
      'x-default': `${siteUrl}/servicos`,
    },
  },
  openGraph: {
    title: 'Serviços de Marketing Jurídico | BRANDS',
    description: 'Soluções completas de marketing jurídico para escritórios de advocacia de alto valor. Transforme sua presença digital.',
    url: `${siteUrl}/servicos`,
    siteName: 'BRANDS',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'en_GB', 'en_CA', 'fr_CA', 'en_AU', 'pt_PT', 'kl_GL', 'da_GL'],
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Serviços de Marketing Jurídico BRANDS | Legal Marketing Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serviços de Marketing Jurídico | BRANDS',
    description: 'Soluções completas de marketing jurídico para escritórios de advocacia de alto valor.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

