'use client'; // Marca este componente como um Client Component para permitir interatividade.

import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard'; // Importa o componente ServiceCard
import ServiceModal from '@/components/ServiceModal'; // Importa o componente ServiceModal
import servicesData, { ServiceData } from '@/data/servicesData'; // Importa os dados e a interface ServiceData
import dynamic from 'next/dynamic';
import ThemeToggle from '../components/ThemeToggle';
import { formatMarkdown } from '@/utils/markdown';

// Create a dynamic component for the chart section
const ChartSection = dynamic(() => import('./../components/ChartSection'), {
  ssr: false,
});

// Componente principal da página (HomePage)
export default function HomePage() {
  // Estados para gerenciar a UI e dados
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [ideaInput, setIdeaInput] = useState<string>('');
  const [ideaOutput, setIdeaOutput] = useState<string>('');
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(false);

  // Lógica para gerar ideias de conteúdo usando a Gemini API
  const handleGenerateIdeas = async (): Promise<void> => {
    if (!ideaInput.trim()) {
      setIdeaOutput(
        '<p class="text-red-600">Por favor, descreva seu negócio ou objetivo para gerar ideias.</p>'
      );
      return;
    }

    setLoadingIdeas(true);
    setIdeaOutput(''); // Limpa a saída anterior

    try {
      // URL da API de rota do Next.js
      const apiUrl: string = '/api/llmGenerative';

      const response: Response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: ideaInput }),
      });

      interface ApiResponse {
        text?: string;
        error?: string;
      }
      const data: ApiResponse = await response.json();

      if (response.ok) {
        setIdeaOutput(
          `<p class="font-bold mb-2">Ideias geradas:</p>${formatMarkdown(data.text?.replace(/\n/g, '<br>') || 'Nenhuma ideia gerada.')}`
        );
      } else {
        setIdeaOutput(
          `<p class="text-red-600">${data.error || 'Não foi possível gerar ideias. Tente novamente.'}</p>`
        );
      }
    } catch (error) {
      console.error('Erro ao chamar a API de geração de ideias:', error);
      setIdeaOutput(
        '<p class="text-red-600">Ocorreu um erro ao gerar as ideias. Verifique a conexão ou tente novamente mais tarde.</p>'
      );
    } finally {
      setLoadingIdeas(false);
    }
  };

  return (
    <>
      {/* Cabeçalho e Navegação */}
      <header
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-50"
        role="banner"
      >
        <nav
          className="container mx-auto px-6 py-3 flex justify-between items-center"
          role="navigation"
          aria-label="Menu principal"
        >
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            <a
              href="/"
              className="text-3xl font-extrabold font-poppins text-slate-900 dark:text-white flex items-center"
              aria-label="BRANDS - Página inicial"
            >
              <svg
                className="inline-block w-6 h-6 text-violet-700 dark:text-violet-400 mr-1 -mt-1 -rotate-90"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              BRANDS
            </a>
          </h1>
          <div
            className="hidden md:flex items-center space-x-8"
            role="menubar"
            aria-label="Menu de navegação principal"
          >
            <a
              href="#servicos"
              className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
              role="menuitem"
              aria-label="Ir para seção de serviços"
            >
              Serviços
            </a>
            <a
              href="#impacto"
              className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
              role="menuitem"
              aria-label="Ir para seção de impacto"
            >
              Impacto
            </a>
            <a
              href="#ia-content-ideas"
              className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
              role="menuitem"
              aria-label="Ir para seção de ideias com IA"
            >
              Ideias com IA
            </a>
            <a
              href="#processo"
              className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
              role="menuitem"
              aria-label="Ir para seção de processo"
            >
              Processo
            </a>
            <a
              href="#contato"
              className="text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400 transition duration-300"
              role="menuitem"
              aria-label="Ir para seção de contato"
            >
              Contato
            </a>
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800 dark:text-slate-200 focus:outline-none"
              aria-label="Abrir menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
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
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden px-6 pt-2 pb-4 space-y-2"
            role="menu"
            aria-label="Menu mobile"
            aria-orientation="vertical"
          >
            <a
              href="#servicos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
              role="menuitem"
              aria-label="Ir para seção de serviços"
            >
              Serviços
            </a>
            <a
              href="#impacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
              role="menuitem"
              aria-label="Ir para seção de impacto"
            >
              Impacto
            </a>
            <a
              href="#ia-content-ideas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
              role="menuitem"
              aria-label="Ir para seção de ideias com IA"
            >
              Ideias com IA
            </a>
            <a
              href="#processo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
              role="menuitem"
              aria-label="Ir para seção de processo"
            >
              Processo
            </a>
            <a
              href="#contato"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-slate-600 dark:text-slate-300 hover:text-violet-700 dark:hover:text-violet-400"
              role="menuitem"
              aria-label="Ir para seção de contato"
            >
              Contato
            </a>
          </div>
        )}
      </header>

      <main role="main">
        {/* Seção Hero */}
        <section
          className="py-20 md:py-32 bg-white dark:bg-slate-900"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto px-6 text-center">
            <h2
              id="hero-title"
              className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 dark:text-white mb-4"
            >
              Marketing Digital Estratégico
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Transformamos desafios em oportunidades, impulsionando o crescimento e a
              visibilidade da sua empresa no ambiente online.
            </p>
            <a
              href="#servicos"
              className="mt-8 inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 transition duration-300"
              role="button"
              aria-label="Conhecer nossos serviços"
            >
              Descubra Nossos Serviços
            </a>
          </div>
        </section>

        {/* Seção de Serviços */}
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
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={setSelectedService}
                  />
                ))}
            </div>

            <h4 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-slate-200 mb-6 border-l-4 border-violet-600 pl-4">
              Desenvolvimento Web
            </h4>
            <div
              id="web-services"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {servicesData
                .filter(s => s.category === 'web')
                .map((service: ServiceData) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={setSelectedService}
                  />
                ))}
            </div>
          </div>
        </section>

        {/* Seção de Impacto */}
        <section id="impacto" className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
              O Impacto de uma Parceria Estratégica
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
              Visualizamos os resultados que podemos alcançar juntos, focando em métricas
              que realmente importam para o crescimento da sua empresa.
            </p>
            <div className="chart-container">
              <ChartSection />
            </div>
          </div>
        </section>

        {/* Seção de Ideias de Conteúdo com IA */}
        <section id="ia-content-ideas" className="py-20 bg-stone-50 dark:bg-slate-800">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
              ✨ Ideias de Conteúdo com IA ✨
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Descreva seu negócio ou o objetivo da sua próxima campanha e a nossa
              inteligência artificial gerará ideias criativas para suas redes sociais.
            </p>
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
              <textarea
                id="idea-input"
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700 mb-4 h-32 resize-y text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800"
                placeholder="Ex: 'Uma loja de cafés especiais buscando atrair clientes jovens com promoções de verão.'"
                value={ideaInput}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setIdeaInput(e.target.value)
                }
              ></textarea>
              <button
                id="generate-ideas-button"
                onClick={handleGenerateIdeas}
                disabled={loadingIdeas}
                className="bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-violet-800 transition duration-300 w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingIdeas ? 'Gerando...' : 'Gerar Ideias'}
              </button>
              {loadingIdeas && (
                <div
                  id="loading-indicator"
                  className="text-violet-700 dark:text-violet-400 text-center mb-4"
                >
                  Carregando ideias...
                </div>
              )}
              <div
                id="idea-output"
                className="text-left text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700 min-h-[100px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: ideaOutput }}
              ></div>
            </div>
          </div>
        </section>

        {/* Seção de Processo */}
        <section id="processo" className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white">
                Nosso Processo de Trabalho
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Um caminho claro e transparente para o sucesso da nossa parceria.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0">
              <div className="flex-1 text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md md:rounded-r-none">
                <div className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-poppins font-bold">
                  1
                </div>
                <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                  Análise e Escopo
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Revisamos a proposta, definimos os objetivos e ajustamos o escopo do
                  projeto.
                </p>
              </div>
              <div className="hidden md:block text-violet-400 text-4xl font-light -mx-3 z-10">
                →
              </div>
              <div className="flex-1 text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md md:rounded-none">
                <div className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-poppins font-bold">
                  2
                </div>
                <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                  Contrato
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Formalizamos a parceria com um contrato claro detalhando termos e
                  prazos.
                </p>
              </div>
              <div className="hidden md:block text-violet-400 text-4xl font-light -mx-3 z-10">
                →
              </div>
              <div className="flex-1 text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md md:rounded-l-none">
                <div className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-poppins font-bold">
                  3
                </div>
                <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                  Início dos Trabalhos
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Com tudo validado, iniciamos as estratégias e o desenvolvimento do
                  projeto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Contato */}
        <section id="contato" className="py-20 bg-violet-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Vamos Construir o Futuro Digital da Sua Empresa?
            </h3>
            <p className="text-violet-200 max-w-2xl mx-auto mb-8">
              Estamos prontos para iniciar esta parceria estratégica. Entre em contato e
              vamos conversar sobre seus objetivos.
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
      </main>

      {/* Rodapé */}
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
