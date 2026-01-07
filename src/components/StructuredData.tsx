import type { StrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';
import { extractPlainText } from '@/utils/geoMetadata';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brands.ppg.br';
const siteName = 'BRANDS';

interface StructuredDataProps {
  post: StrapiPost;
  type: 'article' | 'news';
  slug: string;
}

/**
 * Componente que gera JSON-LD structured data para otimização GEO
 * Implementa Schema.org Article e NewsArticle
 */
export function StructuredData({ post, type, slug }: StructuredDataProps) {
  const title = post.attributes.title;
  const description = 
    post.attributes.description || 
    extractPlainText(post.attributes.content || post.attributes.body || post.attributes.text).substring(0, 200);
  
  // Obtém a URL da imagem com a base URL da API do Strapi
  const apiBaseUrl = process.env.NEXT_STRAPI_API_URL || '';
  const imageUrl = getPostImageUrl(post, apiBaseUrl);
  const fullImageUrl = imageUrl 
    ? (imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`)
    : `${siteUrl}/og-image.jpg`;
  
  const url = `${siteUrl}/blog/${type === 'article' ? 'artigos' : 'noticias'}/${slug}`;
  const publishedTime = post.attributes.publishedAt;
  const modifiedTime = post.attributes.updatedAt;

  // Determina o tipo de schema baseado no tipo de post
  const schemaType = type === 'news' ? 'NewsArticle' : 'Article';

  // Extrai o conteúdo em texto puro
  const articleBody = extractPlainText(
    post.attributes.content || 
    post.attributes.body || 
    post.attributes.text || 
    post.attributes.description
  );

  // Cria o schema JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: title,
    description,
    image: fullImageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleBody,
    url,
    ...(type === 'news' && {
      newsUpdatesAndPolicyReporting: {
        '@type': 'NewsMediaOrganization',
        name: siteName,
      },
    }),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: type === 'article' ? 'Artigos' : 'Notícias',
        item: `${siteUrl}/blog/${type === 'article' ? 'artigos' : 'noticias'}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: title,
        item: url,
      },
    ],
  };

  // Organization schema (apenas uma vez por página)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Adicione suas redes sociais aqui
      // 'https://www.facebook.com/brands',
      // 'https://www.instagram.com/brands',
      // 'https://www.linkedin.com/company/brands',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}

