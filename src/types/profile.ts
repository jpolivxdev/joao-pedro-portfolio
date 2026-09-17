// Tipos centrais do portfólio. Manter isso separado ajuda a garantir que
// /data/profile.ts (o "banco de dados" do site) sempre tenha o formato certo.

export type SkillLevel = "principal" | "secundaria";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "whatsapp";
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  hours: number;
  issuer: string;
}

export interface CuratedProject {
  /** Precisa bater com o "name" do repositório no GitHub (usado para casar com os dados da API). */
  repoName: string;
  title: string;
  description: string;
  stack: string[];
  status: string;
  extraLink?: { label: string; href: string };
}

export interface Recommendation {
  authorName: string;
  authorRole: string;
  excerpt: string;
  pdfHref: string;
}

export interface ResumeFile {
  label: string;
  href: string;
}
