// Tema claro/escuro. A escolha da pessoa ("light", "dark" ou "system") fica
// no localStorage; o tema de fato aplicado ("light" ou "dark") vai no
// atributo data-theme do <html>, que é o que o CSS lê.

export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "tema";
export const THEME_EVENT = "themechange";
/** Sem escolha guardada, o site abre no escuro. */
export const DEFAULT_THEME_CHOICE: ThemeChoice = "dark";

/**
 * Script que roda no <head>, antes da primeira pintura: sem ele a página
 * piscaria no tema errado até o React carregar. É texto puro (não passa
 * pelo bundler), por isso repete a chave e o padrão acima.
 */
export const themeInitScript = `(function(){try{var c=localStorage.getItem("${THEME_STORAGE_KEY}");if(c!=="light"&&c!=="dark"&&c!=="system")c="${DEFAULT_THEME_CHOICE}";var t=c==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):c;document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export function readThemeChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // localStorage bloqueado (aba privada, política do navegador): usa o padrão.
  }
  return DEFAULT_THEME_CHOICE;
}

function resolve(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyThemeChoice(choice: ThemeChoice) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Sem localStorage a escolha vale só até recarregar.
  }
  document.documentElement.dataset.theme = resolve(choice);
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Para useSyncExternalStore: avisa quando a escolha ou o tema do sistema mudam. */
export function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = () => {
    if (readThemeChoice() === "system") document.documentElement.dataset.theme = resolve("system");
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onSystem);
  };
}
