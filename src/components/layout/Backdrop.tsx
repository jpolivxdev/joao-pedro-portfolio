import { Parallax } from "@/components/ui/Parallax";

// Fundo fixo da página: três manchas de cor (azul de destaque e os tons das
// trilhas) e as iniciais "JP" grandes e desfocadas. Fica atrás do vidro dos
// cards; é só decoração, por isso aria-hidden. Cada mancha anda numa
// velocidade um pouco diferente ao rolar (parallax).
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <Parallax speed={-0.12} range={2400} className="blob blob-accent" />
      <Parallax speed={-0.2} range={2400} className="blob blob-coral" />
      <Parallax speed={-0.07} range={2400} className="blob blob-teal" />
      <Parallax speed={-0.16} range={2400} className="mark">
        JP
      </Parallax>
    </div>
  );
}
