import type { Metadata } from 'next';
import { Comfortaa, Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import React from 'react'; // Import React para tipos JSX
import Script from 'next/script';

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
      lang="pt-br"
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
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
        `}
      </Script>
      <body className="min-h-screen bg-stone-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-comfortaa leading-relaxed tracking-wide transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
