"use client"; // lê e grava a escolha de tema no navegador.

import { useSyncExternalStore } from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/ui/icons";
import {
  DEFAULT_THEME_CHOICE,
  applyThemeChoice,
  readThemeChoice,
  subscribeTheme,
  type ThemeChoice,
} from "@/lib/theme";

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof SunIcon }[] = [
  { value: "light", label: "Tema claro", Icon: SunIcon },
  { value: "dark", label: "Tema escuro", Icon: MoonIcon },
  { value: "system", label: "Igual ao sistema", Icon: MonitorIcon },
];

/**
 * Três opções de tema: Claro, Escuro e Igual ao sistema. É um grupo de
 * rádio (uma opção marcada por vez), então as setas do teclado trocam de
 * opção, como em qualquer grupo de rádio.
 *
 * useSyncExternalStore lê a escolha direto do localStorage: no servidor
 * devolve o padrão e, depois da hidratação, o valor real, sem setState
 * dentro de efeito.
 */
export function ThemeToggle({ className = "inline-flex" }: { className?: string }) {
  const choice = useSyncExternalStore(subscribeTheme, readThemeChoice, () => DEFAULT_THEME_CHOICE);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const index = OPTIONS.findIndex((o) => o.value === choice);
    const next = OPTIONS[(index + step + OPTIONS.length) % OPTIONS.length];
    applyThemeChoice(next.value);
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-theme-option="${next.value}"]`)?.focus();
  }

  return (
    <div role="radiogroup" aria-label="Tema" onKeyDown={onKeyDown} className={`rounded-full border border-border p-0.5 ${className}`}>
      {OPTIONS.map(({ value, label, Icon }) => {
        const checked = choice === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={label}
            data-tip={label}
            data-theme-option={value}
            tabIndex={checked ? 0 : -1}
            onClick={() => applyThemeChoice(value)}
            className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
              checked ? "bg-surface-raised text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
