"use client"; // estado do tile aberto, foco por teclado e rolagem horizontal: tudo no navegador.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Cover } from "./Covers";
import type { RowData, TileData } from "./types";
import { TechIcon } from "@/components/ui/TechIcon";
import { ChevronIcon, CloseIcon, DownloadIcon, ExternalLinkIcon, StarIcon } from "@/components/ui/icons";

/**
 * Uma fileira da parede: o título da trilha, o trilho horizontal de tiles e,
 * embaixo, o painel de detalhe do tile aberto. O painel abre no fluxo da
 * página (não é um modal): quem lê continua vendo a fileira e pode trocar de
 * tile sem fechar nada.
 */
export function TrackRow({ row }: { row: RowData }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Guarda o último tile aberto para o painel manter o conteúdo enquanto fecha.
  const [shownId, setShownId] = useState<string | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const railRef = useRef<HTMLUListElement>(null);
  const headingId = `titulo-${row.id}`;
  const panelId = `painel-${row.id}`;
  const shown = row.tiles.find((t) => t.id === shownId) ?? null;

  // As setas só existem quando a fileira não cabe na tela. A conta usa a
  // largura fechada dos tiles (a mesma regra de --tile-w no CSS), para as
  // setas não piscarem quando um tile cresce ao receber foco.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const tileWidth = window.innerWidth < 640 ? Math.min(window.innerWidth * 0.72, 280) : 280;
      const needed = row.tiles.length * tileWidth + (row.tiles.length - 1) * 12;
      setCanScroll(needed > rail.clientWidth - 48);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [row.tiles.length]);

  // Ao abrir um tile, o foco vai para o título do painel: quem usa teclado
  // não precisa passar por todos os tiles restantes para chegar ao conteúdo.
  useEffect(() => {
    if (!openId) return;
    const frame = requestAnimationFrame(() => {
      // O foco não rola a página (no celular ele levava o painel para longe
      // do tile): quem rola é o scrollIntoView, só o necessário.
      document.getElementById(`detalhe-${openId}`)?.focus({ preventScroll: true });
      document.getElementById(panelId)?.scrollIntoView({ block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openId, panelId]);

  // Só um painel aberto na página: quando outra fileira abre um tile, esta
  // fecha o seu (sem mexer no foco, que já está com quem abriu).
  useEffect(() => {
    const onOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== row.id) setOpenId(null);
    };
    window.addEventListener("catalog:open", onOpen);
    return () => window.removeEventListener("catalog:open", onOpen);
  }, [row.id]);

  function toggle(id: string) {
    if (openId === id) {
      setOpenId(null);
    } else {
      window.dispatchEvent(new CustomEvent("catalog:open", { detail: row.id }));
      setOpenId(id);
      setShownId(id);
    }
  }

  function close() {
    const id = openId;
    setOpenId(null);
    if (id) document.getElementById(`tile-${id}`)?.focus();
  }

  function scrollRail(direction: 1 | -1) {
    const rail = railRef.current;
    if (rail) rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && openId) {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const rail = railRef.current;
    if (!rail) return;
    const tiles = Array.from(rail.querySelectorAll<HTMLButtonElement>(".tile"));
    const index = tiles.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    const next = tiles[index + (event.key === "ArrowRight" ? 1 : -1)];
    if (next) {
      event.preventDefault();
      next.focus();
    }
  }

  return (
    <section
      id={`trilha-${row.id}`}
      aria-labelledby={headingId}
      className={`hue-${row.id} scroll-mt-20`}
      onKeyDown={onKeyDown}
    >
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h2 id={headingId} className="display text-4xl sm:text-5xl">
            {row.name}
          </h2>
          <p className="mt-3 max-w-[60ch] text-sm text-muted">{row.scope}</p>
        </div>
        <div className="flex items-center gap-3">
          {row.resume && (
            <a
              href={row.resume.href}
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
            >
              <DownloadIcon className="h-4 w-4" />
              {row.resume.label} (PDF)
            </a>
          )}
          {canScroll && (
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label={`Rolar ${row.name} para a esquerda`}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-raised"
              >
                <ChevronIcon direction="left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label={`Rolar ${row.name} para a direita`}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-raised"
              >
                <ChevronIcon direction="right" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul ref={railRef} className="rail" aria-label={`Itens de ${row.name}`}>
        {row.tiles.map((tile) => {
          const isOpen = openId === tile.id;
          return (
            <li key={tile.id}>
              <button
                type="button"
                id={`tile-${tile.id}`}
                className="tile"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(tile.id)}
              >
                <span className="cover">
                  <Cover name={tile.cover} />
                  <span className="absolute inset-x-0 bottom-0 bg-[var(--c-deep)] px-3 py-2">
                    <span className="display block text-2xl">{tile.title}</span>
                  </span>
                </span>
                <span className="peek">
                  <span className="w-fit rounded border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                    {tile.kindLabel}
                  </span>
                  <span className="text-sm leading-snug text-foreground">{tile.line}</span>
                  <span className="text-xs font-medium text-accent-text">
                    {isOpen ? "Fechar detalhes" : "Ver detalhes"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id={panelId}
        role="region"
        aria-label={shown ? `Detalhes: ${shown.title}` : undefined}
        className="panel scroll-mt-24"
        data-open={openId !== null}
        inert={openId === null}
      >
        <div className="panel-inner">{shown && <Detail tile={shown} onClose={close} />}</div>
      </div>
    </section>
  );
}

function Detail({ tile, onClose }: { tile: TileData; onClose: () => void }) {
  return (
    // O painel mistura um pouco do matiz da fileira no fundo: tile aberto e
    // painel leem como um objeto só.
    <div className="mb-2 grid gap-8 rounded-xl bg-[color-mix(in_srgb,var(--c-deep)_24%,var(--color-bg-elevated))] p-6 sm:p-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id={`detalhe-${tile.id}`} tabIndex={-1} className="display text-3xl outline-none sm:text-4xl">
              {tile.title}
            </h3>
            {tile.meta && <p className="mt-3 text-sm text-muted">{tile.meta}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-raised"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {tile.quote && (
          <blockquote className="mt-5 max-w-[65ch] text-lg leading-relaxed text-foreground">
            “{tile.quote.text}”
            <footer className="mt-3 text-sm text-muted">
              {tile.quote.author}, {tile.quote.role}
            </footer>
          </blockquote>
        )}

        {tile.paragraphs.map((p) => (
          <p key={p} className="mt-5 max-w-[65ch] leading-relaxed text-foreground/90">
            {p}
          </p>
        ))}

        {tile.bullets.length > 0 && (
          <ul className="mt-4 grid max-w-[65ch] gap-2 text-foreground/90">
            {tile.bullets.map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-[var(--c-light)]" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-5 lg:col-span-4">
        {tile.chips.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
            {tile.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground"
              >
                <TechIcon name={chip} color="a4a9b3" className="h-3.5 w-3.5" />
                {chip}
              </li>
            ))}
          </ul>
        )}

        {tile.stars !== undefined && (
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <StarIcon className="h-4 w-4" />
            {tile.stars} no GitHub
          </p>
        )}

        {tile.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  link.tone === "primary"
                    ? "inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
                    : "inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
                }
              >
                {link.label}
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
