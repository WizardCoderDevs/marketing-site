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

  return (
    <section id="ia-content-ideas" className="py-20 bg-stone-50 dark:bg-slate-800">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 dark:text-white mb-4">
          ✨ Ideias de Conteúdo com IA ✨
        </h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
          Descreva seu negócio ou o objetivo da sua próxima campanha e a nossa
          inteligência artificial gerará ideias criativas para suas redes sociais.
        </p>
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
          <textarea
            id="idea-input"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700 mb-4 h-32 resize-y text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800"
            placeholder="Ex: 'Uma loja de cafés especiais buscando atrair clientes jovens com promoções de verão.'"
            value={ideaInput}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setIdeaInput(e.target.value)
            }
          ></textarea>
          <button
            id="generate-ideas-button"
            onClick={handleGenerateIdeas}
            disabled={loadingIdeas}
            className="bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-violet-800 transition duration-300 w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingIdeas ? 'Gerando...' : 'Gerar Ideias'}
          </button>
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
            className="text-left text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700 min-h-[100px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: ideaOutput }}
          ></div>
        </div>
      </div>
    </section>
  );
}
