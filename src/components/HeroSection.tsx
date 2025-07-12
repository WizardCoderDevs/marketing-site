import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="py-20 md:py-32 bg-white dark:bg-slate-800"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-6 text-center">
        <h2
          id="hero-title"
          className="text-4xl md:text-6xl font-poppins font-bold text-slate-900 dark:text-white mb-4"
        >
          Site básico para campanhas gogole ADS
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
          Site básico para campanhas gogole ADS
        </p>
        <Link
          href="/servicos"
          className="mx-auto bg-white hover:bg-gray-100 text-red-600 font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-center inline-block"
          role="button"
          aria-label="Ver nossos serviços"
        >
          Ver Nossos Serviços
        </Link>
      </div>
    </section>
  );
}
