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
} from "@/types/profile";

export const personal = {
  name: "João Pedro Oliva Fogaça",
  headline: "Desenvolvedor Backend Jr | Node.js • TypeScript • APIs REST • MongoDB",
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
    extraLink: { label: "Ver projeto no ar", href: "https://vida-app-2.vercel.app" },
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

export const metrics = [
  { label: "Anos na Huawei (Telecom)", value: 2, suffix: "+" },
  { label: "Projetos desenvolvidos", value: 5, suffix: "+" },
  { label: "Certificações técnicas", value: 3, suffix: "" },
];
