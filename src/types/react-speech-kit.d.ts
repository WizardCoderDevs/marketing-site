declare module 'react-speech-kit' {
  export interface SpeechSynthesisSpeakOptions {
    text: string;
    voice?: SpeechSynthesisVoice;
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: SpeechSynthesisErrorEvent) => void;
  }

  export interface SpeechSynthesisHookResult {
    speak: (options: SpeechSynthesisSpeakOptions) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  }

  export function useSpeechSynthesis(): SpeechSynthesisHookResult;
}

