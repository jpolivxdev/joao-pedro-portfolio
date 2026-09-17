// Rate limiting simples "em memória": guardamos, por IP, os horários das
// últimas requisições dentro de uma janela de tempo. Não precisa de banco
// de dados nem de serviço externo (tipo Redis) — pra um portfólio pessoal,
// isso já resolve.
//
// Limitação importante de rodar isso na Vercel: cada função serverless
// pode rodar em uma instância diferente (e a memória de uma instância não
// é compartilhada com as outras, além de ser zerada quando a instância
// "dorme"). Ou seja, esse limite é "por instância", não um limite global
// 100% garantido. Para um site de tráfego alto, o certo seria usar algo
// como Upstash Redis (que é compartilhado entre todas as instâncias). Para
// o volume de mensagens que um portfólio pessoal recebe, isso aqui já
// bloqueia o caso comum de alguém (ou um script) martelando o formulário.

const WINDOW_MS = 10 * 60 * 1000; // janela de 10 minutos
const MAX_REQUESTS_PER_WINDOW = 3;

const requestLog = new Map<string, number[]>();

/**
 * Registra uma nova requisição desse identificador (normalmente o IP) e
 * devolve true se ele já passou do limite permitido na janela de tempo.
 */
export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const recentTimestamps = (requestLog.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  recentTimestamps.push(now);
  requestLog.set(identifier, recentTimestamps);

  // Limpeza oportunista: evita que o Map cresça pra sempre guardando IPs
  // antigos que nunca mais voltaram a fazer requisições.
  if (requestLog.size > 500) {
    for (const [key, timestamps] of requestLog) {
      if (timestamps.every((t) => now - t > WINDOW_MS)) {
        requestLog.delete(key);
      }
    }
  }

  return recentTimestamps.length > MAX_REQUESTS_PER_WINDOW;
}
