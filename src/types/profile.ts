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
  extraLinks?: { label: string; href: string }[];
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

export type TrackId = "backend" | "suporte" | "infra";

export type TileKind = "projeto" | "experiencia" | "certificacao" | "carta";

/**
 * Uma "prova" dentro de uma trilha. Não repete os textos longos: aponta
 * (`ref`) para o item que já existe em curatedProjects, experiences,
 * certifications ou recommendation, e só acrescenta a frase curta do tile
 * e o nome da arte de capa.
 */
export interface TrackItem {
  kind: TileKind;
  /** repoName (projeto), company (experiência), title (certificação) ou "carta". */
  ref: string;
  /** Nome curto no tile, quando o título original é longo demais. */
  title?: string;
  /**
   * Experiência que serve a mais de uma trilha: os destaques (índices de
   * `highlights`) agrupados por assunto no painel. Sem isso, lista todos.
   */
  highlightGroups?: { label: string; highlights: number[] }[];
  /**
   * O detalhe deste item mora em outra trilha: aqui ele é só uma
   * referência que leva até lá, para a informação existir uma vez só.
   */
  seeAlso?: TrackId;
  /** Uma frase curta, sempre visível na legenda do tile. */
  line: string;
  cover: string;
}

export interface Track {
  id: TrackId;
  name: string;
  scope: string;
  /** O fato verificável mais forte da trilha, mostrado na capa da primeira tela. */
  proof: string;
  /** Currículo desta trilha, quando existe um. */
  resume?: ResumeFile;
  items: TrackItem[];
}

/** Projeto em destaque (seção logo depois da abertura), com print real. */
export interface FeaturedProject {
  id: string;
  title: string;
  /** Situação real do projeto, sem enfeite (ex.: "Em construção"). */
  status: string;
  /** Uma frase curta no card. */
  line: string;
  meta: string;
  paragraphs: string[];
  groups: { label: string; items: string[] }[];
  stack: string[];
  links: { label: string; href: string }[];
  /** Print do tema escuro; `imageLight`, quando existe, entra no tema claro. */
  image: string;
  imageLight?: string;
  imageAlt: string;
  /** Legenda do print (ex.: avisar que os dados são fictícios). */
  caption: string;
  /** "wide" ocupa a coluna larga do mosaico; "tall", a coluna alta. */
  shape: "wide" | "tall";
}