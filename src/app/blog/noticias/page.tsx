import Image from 'next/image';
import Link from 'next/link';

import { fetchStrapiPosts, type StrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';

async function getNoticias() {
  return fetchStrapiPosts('news');
}

export default async function NoticiasPage() {
  let posts: StrapiPost[] = [];

  try {
    posts = await getNoticias();
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
        Notícias
      </h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Nenhuma notícia encontrada no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
            const imageUrl = getPostImageUrl(post);
            
            return (
              <article
                key={post.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {imageUrl && (
                  <Link href={`/blog/noticias/${post.attributes.slug || post.id}`}>
                    <div className="relative w-full h-64 md:h-80">
                      <Image
                        src={imageUrl}
                        alt={post.attributes.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">
                    <Link
                      href={`/blog/noticias/${post.attributes.slug || post.id}`}
                      className="hover:text-violet-700 dark:hover:text-violet-400 transition-colors"
                    >
                      {post.attributes.title}
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
                    href={`/blog/noticias/${post.attributes.slug || post.id}`}
                    className="inline-block mt-4 text-violet-700 dark:text-violet-400 hover:underline font-medium"
                  >
                    Ler mais →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

