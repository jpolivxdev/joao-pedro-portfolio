// Todo o conteúdo textual do site mora aqui, e não espalhado nos componentes.
// Assim, para atualizar uma experiência, projeto ou certificação, você mexe
// só neste arquivo — nunca precisa tocar em JSX/TSX.

import type {
  CertificationItem,
  ContactLink,
  CuratedProject,
  ExperienceItem,
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
    "Tenho 20 anos e estou no 5º semestre de Análise e Desenvolvimento de Sistemas na FACENS. Construo APIs REST com Node.js, Express e MongoDB, já usei React e Angular em projetos reais, e atuei na área técnica da Huawei em projetos de telecomunicações. Busco minha primeira vaga efetiva como Desenvolvedor Backend Jr, Analista de Suporte Técnico Jr ou em Infraestrutura/Telecom.",
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
  { name: "Node.js", level: "principal" },
  { name: "Express", level: "principal" },
  { name: "TypeScript", level: "principal" },
  { name: "APIs REST", level: "principal" },
  { name: "MongoDB", level: "principal" },
  { name: "React", level: "secundaria" },
  { name: "Angular", level: "secundaria" },
  { name: "Java", level: "secundaria" },
  { name: "Spring Boot", level: "secundaria" },
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
    scope: "Node.js, TypeScript, APIs REST e bancos de dados",
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
        highlights: [0],
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
        highlights: [1, 2],
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
