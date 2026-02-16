import type { MetadataRoute } from 'next';

import { fetchStrapiPosts } from '@/lib/strapi';
import { siteUrl } from '@/utils/siteUrl';

function toUrl(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Rotas estáticas principais com prioridades otimizadas
  // Inclui versões em inglês para SEO internacional
  const staticRoutes: MetadataRoute.Sitemap = [
    // Português (Brasil) - versões principais
    { 
      url: toUrl('/'), 
      lastModified: now, 
      changeFrequency: 'weekly', 
      priority: 1.0 
    },
    { 
      url: toUrl('/servicos'), 
      lastModified: now, 
      changeFrequency: 'weekly', 
      priority: 0.9 
    },
    { 
      url: toUrl('/blog'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.8 
    },
    { 
      url: toUrl('/blog/artigos'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.8 
    },
    { 
      url: toUrl('/blog/noticias'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.8 
    },
    { 
      url: toUrl('/politica-de-privacidade'), 
      lastModified: now, 
      changeFrequency: 'yearly', 
      priority: 0.3 
    },
    // Inglês - versões para público internacional
    { 
      url: toUrl('/?lang=en'), 
      lastModified: now, 
      changeFrequency: 'weekly', 
      priority: 0.95 
    },
    { 
      url: toUrl('/servicos?lang=en'), 
      lastModified: now, 
      changeFrequency: 'weekly', 
      priority: 0.85 
    },
    { 
      url: toUrl('/blog?lang=en'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.75 
    },
    { 
      url: toUrl('/blog/artigos?lang=en'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.75 
    },
    { 
      url: toUrl('/blog/noticias?lang=en'), 
      lastModified: now, 
      changeFrequency: 'daily', 
      priority: 0.75 
    },
  ];

  // Busca posts do Strapi com limite expandido para garantir inclusão de todos os artigos/notícias
  const [articlePosts, newsPosts] = await Promise.all([
    fetchStrapiPosts('article', 1000).catch(() => []),
    fetchStrapiPosts('news', 1000).catch(() => []),
  ]);

  // Artigos do blog - prioridade alta para conteúdo
  // Inclui versões em português e inglês
  const articleEntries: MetadataRoute.Sitemap = articlePosts.flatMap((post) => {
    const baseSlug = post.generatedSlug || post.attributes.slug;
    const lastModified = new Date(post.attributes.updatedAt || post.attributes.publishedAt || now);
    
    return [
      {
        url: toUrl(`/blog/artigos/${baseSlug}`),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: toUrl(`/blog/artigos/${baseSlug}?lang=en`),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      },
    ];
  });

  // Notícias do blog - prioridade alta para conteúdo atualizado
  // Inclui versões em português e inglês
  const newsEntries: MetadataRoute.Sitemap = newsPosts.flatMap((post) => {
    const baseSlug = post.generatedSlug || post.attributes.slug;
    const lastModified = new Date(post.attributes.updatedAt || post.attributes.publishedAt || now);
    
    return [
      {
        url: toUrl(`/blog/noticias/${baseSlug}`),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: toUrl(`/blog/noticias/${baseSlug}?lang=en`),
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.65,
      },
    ];
  });

  return [...staticRoutes, ...articleEntries, ...newsEntries];
}

