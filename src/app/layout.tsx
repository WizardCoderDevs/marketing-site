import CookieBanner from '@/components/CookieBanner';
import GoogleTagTracker from '@/components/GoogleTagTracker';
import { ContactFormProvider } from '@/contexts/ContactFormContext';
import { ConversionProvider } from '@/contexts/ConversionContext';
import { CookieProvider } from '@/contexts/CookieContext';
import I18nProvider from '@/i18n/I18nProvider';
import { siteUrl, siteUrlWithSlash } from '@/utils/siteUrl';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Comfortaa, Poppins } from 'next/font/google';
import Script from 'next/script';
import React from 'react'; // Import React para tipos JSX
import './globals.css';

// Configuração da fonte Comfortaa
const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  display: 'swap',
});

// Configuração da fonte Poppins
const poppins = Poppins({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

// Metadados da página para SEO - Alinhados com o objetivo de Marketing Jurídico de Elite

export const metadata: Metadata = {
  title: {
    default: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    template: '%s | BRANDS',
  },
  description:
    'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca e autoridade de mercado. Especialistas em posicionamento estratégico e gestão de autoridade para o mercado jurídico.',
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
    'marketing digital jurídico',
  ],
  authors: [{ name: 'BRANDS', url: siteUrlWithSlash }],
  creator: 'BRANDS',
  publisher: 'BRANDS',
  category: 'Marketing Jurídico',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrlWithSlash),
  alternates: {
    canonical: siteUrlWithSlash,
    languages: {
      'pt-BR': siteUrlWithSlash,
      'en': `${siteUrlWithSlash}?lang=en`,
      'en-US': `${siteUrlWithSlash}?lang=en`,
      'en-GB': `${siteUrlWithSlash}?lang=en`,
      'en-CA': `${siteUrlWithSlash}?lang=en`,
      'en-AU': `${siteUrlWithSlash}?lang=en`,
      'x-default': siteUrlWithSlash,
    },
    types: {
      'application/rss+xml': `${siteUrl}/rss.xml`,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/lightning-icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    description:
      'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca e autoridade de mercado.',
    url: siteUrlWithSlash,
    siteName: 'BRANDS',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'en_GB', 'en_CA', 'en_AU'],
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'BRANDS - Marketing Jurídico de Elite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
    description:
      'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@brands_ppg',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'google-site-verification-code',
  },
  other: {
    'geo.region': 'BR',
    'geo.placename': 'Brasil',
  },
};

// Define a interface para as props do RootLayout
interface RootLayoutProps {
  children: React.ReactNode; // `children` é do tipo ReactNode para qualquer conteúdo JSX
}

// Componente RootLayout, que envolve todo o conteúdo da aplicação
export default function RootLayout({ children }: RootLayoutProps) {
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

  return (
    <html
      lang="pt-BR"
      className={`${comfortaa.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-comfortaa leading-relaxed tracking-wide transition-colors duration-200" suppressHydrationWarning>
        {/* Google tag (gtag.js) */}
        {googleTagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleTagId}', {
                  'anonymize_ip': true,
                  'page_path': window.location.pathname + window.location.search
                });
              `,
              }}
            />
          </>
        )}
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <CookieProvider>
              <ConversionProvider>
                <ContactFormProvider>
                  <GoogleTagTracker />
                  {children}
                  <CookieBanner />
                </ContactFormProvider>
              </ConversionProvider>
            </CookieProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}