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

    // 2. Verifica cache do estado
    if (cache.has(text)) {
      return cache.get(text)!;
    }

    // 3. Verifica cache do localStorage diretamente (antes de chamar API)
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
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          from: 'pt',
          to: 'en',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(errorData.error || 'Erro ao traduzir');
      }

      const data = await response.json();
      const translatedText = data.translatedText || text;

      // 5. Salva no cache ANTES de retornar
      const newCache = new Map(cacheRef.current);
      newCache.set(text, translatedText);
      cacheRef.current = newCache;
      setCache(newCache);
      
      // Salva no localStorage de forma síncrona para garantir persistência
      saveCacheToStorage(newCache);

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
  }, [i18n.language, cache]);

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

    // 2. Verifica cache do estado
    if (cache.has(html)) {
      return cache.get(html)!;
    }

    // 3. Verifica cache do localStorage diretamente (antes de chamar API)
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
      // Extrai apenas o texto, preservando a estrutura HTML
      const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      
      if (!textContent) {
        return html;
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: textContent,
          from: 'pt',
          to: 'en',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(errorData.error || 'Erro ao traduzir');
      }

      const data = await response.json();
      const translatedText = data.translatedText || textContent;

      // Usa função utilitária para reconstruir o HTML traduzido
      const { translateHtmlContent } = await import('@/utils/translateHtml');
      const translatedHtml = translateHtmlContent(html, translatedText);

      // 5. Salva no cache ANTES de retornar
      const newCache = new Map(cacheRef.current);
      newCache.set(html, translatedHtml);
      cacheRef.current = newCache;
      setCache(newCache);
      
      // Salva no localStorage de forma síncrona para garantir persistência
      saveCacheToStorage(newCache);

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
  }, [i18n.language, cache]);

  return {
    translate,
    translateHtml,
    isTranslating,
    error,
  };
}

