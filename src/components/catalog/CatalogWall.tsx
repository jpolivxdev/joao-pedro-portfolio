import { getGithubRepos } from "@/lib/github";
import { buildRows } from "./buildRows";
import { TrackRow } from "./TrackRow";

// Server Component assíncrono: busca os repositórios do GitHub no servidor
// (com cache ISR de 1h) e entrega às fileiras só dados simples e serializáveis.
export async function CatalogWall() {
  const repos = await getGithubRepos();
  const rows = buildRows(repos);

  return (
    <div id="trilhas" className="mx-auto flex max-w-[1440px] scroll-mt-20 flex-col gap-10 px-6 pt-10">
      {rows.map((row) => (
        <TrackRow key={row.id} row={row} />
      ))}
    </div>
  );
}
