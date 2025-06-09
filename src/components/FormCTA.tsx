import Link from 'next/link';

export default function FormCTA() {
  return (
    <section id="form-cta" className="py-20 bg-white dark:bg-violet-900/30">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          Vamos Entender Suas Necessidades?
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
          Preencha nosso formulário de prospecção para que possamos oferecer as melhores
          soluções personalizadas para o seu negócio.
        </p>
        <Link
          href="/prospecto"
          className="inline-block bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 transition duration-300"
          role="button"
          aria-label="Ir para formulário de prospecção"
        >
          Preencher Formulário
        </Link>
      </div>
    </section>
  );
}
