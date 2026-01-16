import type { MetadataRoute } from 'next';

import { fetchStrapiPosts } from '@/lib/strapi';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brands.ppg.br';

function toUrl(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: toUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: toUrl('/servicos'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: toUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: toUrl('/blog/artigos'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: toUrl('/blog/noticias'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: toUrl('/politica-de-privacidade'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [articlePosts, newsPosts] = await Promise.all([
    fetchStrapiPosts('article'),
    fetchStrapiPosts('news'),
  ]);

  const articleEntries: MetadataRoute.Sitemap = articlePosts.map((post) => ({
    url: toUrl(`/blog/artigos/${post.generatedSlug || post.attributes.slug}`),
    lastModified: new Date(post.attributes.updatedAt || post.attributes.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: toUrl(`/blog/noticias/${post.generatedSlug || post.attributes.slug}`),
    lastModified: new Date(post.attributes.updatedAt || post.attributes.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleEntries, ...newsEntries];
}

