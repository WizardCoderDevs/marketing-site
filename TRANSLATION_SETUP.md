# Configuração de Tradução Automática para Posts do Blog

Este documento explica como funciona a tradução automática dos posts do blog e como configurá-la.

## Como Funciona

A solução implementada traduz automaticamente os posts do blog de português para inglês quando o usuário seleciona o idioma inglês no site. A tradução acontece:

1. **Títulos dos posts**: Traduzidos automaticamente na listagem e nas páginas de detalhe
2. **Conteúdo dos posts**: Traduzido preservando a formatação HTML
3. **Textos da interface**: Usam o sistema i18n existente (já configurado)

## Métodos de Tradução Suportados

A API de tradução suporta três métodos, nesta ordem de prioridade:

### 1. DeepL API (Recomendado)
- **Melhor qualidade de tradução**
- **Gratuito até 500.000 caracteres/mês**
- Requer chave de API

**Configuração:**
```bash
# Adicione no arquivo .env.local
DEEPL_API_KEY=sua_chave_aqui
```

**Como obter a chave:**
1. Acesse https://www.deepl.com/pro-api
2. Crie uma conta gratuita
3. Obtenha sua chave de API

### 2. Google Cloud Translate API
- **Boa qualidade de tradução**
- Requer conta Google Cloud e chave de API
- Tem plano gratuito limitado

**Configuração:**
```bash
# Adicione no arquivo .env.local
GOOGLE_TRANSLATE_API_KEY=sua_chave_aqui
```

**Como obter a chave:**
1. Acesse https://cloud.google.com/translate
2. Crie um projeto no Google Cloud
3. Ative a API de Tradução
4. Crie uma chave de API

### 3. Google Translate Gratuito (Fallback)
- **Funciona sem configuração**
- **Pode ter limitações de taxa e qualidade**
- Usado automaticamente se nenhuma chave de API estiver configurada

## Cache de Traduções

As traduções são armazenadas em cache no navegador para:
- Melhorar a performance
- Reduzir chamadas à API
- Economizar créditos da API

O cache é limpo automaticamente quando o idioma muda.

## Estrutura de Arquivos

```
src/
├── app/
│   └── api/
│       └── translate/
│           └── route.ts          # API route para tradução
├── hooks/
│   └── useTranslate.ts            # Hook React para tradução
├── components/
│   ├── TranslatedContent.tsx     # Componente para conteúdo HTML traduzido
│   ├── TranslatedText.tsx         # Componente para texto simples traduzido
│   ├── PostContent.tsx            # Componente para posts com tradução
│   ├── PostListItem.tsx           # Item de lista com tradução
│   └── PostList.tsx               # Lista de posts com tradução
└── utils/
    └── translateHtml.ts           # Utilitários para tradução de HTML
```

## Como Usar

A tradução é automática! Quando um usuário:
1. Acessa o site em inglês (ou muda para inglês)
2. Visualiza posts do blog
3. Os posts são automaticamente traduzidos

Não é necessário fazer nada adicional - a tradução acontece automaticamente.

## Traduções de Interface

Os textos da interface (como "Voltar para Artigos", "Publicado em", etc.) já estão configurados no sistema i18n:

- `src/i18n/locales/pt-BR.json`
- `src/i18n/locales/en.json`

Chaves de tradução usadas:
- `blog.artigos.title` - "Artigos" / "Articles"
- `blog.artigos.backLink` - "← Voltar para Artigos" / "← Back to Articles"
- `blog.artigos.readMore` - "Ler mais" / "Read more"
- `blog.artigos.published` - "Publicado em" / "Published on"
- `blog.noticias.*` - Similar para notícias

## Limitações

1. **Tradução de HTML complexo**: Para HTML muito complexo com muitas tags aninhadas, a tradução pode não preservar perfeitamente toda a formatação. A maioria dos casos funciona bem.

2. **Performance**: A primeira tradução pode levar alguns segundos. Traduções subsequentes são mais rápidas devido ao cache.

3. **Qualidade**: A qualidade da tradução depende do serviço usado:
   - DeepL: Excelente
   - Google Cloud: Muito boa
   - Google Free: Boa (pode variar)

4. **Limites de API**: 
   - DeepL: 500.000 caracteres/mês no plano gratuito
   - Google Cloud: Varia conforme o plano
   - Google Free: Pode ter limitações de taxa

## Troubleshooting

### Traduções não aparecem
1. Verifique se o idioma está em inglês
2. Verifique o console do navegador para erros
3. Verifique se a API de tradução está funcionando (teste a rota `/api/translate`)

### Erro "API key não configurada"
- Isso é normal se você não configurou uma chave de API
- O sistema usará o método gratuito automaticamente

### Traduções lentas
- Primeira tradução sempre é mais lenta
- Traduções subsequentes são mais rápidas (cache)
- Considere configurar uma API paga para melhor performance

### HTML mal formatado após tradução
- Isso pode acontecer com HTML muito complexo
- A maioria dos casos funciona bem
- Se necessário, ajuste o conteúdo no Strapi

## Melhorias Futuras

Possíveis melhorias que podem ser implementadas:

1. **Tradução no servidor**: Traduzir no servidor durante o build para melhor SEO
2. **Cache persistente**: Armazenar traduções no banco de dados
3. **Pré-tradução**: Traduzir posts automaticamente quando publicados no Strapi
4. **Suporte a mais idiomas**: Adicionar suporte para espanhol, francês, etc.

## Suporte

Para dúvidas ou problemas, verifique:
1. Os logs do servidor (console)
2. O console do navegador (F12)
3. A documentação das APIs de tradução

