'use client';

import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Database,
    Layers,
    Maximize,
    Minimize,
    ShieldCheck,
    Target,
    Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Presentation = () => {
  const { t } = useTranslation();
  const { theme, resolvedTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const presentationRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Aguarda a montagem para evitar hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determina se está em modo dark
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const slides = useMemo(() => [
    {
      id: 0,
      type: 'intro',
      title: t('presentation.slides.intro.title'),
      subtitle: t('presentation.slides.intro.subtitle'),
      content: t('presentation.slides.intro.content'),
      highlight: t('presentation.slides.intro.highlight'),
      bgColor: isDark ? 'bg-black dark:bg-black' : 'bg-white dark:bg-black',
    },
    {
      id: 1,
      type: 'problem',
      title: t('presentation.slides.problem.title'),
      subtitle: t('presentation.slides.problem.subtitle'),
      content: t('presentation.slides.problem.content'),
      highlight: t('presentation.slides.problem.highlight'),
      icon: <AlertTriangle className={`w-16 h-16 mb-4 ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`} />,
      bgColor: isDark ? 'bg-zinc-900 dark:bg-zinc-900' : 'bg-gray-100 dark:bg-zinc-900',
    },
    {
      id: 2,
      type: 'method',
      title: t('presentation.slides.method.title'),
      subtitle: t('presentation.slides.method.subtitle'),
      content: t('presentation.slides.method.content'),
      points: t('presentation.slides.method.points', { returnObjects: true }) as string[],
      bgColor: isDark ? 'bg-zinc-800 dark:bg-zinc-800' : 'bg-gray-50 dark:bg-zinc-800',
    },
    {
      id: 3,
      type: 'pillars',
      title: t('presentation.slides.pillars.title'),
      subtitle: t('presentation.slides.pillars.subtitle'),
      content: t('presentation.slides.pillars.content'),
      grid: [
        {
          title: t('presentation.slides.pillars.grid.gestao.title'),
          desc: t('presentation.slides.pillars.grid.gestao.desc'),
          icon: <Users />,
          color: isDark ? 'text-green-400' : 'text-green-600',
        },
        {
          title: t('presentation.slides.pillars.grid.dados.title'),
          desc: t('presentation.slides.pillars.grid.dados.desc'),
          icon: <Database />,
          color: isDark ? 'text-blue-400' : 'text-blue-600',
        },
        {
          title: t('presentation.slides.pillars.grid.branding.title'),
          desc: t('presentation.slides.pillars.grid.branding.desc'),
          icon: <Layers />,
          color: isDark ? 'text-pink-400' : 'text-pink-600',
        },
        {
          title: t('presentation.slides.pillars.grid.growth.title'),
          desc: t('presentation.slides.pillars.grid.growth.desc'),
          icon: <BarChart3 />,
          color: isDark ? 'text-orange-400' : 'text-orange-600',
        },
      ],
      bgColor: isDark ? 'bg-zinc-900 dark:bg-zinc-900' : 'bg-gray-100 dark:bg-zinc-900',
    },
    {
      id: 4,
      type: 'solution',
      title: t('presentation.slides.solution.title'),
      subtitle: t('presentation.slides.solution.subtitle'),
      content: t('presentation.slides.solution.content'),
      phases: [
        {
          name: t('presentation.slides.solution.phases.setup.name'),
          desc: t('presentation.slides.solution.phases.setup.desc'),
          items: t('presentation.slides.solution.phases.setup.items', { returnObjects: true }) as string[],
          prerequisite: t('presentation.slides.solution.phases.setup.prerequisite'),
          active: true,
        },
        {
          name: t('presentation.slides.solution.phases.growth.name'),
          desc: t('presentation.slides.solution.phases.growth.desc'),
          items: t('presentation.slides.solution.phases.growth.items', { returnObjects: true }) as string[],
          active: false,
        },
      ],
      bgColor: isDark ? 'bg-zinc-800 dark:bg-zinc-800' : 'bg-gray-50 dark:bg-zinc-800',
    },
    {
      id: 5,
      type: 'offer',
      title: t('presentation.slides.offer.title'),
      subtitle: t('presentation.slides.offer.subtitle'),
      content: t('presentation.slides.offer.content'),
      highlight: t('presentation.slides.offer.highlight'),
      icon: <Target className={`w-16 h-16 mb-4 ${isDark ? 'text-purple-500' : 'text-purple-600'}`} />,
      bgColor: isDark ? 'bg-black dark:bg-black' : 'bg-white dark:bg-black',
    },
  ], [t, isDark]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide((curr) => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((curr) => curr - 1);
  };

  const enterFullscreen = async () => {
    if (presentationRef.current) {
      try {
        if (presentationRef.current.requestFullscreen) {
          await presentationRef.current.requestFullscreen();
        } else if ((presentationRef.current as any).webkitRequestFullscreen) {
          await (presentationRef.current as any).webkitRequestFullscreen();
        } else if ((presentationRef.current as any).mozRequestFullScreen) {
          await (presentationRef.current as any).mozRequestFullScreen();
        } else if ((presentationRef.current as any).msRequestFullscreen) {
          await (presentationRef.current as any).msRequestFullscreen();
        }
      } catch (error) {
        console.error('Error attempting to enable fullscreen:', error);
      }
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to exit fullscreen:', error);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const SlideContent = ({ slide }: { slide: (typeof slides)[number] }) => {
    if (slide.type === 'intro') {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
          <div className="mb-6">
            <ShieldCheck className={`w-24 h-24 ${isDark ? 'text-purple-600' : 'text-purple-700'}`} />
          </div>
          <h1 className={`text-6xl font-bold mb-4 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {slide.title}
          </h1>
          <h2 className={`text-2xl mb-8 font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{slide.subtitle}</h2>
          <div className={`h-1 w-20 mb-8 ${isDark ? 'bg-purple-600' : 'bg-purple-700'}`}></div>
          <p className={`text-xl max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{slide.content}</p>
          <span className={`mt-8 px-4 py-2 border rounded-full text-sm uppercase tracking-widest ${
            isDark 
              ? 'border-purple-500 text-purple-400' 
              : 'border-purple-600 text-purple-700'
          }`}>
            {slide.highlight}
          </span>
        </div>
      );
    }

    if (slide.type === 'pillars') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8">
          <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{slide.title}</h2>
          <p className={`mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{slide.subtitle}</p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
            {slide.grid?.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-purple-500/50'
                    : 'bg-white/80 border-gray-200 hover:border-purple-400 shadow-sm'
                }`}
              >
                <div className={`mb-4 ${item.color}`}>{item.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (slide.type === 'solution') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8">
          <h2 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>{slide.title}</h2>
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
            {slide.phases?.map((phase, idx) => (
              <div
                key={idx}
                className={`flex-1 p-8 rounded-2xl border ${
                  idx === 0
                    ? isDark
                      ? 'border-purple-500 bg-purple-900/10'
                      : 'border-purple-600 bg-purple-50'
                    : isDark
                    ? 'border-gray-700 bg-gray-800/50'
                    : 'border-gray-300 bg-white/80'
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    idx === 0 
                      ? isDark ? 'text-purple-400' : 'text-purple-700'
                      : isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {phase.name}
                </h3>
                <p className={`mb-6 text-sm uppercase tracking-wider ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {phase.desc}
                </p>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className={`flex items-center ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 mr-3 ${isDark ? 'text-green-500' : 'text-green-600'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                {idx === 0 && phase.prerequisite && (
                  <div className={`mt-6 pt-6 border-t ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <p className={`text-xs font-semibold ${
                      isDark ? 'text-purple-300' : 'text-purple-700'
                    }`}>
                      {phase.prerequisite}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`mt-8 flex items-center text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>{t('presentation.slides.solution.flow.start')}</span>
            <ArrowRight className="w-4 h-4 mx-2" />
            <span>{t('presentation.slides.solution.flow.end')}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        {slide.icon && slide.icon}
        <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{slide.title}</h2>
        <h3 className={`text-xl mb-8 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>{slide.subtitle}</h3>
        <p className={`text-lg max-w-3xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{slide.content}</p>
        {slide.points && (
          <div className="flex gap-4 mt-8">
            {slide.points.map((p, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  isDark
                    ? 'bg-white/10 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        )}
        {slide.highlight && (
          <span className={`mt-8 px-4 py-2 border rounded-full text-sm uppercase tracking-widest ${
            isDark
              ? 'border-purple-500 text-purple-400'
              : 'border-purple-600 text-purple-700'
          }`}>
            {slide.highlight}
          </span>
        )}
      </div>
    );
  };

  const currentSlideData = slides[currentSlide];
  
  if (!currentSlideData) {
    return null;
  }

  return (
    <>
      {!isFullscreen && <Header />}
      <main
        ref={presentationRef}
        role="main"
        className={`flex flex-col w-full overflow-hidden font-sans ${
          isFullscreen ? 'fixed inset-0 z-[9999] h-screen' : 'min-h-screen'
        } ${
          isDark 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-900'
        }`}
      >
        {/* Viewer Area */}
        <div
          className={`flex-1 relative transition-colors duration-700 ${currentSlideData.bgColor}`}
          style={isFullscreen ? {} : { minHeight: 'calc(100vh - 200px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <SlideContent slide={currentSlideData} />
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-12">
            <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {currentSlide + 1} / {slides.length}
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`p-3 rounded-full transition-all backdrop-blur-sm disabled:opacity-30 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-200/80 hover:bg-gray-300/80'
                }`}
                aria-label={t('presentation.controls.previous')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-3 rounded-full transition-all backdrop-blur-sm ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-gray-200/80 hover:bg-gray-300/80'
                }`}
                aria-label={isFullscreen ? t('presentation.controls.exitFullscreen') : t('presentation.controls.enterFullscreen')}
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6" />
                ) : (
                  <Maximize className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`p-3 rounded-full transition-all shadow-lg disabled:opacity-30 ${
                  isDark
                    ? 'bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 shadow-purple-900/50'
                    : 'bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 shadow-purple-900/30'
                }`}
                aria-label={t('presentation.controls.next')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`h-1 w-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </main>
      {!isFullscreen && <Footer />}
    </>
  );
};

export default Presentation;

