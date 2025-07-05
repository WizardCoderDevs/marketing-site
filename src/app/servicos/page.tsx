'use client';

import { useState } from 'react';
import type { ServiceData } from '@/data/servicesData';
import ServicesSection from '@/components/ServicesSection';
// import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';

export default function ServicosPage() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <>
      {/* <Header /> */}
      <main role="main">
        <ServicesSection onServiceSelect={setSelectedService} />
      </main>
      <Footer />

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
