'use client';

import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import type { CSSProperties } from 'react';

const ChartSection = dynamic(() => import('./ChartSection'), {
  ssr: false,
});

export default function ImpactSection() {
  const { t } = useTranslation();
  return (
    <section
      id="impact-section"
      className="content-visibility-auto py-20 bg-stone-50 dark:bg-slate-900"
      style={{ '--cvis-size': '700px' } as CSSProperties}
    >
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          {t('impact.title')}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
          {t('impact.description')}
        </p>
        <div className="chart-container">
          <ChartSection />
        </div>
      </div>
    </section>
  );
}
