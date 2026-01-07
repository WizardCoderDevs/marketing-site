/**
 * Extrai a URL da imagem do Strapi
 * O Strapi pode retornar imagens em diferentes estruturas:
 * - image: { data: { attributes: { url: string } } }
 * - cover: { data: { attributes: { url: string } } }
 * - thumbnail: { data: { attributes: { url: string } } }
 * - featuredImage: { data: { attributes: { url: string } } }
 */
export function getStrapiImageUrl(
  image: any,
  apiUrl?: string
): string | null {
  if (!image) {
    return null;
  }

  const baseUrl = apiUrl || process.env.NEXT_STRAPI_API_URL || '';

  // Se já for uma string (URL completa)
  if (typeof image === 'string') {
    // Se já for uma URL completa, retorna direto
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    // Se começar com /, adiciona o baseUrl
    if (image.startsWith('/')) {
      return baseUrl ? `${baseUrl}${image}` : image;
    }
    // Caso contrário, adiciona baseUrl + /
    return baseUrl ? `${baseUrl}/${image}` : image;
  }

  // Se for um objeto com data
  if (image.data) {
    // Pode ser um objeto único ou um array
    const imageData = Array.isArray(image.data) ? image.data[0] : image.data;
    
    if (imageData?.attributes) {
      const attrs = imageData.attributes;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('getStrapiImageUrl: Estrutura completa da imagem:', JSON.stringify({
          hasFormats: !!attrs.formats,
          formatsKeys: attrs.formats ? Object.keys(attrs.formats) : [],
          hasUrl: !!attrs.url,
          url: attrs.url,
          formats: attrs.formats ? {
            thumbnail: attrs.formats.thumbnail?.url,
            small: attrs.formats.small?.url,
            medium: attrs.formats.medium?.url,
            large: attrs.formats.large?.url
          } : null
        }, null, 2));
      }
      
      // Prioriza formats (medium > large > small > thumbnail > url original)
      if (attrs.formats) {
        const formats = attrs.formats;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('getStrapiImageUrl: Formats disponíveis:', {
            thumbnail: !!formats.thumbnail?.url,
            small: !!formats.small?.url,
            medium: !!formats.medium?.url,
            large: !!formats.large?.url
          });
        }
        
        // Tenta medium primeiro (melhor para cards)
        if (formats.medium?.url) {
          const url = formats.medium.url;
          if (process.env.NODE_ENV === 'development') {
            console.log('getStrapiImageUrl: URL original do medium:', url);
            console.log('getStrapiImageUrl: baseUrl:', baseUrl);
          }
          if (url.startsWith('http://') || url.startsWith('https://')) {
            if (process.env.NODE_ENV === 'development') {
              console.log('getStrapiImageUrl: URL completa retornada:', url);
            }
            return url;
          }
          const finalUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
          if (process.env.NODE_ENV === 'development') {
            console.log('getStrapiImageUrl: URL final construída:', finalUrl);
          }
          return finalUrl;
        }
        // Depois large
        if (formats.large?.url) {
          const url = formats.large.url;
          if (process.env.NODE_ENV === 'development') {
            console.log('getStrapiImageUrl: Usando format large:', url);
          }
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }
          return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
        }
        // Depois small
        if (formats.small?.url) {
          const url = formats.small.url;
          if (process.env.NODE_ENV === 'development') {
            console.log('getStrapiImageUrl: Usando format small:', url);
          }
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }
          return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
        }
        // Por último thumbnail
        if (formats.thumbnail?.url) {
          const url = formats.thumbnail.url;
          if (process.env.NODE_ENV === 'development') {
            console.log('getStrapiImageUrl: Usando format thumbnail:', url);
          }
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }
          return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
        }
      }
      
      // Se não tiver formats, usa a URL original
      if (attrs.url) {
        const url = attrs.url;
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      }
    }
  }

  // Se for um objeto direto com attributes
  if (image.attributes) {
    const attrs = image.attributes;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('getStrapiImageUrl: Estrutura da imagem (direto):', {
        hasFormats: !!attrs.formats,
        formatsKeys: attrs.formats ? Object.keys(attrs.formats) : [],
        hasUrl: !!attrs.url
      });
    }
    
    // Prioriza formats (medium > large > small > thumbnail > url original)
    if (attrs.formats) {
      const formats = attrs.formats;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('getStrapiImageUrl: Formats disponíveis (direto):', {
          thumbnail: !!formats.thumbnail?.url,
          small: !!formats.small?.url,
          medium: !!formats.medium?.url,
          large: !!formats.large?.url
        });
      }
      
      // Tenta medium primeiro (melhor para cards)
      if (formats.medium?.url) {
        const url = formats.medium.url;
        if (process.env.NODE_ENV === 'development') {
          console.log('getStrapiImageUrl: Usando format medium (direto):', url);
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      }
      // Depois large
      if (formats.large?.url) {
        const url = formats.large.url;
        if (process.env.NODE_ENV === 'development') {
          console.log('getStrapiImageUrl: Usando format large (direto):', url);
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      }
      // Depois small
      if (formats.small?.url) {
        const url = formats.small.url;
        if (process.env.NODE_ENV === 'development') {
          console.log('getStrapiImageUrl: Usando format small (direto):', url);
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      }
      // Por último thumbnail
      if (formats.thumbnail?.url) {
        const url = formats.thumbnail.url;
        if (process.env.NODE_ENV === 'development') {
          console.log('getStrapiImageUrl: Usando format thumbnail (direto):', url);
        }
        if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
        }
        return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
      }
    }
    
    // Se não tiver formats, usa a URL original
    if (attrs.url) {
      const url = attrs.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
  }

  // Se for um objeto direto com url
  if (image.url) {
    const url = image.url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  }

  return null;
}

/**
 * Extrai a primeira imagem de uma string HTML
 */
function extractImageFromHtml(html: string, apiBaseUrl: string): string | null {
  if (!html || typeof html !== 'string') {
    return null;
  }

  // Regex melhorada para encontrar tags <img> com src
  // Suporta aspas simples, duplas e sem aspas
  const imgRegex = /<img[^>]+src\s*=\s*["']?([^"'\s>]+)["']?[^>]*>/i;
  const match = html.match(imgRegex);
  
  if (match && match[1]) {
    let imageUrl = match[1].trim();
    
    // Remove entidades HTML se houver
    imageUrl = imageUrl.replace(/&amp;/g, '&');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('extractImageFromHtml: URL encontrada:', imageUrl);
    }
    
    // Se já for uma URL completa, retorna direto
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Se começar com /, adiciona o baseUrl
    if (imageUrl.startsWith('/')) {
      return apiBaseUrl ? `${apiBaseUrl}${imageUrl}` : imageUrl;
    }
    
    // Caso contrário, adiciona baseUrl + /
    return apiBaseUrl ? `${apiBaseUrl}/${imageUrl}` : imageUrl;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('extractImageFromHtml: Nenhuma tag <img> encontrada no HTML');
  }

  return null;
}

/**
 * Extrai imagem de um array de blocks do Strapi (rich text)
 */
function extractImageFromBlocks(blocks: any[], apiBaseUrl: string): string | null {
  if (!Array.isArray(blocks)) {
    return null;
  }

  for (const block of blocks) {
    // Se o block for do tipo 'image' e tiver um objeto 'image' dentro
    if (block?.type === 'image' && block?.image) {
      const imageObj = block.image;
      
      // Prioriza formats (medium > large > small > thumbnail > url original)
      if (imageObj.formats) {
        const formats = imageObj.formats;
        
        // Tenta medium primeiro (melhor para cards)
        if (formats.medium?.url) {
          return formats.medium.url; // URLs já vêm completas do R2
        }
        // Depois large
        if (formats.large?.url) {
          return formats.large.url;
        }
        // Depois small
        if (formats.small?.url) {
          return formats.small.url;
        }
        // Por último thumbnail
        if (formats.thumbnail?.url) {
          return formats.thumbnail.url;
        }
      }
      
      // Se não tiver formats, usa a URL original
      if (imageObj.url) {
        return imageObj.url;
      }
    }
    
    // Fallback: procura por url direto no block (estrutura antiga)
    if (block?.type === 'image') {
      const imageUrl = block.url || block.src || block.attributes?.url;
      if (imageUrl) {
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
          return imageUrl;
        }
        if (imageUrl.startsWith('/')) {
          return apiBaseUrl ? `${apiBaseUrl}${imageUrl}` : imageUrl;
        }
        return apiBaseUrl ? `${apiBaseUrl}/${imageUrl}` : imageUrl;
      }
    }
    
    // Se tiver children, procura recursivamente
    if (block?.children && Array.isArray(block.children)) {
      const found = extractImageFromBlocks(block.children, apiBaseUrl);
      if (found) return found;
    }
  }

  return null;
}

/**
 * Extrai a URL da imagem de um post do Strapi
 * Tenta diferentes campos comuns: image, cover, thumbnail, featuredImage
 * Se não encontrar, procura no conteúdo HTML ou blocks
 */
export function getPostImageUrl(
  post: any,
  apiUrl?: string
): string | null {
  if (!post?.attributes) {
    if (process.env.NODE_ENV === 'development') {
      console.log('getPostImageUrl: post ou attributes não encontrado', { post });
    }
    return null;
  }

  const attrs = post.attributes;
  const apiBaseUrl = apiUrl || process.env.NEXT_STRAPI_API_URL || '';

  if (process.env.NODE_ENV === 'development') {
    console.log('getPostImageUrl: Procurando imagem para post:', post.attributes.title);
    console.log('getPostImageUrl: Campos disponíveis:', Object.keys(attrs));
    console.log('getPostImageUrl: Estrutura completa dos atributos:', JSON.stringify(attrs, null, 2));
  }

  // 1. Tenta diferentes campos comuns de imagem
  const imageFields = ['image', 'cover', 'thumbnail', 'featuredImage', 'featured_image', 'banner'];
  
  for (const field of imageFields) {
    if (attrs[field]) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`getPostImageUrl: Tentando campo ${field}:`, attrs[field]);
      }
      const url = getStrapiImageUrl(attrs[field], apiBaseUrl);
      if (url) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`getPostImageUrl: Imagem encontrada no campo ${field}:`, url);
        }
        return url;
      }
    }
  }

  // 2. Se não encontrou, procura no conteúdo HTML
  const contentFields = ['content', 'body', 'text', 'description'];
  
  for (const field of contentFields) {
    if (!attrs[field]) continue;

    const content = attrs[field];

    if (process.env.NODE_ENV === 'development') {
      console.log(`getPostImageUrl: Verificando campo ${field}:`, {
        type: typeof content,
        isArray: Array.isArray(content),
        preview: typeof content === 'string' ? content.substring(0, 500) : 'não é string',
        hasImgTag: typeof content === 'string' ? content.includes('<img') : false
      });
    }

    // Se for string HTML, extrai imagem
    if (typeof content === 'string') {
      // Primeiro, tenta encontrar todas as tags img
      const imgMatches = content.matchAll(/<img[^>]+src\s*=\s*["']?([^"'\s>]+)["']?[^>]*>/gi);
      const matchesArray = Array.from(imgMatches);
      
      if (process.env.NODE_ENV === 'development' && matchesArray.length > 0) {
        console.log(`getPostImageUrl: Encontradas ${matchesArray.length} tag(s) <img> no campo ${field}`);
        matchesArray.forEach((match, index) => {
          console.log(`  Imagem ${index + 1}:`, match[1]);
        });
      }
      
      const url = extractImageFromHtml(content, apiBaseUrl);
      if (url) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`getPostImageUrl: Imagem extraída do HTML do campo ${field}:`, url);
        }
        return url;
      }
    }
    
    // Se for array de blocks (rich text do Strapi)
    if (Array.isArray(content)) {
      // Procura por objetos com type: "image" que tenham um objeto "image" dentro
      for (const block of content) {
        if (block?.type === 'image' && block?.image) {
          const imageObj = block.image;
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`getPostImageUrl: Encontrado block type="image" no campo ${field}:`, {
              hasFormats: !!imageObj.formats,
              hasUrl: !!imageObj.url,
              formatsKeys: imageObj.formats ? Object.keys(imageObj.formats) : []
            });
          }
          
          // Prioriza formats (medium > large > small > thumbnail > url original)
          if (imageObj.formats) {
            const formats = imageObj.formats;
            
            // Tenta medium primeiro (melhor para cards)
            if (formats.medium?.url) {
              const url = formats.medium.url;
              if (process.env.NODE_ENV === 'development') {
                console.log(`getPostImageUrl: Usando format medium do block image:`, url);
              }
              return url; // URLs já vêm completas do R2
            }
            // Depois large
            if (formats.large?.url) {
              const url = formats.large.url;
              if (process.env.NODE_ENV === 'development') {
                console.log(`getPostImageUrl: Usando format large do block image:`, url);
              }
              return url;
            }
            // Depois small
            if (formats.small?.url) {
              const url = formats.small.url;
              if (process.env.NODE_ENV === 'development') {
                console.log(`getPostImageUrl: Usando format small do block image:`, url);
              }
              return url;
            }
            // Por último thumbnail
            if (formats.thumbnail?.url) {
              const url = formats.thumbnail.url;
              if (process.env.NODE_ENV === 'development') {
                console.log(`getPostImageUrl: Usando format thumbnail do block image:`, url);
              }
              return url;
            }
          }
          
          // Se não tiver formats, usa a URL original
          if (imageObj.url) {
            const url = imageObj.url;
            if (process.env.NODE_ENV === 'development') {
              console.log(`getPostImageUrl: Usando URL original do block image:`, url);
            }
            return url;
          }
        }
      }
      
      // Fallback: tenta a função antiga de extractImageFromBlocks
      const url = extractImageFromBlocks(content, apiBaseUrl);
      if (url) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`getPostImageUrl: Imagem encontrada em blocks do campo ${field}:`, url);
        }
        return url;
      }
    }
    
    // Se for objeto com estrutura de blocks
    if (typeof content === 'object' && content !== null) {
      // Se tiver children como array
      if (Array.isArray(content.children)) {
        const url = extractImageFromBlocks(content.children, apiBaseUrl);
        if (url) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`getPostImageUrl: Imagem encontrada em children do campo ${field}:`, url);
          }
          return url;
        }
      }
      
      // Se for um block de imagem diretamente
      if (content.type === 'image') {
        const imageUrl = content.url || content.src || content.attributes?.url;
        if (imageUrl) {
          let finalUrl = imageUrl;
          if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
            finalUrl = imageUrl.startsWith('/') 
              ? (apiBaseUrl ? `${apiBaseUrl}${imageUrl}` : imageUrl)
              : (apiBaseUrl ? `${apiBaseUrl}/${imageUrl}` : imageUrl);
          }
          if (process.env.NODE_ENV === 'development') {
            console.log(`getPostImageUrl: Imagem encontrada em block image do campo ${field}:`, finalUrl);
          }
          return finalUrl;
        }
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('getPostImageUrl: Nenhuma imagem encontrada para o post:', post.attributes.title);
  }

  return null;
}

