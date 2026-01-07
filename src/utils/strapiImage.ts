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
    
    if (imageData?.attributes?.url) {
      const url = imageData.attributes.url;
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
  }

  // Se for um objeto direto com attributes
  if (image.attributes?.url) {
    const url = image.attributes.url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
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
 * Extrai a URL da imagem de um post do Strapi
 * Tenta diferentes campos comuns: image, cover, thumbnail, featuredImage
 */
export function getPostImageUrl(
  post: any,
  apiUrl?: string
): string | null {
  if (!post?.attributes) {
    return null;
  }

  const attrs = post.attributes;
  const apiBaseUrl = apiUrl || process.env.NEXT_STRAPI_API_URL || '';

  // Tenta diferentes campos comuns
  const imageFields = ['image', 'cover', 'thumbnail', 'featuredImage', 'featured_image', 'banner'];
  
  for (const field of imageFields) {
    if (attrs[field]) {
      const url = getStrapiImageUrl(attrs[field], apiBaseUrl);
      if (url) {
        return url;
      }
    }
  }

  return null;
}

