import { generateSlugFromTitle } from '@/utils/slug';

interface StrapiPost {
  id: number;
  attributes: {
    title: string;
    content?: string;
    body?: string;
    text?: string;
    description?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags?: {
      data?: Array<{
        id: number;
        attributes: {
          name: string;
        };
      }>;
    };
    [key: string]: any; // Permite campos adicionais
  };
}

/**
 * Post processado com slug gerado a partir do título
 */
export interface ProcessedStrapiPost extends StrapiPost {
  generatedSlug: string; // Slug gerado a partir do título
}

interface StrapiResponse {
  data: StrapiPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export async function fetchStrapiPosts(tag: 'article' | 'news'): Promise<ProcessedStrapiPost[]> {
  const apiUrl = process.env.NEXT_STRAPI_API_URL;
  const apiKey = process.env.NEXT_STRAPI_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('Configuração da API do Strapi não encontrada');
    return [];
  }

  try {
    const strapiUrl = `${apiUrl}/api/posts?filters[tags][name][$eq]=${tag}&populate=*&sort=publishedAt:desc`;

    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Para sempre buscar dados atualizados
    });

    if (!response.ok) {
      console.error('Erro ao buscar posts do Strapi:', response.status);
      return [];
    }

    const data: StrapiResponse = await response.json();
    const posts = data.data || [];
    
    // Processa os posts para adicionar slug gerado a partir do título
    return posts.map((post) => ({
      ...post,
      generatedSlug: generateSlugFromTitle(post.attributes.title),
    }));
  } catch (error) {
    console.error('Erro ao processar requisição do Strapi:', error);
    return [];
  }
}

/**
 * Busca um post pelo ID
 */
export async function fetchStrapiPostById(id: number): Promise<StrapiPost | null> {
  const apiUrl = process.env.NEXT_STRAPI_API_URL;
  const apiKey = process.env.NEXT_STRAPI_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('Configuração da API do Strapi não encontrada');
    return null;
  }

  try {
    const strapiUrl = `${apiUrl}/api/posts?filters[id][$eq]=${id}&populate=*`;

    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Erro ao buscar post do Strapi:', response.status);
      return null;
    }

    const data: StrapiResponse = await response.json();
    const post = data.data?.[0] || null;
    
    // Debug: log para verificar a estrutura dos dados
    if (process.env.NODE_ENV === 'development' && post) {
      console.log('Post encontrado por ID:', JSON.stringify(post, null, 2));
    }
    
    return post;
  } catch (error) {
    console.error('Erro ao processar requisição do Strapi:', error);
    return null;
  }
}

/**
 * Busca um post pelo slug gerado a partir do título
 * Primeiro busca todos os posts da mesma categoria, depois encontra o que tem o slug correspondente
 * e então busca o post pelo ID
 */
export async function fetchStrapiPostBySlug(
  slug: string,
  tag?: 'article' | 'news'
): Promise<StrapiPost | null> {
  const apiUrl = process.env.NEXT_STRAPI_API_URL;
  const apiKey = process.env.NEXT_STRAPI_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('Configuração da API do Strapi não encontrada');
    return null;
  }

  try {
    // Se o slug for um número, tenta buscar diretamente por ID (compatibilidade com URLs antigas)
    const slugAsNumber = parseInt(slug, 10);
    if (!isNaN(slugAsNumber)) {
      return await fetchStrapiPostById(slugAsNumber);
    }

    // Se temos a tag, busca apenas posts dessa categoria (mais eficiente)
    if (tag) {
      const posts = await fetchStrapiPosts(tag);
      const postWithSlug = posts.find((post) => post.generatedSlug === slug);
      
      if (postWithSlug) {
        return await fetchStrapiPostById(postWithSlug.id);
      }
    } else {
      // Se não temos a tag, busca em todas as categorias
      const articlePosts = await fetchStrapiPosts('article');
      const newsPosts = await fetchStrapiPosts('news');
      const allPosts = [...articlePosts, ...newsPosts];
      
      const postWithSlug = allPosts.find((post) => post.generatedSlug === slug);
      
      if (postWithSlug) {
        return await fetchStrapiPostById(postWithSlug.id);
      }
    }

    // Fallback: tenta buscar pelo slug original do Strapi
    const strapiUrl = `${apiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`;
    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data: StrapiResponse = await response.json();
      const post = data.data?.[0] || null;
      
      if (post) {
        return post;
      }
    }

    return null;
  } catch (error) {
    console.error('Erro ao processar requisição do Strapi:', error);
    return null;
  }
}

export type { StrapiPost, ProcessedStrapiPost };

