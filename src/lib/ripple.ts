import type { PointerEvent } from "react";

/**
 * Onda curta no ponto do toque ou clique. Use em onPointerDown de um
 * elemento com a classe "ripple-host". Com "reduzir movimento" ligado no
 * sistema, não faz nada.
 */
export function ripple(event: PointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const host = event.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const wave = document.createElement("span");
  wave.className = "ripple-wave";
  wave.style.width = wave.style.height = `${size}px`;
  wave.style.left = `${event.clientX - rect.left - size / 2}px`;
  wave.style.top = `${event.clientY - rect.top - size / 2}px`;
  wave.addEventListener("animationend", () => wave.remove());
  host.appendChild(wave);
}
