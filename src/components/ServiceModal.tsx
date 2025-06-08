import React, { useEffect, useRef } from 'react';
import { ServiceData } from '@/types/services';
import { formatMarkdown } from '@/utils/markdown';

// Define as props para o componente ServiceModal
interface ServiceModalProps {
  service: ServiceData;
  onClose: () => void;
}

// Componente funcional ServiceModal
export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null); // Ref para o div principal do modal, tipado como HTMLDivElement
  const modalContentRef = useRef<HTMLDivElement>(null); // Ref para o conteúdo do modal, tipado como HTMLDivElement

  // Efeito para adicionar listeners de clique fora do modal e tecla ESC para fechar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Se o clique foi fora do conteúdo do modal, fecha o modal
      if (
        modalRef.current &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      // Se a tecla ESC foi pressionada, fecha o modal
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Adiciona os event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    // Função de limpeza: remove os event listeners ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]); // Dependência: `onClose` para evitar recriação desnecessária

  // Efeito para animar a abertura do modal
  useEffect(() => {
    if (modalRef.current) {
      // Pequeno atraso para garantir que a classe 'scale-95' seja aplicada antes de ser removida
      setTimeout(() => modalContentRef.current?.classList.remove('scale-95'), 10);
    }
  }, [service]); // Dependência: `service` para re-executar a animação se o serviço mudar

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalContentRef}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div
                className="w-16 h-16 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mr-4"
                aria-hidden="true"
              >
                <span className="text-4xl">{service.icon}</span>
              </div>
              <div>
                <h3
                  id="modal-title"
                  className="text-2xl font-poppins font-bold text-slate-900 dark:text-white"
                >
                  {service.title}
                </h3>
                <p id="modal-description" className="text-slate-600 dark:text-slate-300">
                  {service.tagline}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Fechar modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section aria-labelledby="how-it-works-title">
              <h4
                id="how-it-works-title"
                className="text-xl font-poppins font-semibold text-slate-900 dark:text-white mb-4"
              >
                Como Funciona
              </h4>
              <ul className="space-y-3" role="list">
                {service.how.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span
                      className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 rounded-full flex items-center justify-center mr-3 mt-0.5"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(step) }}
                      className="text-slate-600 dark:text-slate-300"
                    ></span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="benefits-title">
              <h4
                id="benefits-title"
                className="text-xl font-poppins font-semibold text-slate-900 dark:text-white mb-4"
              >
                Benefícios
              </h4>
              <ul className="space-y-3" role="list">
                {service.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span
                      className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 rounded-full flex items-center justify-center mr-3 mt-0.5"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(benefit) }}
                      className="text-slate-600 dark:text-slate-300"
                    ></span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section aria-labelledby="features-title" className="mt-8">
            <h4
              id="features-title"
              className="text-xl font-poppins font-semibold text-slate-900 dark:text-white mb-4"
            >
              Recursos Incluídos
            </h4>
            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="Lista de recursos incluídos"
            >
              {service.features.map((feature: string, index: number) => (
                <span
                  key={index}
                  className="text-sm bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 px-3 py-1 rounded-full"
                  role="listitem"
                >
                  {feature}
                </span>
              ))}
            </div>
          </section>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-violet-800 transition duration-300"
              aria-label="Fechar modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
