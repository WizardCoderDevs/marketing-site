# BRANDS - Marketing Digital Estratégico
[![Netlify Status](https://api.netlify.com/api/v1/badges/b9c488b2-7b1b-47e8-8d60-f27a13d5d4c2/deploy-status)](https://app.netlify.com/projects/brands-site/deploys)

Site institucional da BRANDS, especializada em marketing digital estratégico para empresas regionais. Desenvolvido com Next.js 15, React 19 e TypeScript.

## 🚀 Tecnologias

### Core
- **[Next.js 15.3.3](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework CSS utility-first

### Principais Dependências
- **[i18next](https://www.i18next.com/)** & **[react-i18next](https://react.i18next.com/)** - Internacionalização (pt-BR/EN)
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Gerenciamento de tema (Dark/Light mode)
- **[lucide-react](https://lucide.dev/)** - Biblioteca de ícones
- **[framer-motion](https://www.framer.com/motion/)** - Animações
- **[chart.js](https://www.chartjs.org/)** & **[react-chartjs-2](https://react-chartjs-2.js.org/)** - Gráficos e visualizações
- **[MDX](https://mdxjs.com/)** - Markdown com componentes React

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)** - Análise de performance

## 📦 Instalação

### Pré-requisitos
- Node.js 20+ ou Bun
- pnpm (recomendado) ou npm/yarn

### Instalar dependências

```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

## 🛠️ Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
# ou
npm run dev

# Criar build de produção
pnpm build
# ou
npm run build

# Iniciar servidor de produção (após build)
pnpm start
# ou
npm start

# Executar linter
pnpm lint
# ou
npm run lint

# Executar Lighthouse CI
pnpm lighthouse
# ou
npm run lighthouse

# Executar Lighthouse customizado
pnpm lighthouse:custom
# ou
npm run lighthouse:custom
```

## 📁 Estrutura do Projeto

```
marketing-site/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── apresentacao/      # Página de apresentação de slides
│   │   ├── blog/               # Blog com MDX
│   │   ├── servicos/           # Página de serviços
│   │   ├── politica-de-privacidade/  # Política de privacidade
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css         # Estilos globais
│   ├── components/             # Componentes React
│   │   ├── Header.tsx          # Cabeçalho com navegação
│   │   ├── Footer.tsx           # Rodapé
│   │   ├── ThemeToggle.tsx      # Toggle de tema
│   │   ├── LanguageToggle.tsx   # Toggle de idioma
│   │   └── ...
│   ├── contexts/               # Contextos React
│   │   ├── ConversionContext.tsx
│   │   └── CookieContext.tsx
│   ├── i18n/                   # Configuração de internacionalização
│   │   ├── config.ts
│   │   ├── I18nProvider.tsx
│   │   └── locales/            # Arquivos de tradução
│   │       ├── pt-BR.json
│   │       └── en.json
│   ├── data/                   # Dados estáticos
│   └── utils/                  # Funções utilitárias
├── public/                     # Arquivos estáticos
├── scripts/                   # Scripts de build
├── next.config.ts              # Configuração do Next.js
├── tailwind.config.ts          # Configuração do Tailwind
├── tsconfig.json               # Configuração do TypeScript
└── package.json
```

## ✨ Funcionalidades Principais

### 🌍 Internacionalização (i18n)
- Suporte a **Português (pt-BR)** e **Inglês (EN)**
- Detecção automática do idioma do navegador
- Troca de idioma persistente (localStorage)
- Traduções completas de todas as páginas e componentes

### 🎨 Tema Dark/Light
- Alternância entre modo escuro e claro
- Suporte a detecção automática da preferência do sistema
- Persistência da preferência do usuário
- Adaptação automática de todos os componentes

### 📊 Página de Apresentação
- Apresentação interativa de slides (`/apresentacao`)
- 6 slides com conteúdo sobre o método BRANDS
- Navegação com botões anterior/próximo
- Modo fullscreen
- Barra de progresso
- Suporte completo a traduções
- Adaptação automática ao tema (dark/light)
- Responsivo e otimizado

### 📝 Blog com MDX
- Suporte a posts em Markdown com componentes React
- Layout otimizado para leitura
- Integração com sistema de temas

### 📱 Design Responsivo
- Mobile-first approach
- Adaptação para tablets e desktops
- Otimização de performance

## ⚙️ Configurações

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Google Tag Manager / Analytics
NEXT_PUBLIC_GOOGLE_TAG_ID=G-XXXXXXXXXX
```

### Prettier

O projeto usa Prettier para formatação de código. As configurações estão no arquivo `.prettierrc`.

### ESLint

Configuração do ESLint seguindo as melhores práticas do Next.js e TypeScript.

### VS Code

Para melhor experiência de desenvolvimento, instale as seguintes extensões:
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**

As configurações do VS Code estão em `.vscode/settings.json`.

## 📝 Convenções de Código

- Use **TypeScript** para todo novo código
- Siga as regras de formatação do **Prettier**
- Mantenha os componentes pequenos e reutilizáveis
- Use nomes descritivos para variáveis e funções
- Documente funções e componentes complexos
- Siga os padrões do **ESLint** configurado

## 🎯 Páginas Principais

- **/** - Página inicial com hero, serviços e impacto
- **/apresentacao** - Apresentação interativa de slides sobre o método BRANDS
- **/servicos** - Listagem detalhada de serviços
- **/blog** - Blog com posts em MDX
- **/politica-de-privacidade** - Política de privacidade
- **/prospecto** - Formulário de contato

## 🚀 Deploy

### Vercel (Recomendado)

O projeto está otimizado para deploy na [Vercel](https://vercel.com):

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Build Manual

```bash
# Criar build de produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## 📊 Performance

O projeto inclui:
- **Lighthouse CI** para análise contínua de performance
- Otimização de imagens com Next.js Image
- Code splitting automático
- Lazy loading de componentes
- Otimização de fontes com `next/font`

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário da BRANDS.

## 🔗 Links Úteis

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação React](https://react.dev)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação i18next](https://www.i18next.com/)

---

Desenvolvido com ❤️ pela equipe BRANDS
