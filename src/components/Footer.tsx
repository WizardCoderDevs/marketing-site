import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-violet-950 text-violet-400 py-6" role="contentinfo">
      <div className="container mx-auto px-6">
        <nav className="text-center mb-4" role="navigation" aria-label="Menu do rodapé">
          <ul className="flex flex-wrap justify-center gap-4 mb-4" role="list">
            <li>
              <a
                href="#servicos"
                className="hover:text-violet-300 transition-colors"
                aria-label="Ir para seção de serviços"
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="#impacto"
                className="hover:text-violet-300 transition-colors"
                aria-label="Ir para seção de impacto"
              >
                Impacto
              </a>
            </li>
            <li>
              <a
                href="#ia-content-ideas"
                className="hover:text-violet-300 transition-colors"
                aria-label="Ir para seção de ideias com IA"
              >
                Ideias com IA
              </a>
            </li>
            <li>
              <a
                href="#processo"
                className="hover:text-violet-300 transition-colors"
                aria-label="Ir para seção de processo"
              >
                Processo
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className="hover:text-violet-300 transition-colors"
                aria-label="Ir para seção de contato"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
        <div className="text-center text-sm">
          <p>&copy; 2025 BRANDS | Todos os direitos reservados.</p>
          <p>Marketing Digital Estratégico para Empresas Regionais.</p>
        </div>
      </div>
    </footer>
  );
}
