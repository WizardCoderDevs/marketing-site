'use client';

import AdvocaciaLanding from '@/components/AdvocaciaLanding';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ServiceModal from '@/components/ServiceModal';
import type { ServiceData } from '@/data/servicesData';
import { useState } from 'react';

export default function HomePageClient() {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main role="main">
        {/* Renderizamos o conteúdo da Landing Page de Advocacia */}
        <AdvocaciaLanding /> 
      </main>

      <Footer />

      {/* Modal de Detalhes do Serviço (se necessário para interações globais) */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
