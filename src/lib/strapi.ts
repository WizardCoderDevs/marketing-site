import { generateSlugFromTitle } from '@/utils/slug';

export interface StrapiPost {
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

  // Logs sempre ativos para debug em produção
  console.log('[fetchStrapiPosts] Iniciando busca:', {
    tag,
    hasApiUrl: !!apiUrl,
    hasApiKey: !!apiKey,
    apiUrlLength: apiUrl?.length || 0,
    apiKeyLength: apiKey?.length || 0,
    nodeEnv: process.env.NODE_ENV,
  });

  if (!apiUrl || !apiKey) {
    console.error('[fetchStrapiPosts] Configuração da API do Strapi não encontrada', {
      hasApiUrl: !!apiUrl,
      hasApiKey: !!apiKey,
      nodeEnv: process.env.NODE_ENV,
    });
    return [];
  }

  // Normaliza a URL (remove barra final se existir)
  const normalizedApiUrl = apiUrl.trim().replace(/\/$/, '');
  
  // Valida se a URL começa com http:// ou https://
  if (!normalizedApiUrl.startsWith('http://') && !normalizedApiUrl.startsWith('https://')) {
    console.error('[fetchStrapiPosts] URL inválida - deve começar com http:// ou https://', {
      apiUrl: normalizedApiUrl.substring(0, 50),
    });
    return [];
  }

  try {
    const strapiUrl = `${normalizedApiUrl}/api/posts?filters[tags][name][$eq]=${tag}&populate=*&sort=publishedAt:desc`;

    console.log('[fetchStrapiPosts] Buscando posts:', { 
      tag, 
      url: strapiUrl.replace(apiKey, '***REDACTED***'), // Não loga a API key completa
      normalizedApiUrl: normalizedApiUrl.substring(0, 50) + '...',
    });

    // Cria um AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos de timeout

    try {
      const response = await fetch(strapiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Para sempre buscar dados atualizados
        signal: controller.signal, // Para permitir cancelamento
      } as RequestInit);

      clearTimeout(timeoutId);

      console.log('[fetchStrapiPosts] Resposta recebida:', {
        tag,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Erro desconhecido');
        console.error('[fetchStrapiPosts] Erro ao buscar posts do Strapi:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText.substring(0, 500), // Limita o tamanho do log
          url: strapiUrl.replace(apiKey, '***REDACTED***'),
          tag,
        });
        return [];
      }

      const data: StrapiResponse = await response.json();
      const posts = data.data || [];
      
      console.log('[fetchStrapiPosts] Posts encontrados:', { 
        tag, 
        count: posts.length,
        hasData: !!data.data,
        metaTotal: data.meta?.pagination?.total,
        dataStructure: data.data ? 'array' : 'null/undefined',
      });
      
      // Processa os posts para adicionar slug gerado a partir do título
      const processedPosts = posts.map((post) => ({
        ...post,
        generatedSlug: generateSlugFromTitle(post.attributes.title),
      }));

      console.log('[fetchStrapiPosts] Posts processados:', {
        tag,
        count: processedPosts.length,
      });

      return processedPosts;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('[fetchStrapiPosts] Timeout ao buscar posts do Strapi:', {
          tag,
          timeout: '30s',
          url: strapiUrl.replace(apiKey, '***REDACTED***'),
        });
      } else {
        throw fetchError; // Re-lança o erro para ser capturado pelo catch externo
      }
      return [];
    }
  } catch (error) {
    console.error('[fetchStrapiPosts] Erro ao processar requisição do Strapi:', {
      error: error instanceof Error ? error.message : String(error),
      errorName: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      tag,
      apiUrl: normalizedApiUrl ? `${normalizedApiUrl.substring(0, 30)}...` : 'não definido',
    });
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


