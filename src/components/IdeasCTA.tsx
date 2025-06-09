import Link from 'next/link';

export default function IdeasCTA() {
  return (
    <section id="ideias" className="py-20 bg-violet-50 dark:bg-violet-900/30">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          Ideias com IA
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
          Deixe a inteligência artificial ajudar a criar ideias criativas para seu
          negócio. Nossa ferramenta exclusiva gera sugestões personalizadas baseadas no
          seu contexto.
        </p>
        <Link
          href="/ideias"
          className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 transition duration-300"
          role="button"
          aria-label="Gerar ideias com IA"
        >
          Gerar Ideias com IA
        </Link>
      </div>
    </section>
  );
}
