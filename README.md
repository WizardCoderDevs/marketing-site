# Brands Web

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- ESLint
- Prettier
- Bun.js (Runtime)

## 📦 Instalação

```bash
# Instalar dependências usando Bun
bun install
```

## 🛠️ Comandos

```bash
# Iniciar o servidor de desenvolvimento
bun run dev

# Criar build de produção
bun run build

# Rodar os testes
bun run test

# Verificar formatação do código
bun run format:check

# Formatar o código
bun run format

# Verificar linting
bun run lint
```

## ⚙️ Configurações

### Prettier
O projeto usa Prettier para formatação de código. As configurações estão no arquivo `.prettierrc`.

### VS Code
Para melhor experiência de desenvolvimento, instale as seguintes extensões:
- Prettier - Code formatter
- ESLint

As configurações do VS Code estão em `.vscode/settings.json`.

## 📝 Convenções

- Use TypeScript para todo novo código
- Siga as regras de formatação do Prettier
- Mantenha os componentes pequenos e reutilizáveis
- Use nomes descritivos para variáveis e funções
- Documente funções e componentes complexos

## 🔧 Scripts Disponíveis

- `bun run dev` - Inicia o servidor de desenvolvimento
- `bun run build` - Cria a build de produção
- `bun run preview` - Visualiza a build de produção localmente
- `bun run test` - Executa os testes
- `bun run format` - Formata todos os arquivos
- `bun run format:check` - Verifica se os arquivos estão formatados
- `bun run lint` - Executa o linter

## 🐰 Bun.js

Este projeto utiliza o [Bun.js](https://bun.sh) como runtime JavaScript. O Bun é um runtime JavaScript all-in-one que oferece:

- Performance superior ao Node.js
- Gerenciador de pacotes integrado
- Bundler nativo
- Test runner
- TypeScript suporte nativo

Para instalar o Bun, execute:
```bash
curl -fsSL https://bun.sh/install | bash
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
