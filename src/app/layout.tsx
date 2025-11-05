import CookieBanner from '@/components/CookieBanner';
import { ConversionProvider } from '@/contexts/ConversionContext';
import { CookieProvider } from '@/contexts/CookieContext';
import I18nProvider from '@/i18n/I18nProvider';
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

// Metadados da página para SEO
export const metadata: Metadata = {
  title: 'BRANDS - Marketing Digital Estratégico para Empresas Regionais',
  description:
    'Transforme seu negócio com estratégias de marketing digital personalizadas. Oferecemos soluções em publicidade online, gestão de redes sociais e conteúdo estratégico para impulsionar sua presença digital.',
  keywords:
    'marketing digital, publicidade online, gestão de redes sociais, conteúdo estratégico, empresas regionais, presença digital',
  authors: [{ name: 'BRANDS' }],
  creator: 'BRANDS',
  publisher: 'BRANDS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://brands.ppg.br'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en': '/',
      'x-default': '/',
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
    title: 'BRANDS - Marketing Digital Estratégico',
    description:
      'Transforme seu negócio com estratégias de marketing digital personalizadas',
    url: 'https://brands.ppg.br',
    siteName: 'BRANDS',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRANDS - Marketing Digital Estratégico',
    description:
      'Transforme seu negócio com estratégias de marketing digital personalizadas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Substitua pelo código real de verificação do Google
  },
};

// Define a interface para as props do RootLayout
interface RootLayoutProps {
  children: React.ReactNode; // `children` é do tipo ReactNode para qualquer conteúdo JSX
}

// Componente RootLayout, que envolve todo o conteúdo da aplicação
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-BR"
      className={`${comfortaa.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // Configuração inicial de consentimento (deny all até o usuário consentir)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'wait_for_update': 500
          });
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
        `}
      </Script>
      <body className="min-h-screen bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-comfortaa leading-relaxed tracking-wide transition-colors duration-200">
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <CookieProvider>
              <ConversionProvider>
                {children}
                <CookieBanner />
              </ConversionProvider>
            </CookieProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
