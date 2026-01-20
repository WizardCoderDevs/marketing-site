import type { StrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';
import type { Metadata } from 'next';

import { siteUrl, siteUrlWithSlash } from '@/utils/siteUrl';
const siteName = 'BRANDS';

/**
 * Extrai texto puro do conteúdo para descrições e snippets
 * Lida com strings, arrays, objetos e rich text blocks do Strapi
 */
export function extractPlainText(content: any): string {
  if (typeof content === 'string') {
    // Remove tags HTML
    return content.replace(/<[^>]*>/g, '').trim();
  }
  
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === 'string') return block;
        if (block?.text) return block.text;
        if (block?.children) {
          return extractPlainText(block.children);
        }
        return '';
      })
      .join(' ')
      .trim();
  }
  
  if (content?.text) {
    return content.text;
  }
  
  if (content?.children) {
    return extractPlainText(content.children);
  }
  
  return '';
}

/**
 * Gera metadata otimizada para GEO (Generative Engine Optimization)
 * para posts do blog
 */
export function generatePostMetadata(
  post: StrapiPost,
  type: 'article' | 'news',
  slug: string
): Metadata {
  const title = post.attributes.title;
  
  // Usa extractPlainText para lidar com todos os tipos de conteúdo (string, array, objeto)
  const description = 
    post.attributes.description || 
    extractPlainText(post.attributes.content || post.attributes.body || post.attributes.text).substring(0, 160) ||
    `Leia ${type === 'article' ? 'o artigo' : 'a notícia'}: ${title}`;
  
  // Obtém a URL da imagem com a base URL da API do Strapi
  const apiBaseUrl = process.env.NEXT_STRAPI_API_URL || '';
  const imageUrl = getPostImageUrl(post, apiBaseUrl);
  const fullImageUrl = imageUrl 
    ? (imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`)
    : `${siteUrl}/og-image.jpg`;
  
  const url = `${siteUrl}/blog/${type === 'article' ? 'artigos' : 'noticias'}/${slug}`;
  const publishedTime = post.attributes.publishedAt;
  const modifiedTime = post.attributes.updatedAt;

  // Extrai tags para keywords
  const keywords = post.attributes.tags?.data?.map(tag => tag.attributes.name).join(', ') || '';

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords || undefined,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrlWithSlash),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: 'pt_BR',
      type: 'article',
      publishedTime,
      modifiedTime,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
