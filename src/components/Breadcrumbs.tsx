'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Não mostrar breadcrumbs na página inicial
  if (pathname === '/') return null;

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    // Começa com a raiz como '/'
    const breadcrumbs = segments.length > 0 ? [{ label: '/', href: '/' }] : [];

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      // Exibe exatamente como está no caminho (sem transformação)
      breadcrumbs.push({ label: segment, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isHomeCrumb = index === 0 && breadcrumb.href === '/';

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
                  aria-label={isHomeCrumb ? 'Início' : undefined}
                >
                  {isHomeCrumb ? (
                    <svg
                      className="h-4 w-4 align-text-bottom"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 10.75L12 3l9 7.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4H10v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.25z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    breadcrumb.label
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
