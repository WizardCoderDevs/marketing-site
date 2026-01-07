import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

import { fetchStrapiPostBySlug, type StrapiPost } from '@/lib/strapi';
import { StrapiContent } from '@/utils/strapiContent';
import { getPostImageUrl } from '@/utils/strapiImage';
import { generatePostMetadata } from '@/utils/geoMetadata';
import { StructuredData } from '@/components/StructuredData';

// Força renderização dinâmica para buscar dados atualizados do Strapi
export const dynamic = 'force-dynamic';

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

async function getArtigo(slug: string): Promise<StrapiPost | null> {
  console.log('[ArtigoPage] Buscando artigo com slug:', slug);
  // Busca o post pelo slug gerado, passando 'article' como tag para otimizar a busca
  const post = await fetchStrapiPostBySlug(slug, 'article');
  console.log('[ArtigoPage] Resultado da busca:', {
    slug,
    found: !!post,
    postId: post?.id,
    postTitle: post?.attributes.title,
  });
  return post;
}

/**
 * Gera metadata dinâmica para otimização GEO
 */
export async function generateMetadata({ params }: ArtigoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArtigo(slug);

  if (!post) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  return generatePostMetadata(post, 'article', slug);
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;
  const post = await getArtigo(slug);

  if (!post) {
    notFound();
  }

  // Debug: log para verificar a estrutura dos dados
  if (process.env.NODE_ENV === 'development') {
    console.log('Post data:', JSON.stringify(post, null, 2));
  }

  return (
    <>
      {/* JSON-LD Structured Data para GEO */}
      <StructuredData post={post} type="article" slug={slug} />
      
      <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/Article">
        <Link
          href="/blog/artigos"
          className="inline-block mb-6 text-violet-700 dark:text-violet-400 hover:underline font-medium"
        >
          ← Voltar para Artigos
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

