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

  // URLs para diferentes idiomas
  const enUrl = `${url}?lang=en`;

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords || undefined,
    authors: [{ name: siteName, url: siteUrlWithSlash }],
    creator: siteName,
    publisher: siteName,
    category: type === 'article' ? 'Artigo' : 'Notícia',
    metadataBase: new URL(siteUrlWithSlash),
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': url,
        'en': enUrl,
        'en-US': enUrl,
        'en-GB': enUrl,
        'en-CA': enUrl,
        'en-AU': enUrl,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: 'pt_BR',
      alternateLocale: ['en_US', 'en_GB', 'en_CA', 'en_AU'],
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: [siteName],
      section: type === 'article' ? 'Artigos' : 'Notícias',
      tags: keywords ? keywords.split(', ') : undefined,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@brands_ppg',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': publishedTime || '',
      'article:modified_time': modifiedTime || publishedTime || '',
      'article:author': siteName,
      'article:section': type === 'article' ? 'Artigos' : 'Notícias',
    },
  };
}
