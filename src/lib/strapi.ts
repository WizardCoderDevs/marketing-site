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

export async function fetchStrapiPosts(tag: 'article' | 'news', limit: number = 25): Promise<ProcessedStrapiPost[]> {
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
    const strapiUrl = `${normalizedApiUrl}/api/posts?filters[tags][name][$eq]=${tag}&populate=*&sort=publishedAt:desc&pagination[limit]=${limit}`;

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
        next: { revalidate: 60 }, // Cache com revalidação a cada 60 segundos
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

  console.log('[fetchStrapiPostBySlug] Iniciando busca por slug:', {
    slug,
    tag,
    hasApiUrl: !!apiUrl,
    hasApiKey: !!apiKey,
  });

  if (!apiUrl || !apiKey) {
    console.error('[fetchStrapiPostBySlug] Configuração da API do Strapi não encontrada');
    return null;
  }

  // Normaliza a URL
  const normalizedApiUrl = apiUrl.trim().replace(/\/$/, '');

  try {
    // Se o slug for um número, tenta buscar diretamente por ID (compatibilidade com URLs antigas)
    const slugAsNumber = parseInt(slug, 10);
    if (!isNaN(slugAsNumber)) {
      console.log('[fetchStrapiPostBySlug] Slug é um número, buscando por ID:', slugAsNumber);
      return await fetchStrapiPostById(slugAsNumber);
    }

    // Estratégia 1: Buscar todos os posts e encontrar pelo slug gerado
    if (tag) {
      console.log('[fetchStrapiPostBySlug] Buscando posts da categoria:', tag);
      const posts = await fetchStrapiPosts(tag);
      console.log('[fetchStrapiPostBySlug] Posts encontrados na categoria:', {
        tag,
        count: posts.length,
        slugs: posts.map(p => p.generatedSlug).slice(0, 5), // Primeiros 5 slugs para debug
      });
      
      if (posts.length > 0) {
        // Normaliza o slug buscado (remove encoding, espaços, etc)
        const normalizedSearchedSlug = decodeURIComponent(slug).trim().toLowerCase();
        
        console.log('[fetchStrapiPostBySlug] Comparando slugs:', {
          searchedSlug: slug,
          normalizedSearchedSlug,
          availableSlugs: posts.map(p => ({
            id: p.id,
            title: p.attributes.title,
            generatedSlug: p.generatedSlug,
            matches: p.generatedSlug === normalizedSearchedSlug || p.generatedSlug === slug,
          })),
        });
        
        // Tenta encontrar com comparação exata primeiro
        let postWithSlug = posts.find((post) => post.generatedSlug === normalizedSearchedSlug || post.generatedSlug === slug);
        
        // Se não encontrar, tenta comparação case-insensitive
        if (!postWithSlug) {
          postWithSlug = posts.find((post) => 
            post.generatedSlug.toLowerCase() === normalizedSearchedSlug ||
            post.generatedSlug.toLowerCase() === slug.toLowerCase()
          );
        }
        
        if (postWithSlug) {
          console.log('[fetchStrapiPostBySlug] Post encontrado pelo slug gerado:', {
            id: postWithSlug.id,
            title: postWithSlug.attributes.title,
            slug: postWithSlug.generatedSlug,
            searchedSlug: slug,
            normalizedSearchedSlug,
          });
          const fullPost = await fetchStrapiPostById(postWithSlug.id);
          if (fullPost) {
            return fullPost;
          }
        } else {
          console.error('[fetchStrapiPostBySlug] Post não encontrado pelo slug gerado na categoria:', {
            tag,
            searchedSlug: slug,
            normalizedSearchedSlug,
            availableSlugs: posts.map(p => p.generatedSlug),
            firstPostTitle: posts[0]?.attributes.title,
            firstPostSlug: posts[0]?.generatedSlug,
          });
        }
      } else {
        console.warn('[fetchStrapiPostBySlug] Nenhum post encontrado na categoria, tentando outras estratégias:', tag);
      }
    } else {
      // Se não temos a tag, busca em todas as categorias
      console.log('[fetchStrapiPostBySlug] Buscando em todas as categorias...');
      const articlePosts = await fetchStrapiPosts('article');
      const newsPosts = await fetchStrapiPosts('news');
      const allPosts = [...articlePosts, ...newsPosts];
      
      console.log('[fetchStrapiPostBySlug] Total de posts encontrados:', {
        articles: articlePosts.length,
        news: newsPosts.length,
        total: allPosts.length,
      });
      
      const postWithSlug = allPosts.find((post) => post.generatedSlug === slug);
      
      if (postWithSlug) {
        console.log('[fetchStrapiPostBySlug] Post encontrado pelo slug gerado:', {
          id: postWithSlug.id,
          title: postWithSlug.attributes.title,
          slug: postWithSlug.generatedSlug,
        });
        return await fetchStrapiPostById(postWithSlug.id);
      } else {
        console.log('[fetchStrapiPostBySlug] Post não encontrado pelo slug gerado em nenhuma categoria');
      }
    }

    // Estratégia 2: Fallback - tenta buscar pelo slug original do Strapi
    console.log('[fetchStrapiPostBySlug] Tentando fallback: buscar pelo slug original do Strapi');
    const strapiUrl = `${normalizedApiUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(strapiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('[fetchStrapiPostBySlug] Resposta do fallback:', {
        status: response.status,
        ok: response.ok,
      });

      if (response.ok) {
        const data: StrapiResponse = await response.json();
        const post = data.data?.[0] || null;
        
        if (post) {
          console.log('[fetchStrapiPostBySlug] Post encontrado pelo slug original:', {
            id: post.id,
            title: post.attributes.title,
            slug: post.attributes.slug,
          });
          return post;
        } else {
          console.log('[fetchStrapiPostBySlug] Nenhum post encontrado pelo slug original');
        }
      } else {
        const errorText = await response.text().catch(() => 'Erro desconhecido');
        console.error('[fetchStrapiPostBySlug] Erro na resposta do fallback:', {
          status: response.status,
          error: errorText.substring(0, 200),
        });
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error('[fetchStrapiPostBySlug] Timeout no fallback');
      } else {
        console.error('[fetchStrapiPostBySlug] Erro no fallback:', {
          error: fetchError instanceof Error ? fetchError.message : String(fetchError),
        });
      }
    }

    // Estratégia 3: Busca direta pela API sem depender de fetchStrapiPosts
    // Isso é útil quando fetchStrapiPosts retorna vazio em produção
    console.log('[fetchStrapiPostBySlug] Tentando busca direta pela API do Strapi');
    try {
      // Busca todos os posts da categoria e filtra localmente
      let searchUrl = `${normalizedApiUrl}/api/posts?populate=*&pagination[limit]=100`;
      if (tag) {
        searchUrl += `&filters[tags][name][$eq]=${tag}`;
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      try {
        const response = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data: StrapiResponse = await response.json();
          const allPosts = data.data || [];
          
          console.log('[fetchStrapiPostBySlug] Posts encontrados na busca direta:', {
            count: allPosts.length,
            tag,
          });

          // Processa os posts e encontra pelo slug gerado
          for (const post of allPosts) {
            const generatedSlug = generateSlugFromTitle(post.attributes.title);
            if (generatedSlug === slug) {
              console.log('[fetchStrapiPostBySlug] Post encontrado na busca direta:', {
                id: post.id,
                title: post.attributes.title,
                slug: generatedSlug,
              });
              return post;
            }
          }

          console.log('[fetchStrapiPostBySlug] Slug não encontrado na busca direta');
        } else {
          console.error('[fetchStrapiPostBySlug] Erro na busca direta:', {
            status: response.status,
          });
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error('[fetchStrapiPostBySlug] Timeout na busca direta');
        } else {
          console.error('[fetchStrapiPostBySlug] Erro na busca direta:', {
            error: fetchError instanceof Error ? fetchError.message : String(fetchError),
          });
        }
      }
    } catch (error) {
      console.error('[fetchStrapiPostBySlug] Erro ao executar busca direta:', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Estratégia 4: Último fallback - busca todos os posts e compara títulos (mais lento, mas mais confiável)
    console.log('[fetchStrapiPostBySlug] Tentando último fallback: busca por título');
    if (tag) {
      const allPosts = await fetchStrapiPosts(tag);
      // Tenta encontrar pelo título (slug pode ter pequenas diferenças)
      const postByTitle = allPosts.find((post) => {
        const postSlug = generateSlugFromTitle(post.attributes.title);
        return postSlug === slug || postSlug.includes(slug) || slug.includes(postSlug);
      });
      
      if (postByTitle) {
        console.log('[fetchStrapiPostBySlug] Post encontrado pelo título:', {
          id: postByTitle.id,
          title: postByTitle.attributes.title,
        });
        return await fetchStrapiPostById(postByTitle.id);
      }
    }

    console.error('[fetchStrapiPostBySlug] Post não encontrado após todas as tentativas:', {
      slug,
      tag,
    });

    return null;
  } catch (error) {
    console.error('[fetchStrapiPostBySlug] Erro ao processar requisição do Strapi:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      slug,
      tag,
    });
    return null;
  }
}


