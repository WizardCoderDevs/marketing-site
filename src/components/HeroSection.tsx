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
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Site básico para campanhas gogole ADS
        </p>
      </div>
    </section>
  );
}
