'use client';

import Link from 'next/link';

export default function CTAGrid() {
  return (
    <section className="py-20 bg-stone-50 dark:bg-slate-800 dark-transition">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            id="cta-grid-title"
            className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4"
          >
            Serviços do nosso site
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-content">
            Selecione uma das opções abaixo para ser redirecionado para a página desejada.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Serviços Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
            <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
              Nossos Serviços
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-content">
              Conheça nossa gama completa de serviços de marketing digital e transforme a
              presença online da sua empresa.
            </p>
            <Link
              href="/servicos"
              className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
              role="button"
              aria-label="Conhecer nossos serviços"
            >
              Ver Serviços
            </Link>
          </div>

          {/* Formulário Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
            <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
              Formulário de Prospecção
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-content">
              Preencha nosso formulário de prospecção para que possamos entender melhor
              suas necessidades.
            </p>
            <Link
              href="/prospecto"
              className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
              role="button"
              aria-label="Preencher formulário de prospecção"
            >
              Preencher Formulário
            </Link>
          </div>

          {/* Ideias Card */}
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
            <h3 className="text-2xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
              Ideias com IA
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-content">
              Deixe a inteligência artificial ajudar a criar ideias criativas para o seu
              negócio.
            </p>
            <Link
              href="/ideias"
              className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
              role="button"
              aria-label="Gerar ideias com IA"
            >
              Gerar Ideias
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
