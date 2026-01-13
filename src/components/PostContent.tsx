'use client';

import { processStrapiContent } from '@/utils/strapiContent';
import { useTranslation } from 'react-i18next';
import { TranslatedContent, TranslatedText } from './TranslatedContent';

interface PostContentProps {
  title: string;
  content: any;
  publishedAt?: string;
  backLink: string;
  backLinkKey: string; // Chave de tradução para o link de voltar
  publishedKey: string; // Chave de tradução para "Publicado em"
}

/**
 * Componente client-side para renderizar conteúdo de posts com tradução automática
 */
export function PostContent({
  title,
  content,
  publishedAt,
  backLink,
  backLinkKey,
  publishedKey,
}: PostContentProps) {
  const { t } = useTranslation();
  // Processa o conteúdo do Strapi para HTML
  const processedContent = processStrapiContent(content);

  return (
    <>
      <a
        href={backLink}
        className="inline-block mb-6 text-violet-700 dark:text-violet-400 hover:underline font-medium"
      >
        ← {t(backLinkKey)}
      </a>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          <TranslatedText text={title} />
        </h1>
        {publishedAt && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t(publishedKey)}{' '}
            {new Date(publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </header>

      {processedContent ? (
        <TranslatedContent content={processedContent} />
      ) : (
        <div className="text-slate-600 dark:text-slate-400">
          <p className="mb-4">Conteúdo não disponível.</p>
        </div>
      )}
    </>
  );
}

