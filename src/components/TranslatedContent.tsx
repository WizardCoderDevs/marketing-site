'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslatedContentProps {
  content: string;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Componente que traduz automaticamente conteúdo HTML quando o idioma é inglês
 */
export function TranslatedContent({ 
  content, 
  className = '',
  fallback 
}: TranslatedContentProps) {
  const { i18n } = useTranslation();
  const { translateHtml, isTranslating } = useTranslate();
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTranslation = async () => {
      // Se o idioma é português, usa o conteúdo original (não precisa traduzir)
      if (i18n.language === 'pt-BR') {
        setTranslatedContent(null);
        setIsLoading(false);
        return;
      }

      // Se o idioma é inglês, precisa traduzir
      // O hook translateHtml já verifica o cache antes de chamar a API
      setIsLoading(true);
      try {
        // Chama translateHtml que:
        // 1. Verifica cache em memória
        // 2. Verifica cache do localStorage
        // 3. Se não encontrar, chama API e salva no cache
        const translated = await translateHtml(content);
        setTranslatedContent(translated);
      } catch (error) {
        console.error('[TranslatedContent] Erro ao traduzir:', error);
        // Em caso de erro, usa o conteúdo original
        setTranslatedContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Reseta o estado quando o idioma ou conteúdo muda para forçar nova verificação
    setTranslatedContent(null);
    loadTranslation();
  }, [content, i18n.language, translateHtml]);

  // Mostra loading ou fallback enquanto traduz
  if (isLoading || isTranslating) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className={className}>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Usa conteúdo traduzido se disponível, senão usa o original
  const displayContent = translatedContent || content;

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: displayContent }}
    />
  );
}

/**
 * Componente simplificado para traduzir apenas texto (não HTML)
 */
export function TranslatedText({ 
  text, 
  className = '',
  fallback 
}: { 
  text: string; 
  className?: string;
  fallback?: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const { translate, isTranslating } = useTranslate();
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTranslation = async () => {
      // Se o idioma é português, usa o texto original (não precisa traduzir)
      if (i18n.language === 'pt-BR') {
        setTranslatedText(null);
        setIsLoading(false);
        return;
      }

      // Se o idioma é inglês, precisa traduzir
      // O hook translate já verifica o cache antes de chamar a API
      setIsLoading(true);
      try {
        // Chama translate que:
        // 1. Verifica cache em memória
        // 2. Verifica cache do localStorage
        // 3. Se não encontrar, chama API e salva no cache
        const translated = await translate(text);
        setTranslatedText(translated);
      } catch (error) {
        console.error('[TranslatedText] Erro ao traduzir:', error);
        setTranslatedText(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Reseta o estado quando o idioma ou texto muda para forçar nova verificação
    setTranslatedText(null);
    loadTranslation();
  }, [text, i18n.language, translate]);

  if (isLoading || isTranslating) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <span className={`${className} inline-block w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse`}></span>
    );
  }

  const displayText = translatedText || text;

  return <span className={className}>{displayText}</span>;
}
