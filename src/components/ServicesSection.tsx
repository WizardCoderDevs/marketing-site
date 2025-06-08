import React from 'react';
import ServiceCard from './ServiceCard';
import servicesData, { ServiceData } from '@/data/servicesData';

interface ServicesSectionProps {
  onServiceSelect: (service: ServiceData) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  return (
    <section
      id="servicos"
      className="py-20 bg-stone-50 dark:bg-slate-800"
      aria-labelledby="servicos-title"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3
            id="servicos-title"
            className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white"
          >
            Nossas Soluções para o seu Negócio
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Clique em um serviço para ver todos os detalhes e benefícios.
          </p>
        </div>

        <h4 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-6 border-l-4 border-violet-600 pl-4">
          Publicidade Online e Conteúdo
        </h4>
        <div
          id="advertising-services"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          role="list"
          aria-label="Serviços de publicidade online"
        >
          {servicesData
            .filter(s => s.category === 'advertising')
            .map((service: ServiceData) => (
              <ServiceCard key={service.id} service={service} onClick={onServiceSelect} />
            ))}
        </div>

        <h4 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-6 border-l-4 border-violet-600 pl-4">
          Desenvolvimento Web
        </h4>
        <div
          id="web-services"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          role="list"
          aria-label="Serviços de desenvolvimento web"
        >
          {servicesData
            .filter(s => s.category === 'web')
            .map((service: ServiceData) => (
              <ServiceCard key={service.id} service={service} onClick={onServiceSelect} />
            ))}
        </div>
      </div>
    </section>
  );
}
