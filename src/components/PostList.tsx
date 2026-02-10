'use client';

import { useTranslation } from 'react-i18next';
import { PostListItem } from './PostListItem';

interface PostListProps {
  posts: Array<{
    id: number;
    generatedSlug: string;
    attributes: {
      title: string;
      content?: string;
      publishedAt?: string;
    };
    imageUrl: string | null;
  }>;
  basePath: string;
  titleKey: string;
  noPostsKey: string;
  readMoreKey: string;
}

/**
 * Componente client-side para renderizar lista de posts com tradução
 */
export function PostList({ posts, basePath, titleKey, noPostsKey, readMoreKey }: PostListProps) {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-10 lg:mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
          {t(titleKey)}
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-violet-400 rounded-full"></div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 lg:py-24">
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-6xl">📝</div>
            <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl">
              {t(noPostsKey)}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <PostListItem
              key={post.id}
              post={post}
              basePath={basePath}
              readMoreText={t(readMoreKey)}
              isFeatured={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

