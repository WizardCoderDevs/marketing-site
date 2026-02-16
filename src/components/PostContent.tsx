'use client';

import { processStrapiContent } from '@/utils/strapiContent';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Inter, Playfair_Display } from 'next/font/google';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import ContactCTASection from './ContactCTASection';
import TextToSpeechControls from './TextToSpeechControls';
import { TranslatedContent, TranslatedText } from './TranslatedContent';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

interface PostContentProps {
  title: string;
  content: any;
  publishedAt?: string;
  backLink: string;
  backLinkKey: string;
  publishedKey: string;
  updatedAt?: string;
  updatedKey?: string;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function PostContent({
  title,
  content,
  publishedAt,
  backLink,
  backLinkKey,
  publishedKey,
  updatedAt,
  updatedKey,
}: PostContentProps) {
  const { t } = useTranslation();
  const processedContent = processStrapiContent(content);
  const readingTime = processedContent ? calculateReadingTime(processedContent) : 0;
  
  const postTypographyClass =
    `max-w-none ${inter.className} ` +
    'prose md:prose-lg lg:prose-xl prose-slate dark:prose-invert ' +
    'prose-h2:font-playfair prose-h2:text-2xl md:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-8 prose-h2:tracking-tight ' +
    'prose-h3:font-playfair prose-h3:text-xl md:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:font-bold prose-h3:mt-12 prose-h3:mb-6 ' +
    'prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-base md:prose-p:text-lg lg:prose-p:text-xl ' +
    'prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold ' +
    'prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-violet-50 dark:prose-blockquote:bg-violet-900/10 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200 ' +
    'prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 ' +
    'prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline ' +
    'prose-li:text-base md:prose-li:text-lg lg:prose-li:text-xl prose-li:leading-relaxed ' +
    'prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-hr:my-16';

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const formattedUpdateDate = updatedAt && updatedAt !== publishedAt
    ? new Date(updatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className={`space-y-12 ${inter.variable} ${playfair.variable}`}>
      {/* Botão de voltar e Compartilhar */}
      <div className="flex items-center justify-between animate-fade-in">
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-all group px-4 py-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t(backLinkKey)}</span>
        </Link>
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title, url: window.location.href });
            }
          }}
          className="p-2 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Header do post */}
      <header className="space-y-10">
        <div className="space-y-4">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tight break-words ${playfair.className}`}>
            <TranslatedText text={title} />
          </h1>
        </div>
        
        {/* Metadata Superior */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 py-6 border-y border-slate-100 dark:border-slate-800/50">
          {formattedDate && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t(publishedKey)}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{formattedDate}</p>
              </div>
            </div>
          )}
          {formattedUpdateDate && updatedKey && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t(updatedKey)}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{formattedUpdateDate}</p>
              </div>
            </div>
          )}
          {readingTime > 0 && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Tempo de Leitura</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{readingTime} min</p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Controles de Text-to-Speech com Design Moderno */}
      {processedContent && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <TextToSpeechControls title={title} html={processedContent} />
        </div>
      )}

      {/* Conteúdo do post */}
      <article className="relative">
        {/* Decorative element background */}
        <div className="absolute -left-24 top-40 w-0.5 h-64 bg-gradient-to-b from-transparent via-violet-500/20 to-transparent hidden xl:block" />
        
        <div className="content-area">
          {processedContent ? (
            <TranslatedContent content={processedContent} className={postTypographyClass} />
          ) : (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <div className="text-6xl mb-6 opacity-20">📄</div>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-light">
                O conteúdo desta publicação ainda está sendo preparado.
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Rodapé do Post / Newsletter / Outros */}
      <footer className="pt-20 space-y-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        <ContactCTASection />
      </footer>
    </div>
  );
}


