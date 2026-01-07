import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchStrapiPostBySlug, type StrapiPost } from '@/lib/strapi';
import { StrapiContent } from '@/utils/strapiContent';
import { getPostImageUrl } from '@/utils/strapiImage';
import { generatePostMetadata } from '@/utils/geoMetadata';
import { StructuredData } from '@/components/StructuredData';

// Força renderização dinâmica para buscar dados atualizados do Strapi
export const dynamic = 'force-dynamic';

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

async function getNoticia(slug: string): Promise<StrapiPost | null> {
  // Normaliza o slug (remove encoding, espaços, etc)
  const normalizedSlug = decodeURIComponent(slug).trim();
  
  console.log('[NoticiaPage] Buscando notícia com slug:', {
    original: slug,
    normalized: normalizedSlug,
    encoded: encodeURIComponent(slug),
    length: slug.length,
  });
  
  // Busca o post pelo slug gerado, passando 'news' como tag para otimizar a busca
  // Tenta primeiro com o slug normalizado, depois com o original
  let post = await fetchStrapiPostBySlug(normalizedSlug, 'news');
  
  if (!post && normalizedSlug !== slug) {
    console.log('[NoticiaPage] Tentando com slug original:', slug);
    post = await fetchStrapiPostBySlug(slug, 'news');
  }
  
  console.log('[NoticiaPage] Resultado da busca:', {
    slug,
    normalizedSlug,
    found: !!post,
    postId: post?.id,
    postTitle: post?.attributes.title,
  });
  
  return post;
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
  
  console.log('[NoticiaPage] Renderizando página para slug:', slug);
  
  let post: StrapiPost | null = null;
  let retryCount = 0;
  const maxRetries = 2;

  // Tenta buscar o post com retry
  while (!post && retryCount < maxRetries) {
    console.log(`[NoticiaPage] Tentativa ${retryCount + 1} de ${maxRetries}`);
    post = await getNoticia(slug);
    
    if (!post && retryCount < maxRetries - 1) {
      console.log('[NoticiaPage] Post não encontrado, aguardando antes de tentar novamente...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    }
    retryCount++;
  }

  if (!post) {
    console.error('[NoticiaPage] Post não encontrado após todas as tentativas:', {
      slug,
      retries: retryCount,
    });
    notFound();
  }

  console.log('[NoticiaPage] Post encontrado, renderizando página:', {
    id: post.id,
    title: post.attributes.title,
  });

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

