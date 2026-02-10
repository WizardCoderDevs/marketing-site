'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';
import React from 'react';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <>
      <Header />
      <main role="main" className="min-h-screen bg-white dark:bg-slate-900">
        <section className="blog-content prose prose-slate dark:prose-invert mx-auto w-full">
          {children}
        </section>
        <Footer />
      </main>
    </>
    </ThemeProvider>
  );
}


