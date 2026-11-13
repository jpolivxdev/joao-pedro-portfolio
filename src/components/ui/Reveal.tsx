"use client"; // whileInView depende do IntersectionObserver do navegador.

import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Faz o conteúdo aparecer quando entra na tela: sobe 16px e vai de
 * invisível a visível em 0,35 s, uma vez só (viewport.once). Use só no que
 * fica abaixo da primeira tela: o topo precisa pintar de imediato.
 *
 * Sem JavaScript o conteúdo aparece normalmente (ver o <noscript> no
 * layout). Com "reduzir movimento" ligado, o motion mostra o conteúdo sem
 * o deslocamento (MotionConfig em Providers).
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
