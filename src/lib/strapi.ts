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

export async function fetchStrapiPosts(tag: 'article' | 'news'): Promise<StrapiPost[]> {
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
    return data.data || [];
  } catch (error) {
    console.error('Erro ao processar requisição do Strapi:', error);
    return [];
  }
}

export async function fetchStrapiPostBySlug(slug: string): Promise<StrapiPost | null> {
  const apiUrl = process.env.NEXT_STRAPI_API_URL;
  const apiKey = process.env.NEXT_STRAPI_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('Configuração da API do Strapi não encontrada');
    return null;
  }

  try {
    // Tenta buscar por slug primeiro com populate completo
    let strapiUrl = `${apiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`;
    
    // Se o slug for um número, também tenta buscar por ID
    const slugAsNumber = parseInt(slug, 10);
    if (!isNaN(slugAsNumber)) {
      strapiUrl = `${apiUrl}/api/posts?filters[id][$eq]=${slugAsNumber}&populate=*`;
    }

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
      console.log('Post encontrado:', JSON.stringify(post, null, 2));
    }
    
    return post;
  } catch (error) {
    console.error('Erro ao processar requisição do Strapi:', error);
    return null;
  }
}

export type { StrapiPost };

