import type { Metadata } from 'next';
import { siteUrl, siteUrlWithSlash } from './siteUrl';

/**
 * Helper para criar metadata multilíngue otimizada para SEO internacional
 * Suporta português (Brasil) e inglês (EUA, Reino Unido, Canadá, Austrália)
 */
export interface MultilingualMetadataOptions {
  ptTitle: string;
  enTitle: string;
  ptDescription: string;
  enDescription: string;
  ptKeywords: string[];
  enKeywords: string[];
  path?: string;
  ogImage?: string;
}

export function createMultilingualMetadata({
  ptTitle,
  enTitle,
  ptDescription,
  enDescription,
  ptKeywords,
  enKeywords,
  path = '',
  ogImage = `${siteUrl}/og-image.jpg`,
}: MultilingualMetadataOptions): Metadata {
  const canonicalUrl = path ? `${siteUrl}${path.startsWith('/') ? path : `/${path}`}` : siteUrlWithSlash;
  const enUrl = `${canonicalUrl}${canonicalUrl.includes('?') ? '&' : '?'}lang=en`;

  return {
    title: {
      default: ptTitle,
      template: '%s | BRANDS',
    },
    description: ptDescription,
    keywords: [...ptKeywords, ...enKeywords],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'pt-BR': canonicalUrl,
        'en': enUrl,
        'en-US': enUrl,
        'en-GB': enUrl,
        'en-CA': enUrl,
        'fr-CA': enUrl,
        'en-AU': enUrl,
        'pt-PT': canonicalUrl,
        'kl-GL': enUrl,
        'da-GL': enUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: ptTitle,
      description: ptDescription,
      url: canonicalUrl,
      siteName: 'BRANDS',
      locale: 'pt_BR',
      alternateLocale: ['en_US', 'en_GB', 'en_CA', 'fr_CA', 'en_AU', 'pt_PT', 'kl_GL', 'da_GL'],
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${ptTitle} | ${enTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ptTitle,
      description: ptDescription,
      images: [ogImage],
    },
  };
}

/**
 * Metadata em inglês para páginas específicas
 */
export const englishMetadata = {
  home: {
    title: 'BRANDS - Elite Legal Marketing | Authority Management',
    description: 'Strategic legal marketing for high-value law firms. Transform your technical excellence into brand sovereignty and market authority. Specialists in strategic positioning and authority management for the legal market.',
    keywords: [
      'legal marketing',
      'law firm marketing',
      'legal branding',
      'law firm SEO',
      'attorney marketing',
      'legal authority management',
      'elite legal marketing',
      'law firm digital marketing',
      'legal content marketing',
      'law firm authority',
      'legal marketing Canada',
      'law firm marketing Canada',
      'legal marketing Greenland',
      'law firm marketing Greenland',
      'legal marketing Portugal',
      'law firm marketing Portugal',
    ],
  },
  services: {
    title: 'Legal Marketing Services | BRANDS',
    description: 'Complete legal marketing solutions: paid traffic management, website development, social media management, optimized landing pages and much more for high-value law firms.',
    keywords: [
      'legal marketing services',
      'paid traffic management law firms',
      'law firm website development',
      'legal social media management',
      'legal landing pages',
      'digital marketing for law firms',
      'brands services',
      'legal marketing services Canada',
      'legal marketing services Greenland',
      'legal marketing services Portugal',
    ],
  },
};

