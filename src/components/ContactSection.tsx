export default function ContactSection() {
  return (
    <section id="contato" className="py-20 bg-violet-50 dark:bg-violet-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white">
            Entre em Contato
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2 mb-8">
            Estamos prontos para ajudar a transformar sua presença digital.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-700 focus:border-transparent dark:bg-slate-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-700 focus:border-transparent dark:bg-slate-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-700 focus:border-transparent dark:bg-slate-800 dark:text-white"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-violet-800 transition duration-300"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
