import { PostList } from '@/components/PostList';
import { fetchStrapiPosts, type ProcessedStrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';

// Força renderização dinâmica para buscar dados atualizados do Strapi
export const dynamic = 'force-dynamic';

interface PostWithImage extends ProcessedStrapiPost {
  imageUrl: string | null;
}

async function getNoticias() {
  return fetchStrapiPosts('news');
}

/**
 * Processa os posts no servidor e adiciona as URLs das imagens
 */
async function processPostsWithImages(posts: ProcessedStrapiPost[]): Promise<PostWithImage[]> {
  const apiBaseUrl = process.env.NEXT_STRAPI_API_URL || '';
  
  return posts.map((post) => {
    // Processa a imagem no servidor
    const imageUrl = getPostImageUrl(post, apiBaseUrl);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[SERVER] Processando notícia: ${post.attributes.title}`);
      console.log(`[SERVER] URL da imagem encontrada: ${imageUrl}`);
    }
    
    return {
      ...post,
      imageUrl,
    };
  });
}

export default async function NoticiasPage() {
  let posts: ProcessedStrapiPost[] = [];
  let processedPosts: PostWithImage[] = [];

  console.log('[NoticiasPage] Iniciando carregamento de notícias');

  try {
    // Busca os posts do Strapi (server-side)
    console.log('[NoticiasPage] Chamando getNoticias()...');
    posts = await getNoticias();
    
    console.log(`[NoticiasPage] Total de notícias encontradas: ${posts.length}`);
    
    const firstPost = posts[0];
    if (firstPost) {
      console.log('[NoticiasPage] Primeira notícia:', {
        id: firstPost.id,
        title: firstPost.attributes.title,
        hasContent: !!firstPost.attributes.content,
      });
    }
    
    // Processa as imagens no servidor antes de renderizar
    console.log('[NoticiasPage] Processando imagens...');
    processedPosts = await processPostsWithImages(posts);
    
    console.log(`[NoticiasPage] Notícias processadas com imagens: ${processedPosts.length}`);
    
    const firstProcessedPost = processedPosts[0];
    if (firstProcessedPost) {
      console.log('[NoticiasPage] Primeira notícia processada:', {
        id: firstProcessedPost.id,
        title: firstProcessedPost.attributes.title,
        hasImage: !!firstProcessedPost.imageUrl,
      });
    }
  } catch (error) {
    console.error('[NoticiasPage] Erro ao carregar notícias:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  console.log(`[NoticiasPage] Renderizando página com ${processedPosts.length} notícias`);

  return (
    <PostList
      posts={processedPosts}
      basePath="/blog/noticias"
      titleKey="blog.noticias.title"
      noPostsKey="blog.noticias.noPosts"
      readMoreKey="blog.noticias.readMore"
    />
  );
}

