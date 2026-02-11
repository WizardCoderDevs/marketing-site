'use client';

import { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  targetId: string;
}

export default function ReadingProgressBar({ targetId }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.getElementById(targetId);
      if (!article) {
        setProgress(0);
        return;
      }

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(articleHeight - viewportHeight, 1);
      const currentScroll = window.scrollY - articleTop;
      const ratio = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

      setProgress(ratio);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 z-50 h-1.5 w-full bg-slate-200/20 dark:bg-slate-800/20 backdrop-blur-sm">
      <div
        className="h-full origin-left bg-gradient-to-r from-violet-600 via-blue-500 to-indigo-600 transition-transform duration-150 ease-out shadow-[0_0_10px_2px_rgba(139,92,246,0.3)]"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </div>
  );
}

