import type { MDXComponents } from 'mdx/types';
import React from 'react';

/**
 * Permite personalizar os componentes padrão do MDX
 * Para Next.js 15 com App Router, este arquivo deve estar na raiz do projeto
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Personalização dos componentes HTML padrão
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100" {...props}>
        {props.children}
      </h1>
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="text-3xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200" {...props}>
        {props.children}
      </h2>
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className="text-2xl font-semibold mb-2 mt-4 text-slate-700 dark:text-slate-300" {...props}>
        {props.children}
      </h3>
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed" {...props}>
        {props.children}
      </p>
    ),
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
        {...props}
      >
        {props.children}
      </a>
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="list-disc list-inside mb-4 ml-4 space-y-2" {...props}>
        {props.children}
      </ul>
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="list-decimal list-inside mb-4 ml-4 space-y-2" {...props}>
        {props.children}
      </ol>
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <li className="text-slate-700 dark:text-slate-300" {...props}>
        {props.children}
      </li>
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code
        className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-slate-800 dark:text-slate-200"
        {...props}
      >
        {props.children}
      </code>
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className="border-l-4 border-violet-500 pl-4 italic my-4 text-slate-600 dark:text-slate-400"
        {...props}
      >
        {props.children}
      </blockquote>
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="my-8 border-slate-300 dark:border-slate-700" {...props} />
    ),
    // Permite usar componentes customizados passados como parâmetro
    ...components,
  };
}

