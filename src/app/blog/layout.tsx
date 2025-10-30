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
      <main role="main">
        <section className="prose prose-slate dark:prose-invert mx-auto w-full max-w-3xl px-4 py-10 md:py-12">
          {children}
        </section>
        <Footer />
      </main>
    </>
    </ThemeProvider>
  );
}


