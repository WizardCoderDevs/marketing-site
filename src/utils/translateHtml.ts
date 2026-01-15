/**
 * Utilitário para traduzir conteúdo HTML preservando as tags HTML
 */

/**
 * Extrai apenas o texto de um HTML, preservando a estrutura para reconstrução
 */
export function extractTextFromHtml(html: string): { text: string; structure: Array<{ type: 'text' | 'tag'; content: string; index: number }> } {
  const structure: Array<{ type: 'text' | 'tag'; content: string; index: number }> = [];
  const textParts: string[] = [];
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
 * Versão melhorada que preserva a estrutura HTML completa
 * Traduz apenas o texto dentro das tags, mantendo todas as tags HTML intactas
 */
export type HtmlPart = { type: 'tag' | 'text'; content: string };

export function splitHtmlIntoParts(originalHtml: string): HtmlPart[] {
  const parts: HtmlPart[] = [];
  let currentIndex = 0;
  const tagRegex = /<[^>]+>/g;
  let match;

  while ((match = tagRegex.exec(originalHtml)) !== null) {
    if (match.index > currentIndex) {
      parts.push({ type: 'text', content: originalHtml.substring(currentIndex, match.index) });
    }
    parts.push({ type: 'tag', content: match[0] });
    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < originalHtml.length) {
    parts.push({ type: 'text', content: originalHtml.substring(currentIndex) });
  }

  return parts;
}

export function rebuildHtmlFromParts(parts: HtmlPart[], translatedTextParts: string[]): string {
  if (!parts.length) {
    return '';
  }

  let textIndex = 0;
  return parts
    .map((part) => {
      if (part.type === 'tag') {
        return part.content;
      }
      const translated = translatedTextParts[textIndex];
      textIndex += 1;
      return translated ?? part.content;
    })
    .join('');
}

export function translateHtmlContent(originalHtml: string, translatedTextParts: string[]): string {
  if (!originalHtml || !translatedTextParts.length) {
    return originalHtml;
  }

  const parts = splitHtmlIntoParts(originalHtml);
  if (!parts.length) {
    return originalHtml;
  }

  return rebuildHtmlFromParts(parts, translatedTextParts);
}

