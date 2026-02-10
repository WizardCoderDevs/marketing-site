import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import NewsletterSignupPopup from '@/components/NewsletterSignupPopup';
import { PostContent } from '@/components/PostContent';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { StructuredData } from '@/components/StructuredData';
import { fetchStrapiPostBySlug, type StrapiPost } from '@/lib/strapi';
import { generatePostMetadata } from '@/utils/geoMetadata';
import { getPostImageUrl } from '@/utils/strapiImage';

// Força renderização dinâmica para buscar dados atualizados do Strapi
export const dynamic = 'force-dynamic';

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

async function getArtigo(slug: string): Promise<StrapiPost | null> {
  // Normaliza o slug (remove encoding, espaços, etc)
  const normalizedSlug = decodeURIComponent(slug).trim();
  
  console.log('[ArtigoPage] Buscando artigo com slug:', {
    original: slug,
    normalized: normalizedSlug,
    encoded: encodeURIComponent(slug),
    length: slug.length,
  });
  
  // Busca o post pelo slug gerado, passando 'article' como tag para otimizar a busca
  // Tenta primeiro com o slug normalizado, depois com o original
  let post = await fetchStrapiPostBySlug(normalizedSlug, 'article');
  
  if (!post && normalizedSlug !== slug) {
    console.log('[ArtigoPage] Tentando com slug original:', slug);
    post = await fetchStrapiPostBySlug(slug, 'article');
  }
  
  console.log('[ArtigoPage] Resultado da busca:', {
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
  
  console.log('[ArtigoPage] Renderizando página para slug:', slug);
  
  let post: StrapiPost | null = null;
  let retryCount = 0;
  const maxRetries = 2;

  // Tenta buscar o post com retry
  while (!post && retryCount < maxRetries) {
    console.log(`[ArtigoPage] Tentativa ${retryCount + 1} de ${maxRetries}`);
    post = await getArtigo(slug);
    
    if (!post && retryCount < maxRetries - 1) {
      console.log('[ArtigoPage] Post não encontrado, aguardando antes de tentar novamente...');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    }
    retryCount++;
  }

  if (!post) {
    console.error('[ArtigoPage] Post não encontrado após todas as tentativas:', {
      slug,
      retries: retryCount,
    });
    notFound();
  }

  console.log('[ArtigoPage] Post encontrado, renderizando página:', {
    id: post.id,
    title: post.attributes.title,
  });

  const imageUrl = getPostImageUrl(post);
  const content = 
    post.attributes.content || 
    post.attributes.body || 
    post.attributes.text || 
    post.attributes.description ||
    null;

  return (
    <>
      {/* JSON-LD Structured Data para GEO */}
      <StructuredData post={post} type="article" slug={slug} />
      <ReadingProgressBar targetId="post-article" />
      
      <article
        id="post-article"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        itemScope
        itemType="https://schema.org/Article"
      >
        {imageUrl && (
          <div className="relative w-full h-72 md:h-[500px] lg:h-[600px] mb-10 lg:mb-16 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src={imageUrl}
              alt={post.attributes.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              priority
            />
            {/* Overlay gradient para melhorar legibilidade do texto sobre a imagem (se necessário) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <PostContent
            title={post.attributes.title}
            content={content}
            publishedAt={post.attributes.publishedAt}
            backLink="/blog/artigos"
            backLinkKey="blog.artigos.backLink"
            publishedKey="blog.artigos.published"
          />
        </div>
      </article>
      <NewsletterSignupPopup />
    </>
  );
}

