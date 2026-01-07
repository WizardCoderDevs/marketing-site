import { NextRequest, NextResponse } from 'next/server';

import { fetchStrapiPosts } from '@/lib/strapi';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get('tag') as 'articles' | 'news' | null;

  if (!tag || (tag !== 'articles' && tag !== 'news')) {
    return NextResponse.json(
      { error: 'Parâmetro "tag" é obrigatório. Use "articles" ou "news".' },
      { status: 400 }
    );
  }

  try {
    const posts = await fetchStrapiPosts(tag);
    return NextResponse.json({ data: posts });
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao processar requisição: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
      { status: 500 }
    );
  }
}

