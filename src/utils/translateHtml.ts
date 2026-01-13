/**
 * Utilitário para traduzir conteúdo HTML preservando as tags HTML
 */

/**
 * Extrai apenas o texto de um HTML, preservando a estrutura para reconstrução
 */
export function extractTextFromHtml(html: string): { text: string; structure: Array<{ type: 'text' | 'tag'; content: string; index: number }> } {
  const structure: Array<{ type: 'text' | 'tag'; content: string; index: number }> = [];
  let textParts: string[] = [];
  let currentIndex = 0;

  // Regex para encontrar tags HTML
  const tagRegex = /<[^>]+>/g;
  let match;
  let lastIndex = 0;

  while ((match = tagRegex.exec(html)) !== null) {
    // Adiciona texto antes da tag
    if (match.index > lastIndex) {
      const text = html.substring(lastIndex, match.index);
      if (text.trim()) {
        structure.push({ type: 'text', content: text, index: currentIndex });
        textParts.push(text);
        currentIndex += text.length;
      }
    }

    // Adiciona a tag
    structure.push({ type: 'tag', content: match[0], index: -1 });
    lastIndex = match.index + match[0].length;
  }

  // Adiciona texto restante
  if (lastIndex < html.length) {
    const text = html.substring(lastIndex);
    if (text.trim()) {
      structure.push({ type: 'text', content: text, index: currentIndex });
      textParts.push(text);
    }
  }

  return {
    text: textParts.join(' '),
    structure,
  };
}

/**
 * Reconstrói HTML traduzido preservando as tags originais
 * Esta é uma versão simplificada - para HTML muito complexo, pode ser necessário
 * usar um parser HTML mais robusto
 */
export function reconstructHtml(
  originalHtml: string,
  translatedText: string,
  structure: Array<{ type: 'text' | 'tag'; content: string; index: number }>
): string {
  // Para uma implementação mais simples, vamos fazer uma substituição básica
  // Extrai todo o texto do HTML original
  const textOnly = originalHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Se o texto traduzido tem o mesmo número de palavras, tenta substituir palavra por palavra
  // Caso contrário, faz uma substituição simples
  if (textOnly && translatedText) {
    // Tenta substituir o texto mantendo as tags
    // Esta é uma abordagem simplificada
    let result = originalHtml;
    const words = textOnly.split(/\s+/);
    const translatedWords = translatedText.split(/\s+/);
    
    // Se tiver o mesmo número de palavras, tenta mapear
    if (words.length === translatedWords.length) {
      // Substitui palavra por palavra (muito simplificado)
      words.forEach((word, index) => {
        if (translatedWords[index]) {
          // Substitui apenas quando a palavra aparece sozinha (não dentro de outras palavras)
          const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          result = result.replace(regex, translatedWords[index]);
        }
      });
      return result;
    }
    
    // Fallback: substitui todo o texto de uma vez
    // Remove tags temporariamente, substitui texto, depois adiciona tags de volta
    const tagPlaceholders: string[] = [];
    let htmlWithoutTags = originalHtml.replace(/<[^>]+>/g, (tag) => {
      tagPlaceholders.push(tag);
      return `__TAG_${tagPlaceholders.length - 1}__`;
    });
    
    // Substitui o texto
    htmlWithoutTags = htmlWithoutTags.replace(textOnly, translatedText);
    
    // Restaura as tags
    tagPlaceholders.forEach((tag, index) => {
      htmlWithoutTags = htmlWithoutTags.replace(`__TAG_${index}__`, tag);
    });
    
    return htmlWithoutTags;
  }

  return originalHtml;
}

/**
 * Versão melhorada que usa uma abordagem mais simples:
 * Traduz o texto e tenta manter a estrutura HTML básica
 */
export function translateHtmlContent(originalHtml: string, translatedText: string): string {
  if (!originalHtml || !translatedText) {
    return originalHtml;
  }

  // Extrai o texto puro do HTML original
  const textContent = originalHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (!textContent) {
    return originalHtml;
  }

  // Divide o HTML em partes (tags e texto)
  const parts: Array<{ type: 'tag' | 'text'; content: string }> = [];
  let currentIndex = 0;
  const tagRegex = /<[^>]+>/g;
  let match;

  while ((match = tagRegex.exec(originalHtml)) !== null) {
    // Texto antes da tag
    if (match.index > currentIndex) {
      const text = originalHtml.substring(currentIndex, match.index);
      if (text.trim()) {
        parts.push({ type: 'text', content: text });
      }
    }
    
    // A tag
    parts.push({ type: 'tag', content: match[0] });
    currentIndex = match.index + match[0].length;
  }

  // Texto restante
  if (currentIndex < originalHtml.length) {
    const text = originalHtml.substring(currentIndex);
    if (text.trim()) {
      parts.push({ type: 'text', content: text });
    }
  }

  // Se não conseguiu dividir em partes, faz substituição simples
  if (parts.length === 0) {
    return originalHtml.replace(textContent, translatedText);
  }

  // Reconstrói o HTML substituindo apenas as partes de texto
  // Para simplificar, vamos fazer uma substituição direta do texto completo
  // mantendo todas as tags
  let result = originalHtml;
  
  // Tenta substituir o texto mantendo as tags HTML
  // Remove todas as tags temporariamente
  const tags: string[] = [];
  let htmlWithoutTags = originalHtml.replace(/<[^>]+>/g, (tag) => {
    tags.push(tag);
    return `__TAG_PLACEHOLDER__`;
  });

  // Normaliza espaços
  htmlWithoutTags = htmlWithoutTags.replace(/\s+/g, ' ').trim();
  
  // Substitui o texto
  if (htmlWithoutTags.includes(textContent)) {
    htmlWithoutTags = htmlWithoutTags.replace(textContent, translatedText);
  } else {
    // Se não encontrou exatamente, tenta substituir palavra por palavra
    const words = textContent.split(/\s+/);
    const translatedWords = translatedText.split(/\s+/);
    
    if (words.length === translatedWords.length) {
      words.forEach((word, i) => {
        if (translatedWords[i]) {
          htmlWithoutTags = htmlWithoutTags.replace(new RegExp(`\\b${word}\\b`, 'gi'), translatedWords[i]);
        }
      });
    } else {
      // Último recurso: substitui tudo
      htmlWithoutTags = translatedText;
    }
  }

  // Restaura as tags
  let tagIndex = 0;
  result = htmlWithoutTags.replace(/__TAG_PLACEHOLDER__/g, () => {
    return tags[tagIndex++] || '';
  });

  return result;
}

