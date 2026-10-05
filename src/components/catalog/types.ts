import type { TileKind, TrackId } from "@/types/profile";

export interface TileLink {
  label: string;
  href: string;
  /** "primary" é a ação principal do tile (fundo azul); "secondary" é contorno. */
  tone: "primary" | "secondary";
  download?: boolean;
}

/** Tudo que o cliente precisa para desenhar um tile e o seu painel (serializável). */
export interface TileData {
  id: string;
  kind: TileKind;
  kindLabel: string;
  title: string;
  line: string;
  cover: string;
  meta?: string;
  paragraphs: string[];
  bullets: string[];
  chips: string[];
  quote?: { text: string; author: string; role: string };
  links: TileLink[];
  stars?: number;
}

export interface RowData {
  id: TrackId;
  name: string;
  scope: string;
  resume?: { label: string; href: string };
  tiles: TileData[];
}
