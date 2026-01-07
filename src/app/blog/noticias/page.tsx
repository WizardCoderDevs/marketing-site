import Link from 'next/link';

import { fetchStrapiPosts, type ProcessedStrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';

interface PostWithImage extends ProcessedStrapiPost {
  imageUrl: string | null;
}

async function getNoticias() {
  return fetchStrapiPosts('news');
}

/**
 * Processa os posts no servidor e adiciona as URLs das imagens
 */
async function processPostsWithImages(posts: ProcessedStrapiPost[]): Promise<PostWithImage[]> {
  const apiBaseUrl = process.env.NEXT_STRAPI_API_URL || '';
  
  return posts.map((post) => {
    // Processa a imagem no servidor
    const imageUrl = getPostImageUrl(post, apiBaseUrl);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SERVER] Processando notícia: ${post.attributes.title}`);
      console.log(`[SERVER] URL da imagem encontrada: ${imageUrl}`);
    }
    
    return {
      ...post,
      imageUrl,
    };
  });
}

export default async function NoticiasPage() {
  let posts: ProcessedStrapiPost[] = [];
  let processedPosts: PostWithImage[] = [];

  try {
    // Busca os posts do Strapi (server-side)
    posts = await getNoticias();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SERVER] Total de notícias encontradas: ${posts.length}`);
    }
    
    // Processa as imagens no servidor antes de renderizar
    processedPosts = await processPostsWithImages(posts);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SERVER] Notícias processadas com imagens: ${processedPosts.length}`);
      processedPosts.forEach((post) => {
        console.log(`[SERVER] - ${post.attributes.title}: ${post.imageUrl ? '✅ Tem imagem' : '❌ Sem imagem'}`);
      });
    }
  } catch (error) {
    console.error('[SERVER] Erro ao carregar notícias:', error);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
        Notícias
      </h1>

      {processedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Nenhuma notícia encontrada no momento.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {processedPosts.map((post) => {
            return (
              <article
                key={post.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
              >
                <Link 
                  href={`/blog/noticias/${post.generatedSlug}`}
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
                      href={`/blog/noticias/${post.generatedSlug}`}
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
                    href={`/blog/noticias/${post.generatedSlug}`}
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

