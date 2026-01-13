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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
        {t(titleKey)}
      </h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {t(noPostsKey)}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              basePath={basePath}
              readMoreText={t(readMoreKey)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

