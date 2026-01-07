import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiUrl = process.env.NEXT_STRAPI_API_URL;
  const apiKey = process.env.NEXT_STRAPI_API_KEY;

  const testResults = {
    timestamp: new Date().toISOString(),
    environment: {
      hasApiUrl: !!apiUrl,
      hasApiKey: !!apiKey,
      apiUrlLength: apiUrl?.length || 0,
      apiKeyLength: apiKey?.length || 0,
      apiUrlPreview: apiUrl ? `${apiUrl.substring(0, 30)}...` : 'não definido',
      nodeEnv: process.env.NODE_ENV,
    },
    tests: [] as Array<{
      name: string;
      success: boolean;
      message: string;
      details?: any;
    }>,
  };

  // Teste 1: Verificar variáveis de ambiente
  if (!apiUrl || !apiKey) {
    testResults.tests.push({
      name: 'Variáveis de Ambiente',
      success: false,
      message: 'Variáveis NEXT_STRAPI_API_URL ou NEXT_STRAPI_API_KEY não configuradas',
    });
    return NextResponse.json(testResults, { status: 500 });
  }

  testResults.tests.push({
    name: 'Variáveis de Ambiente',
    success: true,
    message: 'Variáveis configuradas corretamente',
  });

  // Teste 2: Validar formato da URL
  const normalizedApiUrl = apiUrl.trim().replace(/\/$/, '');
  const isValidUrl = normalizedApiUrl.startsWith('http://') || normalizedApiUrl.startsWith('https://');

  if (!isValidUrl) {
    testResults.tests.push({
      name: 'Formato da URL',
      success: false,
      message: 'URL deve começar com http:// ou https://',
      details: { url: normalizedApiUrl.substring(0, 50) },
    });
    return NextResponse.json(testResults, { status: 500 });
  }

  testResults.tests.push({
    name: 'Formato da URL',
    success: true,
    message: 'URL formatada corretamente',
    details: { normalizedUrl: normalizedApiUrl.substring(0, 50) + '...' },
  });

  // Teste 3: Testar conectividade básica (teste com endpoint simples)
  try {
    const healthUrl = `${normalizedApiUrl}/api/posts?pagination[limit]=1`;
    const healthResponse = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    testResults.tests.push({
      name: 'Conectividade Básica',
      success: healthResponse.ok,
      message: healthResponse.ok
        ? `Conectado com sucesso (Status: ${healthResponse.status})`
        : `Falha na conexão (Status: ${healthResponse.status})`,
      details: {
        status: healthResponse.status,
        statusText: healthResponse.statusText,
        ok: healthResponse.ok,
      },
    });

    if (!healthResponse.ok) {
      const errorText = await healthResponse.text().catch(() => 'Erro desconhecido');
      testResults.tests.push({
        name: 'Detalhes do Erro',
        success: false,
        message: 'Erro na resposta do Strapi',
        details: {
          error: errorText.substring(0, 500),
        },
      });
      return NextResponse.json(testResults, { status: 200 });
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Conectividade Básica',
      success: false,
      message: 'Erro ao conectar com o Strapi',
      details: {
        error: error instanceof Error ? error.message : String(error),
        errorName: error instanceof Error ? error.name : 'Unknown',
      },
    });
    return NextResponse.json(testResults, { status: 200 });
  }

  // Teste 4: Testar busca de artigos
  try {
    const articlesUrl = `${normalizedApiUrl}/api/posts?filters[tags][name][$eq]=article&populate=*&pagination[limit]=1`;
    const articlesResponse = await fetch(articlesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      testResults.tests.push({
        name: 'Busca de Artigos',
        success: true,
        message: `Encontrados ${articlesData.data?.length || 0} artigo(s)`,
        details: {
          count: articlesData.data?.length || 0,
          total: articlesData.meta?.pagination?.total || 0,
        },
      });
    } else {
      testResults.tests.push({
        name: 'Busca de Artigos',
        success: false,
        message: `Erro ao buscar artigos (Status: ${articlesResponse.status})`,
        details: {
          status: articlesResponse.status,
          statusText: articlesResponse.statusText,
        },
      });
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Busca de Artigos',
      success: false,
      message: 'Erro ao buscar artigos',
      details: {
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }

  // Teste 5: Testar busca de notícias
  try {
    const newsUrl = `${normalizedApiUrl}/api/posts?filters[tags][name][$eq]=news&populate=*&pagination[limit]=1`;
    const newsResponse = await fetch(newsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (newsResponse.ok) {
      const newsData = await newsResponse.json();
      testResults.tests.push({
        name: 'Busca de Notícias',
        success: true,
        message: `Encontradas ${newsData.data?.length || 0} notícia(s)`,
        details: {
          count: newsData.data?.length || 0,
          total: newsData.meta?.pagination?.total || 0,
        },
      });
    } else {
      testResults.tests.push({
        name: 'Busca de Notícias',
        success: false,
        message: `Erro ao buscar notícias (Status: ${newsResponse.status})`,
        details: {
          status: newsResponse.status,
          statusText: newsResponse.statusText,
        },
      });
    }
  } catch (error) {
    testResults.tests.push({
      name: 'Busca de Notícias',
      success: false,
      message: 'Erro ao buscar notícias',
      details: {
        error: error instanceof Error ? error.message : String(error),
      },
    });
  }

  // Resumo final
  const successCount = testResults.tests.filter((t) => t.success).length;
  const totalTests = testResults.tests.length;
  const allSuccess = successCount === totalTests;

  return NextResponse.json(
    {
      ...testResults,
      summary: {
        totalTests,
        successCount,
        failureCount: totalTests - successCount,
        allSuccess,
      },
    },
    { status: allSuccess ? 200 : 200 } // Sempre retorna 200 para mostrar os resultados
  );
}

