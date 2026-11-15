"use client"; // guarda qual projeto está aberto e cuida do foco, como as fileiras.

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Detail } from "./TrackRow";
import type { TileData } from "./types";
import type { FeaturedProject } from "@/types/profile";

const ROW_ID = "destaques";
const PANEL_ID = "painel-destaques";

// O painel de detalhe é o mesmo das fileiras: converte o projeto em destaque
// para o formato que ele já entende.
function toTile(project: FeaturedProject): TileData {
  return {
    id: `destaque-${project.id}`,
    kind: "projeto",
    kindLabel: project.status,
    title: project.title,
    line: project.line,
    cover: "",
    meta: project.meta,
    paragraphs: project.paragraphs,
    bullets: [],
    bulletGroups: project.groups,
    chips: project.stack,
    links: project.links.map((link) => ({ ...link, tone: "primary" as const })),
  };
}

/**
 * "Projetos em destaque": dois cards grandes em mosaico (um largo, um alto)
 * com print real. Clicar abre o mesmo painel de detalhe dos outros projetos,
 * no fluxo da página.
 *
 * next/image redimensiona e comprime os prints (o original tem 2880px de
 * largura) e só baixa o do tema em uso: o outro fica com display: none, e
 * imagem "lazy" escondida não é requisitada.
 */
export function FeaturedSection({ projects }: { projects: FeaturedProject[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [shownId, setShownId] = useState<string | null>(null);
  const tiles = projects.map(toTile);
  const shown = tiles.find((t) => t.id === shownId) ?? null;

  // Só um painel aberto na página (mesmo aviso que as fileiras usam).
  useEffect(() => {
    const onOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== ROW_ID) setOpenId(null);
    };
    window.addEventListener("catalog:open", onOpen);
    return () => window.removeEventListener("catalog:open", onOpen);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`detalhe-${openId}`)?.focus({ preventScroll: true });
      document.getElementById(PANEL_ID)?.scrollIntoView({ block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openId]);

  function toggle(id: string) {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    window.dispatchEvent(new CustomEvent("catalog:open", { detail: ROW_ID }));
    setOpenId(id);
    setShownId(id);
  }

  function close() {
    const id = openId;
    setOpenId(null);
    if (id) document.getElementById(`card-${id}`)?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && openId) {
      event.preventDefault();
      close();
    }
  }

  return (
    <section
      id={ROW_ID}
      aria-labelledby="titulo-destaques"
      className="hue-backend mx-auto max-w-[1440px] scroll-mt-24 px-6 pt-14"
      onKeyDown={onKeyDown}
    >
      <h2 id="titulo-destaques" className="display text-4xl sm:text-5xl">
        Projetos em destaque
      </h2>

      <div className="mt-7 grid gap-4 lg:grid-cols-12">
        {projects.map((project, index) => {
          const tile = tiles[index];
          const isOpen = openId === tile.id;
          const wide = project.shape === "wide";
          return (
            <button
              key={project.id}
              type="button"
              id={`card-${tile.id}`}
              aria-expanded={isOpen}
              aria-controls={PANEL_ID}
              onClick={() => toggle(tile.id)}
              className={`featured-card glass group flex flex-col overflow-hidden rounded-3xl text-left ${
                wide ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <span className={`relative block w-full overflow-hidden ${wide ? "aspect-[16/10]" : "aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[320px]"}`}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className={`object-cover object-left-top ${project.imageLight ? "theme-dark-only" : ""}`}
                />
                {project.imageLight && (
                  <Image
                    src={project.imageLight}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="theme-light-only object-cover object-left-top"
                  />
                )}
              </span>

              <span className="flex flex-col gap-2 p-5 sm:p-6">
                <span className="text-[13px] text-muted">{project.caption}</span>
                <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="display text-3xl sm:text-4xl">{project.title}</span>
                  <span className="rounded-md border border-border px-2 py-0.5 text-[13px] font-medium uppercase tracking-wide text-muted">
                    {project.status}
                  </span>
                </span>
                <span className="max-w-[60ch] leading-snug text-foreground/90">{project.line}</span>
                <span className="mt-1 text-[13px] font-medium text-accent-text">
                  {isOpen ? "Fechar detalhes" : "Ver detalhes"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={PANEL_ID}
        role="region"
        aria-label={shown ? `Detalhes: ${shown.title}` : undefined}
        className="panel scroll-mb-24 scroll-mt-24"
        data-open={openId !== null}
        inert={openId === null}
      >
        <div className="panel-inner pt-4">{shown && <Detail key={shown.id} tile={shown} onClose={close} />}</div>
      </div>
    </section>
  );
}
