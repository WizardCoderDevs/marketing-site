import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer role="contentinfo" className="text-white py-12 bg-violet-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 role="heading" className="text-xl font-bold mb-4">BRANDS</h4>
            <p className="text-slate-200">
              Transformando presença digital em resultados reais.
            </p>
          </div>
          <div>
            <h4 role="heading" className="text-xl font-bold mb-4">Contato</h4>
            <div className="space-y-2">
              {/* <p role="text" aria-label="Email de contato" className="text-slate-200">contato@brands.ppg.br</p> */}
              <p role="text" aria-label="Telefone de contato" className="text-slate-200">(12) 99999-9999</p>
            </div>
          </div>
          {/* <div>
            <h4 role="heading" className="text-xl font-bold mb-4">Redes Sociais</h4>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div> */}
        </div>
        <div role="contentinfo" className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-200">
          <p>&copy; {new Date().getFullYear()} BRANDS. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
