"use client"; // estado do tile aberto, foco por teclado e rolagem horizontal: tudo no navegador.

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Cover } from "./Covers";
import type { RowData, TileData } from "./types";
import { TechIcon } from "@/components/ui/TechIcon";
import { ChevronIcon, CloseIcon, DownloadIcon, ExternalLinkIcon, StarIcon } from "@/components/ui/icons";

/** Pedido para abrir um tile de outra fileira (ex.: Huawei, que mora em Infra/Telecom). */
interface GotoDetail {
  rowId: string;
  tileId: string;
}

/**
 * Uma fileira da parede: o título da trilha, os tiles e, embaixo, o painel
 * de detalhe do tile aberto.
 *
 * No computador (1024px ou mais) os tiles formam uma grade que preenche a
 * largura inteira, sem sobra nem corte. Abaixo disso viram um carrossel com
 * encaixe (scroll-snap), contador "2 de 5" e um degradê na borda indicando
 * que tem mais.
 *
 * O painel abre no fluxo da página (não é um modal) e a página rola só o
 * necessário para ele aparecer.
 */
export function TrackRow({ row }: { row: RowData }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Guarda o último tile aberto para o painel manter o conteúdo enquanto fecha.
  const [shownId, setShownId] = useState<string | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [position, setPosition] = useState(1);
  const [atEnd, setAtEnd] = useState(false);
  const railRef = useRef<HTMLUListElement>(null);
  const headingId = `titulo-${row.id}`;
  const panelId = `painel-${row.id}`;
  const shown = row.tiles.find((t) => t.id === shownId) ?? null;

  // Carrossel: descobre se há o que rolar, em que tile a pessoa está e se
  // chegou ao fim. Lê do próprio DOM, então vale para qualquer largura.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const measure = () => {
      const first = rail.querySelector<HTMLElement>("li");
      const step = first ? first.offsetWidth + 12 : 1;
      const overflow = rail.scrollWidth - rail.clientWidth;
      setCanScroll(overflow > 4);
      setAtEnd(rail.scrollLeft >= overflow - 4);
      setPosition(Math.min(row.tiles.length, Math.round(rail.scrollLeft / step) + 1));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(rail);
    rail.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      rail.removeEventListener("scroll", schedule);
    };
  }, [row.tiles.length]);

  // Ao abrir um tile, o foco vai para o título do painel: quem usa teclado
  // não precisa passar por todos os tiles restantes para chegar ao conteúdo.
  useEffect(() => {
    if (!openId) return;
    const frame = requestAnimationFrame(() => {
      // O foco não rola a página: quem rola é o scrollIntoView, só o
      // necessário para o painel aparecer.
      document.getElementById(`detalhe-${openId}`)?.focus({ preventScroll: true });
      document.getElementById(panelId)?.scrollIntoView({ block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openId, panelId]);

  // Só um painel aberto na página: quando outra fileira abre um tile, esta
  // fecha o seu. E quando outra fileira pede um tile daqui (catalog:goto),
  // esta abre e leva o tile para a tela.
  useEffect(() => {
    const onOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== row.id) setOpenId(null);
    };
    const onGoto = (event: Event) => {
      const { rowId, tileId } = (event as CustomEvent<GotoDetail>).detail;
      if (rowId !== row.id) return;
      window.dispatchEvent(new CustomEvent("catalog:open", { detail: row.id }));
      document.getElementById(`tile-${tileId}`)?.scrollIntoView({ block: "center", inline: "center" });
      setOpenId(tileId);
      setShownId(tileId);
    };
    window.addEventListener("catalog:open", onOpen);
    window.addEventListener("catalog:goto", onGoto);
    return () => {
      window.removeEventListener("catalog:open", onOpen);
      window.removeEventListener("catalog:goto", onGoto);
    };
  }, [row.id]);

  function toggle(tile: TileData) {
    // Tile de referência: o detalhe mora em outra fileira.
    if (tile.seeAlso) {
      window.dispatchEvent(new CustomEvent<GotoDetail>("catalog:goto", { detail: tile.seeAlso }));
      return;
    }
    if (openId === tile.id) {
      setOpenId(null);
    } else {
      window.dispatchEvent(new CustomEvent("catalog:open", { detail: row.id }));
      setOpenId(tile.id);
      setShownId(tile.id);
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
      className={`hue-${row.id} scroll-mt-24`}
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
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
            >
              <DownloadIcon className="h-4 w-4" />
              {row.resume.label} (PDF)
            </a>
          )}
          {canScroll && (
            <div className="hidden items-center gap-2 sm:flex lg:hidden">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label={`Rolar ${row.name} para a esquerda`}
                data-tip="Anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-raised"
              >
                <ChevronIcon direction="left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label={`Rolar ${row.name} para a direita`}
                data-tip="Próximo"
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-raised"
              >
                <ChevronIcon direction="right" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ul
        ref={railRef}
        className="rail"
        data-end={atEnd || !canScroll}
        style={{ "--n": row.tiles.length } as CSSProperties}
        aria-label={`Itens de ${row.name}`}
      >
        {row.tiles.map((tile) => {
          const isOpen = openId === tile.id;
          return (
            <li key={tile.id}>
              <button
                type="button"
                id={`tile-${tile.id}`}
                className="tile"
                aria-expanded={tile.seeAlso ? undefined : isOpen}
                aria-controls={tile.seeAlso ? undefined : panelId}
                onClick={() => toggle(tile)}
              >
                <span className="cover">
                  <Cover name={tile.cover} />
                  <span className="absolute inset-x-0 bottom-0 bg-[var(--c-deep)] px-4 py-2.5">
                    <span className="display block text-2xl">{tile.title}</span>
                  </span>
                </span>
                <span className="peek">
                  <span className="w-fit rounded-md border border-border px-2 py-0.5 text-[13px] font-medium uppercase tracking-wide text-muted">
                    {tile.kindLabel}
                  </span>
                  <span className="text-sm leading-snug text-foreground">{tile.line}</span>
                  <span className="text-[13px] font-medium text-accent-text">
                    {tile.seeAlso ? tile.seeAlso.label : isOpen ? "Fechar detalhes" : "Ver detalhes"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Contador do carrossel: só existe quando há o que rolar (celular e tablet). */}
      {canScroll && (
        <p className="-mt-1 mb-3 text-sm text-muted lg:hidden" aria-hidden="true">
          {position} de {row.tiles.length}
        </p>
      )}

      <div
        id={panelId}
        role="region"
        aria-label={shown ? `Detalhes: ${shown.title}` : undefined}
        className="panel scroll-mb-24 scroll-mt-24"
        data-open={openId !== null}
        inert={openId === null}
      >
        <div className="panel-inner">{shown && <Detail key={shown.id} tile={shown} onClose={close} />}</div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid max-w-[65ch] gap-2 text-foreground/90">
      {items.map((b) => (
        <li key={b} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-[var(--c-ink)]" />
          {b}
        </li>
      ))}
    </ul>
  );
}

export function Detail({ tile, onClose }: { tile: TileData; onClose: () => void }) {
  return (
    // Vidro tingido com o matiz da fileira: tile aberto e painel leem como
    // um objeto só. "swap-in" assenta a troca de conteúdo em 0,16 s.
    <div className="glass glass-hue swap-in mb-2 grid gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-12">
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
            data-tip="Fechar"
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

        {tile.bullets.length > 0 && <Bullets items={tile.bullets} />}

        {tile.bulletGroups?.map((group) => (
          <div key={group.label} className="mt-6">
            <h4 className="text-sm font-semibold text-foreground">{group.label}</h4>
            <Bullets items={group.items} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:col-span-4">
        {tile.chips.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
            {tile.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-foreground"
              >
                <TechIcon name={chip} color="7d8594" className="h-3.5 w-3.5" />
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
                    ? "inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
                    : "inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
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
