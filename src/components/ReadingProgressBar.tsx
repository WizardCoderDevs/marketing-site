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
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
      <div
        className="h-full origin-left bg-violet-600 transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </div>
  );
}

