'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Não mostrar breadcrumbs na página inicial
  if (pathname === '/') return null;

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ label: 'Início', href: '/' }];

    if (pathname === '/prospecto') {
      breadcrumbs.push({ label: 'Formulário de Prospecção', href: '/prospecto' });
    } else if (pathname === '/servicos') {
      breadcrumbs.push({ label: 'Serviços', href: '/servicos' });
    } else if (pathname === '/ideias') {
      breadcrumbs.push({ label: 'Ideias com IA', href: '/ideias' });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="h-4 w-4 text-slate-400 dark:text-slate-500 mx-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {isLast ? (
                <span
                  className="text-slate-600 dark:text-slate-400 font-medium"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
