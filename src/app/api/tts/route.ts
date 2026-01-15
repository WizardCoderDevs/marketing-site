import { NextRequest, NextResponse } from 'next/server';

interface TtsRequest {
  text: string;
  lang?: string;
}

const MAX_TEXT_LENGTH = 4500;

function splitTextForTts(text: string, maxLength: number = MAX_TEXT_LENGTH): string[] {
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

async function synthesizeWithElevenLabs(text: string, lang: string): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY ?? process.env.NEXT_ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID ?? process.env.NEXT_ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    throw new Error('ELEVENLABS_API_KEY ou ELEVENLABS_VOICE_ID não configurada');
  }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: lang === 'pt-BR' ? 'eleven_multilingual_v2' : 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.4,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => null);
    throw new Error(errorBody || 'Erro ao gerar áudio');
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  return buffer.toString('base64');
}

async function synthesizeWithGoogleCloud(text: string, lang: string): Promise<string> {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_TTS_API_KEY não configurada');
  }

  const voice =
    lang === 'pt-BR'
      ? { languageCode: 'pt-BR', name: 'pt-BR-Wavenet-A' }
      : { languageCode: lang, name: undefined };

  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text },
        voice,
        audioConfig: {
          audioEncoding: 'MP3',
        },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error?.message || 'Erro ao gerar áudio');
  }

  const data = (await response.json()) as { audioContent?: string };
  if (!data.audioContent) {
    throw new Error('Resposta de áudio inválida');
  }

  return data.audioContent;
}

type TtsProvider = 'elevenlabs' | 'google' | 'none';

function resolveProvider(lang: string): TtsProvider {
  const hasElevenLabs =
    (process.env.ELEVENLABS_API_KEY || process.env.NEXT_ELEVENLABS_API_KEY) &&
    (process.env.ELEVENLABS_VOICE_ID || process.env.NEXT_ELEVENLABS_VOICE_ID);

  if (lang === 'pt-BR') {
    return hasElevenLabs ? 'elevenlabs' : 'none';
  }

  return 'google';
}

async function synthesizeChunk(text: string, lang: string, provider: TtsProvider): Promise<string> {
  if (provider === 'elevenlabs') {
    return synthesizeWithElevenLabs(text, lang);
  }

  if (provider === 'google') {
    return synthesizeWithGoogleCloud(text, lang);
  }

  throw new Error('TTS natural indisponível para português');
}

export async function POST(request: NextRequest) {
  let provider: TtsProvider | null = null;
  try {
    const body = (await request.json()) as TtsRequest;
    const text = body?.text?.trim();
    const lang = body?.lang || 'pt-BR';

    if (!text) {
      return NextResponse.json({ error: 'Texto é obrigatório' }, { status: 400 });
    }

    const chunks = splitTextForTts(text);
    provider = resolveProvider(lang);
    if (provider === 'none') {
      return NextResponse.json(
        { error: 'TTS natural indisponível para português' },
        { status: 503 },
      );
    }
    const audioSegments = [];

    for (const chunk of chunks) {
      audioSegments.push(await synthesizeChunk(chunk, lang, provider));
    }

    return NextResponse.json({
      segments: audioSegments,
      mimeType: 'audio/mpeg',
      provider,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: message, provider },
      { status: 500 },
    );
  }
}

