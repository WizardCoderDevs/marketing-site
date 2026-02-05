import { PostList } from '@/components/PostList';
import { fetchStrapiPosts, type ProcessedStrapiPost } from '@/lib/strapi';
import { getPostImageUrl } from '@/utils/strapiImage';



interface PostWithImage extends ProcessedStrapiPost {
  imageUrl: string | null;
}

async function getArtigos() {
  return fetchStrapiPosts('article');
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
      console.log(`[SERVER] Processando post: ${post.attributes.title}`);
      console.log(`[SERVER] URL da imagem encontrada: ${imageUrl}`);
    }
    
    return {
      ...post,
      imageUrl,
    };
  });
}

export default async function ArtigosPage() {
  let posts: ProcessedStrapiPost[] = [];
  let processedPosts: PostWithImage[] = [];

  console.log('[ArtigosPage] Iniciando carregamento de artigos');

  try {
    // Busca os posts do Strapi (server-side)
    console.log('[ArtigosPage] Chamando getArtigos()...');
    posts = await getArtigos();
    
    console.log(`[ArtigosPage] Total de artigos encontrados: ${posts.length}`);
    
    const firstPost = posts[0];
    if (firstPost) {
      console.log('[ArtigosPage] Primeiro artigo:', {
        id: firstPost.id,
        title: firstPost.attributes.title,
        hasContent: !!firstPost.attributes.content,
      });
    }
    
    // Processa as imagens no servidor antes de renderizar
    console.log('[ArtigosPage] Processando imagens...');
    processedPosts = await processPostsWithImages(posts);
    
    console.log(`[ArtigosPage] Artigos processados com imagens: ${processedPosts.length}`);
    
    const firstProcessedPost = processedPosts[0];
    if (firstProcessedPost) {
      console.log('[ArtigosPage] Primeiro artigo processado:', {
        id: firstProcessedPost.id,
        title: firstProcessedPost.attributes.title,
        hasImage: !!firstProcessedPost.imageUrl,
      });
    }
  } catch (error) {
    console.error('[ArtigosPage] Erro ao carregar artigos:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  console.log(`[ArtigosPage] Renderizando página com ${processedPosts.length} artigos`);

  return (
    <PostList
      posts={processedPosts}
      basePath="/blog/artigos"
      titleKey="blog.artigos.title"
      noPostsKey="blog.artigos.noPosts"
      readMoreKey="blog.artigos.readMore"
    />
  );
}

