import Link from 'next/link';

export default function ServicesCTA() {
  return (
    <section
      id="servicos"
      className="py-20 bg-stone-50 dark:bg-slate-800 dark-transition"
      aria-labelledby="servicos-title"
    >
      <div className="container mx-auto px-6 text-center">
        <h3
          id="servicos-title"
          className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4"
        >
          Nossos Serviços
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 text-content">
          Conheça nossa gama completa de serviços de marketing digital e transforme a
          presença online da sua empresa.
        </p>
        <Link
          href="/servicos"
          className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
          role="button"
          aria-label="Ver todos os serviços"
        >
          Ver Todos os Serviços
        </Link>
      </div>
    </section>
  );
}
