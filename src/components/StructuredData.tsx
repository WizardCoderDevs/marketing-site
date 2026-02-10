import type { StrapiPost } from '@/lib/strapi';
import { extractPlainText } from '@/utils/geoMetadata';
import { siteUrl, siteUrlWithSlash } from '@/utils/siteUrl';
import { getPostImageUrl } from '@/utils/strapiImage';
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
      url: siteUrlWithSlash,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrlWithSlash,
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
        item: siteUrlWithSlash,
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
    url: siteUrlWithSlash,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Especialistas em posicionamento estratégico e gestão de autoridade.',
    description_pt: 'Marketing jurídico estratégico para escritórios de advocacia de alto valor. Especialistas em posicionamento estratégico e gestão de autoridade.',
    description_en: 'Strategic legal marketing for high-value law firms. Specialists in strategic positioning and authority management.',
    foundingDate: '2026',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Portuguese', 'English', 'pt-BR', 'en-US', 'en-GB', 'en-CA', 'en-AU'],
    },
    sameAs: [
      'https://www.facebook.com/brands.ppg.br',
      'https://www.instagram.com/brands.ppg.br',
      // 'https://www.linkedin.com/company/brands',
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Brasil',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'Canada',
      },
      {
        '@type': 'Country',
        name: 'Australia',
      },
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

