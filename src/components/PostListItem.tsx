'use client';

import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TranslatedText } from './TranslatedContent';

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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

function getContentPreview(content: string | undefined, maxLength: number = 150): string {
  if (!content) return '';
  const text = stripHtml(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function PostListItem({ post, basePath, readMoreText, isFeatured = false }: PostListItemProps) {
  const contentPreview = getContentPreview(post.attributes.content, isFeatured ? 400 : 250);
  const formattedDate = post.attributes.publishedAt
    ? new Date(post.attributes.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null;

  const title = post.attributes.title;

  return (
    <article 
      className={`group relative bg-white dark:bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500`}
    >
      <div className="flex flex-col md:flex-row min-h-fit">
        {/* Lado Esquerdo: Imagem (1/3 no desktop para ser horizontal) */}
        <div className="relative w-full md:w-[35%] lg:w-[30%] h-72 md:h-auto overflow-hidden shrink-0">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              priority={isFeatured}
            />
          ) : (
            <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
              <span className="text-slate-200 dark:text-slate-800 text-6xl">📄</span>
            </div>
          )}
          {isFeatured && (
            <div className="absolute top-8 left-8 z-10">
              <span className="bg-violet-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl">
                Destaque
              </span>
            </div>
          )}
        </div>

        {/* Lado Direito: Conteúdo (65-70% no desktop) */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {formattedDate && (
                <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.attributes.publishedAt}>{formattedDate}</time>
                </div>
              )}
            </div>
            
            <Link href={`${basePath}/${post.generatedSlug}`} className="block no-underline group/link">
              <h2 className={`${isFeatured ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl'} font-bold text-slate-900 dark:text-white leading-[1.2] tracking-tight group-hover/link:text-violet-600 dark:group-hover/link:text-violet-400 transition-colors duration-300`}>
                <TranslatedText text={title} />
              </h2>
            </Link>

            {contentPreview && (
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-light line-clamp-2 md:line-clamp-3">
                {contentPreview}
              </p>
            )}
          </div>

          <div className="mt-10">
            <Link 
              href={`${basePath}/${post.generatedSlug}`}
              className="inline-flex items-center gap-4 text-slate-900 dark:text-white font-bold no-underline group/btn"
            >
              <span className="text-sm uppercase tracking-widest border-b-2 border-transparent group-hover/btn:border-violet-600 transition-all pb-1">{readMoreText}</span>
              <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover/btn:bg-violet-600 group-hover/btn:border-violet-600 transition-all duration-300">
                <ArrowRight className="w-5 h-5 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}




