
interface StrapiBlock {
  type: string;
  children?: Array<{
    type?: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    [key: string]: any;
  }>;
  level?: number;
  format?: string;
  [key: string]: any;
}

/**
 * Processa o conteúdo do Strapi que pode vir como:
 * - String HTML simples
 * - Array de objetos (blocks do rich text editor)
 * - Objeto com estrutura complexa
 */
export function processStrapiContent(content: any): string {
  // Debug: log da estrutura em desenvolvimento
  if (process.env.NODE_ENV === 'development' && content) {
    console.log('Processando conteúdo do Strapi:', {
      type: typeof content,
      isArray: Array.isArray(content),
      structure: JSON.stringify(content).substring(0, 500),
    });
  }

  // Se for string, retorna diretamente
  if (typeof content === 'string') {
    return content;
  }

  // Se for null ou undefined
  if (content === null || content === undefined) {
    return '';
  }

  // Se for array de objetos (blocks do Strapi)
  if (Array.isArray(content)) {
    return content.map((block) => {
      // Se o item do array já for string, retorna diretamente
      if (typeof block === 'string') {
        return block;
      }
      // Se for objeto, processa como block
      if (typeof block === 'object' && block !== null) {
        return renderBlock(block);
      }
      return '';
    }).join('\n'); // Adiciona quebra de linha entre blocos
  }

  // Se for objeto único, tenta processar
  if (typeof content === 'object' && content !== null) {
    // Se tiver uma propriedade que parece ser o conteúdo
    if (content.text) {
      return content.text;
    }
    // Se tiver children, processa recursivamente
    if (content.children && Array.isArray(content.children)) {
      return content.children.map((child: any) => {
        if (typeof child === 'string') return child;
        if (child.text) return processChildren([child]);
        if (Array.isArray(child)) return processChildren(child);
        return '';
      }).join('');
    }
    // Se o objeto em si parece ser um block, renderiza
    if (content.type) {
      return renderBlock(content);
    }
  }

  return '';
}

/**
 * Renderiza um bloco individual do Strapi
 */
function renderBlock(block: StrapiBlock): string {
  if (!block || typeof block !== 'object') {
    return '';
  }

  const { type, children, level, ...rest } = block;

  // Processa os children (texto e formatação)
  const processedChildren = processChildren(children || []);

  switch (type) {
    case 'heading':
      const headingLevel = level || 1;
      return `<h${headingLevel} class="mb-4">${processedChildren}</h${headingLevel}>`;

    case 'paragraph':
      return `<p class="mb-4">${processedChildren}</p>`;

    case 'list':
      const listTag = rest.format === 'ordered' ? 'ol' : 'ul';
      const listItems = (children || [])
        .filter((child: any) => child.type === 'list-item')
        .map((item: any) => {
          const itemText = processChildren(item.children || []);
          return `<li>${itemText}</li>`;
        })
        .join('');
      return `<${listTag} class="mb-4">${listItems}</${listTag}>`;

    case 'quote':
      return `<blockquote class="mb-4">${processedChildren}</blockquote>`;

    case 'code':
      return `<pre class="mb-4"><code>${processedChildren}</code></pre>`;

    case 'link':
      const url = rest.url || rest.href || '#';
      return `<a href="${url}">${processedChildren}</a>`;

    case 'image':
      const imageUrl = rest.url || rest.src || '';
      const imageAlt = rest.alt || '';
      return `<img src="${imageUrl}" alt="${imageAlt}" class="mb-4" />`;

    default:
      // Para tipos desconhecidos, tenta renderizar como parágrafo
      if (processedChildren) {
        return `<p class="mb-4">${processedChildren}</p>`;
      }
      return '';
  }
}

/**
 * Processa os children de um bloco, aplicando formatação
 */
function processChildren(children: any[]): string {
  if (!Array.isArray(children)) {
    return '';
  }

  return children
    .map((child) => {
      if (typeof child === 'string') {
        return child;
      }

      if (typeof child === 'object' && child !== null) {
        const text = child.text || '';
        let formattedText = text;

        // Aplica formatação
        if (child.bold) {
          formattedText = `<strong>${formattedText}</strong>`;
        }
        if (child.italic) {
          formattedText = `<em>${formattedText}</em>`;
        }
        if (child.underline) {
          formattedText = `<u>${formattedText}</u>`;
        }
        if (child.strikethrough) {
          formattedText = `<s>${formattedText}</s>`;
        }
        if (child.code) {
          formattedText = `<code>${formattedText}</code>`;
        }

        // Se tiver children aninhados, processa recursivamente
        if (child.children && Array.isArray(child.children)) {
          return processChildren(child.children);
        }

        return formattedText;
      }

      return '';
    })
    .join('');
}

/**
 * Componente React para renderizar conteúdo do Strapi
 */
export function StrapiContent({ content, className = '' }: { content: any; className?: string }) {
  const processedContent = processStrapiContent(content);

  if (!processedContent) {
    return null;
  }

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}

