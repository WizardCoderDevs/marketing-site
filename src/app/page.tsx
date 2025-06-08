'use client'; // Marca este componente como um Client Component para permitir interatividade.

import { useState } from 'react';
import type { ServiceData } from '@/data/servicesData';
import ServiceModal from '@/components/ServiceModal';
import ServicesSection from '@/components/ServicesSection';
import ImpactSection from '@/components/ImpactSection';
import IdeasSection from '@/components/IdeasSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

// Componente principal da página (HomePage)
export default function HomePage() {
  // Estados para gerenciar a UI e dados
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <>
      <Header />

      <main role="main">
        {/* Seções Principais */}
        <HeroSection />
        <ServicesSection onServiceSelect={setSelectedService} />
        <ImpactSection />
        <IdeasSection />
        <ProcessSection />
        <ContactSection />
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
