import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { fetchStrapiPostBySlug, type StrapiPost } from '@/lib/strapi';
import { StrapiContent } from '@/utils/strapiContent';
import { getPostImageUrl } from '@/utils/strapiImage';

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

async function getNoticia(slug: string): Promise<StrapiPost | null> {
  return fetchStrapiPostBySlug(slug);
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { slug } = await params;
  const post = await getNoticia(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <Link
        href="/blog/noticias"
        className="inline-block mb-6 text-violet-700 dark:text-violet-400 hover:underline font-medium"
      >
        ← Voltar para Notícias
      </Link>

      {(() => {
        const imageUrl = getPostImageUrl(post);
        
        return (
          <>
            {imageUrl && (
              <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.attributes.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  priority
                />
              </div>
            )}
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                {post.attributes.title}
              </h1>
              {post.attributes.publishedAt && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Publicado em{' '}
                  {new Date(post.attributes.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
            </header>
          </>
        );
      })()}

      {(() => {
        // Tenta encontrar o conteúdo em diferentes campos possíveis
        const content = 
          post.attributes.content || 
          post.attributes.body || 
          post.attributes.text || 
          post.attributes.description ||
          null;

        if (content) {
          return <StrapiContent content={content} />;
        }

        return (
          <div className="text-slate-600 dark:text-slate-400">
            <p className="mb-4">Conteúdo não disponível.</p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded">
                <summary className="cursor-pointer font-semibold">Debug: Estrutura dos dados</summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {JSON.stringify(post.attributes, null, 2)}
                </pre>
              </details>
            )}
          </div>
        );
      })()}
    </article>
  );
}

