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
      <main role="main" className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="w-full">
          {children}
        </div>
        <Footer />
      </main>
    </>
    </ThemeProvider>
  );
}


