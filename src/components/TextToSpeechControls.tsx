'use client';

import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  }, [html, i18n.language, supported, title, translate, translateHtml]);

  useEffect(() => {
    if (!isSpeaking) {
      setIsPaused(false);
    }
  }, [isSpeaking]);

  useEffect(() => {
    // No-op: volume applied per utterance.
  }, [volume]);

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

    const speakNext = () => {
      const index = utteranceIndexRef.current;
      const utterance = utterancesRef.current[index];

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

  if (!supported) {
    return (
      <div className="mb-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
        {t('tts.unsupported')}
      </div>
    );
  }

  return (
    <section
      className="mb-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4"
      aria-label={t('tts.title')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <Volume2 className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold">{t('tts.title')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {voiceOptions.length > 0 && (
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              {t('tts.voiceLabel')}
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
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="auto">{t('tts.voiceAuto')}</option>
                {voiceOptions.map((voice) => (
                  <option key={`${voice.name}-${voice.lang}`} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            {t('tts.volume')}
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-2 w-24 cursor-pointer accent-violet-600"
            />
          </label>
          <button
            type="button"
            onClick={handlePlay}
            disabled={!canPlay}
            className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 dark:disabled:bg-slate-700 dark:disabled:text-slate-300"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            {playLabel}
          </button>
          <button
            type="button"
            onClick={handlePause}
            disabled={!isSpeaking || isPaused}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
            {t('tts.pause')}
          </button>
          <button
            type="button"
            onClick={handleStop}
            disabled={!isSpeaking}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            {t('tts.stop')}
          </button>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
        {isLoading ? t('tts.loading') : t('tts.description')}
      </div>
    </section>
  );
}

