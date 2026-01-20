import { fetchStrapiPosts } from '@/lib/strapi';
import { siteUrl } from '@/utils/siteUrl';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildItemPath(post: Awaited<ReturnType<typeof fetchStrapiPosts>>[number]) {
  const slug = post.generatedSlug || post.attributes.slug;
  const tagNames =
    post.attributes.tags?.data?.map((tag) => tag.attributes.name.toLowerCase()) || [];
  const typePath = tagNames.includes('news') ? 'noticias' : 'artigos';
  return `/blog/${typePath}/${slug}`;
}

export async function GET() {
  const [articles, news] = await Promise.all([
    fetchStrapiPosts('article'),
    fetchStrapiPosts('news'),
  ]);

  const combinedPosts = [...articles, ...news];
  const uniquePosts = new Map(
    combinedPosts.map((post) => {
      const url = `${siteUrl}${buildItemPath(post)}`;
      return [url, post];
    }),
  );

  const items = Array.from(uniquePosts.entries())
    .sort(([, a], [, b]) => {
      const aDate = new Date(a.attributes.publishedAt || a.attributes.updatedAt).getTime();
      const bDate = new Date(b.attributes.publishedAt || b.attributes.updatedAt).getTime();
      return bDate - aDate;
    })
    .map(([url, post]) => {
      const title = escapeXml(post.attributes.title);
      const pubDate = new Date(
        post.attributes.publishedAt || post.attributes.updatedAt,
      ).toUTCString();
      const description = escapeXml(post.attributes.description || post.attributes.title);

      return `
        <item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${description}</description>
        </item>
      `;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>BRANDS - Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Artigos e notícias da BRANDS</description>
      <language>pt-BR</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}

