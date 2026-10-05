import {
  certifications,
  curatedProjects,
  experiences,
  personal,
  recommendation,
  tracks,
} from "@/data/profile";
import type { GithubRepoSummary } from "@/lib/github";
import type { TrackItem } from "@/types/profile";
import type { RowData, TileData, TileLink } from "./types";

const KIND_LABEL = {
  projeto: "Projeto",
  experiencia: "Experiência",
  certificacao: "Certificação",
  carta: "Carta",
} as const;

// Transforma as referências de data/profile.ts em dados prontos para a
// parede. Nenhum texto longo é copiado: tudo vem dos itens originais.
function buildTile(trackId: string, item: TrackItem, repos: GithubRepoSummary[]): TileData {
  const base = {
    // Sem acentos no id ("clinica", não "cl-nica"): ele vira âncora do DOM.
    id: `${trackId}-${item.ref}`
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9-]+/gi, "-")
      .toLowerCase(),
    kind: item.kind,
    kindLabel: KIND_LABEL[item.kind],
    line: item.line,
    cover: item.cover,
    bullets: [] as string[],
    chips: [] as string[],
    links: [] as TileLink[],
  };

  if (item.kind === "projeto") {
    const project = curatedProjects.find((p) => p.repoName === item.ref);
    if (!project) throw new Error(`Projeto não encontrado em profile.ts: ${item.ref}`);
    const repo = repos.find((r) => r.name.toLowerCase() === project.repoName.toLowerCase());
    const links: TileLink[] = [];
    for (const extra of project.extraLinks ?? []) {
      links.push({ label: extra.label, href: extra.href, tone: "primary" });
    }
    // Se a API do GitHub falhar, o link do repositório continua existindo.
    links.push({
      label: "Ver repositório",
      href: repo?.url ?? `https://github.com/${personal.githubUsername}/${project.repoName}`,
      tone: links.length === 0 ? "primary" : "secondary",
    });
    return {
      ...base,
      title: item.title ?? project.title,
      meta: project.status,
      paragraphs: [project.description],
      chips: project.stack,
      links,
      stars: repo && repo.stars > 0 ? repo.stars : undefined,
    };
  }

  if (item.kind === "experiencia") {
    const experience = experiences.find((e) => e.company === item.ref);
    if (!experience) throw new Error(`Experiência não encontrada em profile.ts: ${item.ref}`);
    return {
      ...base,
      title: item.title ?? experience.company,
      meta: `${experience.role} · ${experience.period}`,
      paragraphs: [experience.description],
      // A mesma experiência em duas trilhas mostra destaques diferentes em cada uma.
      bullets: item.highlights
        ? item.highlights.map((i) => experience.highlights[i]).filter((h): h is string => Boolean(h))
        : experience.highlights,
    };
  }

  if (item.kind === "certificacao") {
    const cert = certifications.find((c) => c.title === item.ref);
    if (!cert) throw new Error(`Certificação não encontrada em profile.ts: ${item.ref}`);
    return {
      ...base,
      title: item.title ?? cert.title,
      meta: `${cert.hours} horas · ${cert.issuer}`,
      paragraphs: [`Carga horária de ${cert.hours} horas, em ${cert.issuer}.`],
    };
  }

  return {
    ...base,
    title: item.title ?? "Carta de recomendação",
    meta: `${recommendation.authorName}, ${recommendation.authorRole}`,
    paragraphs: [],
    quote: {
      text: recommendation.excerpt,
      author: recommendation.authorName,
      role: recommendation.authorRole,
    },
    links: [{ label: "Ler a carta completa", href: recommendation.pdfHref, tone: "primary" }],
  };
}

export function buildRows(repos: GithubRepoSummary[]): RowData[] {
  return tracks.map((track) => ({
    id: track.id,
    name: track.name,
    scope: track.scope,
    resume: track.resume,
    tiles: track.items.map((item) => buildTile(track.id, item, repos)),
  }));
}
