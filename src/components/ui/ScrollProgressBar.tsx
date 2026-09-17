"use client"; // depende da posição de scroll, uma informação que só existe no navegador.

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Linha fina no topo da página que cresce da esquerda pra direita conforme
 * o usuário rola. "useScroll" devolve o progresso do scroll da página como
 * um valor entre 0 e 1; "useSpring" suaviza esse valor com física de mola
 * em vez de pular direto pro número exato a cada evento de scroll.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-50"
      aria-hidden="true"
    />
  );
}
