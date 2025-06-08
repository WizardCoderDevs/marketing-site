import React from 'react';

export default function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-violet-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
          Vamos Construir o Futuro Digital da Sua Empresa?
        </h3>
        <p className="text-violet-200 max-w-2xl mx-auto mb-8">
          Estamos prontos para iniciar esta parceria estratégica. Entre em contato e vamos
          conversar sobre seus objetivos.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="text-lg">
            <p className="font-semibold">contato@brands.com.br</p>
          </div>
          <div className="text-lg">
            <p className="font-semibold">(XX) XXXX-XXXX</p>
          </div>
        </div>
      </div>
    </section>
  );
}
