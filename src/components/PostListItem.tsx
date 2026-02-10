'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TranslatedText } from './TranslatedContent';
import { Calendar, ArrowRight } from 'lucide-react';

interface PostListItemProps {
  post: {
    id: number;
    generatedSlug: string;
    attributes: {
      title: string;
      content?: string;
      publishedAt?: string;
    };
    imageUrl: string | null;
  };
  basePath: string;
  readMoreText: string;
  isFeatured?: boolean;
}

/**
 * Função auxiliar para extrair texto do HTML
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Função auxiliar para obter preview do conteúdo
 */
function getContentPreview(content: string | undefined, maxLength: number = 150): string {
  if (!content) return '';
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Componente para renderizar um item de post na listagem com tradução automática
 */
export function PostListItem({ post, basePath, readMoreText, isFeatured = false }: PostListItemProps) {
  const contentPreview = getContentPreview(post.attributes.content, isFeatured ? 200 : 150);
  const formattedDate = post.attributes.publishedAt
    ? new Date(post.attributes.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  if (isFeatured) {
    return (
      <article
        className="lg:col-span-2 group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
      >
        <Link href={`${basePath}/${post.generatedSlug}`} className="block">
          <div className="flex flex-col lg:flex-row">
            {/* Imagem destacada */}
            <div className="relative w-full lg:w-1/2 h-64 lg:h-auto min-h-[300px] bg-gradient-to-br from-violet-100 to-violet-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
              {post.imageUrl ? (
                <Image
                  src={post.imageUrl}
                  alt={post.attributes.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-20">📄</div>
                    <p className="text-slate-400 dark:text-slate-600 text-sm">Sem imagem</p>
                  </div>
                </div>
              )}
              {/* Badge Featured */}
              <div className="absolute top-4 left-4 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Destaque
              </div>
            </div>

            {/* Conteúdo */}
            <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {formattedDate && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.attributes.publishedAt}>{formattedDate}</time>
                  </div>
                )}
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">
                  <TranslatedText text={post.attributes.title} />
                </h2>
                {contentPreview && (
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-4">
                    {contentPreview}
                  </p>
                )}
              </div>
              <div className="flex items-center text-violet-700 dark:text-violet-400 font-semibold group-hover:gap-2 transition-all">
                <span>{readMoreText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:-translate-y-1">
      <Link href={`${basePath}/${post.generatedSlug}`} className="block h-full flex flex-col">
        {/* Imagem */}
        <div className="relative w-full h-48 bg-gradient-to-br from-violet-100 to-violet-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.attributes.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2 opacity-20">📄</div>
                <p className="text-slate-400 dark:text-slate-600 text-xs">Sem imagem</p>
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex-1 flex flex-col">
          {formattedDate && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.attributes.publishedAt}>{formattedDate}</time>
            </div>
          )}
          <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
            <TranslatedText text={post.attributes.title} />
          </h2>
          {contentPreview && (
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {contentPreview}
            </p>
          )}
          <div className="flex items-center text-violet-700 dark:text-violet-400 font-medium text-sm mt-auto group-hover:gap-2 transition-all">
            <span>{readMoreText}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}

