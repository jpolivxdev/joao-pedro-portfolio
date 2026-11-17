// Todo o conteúdo textual do site mora aqui, e não espalhado nos componentes.
// Assim, para atualizar uma experiência, projeto ou certificação, você mexe
// só neste arquivo — nunca precisa tocar em JSX/TSX.

import type {
  CertificationItem,
  ContactLink,
  CuratedProject,
  ExperienceItem,
  FeaturedProject,
  Recommendation,
  ResumeFile,
  Skill,
  Track,
} from "@/types/profile";

export const personal = {
  name: "João Pedro Oliva Fogaça",
  headline: "Backend, Suporte Técnico e Infra/Telecom Jr",
  short:
    "Estudante de Análise e Desenvolvimento de Sistemas na FACENS (5º semestre), buscando minha primeira vaga efetiva em TI.",
  about:
    "Tenho 20 anos e estou no 5º semestre de Análise e Desenvolvimento de Sistemas na FACENS (formatura prevista para dezembro de 2026). Construo APIs REST com NestJS, TypeScript e PostgreSQL, com testes automatizados e CI/CD, como no FinTrack e no Nexo. Também tenho base em Node.js/Express, Java/Spring Boot, React e Angular, e passei 2 anos na área técnica da Huawei em projetos de telecomunicações. Busco minha primeira vaga efetiva como Desenvolvedor Backend Jr, Analista de Suporte Técnico Jr ou em Infraestrutura/Telecom.",
  location: "Sorocaba, SP",
  availability: ["Sorocaba", "Híbrido", "Remoto"],
  avatarSrc: "/images/avatar.jpg",
  githubUsername: "jpolivxdev",
};

export const contactLinks: ContactLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jo%C3%A3o-pedro-oliva-foga%C3%A7a-703904258/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/jpolivxdev",
    icon: "github",
  },
  {
    label: "E-mail",
    href: "mailto:joaopedro_oliva@outlook.com",
    icon: "email",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5515997072709",
    icon: "whatsapp",
  },
];

export const skills: Skill[] = [
  { name: "NestJS", level: "principal" },
  { name: "TypeScript", level: "principal" },
  { name: "PostgreSQL", level: "principal" },
  { name: "Prisma", level: "principal" },
  { name: "Node.js", level: "principal" },
  { name: "APIs REST", level: "principal" },
  { name: "Testes automatizados", level: "principal" },
  { name: "CI/CD", level: "principal" },
  { name: "Docker", level: "secundaria" },
  { name: "React", level: "secundaria" },
  { name: "Express", level: "secundaria" },
  { name: "MongoDB", level: "secundaria" },
  { name: "Angular", level: "secundaria" },
  { name: "Java", level: "secundaria" },
  { name: "Spring Boot", level: "secundaria" },
];

// Faixa de números logo abaixo do título (Billboard). Só entra aqui o que dá
// para provar: estágio, testes do FinTrack, certificações e artigo.
export const highlights: { value: string; label: string }[] = [
  { value: "2 anos", label: "de estágio na Huawei" },
  { value: "300+", label: "testes automatizados no FinTrack" },
  { value: "3", label: "certificações em telecom e 5G" },
  { value: "1", label: "artigo em formato IEEE" },
];

export const resumes: ResumeFile[] = [
  { label: "Currículo — Backend", href: "/curriculos/Joao_Pedro_Curriculo_Backend.pdf" },
  { label: "Currículo — Suporte Técnico", href: "/curriculos/Joao_Pedro_Curriculo_Suporte.pdf" },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Huawei Brasil — FACENS P&DC",
    role: "Estagiário em Projetos Técnicos de Telecomunicações",
    period: "Mai/2024 — Mai/2026",
    description:
      "Atuação em projetos técnicos de telecomunicações no centro de P&D em parceria com a FACENS, com contato direto com operadoras como Vivo, Claro e TIM.",
    highlights: [
      "Suporte técnico a projetos de redes de transmissão por micro-ondas e 5G",
      "Interface com operadoras Vivo, Claro e TIM em projetos técnicos",
      "Certificações internas em telecomunicações via parceria FACENS/Huawei",
    ],
  },
  {
    company: "Clínica IMED Saúde",
    role: "Recepcionista / Estagiário Administrativo",
    period: "2021 — 2023",
    description:
      "Atendimento ao público e rotina administrativa em clínica de saúde, com uso de CRM para gestão de atendimentos.",
    highlights: [
      "Atendimento direto ao público, presencial e por telefone",
      "Uso diário do CRM BLiP para gestão de contatos e atendimentos",
      "Organização de agenda e rotinas administrativas da clínica",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "Redes de Transmissão por Micro-ondas",
    hours: 36,
    issuer: "Parceria FACENS / Huawei",
  },
  {
    title: "Conceitos de Tecnologia 5G",
    hours: 30,
    issuer: "Parceria FACENS / Huawei",
  },
  {
    title: "Implementação de Redes 5G",
    hours: 36,
    issuer: "Parceria FACENS / Huawei",
  },
];

// repoName precisa bater exatamente com o "name" do repositório no GitHub,
// pois é usado para casar cada projeto curado com os dados reais (estrelas,
// link, data de atualização) que vêm da API route /api/github-repos.
export const curatedProjects: CuratedProject[] = [
  {
    repoName: "fintrack",
    title: "FinTrack",
    description:
      "Controle financeiro pessoal (ou a dois), mobile-first e instalável como PWA: contas e cartões, parcelamento, orçamentos, metas e investimentos comparados ao CDI. API REST com autenticação JWT, mais de 40 testes de segurança automatizados, CI com CodeQL e testes de carga (k6).",
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "TypeScript"],
    status: "Full-stack no ar",
    extraLinks: [
      { label: "Demo ao vivo", href: "https://fintrack-flax-two.vercel.app" },
      { label: "API (Swagger)", href: "https://fintrack-api-qgr2.onrender.com/api/docs" },
    ],
  },
  {
    repoName: "openmindfrontback",
    title: "OpenMind",
    description:
      "MVP em produção para apoio à saúde mental, com autenticação e persistência via Supabase/PostgreSQL. Trabalho em equipe que resultou em artigo publicado em formato IEEE.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    status: "MVP em produção",
  },
  {
    repoName: "gestorfinanceiropessoal",
    title: "Gestor Financeiro Pessoal",
    description:
      "Aplicação full-stack para controle de gastos e receitas pessoais, com API REST própria e persistência em MongoDB.",
    stack: ["Angular", "Node.js", "Express", "MongoDB"],
    status: "Projeto pessoal",
  },
  {
    repoName: "vida-app",
    title: "Vida App",
    description:
      "Aplicação web de gestão pessoal em Angular, com módulos de tarefas, finanças, metas e notificações — inclui gráficos (Chart.js) para visualizar o progresso.",
    stack: ["Angular", "TypeScript", "Chart.js"],
    status: "Projeto pessoal",
    extraLinks: [{ label: "Ver projeto no ar", href: "https://vida-app-2.vercel.app" }],
  },
  {
    repoName: "api-chamados-suporte",
    title: "API de Chamados de Suporte",
    description:
      "API REST para gestão de chamados técnicos com diferentes níveis de acesso (Admin, Técnico e Cliente), com autenticação JWT.",
    stack: ["Java", "Spring Boot", "JWT", "JPA/Hibernate"],
    status: "Projeto acadêmico",
  },
];

export const recommendation: Recommendation = {
  authorName: "Guilherme Vigati",
  authorRole: "Team Leader MW & TX, Huawei",
  // Trecho real, copiado ao pé da letra do PDF da carta — não parafraseado.
  excerpt:
    "Destacou-se pela receptividade aos feedbacks e pela capacidade de transformar orientações em melhorias concretas no desempenho de suas atividades, demonstrando comprometimento com seu desenvolvimento profissional e com os resultados da equipe.",
  pdfHref: "/carta/carta-recomendacao-guilherme-vigati.pdf",
};

// As três trilhas de vaga, com peso igual. Cada item aponta (ref) para um
// dado que já existe acima; `line` é a frase curta do tile e `cover` o nome
// da arte desenhada em components/catalog/Covers.tsx.
export const tracks: Track[] = [
  {
    id: "backend",
    name: "Backend Jr",
    scope: "NestJS, TypeScript, PostgreSQL e APIs REST",
    proof: "FinTrack no ar, com Swagger",
    resume: resumes[0],
    items: [
      {
        kind: "projeto",
        ref: "fintrack",
        line: "API em NestJS com testes de segurança e de carga, e demo no ar.",
        cover: "fintrack",
      },
      {
        kind: "projeto",
        ref: "openmindfrontback",
        line: "MVP em produção, feito em equipe, com artigo em formato IEEE.",
        cover: "openmind",
      },
      {
        kind: "projeto",
        ref: "gestorfinanceiropessoal",
        line: "Angular, Node e MongoDB: controle de entradas e saídas, com API REST própria.",
        cover: "ledger",
      },
      {
        kind: "projeto",
        ref: "vida-app",
        line: "Tarefas, finanças e metas em Angular, publicado na Vercel.",
        cover: "planner",
      },
    ],
  },
  {
    id: "suporte",
    name: "Suporte Técnico Jr",
    scope: "Atendimento ao público, suporte técnico e chamados",
    proof: "Atendimento na IMED e API de chamados",
    resume: resumes[1],
    items: [
      {
        kind: "projeto",
        ref: "api-chamados-suporte",
        line: "API de chamados com papéis de Admin, Técnico e Cliente.",
        cover: "ticket",
      },
      {
        kind: "experiencia",
        ref: "Clínica IMED Saúde",
        line: "Atendimento ao público e gestão de contatos no CRM BLiP.",
        cover: "bubbles",
      },
      {
        kind: "experiencia",
        ref: "Huawei Brasil — FACENS P&DC",
        title: "Huawei P&DC",
        seeAlso: "infra",
        line: "Estágio: suporte técnico a projetos de micro-ondas e 5G.",
        cover: "wrench",
      },
    ],
  },
  {
    id: "infra",
    name: "Infra/Telecom",
    scope: "Micro-ondas e 5G: estágio na Huawei, três certificações e carta de recomendação",
    proof: "Carta da Huawei e 3 certificações",
    items: [
      {
        kind: "experiencia",
        ref: "Huawei Brasil — FACENS P&DC",
        title: "Huawei P&DC",
        highlightGroups: [
          { label: "Suporte técnico", highlights: [0] },
          { label: "Infra/Telecom", highlights: [1, 2] },
        ],
        line: "Estágio: interface com Vivo, Claro e TIM em projetos técnicos.",
        cover: "path-profile",
      },
      {
        kind: "certificacao",
        ref: "Redes de Transmissão por Micro-ondas",
        line: "36 horas, parceria FACENS e Huawei.",
        cover: "dish",
      },
      {
        kind: "certificacao",
        ref: "Conceitos de Tecnologia 5G",
        line: "30 horas, parceria FACENS e Huawei.",
        cover: "cells",
      },
      {
        kind: "certificacao",
        ref: "Implementação de Redes 5G",
        line: "36 horas, parceria FACENS e Huawei.",
        cover: "mast",
      },
      {
        kind: "carta",
        ref: "carta",
        line: "Recomendação do Team Leader de MW e TX da Huawei.",
        cover: "letter",
      },
    ],
  },
];

// Projetos em destaque. Regra: nada de número, cliente ou resultado que não
// exista. A nexo está em fase de testes e o CRM em construção (Fase 1); os
// dados que aparecem nos prints são fictícios, da demonstração.
export const featuredProjects: FeaturedProject[] = [
  {
    id: "nexo",
    title: "nexo",
    status: "Em fase de testes",
    line: "Estúdio de tecnologia para pequenos negócios, que fundei com mais três sócios.",
    meta: "Em fase de testes · demonstração pública",
    paragraphs: [
      "A nexo é um estúdio de tecnologia para pequenos negócios que fundei com mais três sócios. A página apresenta o produto e leva a uma demonstração aberta, sem cadastro.",
    ],
    groups: [
      {
        label: "O que a demonstração mostra",
        items: [
          "Um simulador de agendamento pelo WhatsApp: o cliente marca o horário sozinho",
          "O painel do dono, com agenda, clientes e conversas num lugar só, pensado para o celular",
          "Tudo com um negócio e clientes fictícios: nada é salvo e nenhuma mensagem sai",
        ],
      },
    ],
    stack: [],
    links: [{ label: "Abrir a demonstração", href: "https://nexo-demo-iota.vercel.app" }],
    image: "/projetos/nexo-landing.png",
    imageAlt:
      "Página inicial da nexo: o título \"Seu cliente marca horário sozinho pelo WhatsApp\", os botões Ver a demonstração e Entrar no painel, e um celular mostrando o painel de exemplo.",
    caption: "Página da nexo. A demonstração usa um negócio e clientes fictícios.",
    shape: "wide",
  },
  {
    id: "nexo-crm",
    title: "nexo CRM",
    status: "Em construção",
    line: "Atendimento e agendamento pelo WhatsApp com CRM para pequenos negócios.",
    meta: "Em construção · Fase 1, piloto em preparação",
    paragraphs: [
      "Sistema de atendimento e agendamento pelo WhatsApp com um CRM simples por trás, para pequenos negócios. Atende vários negócios na mesma base, com os dados de cada um isolados no banco.",
    ],
    groups: [
      {
        label: "O que já existe",
        items: [
          "API e worker em NestJS, painel do dono em React + Vite (celular primeiro, PWA) e um pacote de regras puras, sem banco nem framework",
          "Robô de agendamento exercitado por um simulador de WhatsApp no terminal; a integração real com a Meta ainda não foi feita",
          "Painel com Hoje, Agenda, Conversas, Clientes e Etapas, nos temas claro e escuro",
        ],
      },
      {
        label: "Decisões técnicas",
        items: [
          "Isolamento por negócio com Row Level Security forçado no PostgreSQL: sem informar o negócio, o banco não devolve nenhuma linha",
          "Fila de mensagens no próprio Postgres (pg-boss), sem Redis: um serviço a menos para pagar e cuidar",
          "Monólito modular em vez de microsserviços, com as regras de negócio num pacote puro e testável",
          "Sessão guardada no servidor em vez de JWT: trocar a senha derruba todas as sessões",
          "O banco recusa dois horários ativos sobrepostos para a mesma profissional",
        ],
      },
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "TypeScript"],
    links: [{ label: "Ver repositório", href: "https://github.com/jpolivxdev/nexo-crm" }],
    image: "/projetos/nexo-crm-hoje-escuro.png",
    imageLight: "/projetos/nexo-crm-hoje-claro.png",
    imageAlt:
      "Painel do nexo CRM na tela Hoje: quatro cartões com horários, clientes esperando resposta, tarefas a fazer e atendimentos realizados, um gráfico dos últimos 30 dias e a lista de clientes esperando resposta.",
    caption: "Tela Hoje do painel. Dados fictícios, da demonstração.",
    shape: "tall",
  },
];
