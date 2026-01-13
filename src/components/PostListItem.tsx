'use client';

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
}

/**
 * Componente para renderizar um item de post na listagem com tradução automática
 */
export function PostListItem({ post, basePath, readMoreText }: PostListItemProps) {
  return (
    <article
      key={post.id}
      className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
    >
      <Link 
        href={`${basePath}/${post.generatedSlug}`}
        className="flex-shrink-0"
      >
        <div className="relative w-full h-48 md:w-48 md:h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.attributes.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm">
              Sem imagem
            </div>
          )}
        </div>
      </Link>
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
          <Link
            href={`${basePath}/${post.generatedSlug}`}
            className="hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
          >
            <TranslatedText text={post.attributes.title} />
          </Link>
        </h2>
        {post.attributes.publishedAt && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {new Date(post.attributes.publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
        {post.attributes.content && (
          <div
            className="text-slate-700 dark:text-slate-300 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: typeof post.attributes.content === 'string' && post.attributes.content.length > 200
                ? post.attributes.content.substring(0, 200) + '...'
                : '',
            }}
          />
        )}
        <Link
          href={`${basePath}/${post.generatedSlug}`}
          className="inline-block mt-4 text-violet-700 dark:text-violet-400 hover:underline font-medium"
        >
          {readMoreText} →
        </Link>
      </div>
    </article>
  );
}

