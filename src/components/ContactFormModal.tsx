import { getHubSpotCookie, submitToHubSpot } from '@/utils/hubspot';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configurações do HubSpot
const HUBSPOT_FORM_GUIDS = {
  pt: 'd73e626c-2a76-42f6-9d61-5e2a2db7e299',
  en: '64f19cb9-1f43-4fcf-ab82-9ea96ca70a0b'
};

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { i18n, t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const currentLang = i18n.language.startsWith('en') ? 'en' : 'pt';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    faturamento: '',
    setor: '',
    site: '',
    cargo: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  // Efeito para adicionar listeners de clique fora do modal e tecla ESC para fechar
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Efeito para animar a abertura do modal e resetar estados
  useEffect(() => {
    if (isOpen) {
      if (modalContentRef.current) {
        setTimeout(() => modalContentRef.current?.classList.remove('scale-95'), 10);
      }
      setIsSubmitted(false);
      setError(null);
      setFormData({ 
        nome: '', 
        empresa: '', 
        faturamento: '', 
        setor: '', 
        site: '', 
        cargo: '', 
        email: '', 
        telefone: '', 
        mensagem: '' 
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const faturamentoMapping: Record<string, string> = {
      under50: 'Abaixo de 50 mil',
      '50to150': 'De 50 mil e 150 mil',
      '150to500': 'De 150 mil a 500 mil',
      over500: 'Acima de 500 mil'
    };

    const fields = [
      { name: 'firstname', value: formData.nome },
      { name: '0-2/name', value: formData.empresa },
      { name: 'faturamento_medio_mensal', value: faturamentoMapping[formData.faturamento] || formData.faturamento },
      { name: 'industry', value: formData.setor },
      { name: 'website', value: formData.site },
      { name: 'jobtitle', value: formData.cargo },
      { name: 'email', value: formData.email },
      { name: 'phone', value: formData.telefone },
      { name: 'message', value: formData.mensagem },
      { name: 'hs_lead_status', value: 'NEW' }
    ];

    const context = {
      hutk: getHubSpotCookie(),
      pageUri: window.location.href,
      pageName: document.title
    };

    const success = await submitToHubSpot({
      formGuid: HUBSPOT_FORM_GUIDS[currentLang],
      fields,
      context
    });

    if (success) {
      setIsSubmitted(true);
    } else {
      setError(t('advocacia.form.error') || 'Ocorreu um erro ao enviar. Por favor, tente novamente.');
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, name, type } = e.target;
    const fieldId = type === 'radio' ? name : id;
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-describedby="contact-modal-description"
    >
        <div
          ref={modalContentRef}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 border border-slate-200 dark:border-slate-800"
          role="document"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3
                  id="contact-modal-title"
                  className="text-3xl font-poppins font-bold text-slate-900 dark:text-white"
                >
                  {t('contactModal.title')}
                </h3>
                <p
                  id="contact-modal-description"
                  className="text-slate-600 dark:text-slate-400 mt-2"
                >
                  {t('contactModal.description')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
                aria-label={t('contactModal.closeLabel')}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('advocacia.form.successTitle')}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t('advocacia.form.successDescription')}
                  </p>
                  <button 
                    onClick={onClose}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  >
                    {t('cookies.close')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('advocacia.form.nome')}*
                      </label>
                      <input 
                        type="text" 
                        id="nome" 
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                        placeholder={t('advocacia.form.nomePlaceholder')}
                      />
                    </div>
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('advocacia.form.empresa')}*
                      </label>
                      <input 
                        type="text" 
                        id="empresa" 
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                        placeholder={t('advocacia.form.empresaPlaceholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      {t('advocacia.form.faturamento')}*
                    </span>
                    <div className="space-y-2">
                      {Object.entries(t('advocacia.form.faturamentoOptions', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="faturamento" 
                            required
                            value={key}
                            checked={formData.faturamento === key}
                            onChange={handleChange}
                            className="w-4 h-4 text-violet-600 border-slate-300 focus:ring-violet-500 dark:bg-slate-800 dark:border-slate-700" 
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                            {label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="setor" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.setor')}*
                    </label>
                    <input 
                      type="text" 
                      id="setor" 
                      required
                      value={formData.setor}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.setorPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="site" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.site')}
                    </label>
                    <input 
                      type="url" 
                      id="site" 
                      value={formData.site}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.sitePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="cargo" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.cargo')}*
                    </label>
                    <input 
                      type="text" 
                      id="cargo" 
                      required
                      value={formData.cargo}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.cargoPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.email')}*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.telefone')}*
                    </label>
                    <input 
                      type="tel" 
                      id="telefone" 
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.telefonePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('advocacia.form.mensagem')}
                    </label>
                    <textarea 
                      id="mensagem" 
                      rows={3}
                      value={formData.mensagem}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all" 
                      placeholder={t('advocacia.form.mensagemPlaceholder')}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl">
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(124,58,237,0.5)] flex items-center justify-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('advocacia.form.buttonLoading')}
                        </>
                      ) : (
                        t('advocacia.form.button')
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[10px] text-slate-500 dark:text-slate-500 mt-2">
                    {t('advocacia.form.securityNote')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

