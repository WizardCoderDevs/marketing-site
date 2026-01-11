'use client'; // Marca este componente como um Client Component para permitir interatividade.

import { useState } from 'react';

import ContactCTASection from '@/components/ContactCTASection';
import ContactFormModal from '@/components/ContactFormModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ImpactSection from '@/components/ImpactSection';
import ServiceModal from '@/components/ServiceModal';
import type { ServiceData } from '@/data/servicesData';

import ServicosPage from './servicos/page';

// Componente principal da página (HomePage)
export default function HomePage() {
  // Estados para gerenciar a UI e dados
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState<boolean>(false);

  return (
    <>
      <Header />

      <main role="main">
        <HeroSection />
        <ImpactSection />
        <ServicosPage />
        <ContactCTASection onOpenForm={() => setIsContactFormOpen(true)} />
      </main>

      <Footer />

      {/* Modal de Detalhes do Serviço */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {/* Modal de Formulário de Contato */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
}
