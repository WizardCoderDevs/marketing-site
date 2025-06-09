import React, { useState } from 'react';
import { formatMarkdown } from '@/utils/markdown';

export default function IdeasSection() {
  const [ideaInput, setIdeaInput] = useState<string>('');
  const [ideaOutput, setIdeaOutput] = useState<string>('');
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(false);

  const handleGenerateIdeas = async (): Promise<void> => {
    if (!ideaInput.trim()) {
      setIdeaOutput(
        '<p class="text-red-600">Por favor, descreva seu negócio ou objetivo para gerar ideias.</p>'
      );
      return;
    }

    setLoadingIdeas(true);
    setIdeaOutput(''); // Limpa a saída anterior

    try {
      const apiUrl: string = '/api/llmGenerative';

      const response: Response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: ideaInput }),
      });

      interface ApiResponse {
        text?: string;
        error?: string;
      }
      const data: ApiResponse = await response.json();

      if (response.ok) {
        setIdeaOutput(
          `<p class="font-bold mb-2">Ideias geradas:</p>${formatMarkdown(data.text?.replace(/\n/g, '<br>') || 'Nenhuma ideia gerada.')}`
        );
      } else {
        setIdeaOutput(
          `<p class="text-red-600">${data.error || 'Não foi possível gerar ideias. Tente novamente.'}</p>`
        );
      }
    } catch (error) {
      console.error('Erro ao chamar a API de geração de ideias:', error);
      setIdeaOutput(
        '<p class="text-red-600">Ocorreu um erro ao gerar as ideias. Verifique a conexão ou tente novamente mais tarde.</p>'
      );
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleClear = (): void => {
    setIdeaInput('');
    setIdeaOutput('');
  };

  const handleSendToWhatsApp = (): void => {
    const message = `Olá! Gostaria de solicitar o serviço de criação de conteúdo com base nas seguintes ideias:\n\n${ideaInput}\n\nIdeias geradas:\n${ideaOutput.replace(/<[^>]*>/g, '')}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-violet-50 dark:bg-violet-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white">
            Ideias com IA
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Deixe a inteligência artificial ajudar a criar ideias criativas para seu
            negócio.
          </p>
        </div>
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
          <textarea
            id="idea-input"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700 mb-4 h-32 resize-y text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Ex: 'Uma loja de cafés especiais buscando atrair clientes jovens com promoções de verão.'"
            value={ideaInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setIdeaInput(e.target.value)
            }
            disabled={!!ideaOutput || loadingIdeas}
          ></textarea>
          <div className="flex gap-4 mb-4">
            <button
              id="generate-ideas-button"
              onClick={handleGenerateIdeas}
              disabled={loadingIdeas || !!ideaOutput}
              className="flex-1 bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-violet-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingIdeas ? 'Gerando...' : 'Gerar Ideias'}
            </button>
            {ideaOutput && (
              <button
                onClick={handleClear}
                className="flex-1 bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-slate-700 transition duration-300"
              >
                Limpar
              </button>
            )}
          </div>
          {loadingIdeas && (
            <div
              id="loading-indicator"
              className="text-violet-700 dark:text-violet-400 text-center mb-4"
            >
              Carregando ideias...
            </div>
          )}
          <div
            id="idea-output"
            className="text-left text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700 min-h-[100px] overflow-y-auto mb-4"
            dangerouslySetInnerHTML={{ __html: ideaOutput }}
          ></div>
          {ideaOutput && !loadingIdeas && (
            <button
              onClick={handleSendToWhatsApp}
              className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition duration-300 w-full flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Solicitar Serviço via WhatsApp
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
