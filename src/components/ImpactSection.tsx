import dynamic from 'next/dynamic';

const ChartSection = dynamic(() => import('./ChartSection'), {
  ssr: false,
});

export default function ImpactSection() {
  return (
    <section id="impact-section" className="py-20 bg-stone-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          O Impacto de uma Parceria Estratégica
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
          Visualizamos os resultados que podemos alcançar juntos, focando em métricas que
          realmente importam para o crescimento da sua empresa.
        </p>
        <div className="chart-container">
          <ChartSection />
        </div>
      </div>
    </section>
  );
}
