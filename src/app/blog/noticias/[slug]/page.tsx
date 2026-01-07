import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchStrapiPostBySlug, type StrapiPost } from '@/lib/strapi';
import { StrapiContent } from '@/utils/strapiContent';
import { getPostImageUrl } from '@/utils/strapiImage';
import { generatePostMetadata } from '@/utils/geoMetadata';
import { StructuredData } from '@/components/StructuredData';

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

async function getNoticia(slug: string): Promise<StrapiPost | null> {
  // Busca o post pelo slug gerado, passando 'news' como tag para otimizar a busca
  return fetchStrapiPostBySlug(slug, 'news');
}

/**
 * Gera metadata dinâmica para otimização GEO
 */
export async function generateMetadata({ params }: NoticiaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNoticia(slug);

  if (!post) {
    return {
      title: 'Notícia não encontrada',
    };
  }

  return generatePostMetadata(post, 'news', slug);
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { slug } = await params;
  const post = await getNoticia(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data para GEO */}
      <StructuredData post={post} type="news" slug={slug} />
      
      <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/NewsArticle">
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
              <h1 
                className="text-4xl font-bold mb-4 text-slate-900 dark:text-white"
                itemProp="headline"
              >
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
    </>
  );
}

