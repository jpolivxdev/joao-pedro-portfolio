import { personal } from "@/data/profile";

export const GITHUB_REVALIDATE_SECONDS = 3600; // 1 hora

export interface GithubRepoSummary {
  name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  updatedAt: string;
}

/**
 * Busca os repositórios públicos do GitHub e devolve só o que a UI precisa.
 *
 * Essa função é usada em dois lugares: pela rota /api/github-repos (que
 * expõe os dados publicamente, caso você queira consumi-los de outro lugar
 * no futuro) e diretamente pela seção de Projetos da página inicial.
 *
 * Por que a página não simplesmente "chama" /api/github-repos por HTTP?
 * Porque a seção de Projetos é um Server Component — ela já roda no
 * servidor, então fazer uma requisição HTTP de volta para o próprio
 * servidor seria um passo a mais sem necessidade. Em vez disso, ambos
 * (a rota de API e a página) importam e chamam esta mesma função.
 *
 * O cache com "next.revalidate" é o que ativa o ISR: o Next guarda o
 * resultado e só busca de novo no GitHub depois que o tempo expira.
 */
/**
 * O GitHub gera automaticamente uma imagem de preview (1200x630) para cada
 * repositório público — é a mesma imagem que aparece quando você cola o
 * link de um repo no Twitter/Slack/WhatsApp. Não é uma API oficial
 * documentada, mas é estável e usada amplamente; por isso usamos ela como
 * capa dos cards de projeto em vez de hospedar/gerar imagens próprias.
 */
export function getRepoPreviewImageUrl(repoName: string): string {
  return `https://opengraph.githubassets.com/1/${personal.githubUsername}/${repoName}`;
}

export async function getGithubRepos(): Promise<GithubRepoSummary[]> {
  const response = await fetch(
    `https://api.github.com/users/${personal.githubUsername}/repos?per_page=100&sort=updated`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: GITHUB_REVALIDATE_SECONDS },
    }
  );

  if (!response.ok) {
    return [];
  }

  const repos = (await response.json()) as Array<{
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    updated_at: string;
  }>;

  return repos.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    updatedAt: repo.updated_at,
  }));
}
