'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseTranslateResult {
  translate: (text: string) => Promise<string>;
  translateHtml: (html: string) => Promise<string>;
  isTranslating: boolean;
  error: string | null;
}

const CACHE_KEY = 'translation_cache_pt_en';
const MAX_CACHE_SIZE = 500; // Limite de itens no cache para evitar exceder localStorage
const MAX_TEXT_LENGTH = 4500; // Limite de caracteres por requisição (um pouco menor que o limite da API para segurança)

/**
 * Carrega o cache do localStorage
 */
function loadCacheFromStorage(): Map<string, string> {
  if (typeof window === 'undefined') {
    return new Map();
  }

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Record<string, string>;
      return new Map(Object.entries(parsed));
    }
  } catch (error) {
    console.error('[useTranslate] Erro ao carregar cache do localStorage:', error);
  }

  return new Map();
}

/**
 * Divide texto longo em chunks menores para tradução
 */
function splitTextIntoChunks(text: string, maxLength: number = MAX_TEXT_LENGTH): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    let chunkEnd = currentIndex + maxLength;
    
    // Se não é o último chunk, tenta quebrar em um espaço ou ponto final
    if (chunkEnd < text.length) {
      // Procura por um ponto final seguido de espaço
      const periodIndex = text.lastIndexOf('. ', chunkEnd);
      // Procura por um espaço
      const spaceIndex = text.lastIndexOf(' ', chunkEnd);
      
      // Prefere ponto final, depois espaço
      if (periodIndex > currentIndex && periodIndex <= chunkEnd) {
        chunkEnd = periodIndex + 1; // Inclui o ponto
      } else if (spaceIndex > currentIndex && spaceIndex <= chunkEnd) {
        chunkEnd = spaceIndex + 1; // Inclui o espaço
      }
    }

    chunks.push(text.substring(currentIndex, chunkEnd).trim());
    currentIndex = chunkEnd;
  }

  return chunks;
}

/**
 * Traduz texto diretamente (sem dividir em chunks)
 */
async function translateChunk(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      from,
      to,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
    throw new Error(errorData.error || 'Erro ao traduzir');
  }

  const data = await response.json();
  return data.translatedText || text;
}

/**
 * Traduz texto em chunks se necessário
 */
async function translateTextInChunks(text: string, from: string = 'pt', to: string = 'en'): Promise<string> {
  const chunks = splitTextIntoChunks(text);
  
  if (chunks.length === 1) {
    return translateChunk(text, from, to);
  }

  // Texto longo, traduz em chunks
  const translatedChunks: string[] = [];
  
  for (const [i, chunk] of chunks.entries()) {
    translatedChunks.push(await translateChunk(chunk, from, to));
    
    // Pequeno delay entre chunks para evitar rate limiting
    if (i < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return translatedChunks.join(' ');
}

/**
 * Salva o cache no localStorage
 */
function saveCacheToStorage(cache: Map<string, string>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Converte Map para objeto para salvar no localStorage
    const cacheObj: Record<string, string> = {};
    cache.forEach((value, key) => {
      cacheObj[key] = value;
    });

    // Limita o tamanho do cache se necessário
    const entries = Object.entries(cacheObj);
    if (entries.length > MAX_CACHE_SIZE) {
      // Remove os itens mais antigos (primeiros 100)
      const toKeep = entries.slice(100);
      const limitedCache: Record<string, string> = {};
      toKeep.forEach(([key, value]) => {
        limitedCache[key] = value;
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(limitedCache));
    } else {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
    }
  } catch (error) {
    console.error('[useTranslate] Erro ao salvar cache no localStorage:', error);
    // Se o localStorage estiver cheio, tenta limpar itens antigos
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as Record<string, string>;
          const entries = Object.entries(parsed);
          // Mantém apenas os últimos 200 itens
          const toKeep = entries.slice(-200);
          const limitedCache: Record<string, string> = {};
          toKeep.forEach(([key, value]) => {
            limitedCache[key] = value;
          });
          localStorage.setItem(CACHE_KEY, JSON.stringify(limitedCache));
        }
      } catch (cleanupError) {
        console.error('[useTranslate] Erro ao limpar cache:', cleanupError);
      }
    }
  }
}

/**
 * Hook para traduzir conteúdo de posts do blog
 * Traduz automaticamente quando o idioma atual é inglês
 * Mantém cache persistente no localStorage
 */
export function useTranslate(): UseTranslateResult {
  const { i18n } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cache, setCache] = useState<Map<string, string>>(new Map());
  const [isCacheLoaded, setIsCacheLoaded] = useState(false);
  const cacheRef = useRef<Map<string, string>>(new Map());

  // Carrega o cache do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined' && !isCacheLoaded) {
      const loadedCache = loadCacheFromStorage();
      cacheRef.current = loadedCache;
      setCache(loadedCache);
      setIsCacheLoaded(true);
    }
  }, [isCacheLoaded]);

  const translate = useCallback(async (text: string): Promise<string> => {
    // Se o idioma atual é português, retorna o texto original (não precisa traduzir)
    if (i18n.language === 'pt-BR' || !text || text.trim() === '') {
      return text;
    }

    // 1. Verifica cache em memória primeiro (mais rápido)
    if (cacheRef.current.has(text)) {
      return cacheRef.current.get(text)!;
    }

    // 2. Verifica cache do localStorage diretamente (antes de chamar API)
    if (typeof window !== 'undefined') {
      const storageCache = loadCacheFromStorage();
      if (storageCache.has(text)) {
        const cachedTranslation = storageCache.get(text)!;
        // Atualiza o cache em memória para próximas consultas
        cacheRef.current.set(text, cachedTranslation);
        setCache(new Map(cacheRef.current));
        return cachedTranslation;
      }
    }

    // 4. Se não encontrou no cache, chama a API
    setIsTranslating(true);
    setError(null);

    try {
      // Usa função auxiliar que divide textos longos em chunks
      const translatedText = await translateTextInChunks(text, 'pt', 'en');

      // 5. Salva no cache ANTES de retornar
      cacheRef.current.set(text, translatedText);
      // Atualiza o estado apenas para sincronização (não usado nas dependências)
      setCache(new Map(cacheRef.current));
      
      // Salva no localStorage de forma síncrona para garantir persistência
      saveCacheToStorage(cacheRef.current);

      // Retorna a tradução após salvar no cache
      return translatedText;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao traduzir';
      setError(errorMessage);
      console.error('[useTranslate] Erro:', err);
      // Em caso de erro, retorna o texto original
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [i18n.language]);

  /**
   * Traduz conteúdo HTML, preservando as tags HTML
   */
  const translateHtml = useCallback(async (html: string): Promise<string> => {
    // Se o idioma atual é português, retorna o HTML original (não precisa traduzir)
    if (i18n.language === 'pt-BR' || !html || html.trim() === '') {
      return html;
    }

    // 1. Verifica cache em memória primeiro (mais rápido)
    if (cacheRef.current.has(html)) {
      return cacheRef.current.get(html)!;
    }

    // 2. Verifica cache do localStorage diretamente (antes de chamar API)
    if (typeof window !== 'undefined') {
      const storageCache = loadCacheFromStorage();
      if (storageCache.has(html)) {
        const cachedTranslation = storageCache.get(html)!;
        // Atualiza o cache em memória para próximas consultas
        cacheRef.current.set(html, cachedTranslation);
        setCache(new Map(cacheRef.current));
        return cachedTranslation;
      }
    }

    // 4. Se não encontrou no cache, chama a API
    setIsTranslating(true);
    setError(null);

    try {
      const { splitHtmlIntoParts, rebuildHtmlFromParts } = await import('@/utils/translateHtml');
      const parts = splitHtmlIntoParts(html);
      const textParts = parts.filter((part) => part.type === 'text');

      if (textParts.length === 0) {
        return html;
      }

      const delimiter = '__SEGMENT_BOUNDARY__';
      const escapeRegExp = (value: string): string =>
        value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const splitRegex = new RegExp(`\\s*${escapeRegExp(delimiter)}\\s*`);

      const segmentData = textParts.map((part) => {
        const content = part.content;
        const leading = content.match(/^\s*/)?.[0] ?? '';
        const trailing = content.match(/\s*$/)?.[0] ?? '';
        const core = content.slice(leading.length, content.length - trailing.length);
        return { leading, trailing, core, original: content };
      });

      const translatedCores: string[] = new Array(segmentData.length).fill('');
      const chunks: Array<{ text: string; indices: number[] }> = [];
      let currentText = '';
      let currentIndices: number[] = [];

      segmentData.forEach((segment, index) => {
        if (!segment.core.trim()) {
          translatedCores[index] = segment.core;
          return;
        }

        const joiner = currentIndices.length === 0 ? '' : `\n${delimiter}\n`;
        const candidateLength = currentText.length + joiner.length + segment.core.length;

        if (candidateLength > MAX_TEXT_LENGTH && currentIndices.length > 0) {
          chunks.push({ text: currentText, indices: currentIndices });
          currentText = '';
          currentIndices = [];
        }

        currentText = currentText ? currentText + joiner + segment.core : segment.core;
        currentIndices.push(index);
      });

      if (currentIndices.length > 0) {
        chunks.push({ text: currentText, indices: currentIndices });
      }

  for (const [i, chunk] of chunks.entries()) {
        const translatedChunk = await translateChunk(chunk.text, 'pt', 'en');
        let splitParts = translatedChunk.split(splitRegex);

        if (splitParts.length !== chunk.indices.length) {
          splitParts = translatedChunk.split(delimiter);
        }

        if (splitParts.length !== chunk.indices.length) {
          console.warn('[useTranslate] Falha ao mapear segmentos traduzidos. Mantendo texto original.');
          chunk.indices.forEach((segmentIndex) => {
            const segment = segmentData[segmentIndex];
            if (segment) {
              translatedCores[segmentIndex] = segment.core;
            }
          });
        } else {
          splitParts.forEach((part, partIndex) => {
            const segmentIndex = chunk.indices[partIndex];
            if (segmentIndex !== undefined) {
              translatedCores[segmentIndex] = part.trim();
            }
          });
        }

        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      const translatedTextParts = segmentData.map((segment, index) => {
        const translatedCore = translatedCores[index] ?? segment.core;
        return `${segment.leading}${translatedCore}${segment.trailing}`;
      });

      const translatedHtml = rebuildHtmlFromParts(parts, translatedTextParts);

      // 5. Salva no cache ANTES de retornar
      cacheRef.current.set(html, translatedHtml);
      // Atualiza o estado apenas para sincronização (não usado nas dependências)
      setCache(new Map(cacheRef.current));
      
      // Salva no localStorage de forma síncrona para garantir persistência
      saveCacheToStorage(cacheRef.current);

      // Retorna a tradução após salvar no cache
      return translatedHtml;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao traduzir';
      setError(errorMessage);
      console.error('[useTranslate] Erro ao traduzir HTML:', err);
      // Em caso de erro, retorna o HTML original
      return html;
    } finally {
      setIsTranslating(false);
    }
  }, [i18n.language]);

  return {
    translate,
    translateHtml,
    isTranslating,
    error,
  };
}

