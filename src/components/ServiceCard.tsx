'use client';

import { useTranslation } from 'react-i18next';

import type { ServiceData } from '@/data/servicesData'; // Importa a interface ServiceData

// Define as props para o componente ServiceCard
interface ServiceCardProps {
  service: ServiceData; // O objeto de serviço, tipado com ServiceData
  onClick: (service: ServiceData) => void; // Função de clique que recebe o serviço como argumento
}

// Componente funcional ServiceCard
export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  const { t } = useTranslation();
  return (
    <div className="service-card group cursor-pointer flex flex-col h-full" onClick={() => onClick(service)}>
      <div className="flex-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-violet-200 dark:group-hover:bg-violet-800 transition-colors duration-300">
            <span className="text-2xl">{service.icon}</span>
          </div>
          <h3 className="text-xl font-poppins font-semibold text-slate-900 dark:text-white">
            {service.title}
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.map((feature, index) => (
            <span
              key={index}
              className="text-sm bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex justify-end items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold group-hover:gap-3 transition-all duration-300">
        <span>{t('services.card.clickToLearnMore')}</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
