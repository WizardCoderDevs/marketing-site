'use client';

import { processStrapiContent } from '@/utils/strapiContent';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ContactCTASection from './ContactCTASection';
import TextToSpeechControls from './TextToSpeechControls';
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
 * Função auxiliar para calcular tempo de leitura
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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
  const readingTime = processedContent ? calculateReadingTime(processedContent) : 0;
  
  const postTypographyClass =
    'prose prose-lg prose-slate dark:prose-invert max-w-none ' +
    'prose-h1:text-4xl prose-h1:font-bold prose-h1:mt-12 prose-h1:mb-6 ' +
    'prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-5 ' +
    'prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 ' +
    'prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3 ' +
    'prose-headings:text-slate-900 dark:prose-headings:text-slate-100 ' +
    'prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 ' +
    'prose-strong:text-violet-700 dark:prose-strong:text-violet-400 prose-strong:font-semibold ' +
    'prose-a:text-violet-700 dark:prose-a:text-violet-400 prose-a:font-medium hover:prose-a:underline ' +
    'prose-ul:my-6 prose-ol:my-6 prose-li:my-2 ' +
    'prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:pl-6 prose-blockquote:italic ' +
    'prose-code:text-violet-700 dark:prose-code:text-violet-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded ' +
    'prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700 ' +
    'prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 ' +
    'prose-hr:border-slate-300 dark:prose-hr:border-slate-700';

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="space-y-8">
      {/* Botão de voltar */}
      <Link
        href={backLink}
        className="inline-flex items-center gap-2 text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 font-medium transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{t(backLinkKey)}</span>
      </Link>

      {/* Header do post */}
      <header className="space-y-6 pb-8 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">
            <TranslatedText text={title} />
          </h1>
        </div>
        
        {/* Metadata */}
        {(formattedDate || readingTime > 0) && (
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <time dateTime={publishedAt}>
                  <span className="font-medium">{t(publishedKey)}</span>{' '}
                  {formattedDate}
                </time>
              </div>
            )}
            {readingTime > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>{readingTime} min de leitura</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Controles de Text-to-Speech */}
      {processedContent && (
        <div className="flex justify-center">
          <TextToSpeechControls title={title} html={processedContent} />
        </div>
      )}

      {/* Conteúdo do post */}
      <div className="pt-4">
        {processedContent ? (
          <TranslatedContent content={processedContent} className={postTypographyClass} />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-20">📄</div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Conteúdo não disponível.
            </p>
          </div>
        )}
      </div>

      {/* Separador */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
        <ContactCTASection />
      </div>
    </div>
  );
}

