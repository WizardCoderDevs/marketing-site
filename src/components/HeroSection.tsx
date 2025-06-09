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
  );
}
