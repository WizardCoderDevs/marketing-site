'use client';

import { useState } from 'react';

// import Header from '@/components/Header';
import ServiceModal from '@/components/ServiceModal';
import ServicesSection from '@/components/ServicesSection';
import type { ServiceData } from '@/data/servicesData';

export default function ServicosPage() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <>
      {/* <Header /> */}
      <main role="main">
        <ServicesSection onServiceSelect={setSelectedService} />
      </main>

      {/* Modal de Detalhes do Serviço */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
