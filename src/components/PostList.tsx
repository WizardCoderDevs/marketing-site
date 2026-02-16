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
      updatedAt?: string;
    };
    imageUrl: string | null;
  }>;
  basePath: string;
  titleKey: string;
  noPostsKey: string;
  readMoreKey: string;
}

export function PostList({ posts, basePath, titleKey, noPostsKey, readMoreKey }: PostListProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 lg:py-24">
        {/* Header Limpo e Profissional */}
        <header className="mb-12 lg:mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            {t(titleKey)}
          </h1>
          <div className="mt-4 h-1.5 w-20 bg-violet-600 rounded-full"></div>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="max-w-md mx-auto">
              <div className="mb-6 text-6xl">📝</div>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {t(noPostsKey)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:gap-16">
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
    </div>
  );
}


