import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Importa o tipo específico para Request

// Rota de API para gerar ideias de conteúdo usando a Gemini API.
// Esta função é executada no lado do servidor.
// Define o tipo para a requisição
export async function POST(request: NextRequest) {
  // O corpo da requisição será um JSON contendo userInput
  interface RequestBody {
    userInput: string;
  }

  const { userInput }: RequestBody = await request.json();

  // Verifica se o input do usuário foi fornecido
  if (!userInput) {
    return NextResponse.json(
      { error: 'Input de usuário é obrigatório.' },
      { status: 400 }
    );
  }

  try {
    const chatHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    // Prompt para a IA gerar ideias de conteúdo, com foco exclusivo em marketing digital.
    chatHistory.push({
      role: 'user',
      parts: [
        {
          text: `Gerar 5 ideias de posts para redes sociais (Facebook e Instagram) para uma empresa com a seguinte descrição/objetivo: "${userInput}". As ideias devem ser criativas, focadas **exclusivamente em marketing digital** e incluir um título e uma breve descrição para cada post. Se a descrição não for relacionada a marketing digital, por favor, responda que a funcionalidade é apenas para ideias de marketing digital.`,
        },
      ],
    });

    // Define a estrutura do payload para a API da Gemini
    interface GeminiPayload {
      contents: Array<{ role: string; parts: Array<{ text: string }> }>;
    }
    const payload: GeminiPayload = { contents: chatHistory };

    // A chave da API é acessada a partir das variáveis de ambiente do Next.js.
    // Garanta que `NEXT_PUBLIC_GEMINI_API_KEY` esteja definida em seu arquivo `.env.local`.
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Verifica se a chave da API está configurada
    if (!apiKey) {
      console.error('Gemini API Key não configurada.');
      return NextResponse.json(
        { error: 'Erro de configuração da API. A chave da API não está definida.' },
        { status: 500 }
      );
    }

    const apiUrl: string = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Faz a requisição à Gemini API
    const response: Response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Define a estrutura esperada da resposta da Gemini API
    interface GeminiApiResponse {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    }
    const result: GeminiApiResponse = await response.json();

    // Processa a resposta da Gemini API
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const text: string = result.candidates[0].content.parts[0].text || '';
      return NextResponse.json({ text }); // Retorna o texto gerado
    } else {
      return NextResponse.json(
        { error: 'Não foi possível gerar ideias. Tente novamente.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    // Captura o erro com tipo 'any' para flexibilidade
    console.error('Erro na API de geração de ideias:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro interno ao processar sua requisição.' },
      { status: 500 }
    );
  }
}
