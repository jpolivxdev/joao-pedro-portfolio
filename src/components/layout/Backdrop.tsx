// Fundo fixo da página: três manchas de cor (azul de destaque e os tons das
// trilhas) e as iniciais "JP" grandes e desfocadas. Fica atrás do vidro dos
// cards; é só decoração, por isso aria-hidden.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="blob blob-accent" />
      <div className="blob blob-coral" />
      <div className="blob blob-teal" />
      <div className="mark">JP</div>
    </div>
  );
}
