import HomePageClient from '@/components/HomePageClient';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BRANDS - Marketing Jurídico de Elite | Gestão de Autoridade',
  description: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Transforme sua excelência técnica em soberania de marca e autoridade de mercado.',
  keywords: 'marketing jurídico, brands marketing, posicionamento estratégico advocacia, gestão de autoridade, marketing de elite',
};

export default function HomePage() {
  return <HomePageClient />;
}
