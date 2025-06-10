export default function ProcessSection() {
  return (
    <section id="process-section" className="py-20 bg-white dark:bg-slate-900">
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
          <div className="flex-1 text-center p-6 bg-violet-50 dark:bg-violet-900/30 rounded-lg shadow-md md:rounded-r-none">
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
          <div className="flex-1 text-center p-6 bg-violet-50 dark:bg-violet-900/30 rounded-lg shadow-md md:rounded-none">
            <div className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-poppins font-bold">
              2
            </div>
            <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900 dark:text-white">
              Contrato
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Formalizamos a parceria com um contrato claro detalhando termos e prazos.
            </p>
          </div>
          <div className="hidden md:block text-violet-400 text-4xl font-light -mx-3 z-10">
            →
          </div>
          <div className="flex-1 text-center p-6 bg-violet-50 dark:bg-violet-900/30 rounded-lg shadow-md md:rounded-l-none">
            <div className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-poppins font-bold">
              3
            </div>
            <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900 dark:text-white">
              Início dos Trabalhos
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Com tudo validado, iniciamos as estratégias e o desenvolvimento do projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
