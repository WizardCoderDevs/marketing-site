import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route para traduzir conteúdo de português para inglês
 * 
 * Esta rota pode ser configurada para usar diferentes serviços de tradução:
 * - Google Translate API (requer chave de API)
 * - DeepL API (requer chave de API)
 * - Outros serviços de tradução
 * 
 * Por padrão, usa uma abordagem que funciona sem chave de API usando
 * uma solução alternativa (pode ser configurada via variáveis de ambiente)
 */

interface TranslateRequest {
  text: string;
  from?: string;
  to?: string;
}

// Cache simples em memória para evitar traduções repetidas
const translationCache = new Map<string, string>();
const MAX_CACHE_SIZE = 1000;

function getCacheKey(text: string, from: string, to: string): string {
  return `${from}:${to}:${text}`;
}

/**
 * Traduz texto usando Google Translate via API não oficial (sem chave de API)
 * Nota: Esta é uma solução temporária. Para produção, recomenda-se usar
 * a API oficial do Google Translate ou DeepL com chave de API.
 */
async function translateWithGoogleFree(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  try {
    // Usa a API não oficial do Google Translate (pode ter limitações)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    // A resposta vem como um array aninhado
    if (Array.isArray(data) && data[0] && Array.isArray(data[0])) {
      const translatedText = data[0]
        .map((item: any[]) => item[0])
        .filter(Boolean)
        .join('');
      return translatedText || text;
    }

    return text;
  } catch (error) {
    console.error('[Translate API] Erro ao traduzir:', error);
    throw error;
  }
}

/**
 * Traduz texto usando a API oficial do Google Cloud Translate
 * Requer: GOOGLE_TRANSLATE_API_KEY nas variáveis de ambiente
 */
async function translateWithGoogleCloud(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY não configurada');
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'text',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Google Cloud Translate error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText || text;
  } catch (error) {
    console.error('[Translate API] Erro ao traduzir com Google Cloud:', error);
    throw error;
  }
}

/**
 * Traduz texto usando DeepL API
 * Requer: DEEPL_API_KEY nas variáveis de ambiente
 */
async function translateWithDeepL(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY;
  
  if (!apiKey) {
    throw new Error('DEEPL_API_KEY não configurada');
  }

  try {
    // DeepL usa códigos de idioma ligeiramente diferentes
    const deeplFrom = from === 'pt' ? 'PT' : from.toUpperCase();
    const deeplTo = to === 'en' ? 'EN' : to.toUpperCase();

    const url = 'https://api-free.deepl.com/v2/translate';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        source_lang: deeplFrom,
        target_lang: deeplTo,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`DeepL API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.translations[0].text || text;
  } catch (error) {
    console.error('[Translate API] Erro ao traduzir com DeepL:', error);
    throw error;
  }
}

/**
 * Seleciona o método de tradução baseado nas variáveis de ambiente
 */
async function translateText(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  // Verifica cache primeiro
  const cacheKey = getCacheKey(text, from, to);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  let translatedText: string;

  // Prioridade: DeepL > Google Cloud > Google Free
  if (process.env.DEEPL_API_KEY) {
    translatedText = await translateWithDeepL(text, from, to);
  } else if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    translatedText = await translateWithGoogleCloud(text, from, to);
  } else {
    // Fallback para método gratuito (pode ter limitações)
    translatedText = await translateWithGoogleFree(text, from, to);
  }

  // Armazena no cache (com limite de tamanho)
  if (translationCache.size >= MAX_CACHE_SIZE) {
    // Remove o primeiro item (FIFO)
    const firstKey = translationCache.keys().next().value;
    if (firstKey) {
      translationCache.delete(firstKey);
    }
  }
  translationCache.set(cacheKey, translatedText);

  return translatedText;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, from = 'pt', to = 'en' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Texto é obrigatório e deve ser uma string' },
        { status: 400 }
      );
    }

    // Valida idiomas
    const validLanguages = ['pt', 'en', 'es', 'fr', 'de'];
    if (!validLanguages.includes(from) || !validLanguages.includes(to)) {
      return NextResponse.json(
        { error: 'Idiomas inválidos' },
        { status: 400 }
      );
    }

    // Se os idiomas são iguais, retorna o texto original
    if (from === to) {
      return NextResponse.json({ translatedText: text });
    }

    // Limita o tamanho do texto para evitar problemas
    const MAX_TEXT_LENGTH = 5000;
    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Texto muito longo. Máximo: ${MAX_TEXT_LENGTH} caracteres` },
        { status: 400 }
      );
    }

    const translatedText = await translateText(text, from, to);

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('[Translate API] Erro:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao traduzir texto',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

