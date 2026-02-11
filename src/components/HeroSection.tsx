'use client';

import { useConversion } from '@/hooks/useConversion';
import { ChartBarIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();
  const { trackWhatsAppClick } = useConversion();
  
  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicos');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('Hero Section');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900 overflow-hidden pb-16 md:pb-0"
      aria-labelledby="hero-title"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-200 dark:bg-violet-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <SparklesIcon className="w-4 h-4" />
                {t('hero.badge')}
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                id="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-slate-900 dark:text-white leading-tight mb-6"
              >
                {t('hero.titlePart1')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                  {t('hero.titleHighlight')}
                </span>
                {t('hero.titlePart2') && ` ${t('hero.titlePart2')}`}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
              >
                <Trans
                  i18nKey="hero.subtitle"
                  components={{
                    paidTraffic: <strong className="text-slate-900 dark:text-white" />,
                    webDevelopment: <strong className="text-slate-900 dark:text-white" />,
                  }}
                  values={{
                    paidTraffic: t('hero.paidTraffic'),
                    webDevelopment: t('hero.webDevelopment'),
                  }}
                />
              </motion.p>

              {/* Key Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span className="text-sm font-medium">{t('hero.roi')}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium">{t('hero.results')}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm font-medium">{t('hero.support')}</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://wa.me/551231232601"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="group bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {t('hero.cta')}
                  <svg 
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                </a>
                <button
                  onClick={scrollToServices}
                  className="group bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {t('hero.ctaSecondary')}
                  <ChartBarIcon aria-hidden="true" className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Visual Card */}
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div aria-hidden="true" className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div aria-hidden="true" className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div aria-hidden="true" className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span role="text" aria-label={t('hero.dashboard.title')} className="text-slate-500 dark:text-slate-400 text-sm ml-4">{t('hero.dashboard.title')}</span>
                </div>

                {/* Chart Area */}
                <div className="space-y-6">
                  {/* Growth Chart */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 role="heading" aria-label={t('hero.dashboard.trafficGrowth')} className="text-lg font-semibold text-slate-900 dark:text-white">{t('hero.dashboard.trafficGrowth')}</h3>
                      <span role="text" aria-label={t('hero.dashboard.trafficGrowthValue')} className="text-green-600 dark:text-green-400 text-sm font-medium">{t('hero.dashboard.trafficGrowthValue')}</span>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/30 dark:to-blue-900/30 rounded-lg p-4">
                      <div className="h-full flex items-end gap-2">
                        {[40, 65, 45, 80, 60, 90, 75, 95].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            className="bg-gradient-to-t from-violet-500 to-blue-500 rounded-sm flex-1"
                            aria-hidden="true"
                          ></motion.div>
                        ))}
                      </div>
                      <span role="text" aria-label="40%" className="text-slate-500 dark:text-slate-400 text-sm font-medium">40%</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <RocketLaunchIcon className="w-5 h-5 text-violet-600" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{t('hero.dashboard.conversions')}</span>
                      </div>
                      <div role="text" aria-label={t('hero.dashboard.conversionsValue')} className="text-2xl font-bold text-slate-900 dark:text-white">{t('hero.dashboard.conversionsValue')}</div>
                      <div className="text-green-600 dark:text-green-400 text-sm">+23% {t('hero.dashboard.vsPreviousMonth')}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ChartBarIcon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">{t('hero.dashboard.roi')}</span>
                      </div>
                      <div role="text" aria-label={t('hero.dashboard.roiValue')} className="text-2xl font-bold text-slate-900 dark:text-white">{t('hero.dashboard.roiValue')}</div>
                      <div className="text-green-600 dark:text-green-400 text-sm">+45% {t('hero.dashboard.vsPreviousMonth')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -top-4 -right-4 bg-violet-600 text-white p-3 rounded-full shadow-lg"
              >
                <SparklesIcon className="w-6 h-6" />
              </motion.div>
              
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
              >
                <RocketLaunchIcon className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center"
        >
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
