'use client';

import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTranslate } from '@/hooks/useTranslate';

interface TextToSpeechControlsProps {
  title: string;
  html: string;
}

function htmlToText(html: string): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent || '';
  return text.replace(/\s+/g, ' ').trim();
}

function splitTextForSpeech(text: string, maxLength: number = 2000): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxLength;
    if (end < text.length) {
      const slice = text.slice(start, end);
      const lastPeriod = slice.lastIndexOf('. ');
      const lastSpace = slice.lastIndexOf(' ');

      if (lastPeriod > 0) {
        end = start + lastPeriod + 1;
      } else if (lastSpace > 0) {
        end = start + lastSpace + 1;
      }
    }

    chunks.push(text.slice(start, end).trim());
    start = end;
  }

  return chunks.filter(Boolean);
}

export default function TextToSpeechControls({ title, html }: TextToSpeechControlsProps) {
  const { t, i18n } = useTranslation();
  const { translate, translateHtml, isTranslating } = useTranslate();
  const [hasMounted, setHasMounted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [ttsText, setTtsText] = useState('');
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);

  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);
  const utteranceIndexRef = useRef(0);
  const normalizedLang = (i18n.language || '').toLowerCase();
  const isPortuguese = normalizedLang.startsWith('pt');
  const targetLocale = isPortuguese ? 'pt-BR' : 'en-US';
  const targetLangPrefix = targetLocale.split('-')[0] ?? targetLocale;
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const voiceOptions = useMemo(() => {
    if (!voices?.length) {
      return [];
    }

    const localeMatches = voices.filter(
      (voice) => voice.lang === targetLocale || voice.lang.startsWith(targetLangPrefix),
    );

    return localeMatches.length > 0 ? localeMatches : voices;
  }, [targetLangPrefix, targetLocale, voices]);

  const selectedVoice = useMemo(() => {
    if (!voices?.length) {
      return undefined;
    }

    if (selectedVoiceName) {
      return voices.find((voice) => voice.name === selectedVoiceName);
    }

    const matchesLocale = (voice: SpeechSynthesisVoice) =>
      voice.lang === targetLocale || voice.lang.startsWith(targetLangPrefix);

    if (targetLocale === 'pt-BR') {
      return (
        voices.find((voice) => matchesLocale(voice) && /google|microsoft/i.test(voice.name)) ||
        voices.find((voice) => matchesLocale(voice) && /brasil|brazil|portugu/i.test(voice.name)) ||
        voices.find((voice) => matchesLocale(voice)) ||
        voices[0]
      );
    }

    return (
      voices.find((voice) => voice.lang === targetLocale) ||
      voices.find((voice) => voice.lang.startsWith(targetLangPrefix)) ||
      voices[0]
    );
  }, [selectedVoiceName, targetLangPrefix, targetLocale, voices]);

  const speechRate = targetLocale === 'pt-BR' ? 0.92 : 1;
  const speechPitch = targetLocale === 'pt-BR' ? 1.02 : 1;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!supported) return;

    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);

    return () => {
      synth.removeEventListener('voiceschanged', updateVoices);
    };
  }, [supported]);

  useEffect(() => {
    if (!supported) return;
    const key = isPortuguese ? 'tts_voice_pt' : 'tts_voice_en';
    const saved = localStorage.getItem(key);
    if (saved) {
      setSelectedVoiceName(saved);
    } else {
      setSelectedVoiceName(null);
    }
  }, [isPortuguese, supported]);

  useEffect(() => {
    if (!supported) {
      return;
    }

    let isMounted = true;

    const prepareText = async () => {
      if (!html) {
        setTtsText('');
        return;
      }

      setIsPreparing(true);
      try {
        const shouldTranslate = !isPortuguese;
        const finalTitle = shouldTranslate ? await translate(title) : title;
        const finalHtml = shouldTranslate ? await translateHtml(html) : html;
        const combined = [finalTitle, htmlToText(finalHtml)].filter(Boolean).join('. ');

        if (isMounted) {
          setTtsText(combined);
        }
      } catch (error) {
        console.error('[TextToSpeechControls] Erro ao preparar áudio:', error);
        if (isMounted) {
          const fallback = [title, htmlToText(html)].filter(Boolean).join('. ');
          setTtsText(fallback);
        }
      } finally {
        if (isMounted) {
          setIsPreparing(false);
        }
      }
    };

    setTtsText('');
    prepareText();

    return () => {
      isMounted = false;
      window.speechSynthesis.cancel();
    };
  }, [html, i18n.language, isPortuguese, supported, title, translate, translateHtml]);

  useEffect(() => {
    if (!isSpeaking) {
      setIsPaused(false);
    }
  }, [isSpeaking]);

  const speakFromIndex = useCallback(
    (startIndex: number) => {
      if (!supported) {
        return;
      }

      const synth = window.speechSynthesis;
      const utterances = utterancesRef.current;

      if (!utterances.length) {
        return;
      }

      utteranceIndexRef.current = Math.max(0, Math.min(startIndex, utterances.length - 1));

      const speakNext = () => {
        const index = utteranceIndexRef.current;
        const utterance = utterances[index];

        if (!utterance) {
          setIsSpeaking(false);
          return;
        }

        utterance.onend = () => {
          utteranceIndexRef.current += 1;
          speakNext();
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
        };

        synth.speak(utterance);
      };

      speakNext();
    },
    [supported],
  );

  useEffect(() => {
    utterancesRef.current.forEach((utterance) => {
      utterance.volume = volume;
    });

    if (!isSpeaking || isPaused) {
      return;
    }

    window.speechSynthesis.cancel();
    setIsPaused(false);
    speakFromIndex(utteranceIndexRef.current);
  }, [isPaused, isSpeaking, speakFromIndex, volume]);

  const isLoading = isPreparing || isTranslating;
  const canPlay = supported && !isLoading && ttsText.length > 0;
  const playLabel = isSpeaking && isPaused ? t('tts.resume') : t('tts.play');

  const handlePlay = () => {
    if (!canPlay) {
      return;
    }

    const synth = window.speechSynthesis;

    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    synth.cancel();
    utteranceIndexRef.current = 0;
    utterancesRef.current = splitTextForSpeech(ttsText).map((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.voice = selectedVoice || null;
      utterance.lang = targetLocale;
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.volume = volume;
      return utterance;
    });

    if (!utterancesRef.current.length) {
      return;
    }

    setIsSpeaking(true);
    setIsPaused(false);

    speakFromIndex(0);
  };

  const handlePause = () => {
    if (!isSpeaking || isPaused) {
      return;
    }

    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    utteranceIndexRef.current = 0;
    setIsPaused(false);
    setIsSpeaking(false);
  };

  if (!hasMounted || !supported) {
    return (
      <div className="mb-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
        {!hasMounted ? t('tts.loading') : t('tts.unsupported')}
      </div>
    );
  }

  return (
    <section
      className="rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-xl p-6 md:p-8 animate-fade-in relative overflow-hidden"
      aria-label={t('tts.title')}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[50px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-violet-600 dark:text-violet-400">
            <Volume2 className="h-6 w-6" aria-hidden="true" />
            <h2 className="text-lg font-bold tracking-tight">{t('tts.title')}</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isLoading ? t('tts.loading') : t('tts.description')}
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto">
          <div className="flex flex-wrap items-center gap-6">
            {voiceOptions.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t('tts.voiceLabel')}</span>
                <select
                  value={selectedVoiceName || 'auto'}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedVoiceName(value === 'auto' ? null : value);
                    const key = isPortuguese ? 'tts_voice_pt' : 'tts_voice_en';
                    if (value === 'auto') {
                      localStorage.removeItem(key);
                    } else {
                      localStorage.setItem(key, value);
                    }
                  }}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-violet-500 outline-none transition-all cursor-pointer"
                >
                  <option value="auto">{t('tts.voiceAuto')}</option>
                  {voiceOptions.map((voice) => (
                    <option key={`${voice.name}-${voice.lang}`} value={voice.name}>
                      {voice.name.replace(/Google|Microsoft/g, '').trim()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col gap-1.5 flex-1 md:flex-none">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{t('tts.volume')}</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="h-1.5 w-full md:w-32 cursor-pointer accent-violet-600 appearance-none bg-slate-200 dark:bg-slate-800 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlay}
              disabled={!canPlay}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 hover:shadow-violet-600/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Play className={`h-4 w-4 fill-current ${isSpeaking && !isPaused ? 'animate-pulse' : ''}`} aria-hidden="true" />
              {playLabel}
            </button>
            
            {isSpeaking && (
              <>
                <button
                  type="button"
                  onClick={handlePause}
                  disabled={isPaused}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-30"
                  aria-label={t('tts.pause')}
                >
                  <Pause className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleStop}
                  className="p-3 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  aria-label={t('tts.stop')}
                >
                  <Square className="h-5 w-5 fill-current" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

