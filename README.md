# Portfólio — João Pedro Oliva Fogaça

Protótipo de portfólio pessoal em Next.js 16 (App Router), TypeScript, Tailwind CSS v4 e Motion (Framer Motion), pronto para deploy na Vercel.

Este README foi escrito partindo do princípio de que você conhece bem JavaScript/TypeScript, Node/Express, Angular e React "básico" — mas está vendo Next.js e Framer Motion pela primeira vez. Cada seção explica o "porquê", não só o "o quê".

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). O servidor recarrega sozinho a cada alteração de arquivo (Fast Refresh — parecido com o que o Angular CLI ou o Vite fazem).

Para testar o build de produção antes do deploy:

```bash
npm run build
npm start
```

### Variável de ambiente do formulário de contato

O formulário de contato (seção "Contato") usa o [Resend](https://resend.com) para enviar e-mails de verdade. Sem configurar nada, o formulário **continua funcionando** — ele só registra a mensagem no console do servidor (`npm run dev`) em vez de enviar o e-mail, o que é ótimo pra testar sem precisar de conta em lugar nenhum.

Para enviar e-mails de verdade:

1. Crie uma conta grátis em [resend.com](https://resend.com) e gere uma API key.
2. Copie `.env.example` para `.env.local`.
3. Cole a chave em `RESEND_API_KEY`.
4. Reinicie `npm run dev`.

Por padrão o remetente é `onboarding@resend.dev` (o endereço de testes do Resend, que funciona sem verificar domínio). Quando quiser enviar de um e-mail com seu próprio domínio, verifique o domínio no painel do Resend e troque `FROM_EMAIL` em `src/app/api/contact/route.ts`.

---

## Estrutura de pastas

```
src/
  app/                    → rotas do site (App Router)
    layout.tsx            → layout raiz: <html>, <body>, metadata de SEO
    page.tsx              → a página "/" — monta todas as seções
    globals.css           → variáveis de cor (tema) + Tailwind
    icon.tsx              → gera o favicon automaticamente
    opengraph-image.tsx   → gera a imagem de preview ao compartilhar o link
    api/
      github-repos/route.ts → GET /api/github-repos (dados públicos do GitHub)
      contact/route.ts      → POST /api/contact (envia e-mail via Resend)

  components/
    bento/                → cards do grid da primeira dobra
    sections/             → seções abaixo do grid (experiência, projetos...)
    layout/                → Header e Footer
    ui/                    → peças reutilizáveis (ícones, contador animado,
                             wrapper de animação de scroll)

  data/
    profile.ts             → TODO o conteúdo textual do site (nome, stack,
                             experiências, projetos, certificações...).
                             Editar o site = editar este arquivo, na
                             imensa maioria das vezes.

  lib/
    github.ts               → função que busca os repositórios no GitHub

  types/
    profile.ts               → tipos TypeScript que descrevem o formato dos
                              dados em data/profile.ts

public/
  curriculos/               → os dois currículos (.docx) para download
  carta/                    → PDF da carta de recomendação
  images/                   → avatar (troque pela sua foto real)
```

**Quer atualizar uma experiência, projeto, certificação ou link?** Vá direto em [`src/data/profile.ts`](src/data/profile.ts) — nenhum componente precisa ser tocado.

---

## Conceitos novos usados (Next.js)

Next.js resolve um problema que você já conhece do Express (rotear requisições, servir páginas) e outro que você já conhece do React (montar UI com componentes), só que junta os dois numa coisa só, com um pouco de mágica de convenção-sobre-configuração. Os pontos abaixo aparecem comentados diretamente no código também.

### App Router e convenção de arquivos

Em vez de você escrever `app.get('/projetos', ...)` como no Express, o Next.js olha para a estrutura de pastas dentro de `src/app/` e monta as rotas sozinho:

- `src/app/page.tsx` → rota `/`
- `src/app/api/contact/route.ts` → rota `/api/contact`
- `src/app/layout.tsx` → o "molde" (`<html>`, `<body>`) que envolve todas as páginas

### Server Components vs. Client Components

Essa é a maior diferença em relação ao React "puro" que você já usou:

- **Por padrão, todo componente no App Router é um Server Component.** Ele roda só no servidor, gera HTML, e esse HTML é o que chega no navegador — sem JavaScript extra pra esse componente específico. É ótimo pra performance, mas significa que ele **não pode usar `useState`, `useEffect`, `onClick`, nem nada que dependa do navegador**.
- **Quando um componente precisa de interatividade** (estado, eventos, hooks do React, animações do Framer Motion), você marca ele com `"use client"` na primeira linha do arquivo. Isso vira um Client Component — funciona exatamente como o React que você já conhece.

Neste projeto:

- `ContactForm.tsx`, `AnimatedCounter.tsx`, `RevealOnScroll.tsx` e `BentoCard.tsx` são **Client Components** (têm `"use client"`) porque usam estado, eventos ou hooks do Motion.
- `ProjectsSection.tsx`, `ExperienceSection.tsx`, `HeroCard.tsx`, etc. são **Server Components** — só organizam dados e renderizam HTML, sem interatividade própria.

Um Server Component pode renderizar um Client Component dentro dele (é o que acontece o tempo todo aqui), mas não o contrário sem cuidado extra. Pense assim: comece todo componente novo *sem* `"use client"`; só adicione quando o TypeScript ou o navegador reclamar que falta `useState`/evento/hook.

### Server Components assíncronos (`async function`)

Em `ProjectsSection.tsx`, o componente é `async` e usa `await` direto no corpo:

```tsx
export async function ProjectsSection() {
  const repos = await getGithubRepos();
  // ...
}
```

Isso só é possível porque é um Server Component. Não existe equivalente disso em um componente React "cliente" — lá você precisaria de `useEffect` + `useState` pra buscar dados depois que o componente já montou. Aqui, o Next.js espera a Promise resolver **antes** de mandar o HTML pro navegador, então a página já chega com os dados prontos.

### Rotas de API (`route.ts`)

`src/app/api/github-repos/route.ts` e `src/app/api/contact/route.ts` são o equivalente direto de uma rota Express (`app.get`, `app.post`). Você exporta uma função com o nome do verbo HTTP (`GET`, `POST`) e o Next.js cuida do roteamento.

A rota de contato existe porque a API key do Resend é secreta — ela só pode ficar no servidor, nunca em código que roda no navegador do visitante. O componente `ContactForm` (client) faz um `fetch("/api/contact")`, igual você faria de um front-end React puro chamando uma API Express.

### ISR (Incremental Static Regeneration)

Em `src/lib/github.ts`, a busca dos repositórios do GitHub usa:

```ts
fetch(url, { next: { revalidate: 3600 } })
```

Isso diz ao Next.js: "gere essa página/dado uma vez, guarde em cache, e só busque de novo depois de 1 hora". Isso evita bater na API pública do GitHub (que tem limite de requisições) a cada visita ao site, e ainda mantém os projetos razoavelmente atualizados sem você precisar fazer um novo deploy manualmente.

### Convenções de metadata (SEO, favicon, Open Graph)

Três arquivos cuidam de SEO sem precisar escrever `<meta>` tags na mão:

- `metadata` exportado em `layout.tsx` → gera `<title>`, `<meta description>`, tags Open Graph.
- `icon.tsx` → gera o favicon.
- `opengraph-image.tsx` → gera a imagem que aparece quando alguém compartilha o link do site no WhatsApp/LinkedIn.

Todos os três usam `next/og` (`ImageResponse`), que renderiza JSX como uma imagem PNG em tempo de build — um recurso específico do Next.js sem equivalente direto em Express/React puro.

---

## Conceitos novos usados (Motion / Framer Motion)

O pacote instalado é o `motion` (a versão mais recente e independente de framework da biblioteca que ficou famosa como "Framer Motion"). A API usada aqui é a mesma: `import { motion } from "motion/react"`.

- **`<motion.div>`**: qualquer elemento HTML pode virar "animável" trocando a tag por `motion.<tag>`. Ele aceita props especiais como `initial`, `animate`, `whileHover`, `whileInView`.
- **`initial` / `animate`**: define o estado inicial (ex.: invisível, deslocado) e o estado final (visível, no lugar). Usado nos cards do bento grid (`BentoCard.tsx`) para a entrada em stagger.
- **`whileInView`**: parecido com `animate`, mas só dispara quando o elemento entra na área visível da tela durante o scroll — é o que faz as seções abaixo da dobra (experiência, certificações...) aparecerem suavemente enquanto você rola a página. Implementado em `RevealOnScroll.tsx`.
- **`whileHover`**: define como o elemento se comporta enquanto o mouse está em cima. Usado nos cards pra o efeito de scale + tilt.
- **`transition: { type: "spring" }`**: em vez de uma animação linear (velocidade constante), uma transição "spring" simula uma mola física — acelera e desacelera de um jeito mais natural. É o que dá a sensação de "vivo" pedida no hover dos cards.
- **`useMotionValue` / `useTransform`**: usados em `BentoCard.tsx` para o efeito de tilt 3D. `useMotionValue` guarda um valor (posição do mouse) que pode mudar sem re-renderizar o componente inteiro; `useTransform` converte esse valor em outro (posição do mouse → ângulo de rotação).
- **`useInView`**: hook que informa se um elemento está visível na tela. Usado em `AnimatedCounter.tsx` para disparar a contagem de 0 até o valor final assim que o número aparece na viewport.

---

## Onde trocar a paleta de cores

Todas as cores vivem como variáveis CSS em `src/app/globals.css`, dentro de `:root`. Para trocar o tema (por exemplo, de ciano para roxo), basta editar os valores ali — nenhum componente usa cor "hardcoded" (fixa) no meio do código.

---

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub (`git init`, `git add .`, `git commit`, `git push` para um repo novo).
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório — a Vercel detecta que é um projeto Next.js automaticamente, sem nenhuma configuração manual.
3. Se você configurou o Resend, adicione a variável de ambiente `RESEND_API_KEY` em **Project Settings → Environment Variables** antes (ou depois) do primeiro deploy.
4. Clique em **Deploy**. Em ~1 minuto o site estará no ar em uma URL `*.vercel.app` (você pode depois apontar um domínio próprio nas configurações do projeto).

Cada `git push` subsequente para a branch principal gera um novo deploy automático.

---

## O que ainda falta preencher

- **Foto real**: troque `public/images/avatar-placeholder.svg` por uma foto sua (atualize `avatarSrc` em `src/data/profile.ts`).
- **Link do artigo IEEE**: quando tiver o link do artigo do OpenMind, adicione de volta o `extraLink` no projeto correspondente em `curatedProjects` (`src/data/profile.ts`).
- **Nomes dos repositórios no GitHub**: o campo `repoName` de cada projeto em `curatedProjects` precisa bater exatamente com o nome do repositório no GitHub para que a capa/estrelas/link apareçam automaticamente.

### Regenerando os PDFs dos currículos

Os PDFs em `public/curriculos/` (`Joao_Pedro_Curriculo_Backend.pdf` e `Joao_Pedro_Curriculo_Suporte.pdf`) foram gerados a partir dos `.docx` originais com o script `scripts/convert-resumes.mjs` (usa `mammoth` pra ler o `.docx` e `pdfkit` pra desenhar o PDF — não depende de ter Word ou LibreOffice instalado). Toda vez que você editar os arquivos `.docx` em `public/curriculos/`, rode de novo:

```bash
node scripts/convert-resumes.mjs
```

O layout do PDF gerado é simples (título, negrito, listas) — não é uma cópia pixel-a-pixel do `.docx`, mas mantém todo o conteúdo e a formatação básica.
