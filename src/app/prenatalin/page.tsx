import IframeView from '@/components/IframeView';
import type { Metadata } from 'next';

const TARGET_URL = 'https://nplink.net/npdu8lwc'; 
const DESCRIPTION = 'Discover the benefits of Prenatalin.';

export const metadata: Metadata = {
  title: 'Prenatalin',
  description: DESCRIPTION,
  keywords: ['Prenatalin', 'Prenatal'],
  openGraph: {
    title: 'Prenatalin',
    description: DESCRIPTION,
    type: 'website',
    url: TARGET_URL,
    siteName: 'Prenatalin',
    images: [
      {
        url: TARGET_URL,
        width: 1200,
        height: 630,
        alt: 'Prenatalin',
      },
    ],
  },
  twitter: {
    title: 'Prenatalin',
    description: DESCRIPTION,
    card: 'summary_large_image',
    images: [
      {
        url: TARGET_URL,
        width: 1200,
        height: 630,
        alt: 'Prenatalin',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: TARGET_URL,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function PrenatalinPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50">
      <IframeView 
        url={TARGET_URL} 
        title="Prenatalin"
      />
    </main>
  );
}
