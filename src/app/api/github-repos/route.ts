import { NextResponse } from "next/server";
import { getGithubRepos } from "@/lib/github";

// "route.ts" dentro de /app/api é a forma do App Router de criar um endpoint
// de API (equivalente a uma rota Express). Um GET exportado aqui vira
// automaticamente GET /api/github-repos.
//
// "revalidate" habilita ISR (Incremental Static Regeneration) para esta
// rota: o Next.js guarda a resposta em cache e só busca dados novos do
// GitHub depois que o tempo abaixo (em segundos) passar, em vez de bater
// na API pública do GitHub a cada requisição. Precisa ser um número literal
// aqui (não uma variável importada) porque o Next.js lê esse valor
// estaticamente, sem executar o código, para decidir a config da rota.
export const revalidate = 3600; // 1 hora — mesmo valor de GITHUB_REVALIDATE_SECONDS em lib/github.ts

export async function GET() {
  const repos = await getGithubRepos();
  return NextResponse.json(repos);
}
