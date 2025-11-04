import { useTranslation } from 'react-i18next';

import type { ServiceData } from '@/data/servicesData';

export function useTranslatedServices(): ServiceData[] {
  const { t } = useTranslation();

  const services: ServiceData[] = [
    {
      id: 'gestao-trafego',
      category: 'advertising',
      title: t('services.gestao-trafego.title'),
      tagline: t('services.gestao-trafego.tagline'),
      icon: '🎯',
      description: t('services.gestao-trafego.description'),
      how: t('services.gestao-trafego.how', { returnObjects: true }) as string[],
      benefits: t('services.gestao-trafego.benefits', { returnObjects: true }) as string[],
      features: t('services.gestao-trafego.features', { returnObjects: true }) as string[],
    },
    {
      id: 'site-single-page',
      category: 'web',
      title: t('services.site-single-page.title'),
      tagline: t('services.site-single-page.tagline'),
      icon: '📄',
      description: t('services.site-single-page.description'),
      how: t('services.site-single-page.how', { returnObjects: true }) as string[],
      benefits: t('services.site-single-page.benefits', { returnObjects: true }) as string[],
      features: t('services.site-single-page.features', { returnObjects: true }) as string[],
    },
    {
      id: 'site-multi-page',
      category: 'web',
      title: t('services.site-multi-page.title'),
      tagline: t('services.site-multi-page.tagline'),
      icon: '📑',
      description: t('services.site-multi-page.description'),
      how: t('services.site-multi-page.how', { returnObjects: true }) as string[],
      benefits: t('services.site-multi-page.benefits', { returnObjects: true }) as string[],
      features: t('services.site-multi-page.features', { returnObjects: true }) as string[],
    },
    {
      id: 'site-cms',
      category: 'web',
      title: t('services.site-cms.title'),
      tagline: t('services.site-cms.tagline'),
      icon: '⚙️',
      description: t('services.site-cms.description'),
      how: t('services.site-cms.how', { returnObjects: true }) as string[],
      benefits: t('services.site-cms.benefits', { returnObjects: true }) as string[],
      features: t('services.site-cms.features', { returnObjects: true }) as string[],
    },
    {
      id: 'site-leads',
      category: 'web',
      title: t('services.site-leads.title'),
      tagline: t('services.site-leads.tagline'),
      icon: '🧲',
      description: t('services.site-leads.description'),
      how: t('services.site-leads.how', { returnObjects: true }) as string[],
      benefits: t('services.site-leads.benefits', { returnObjects: true }) as string[],
      features: t('services.site-leads.features', { returnObjects: true }) as string[],
    },
    {
      id: 'social-media',
      category: 'advertising',
      title: t('services.social-media.title'),
      tagline: t('services.social-media.tagline'),
      icon: '📱',
      description: t('services.social-media.description'),
      how: t('services.social-media.how', { returnObjects: true }) as string[],
      benefits: t('services.social-media.benefits', { returnObjects: true }) as string[],
      features: t('services.social-media.features', { returnObjects: true }) as string[],
    },
    {
      id: 'landing-page',
      category: 'web',
      title: t('services.landing-page.title'),
      tagline: t('services.landing-page.tagline'),
      icon: '🎯',
      description: t('services.landing-page.description'),
      how: t('services.landing-page.how', { returnObjects: true }) as string[],
      benefits: t('services.landing-page.benefits', { returnObjects: true }) as string[],
      features: t('services.landing-page.features', { returnObjects: true }) as string[],
    },
  ];

  return services;
}

