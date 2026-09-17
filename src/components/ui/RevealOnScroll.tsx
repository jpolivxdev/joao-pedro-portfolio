"use client"; // Client Component: precisa rodar no navegador porque usa
// hooks do Framer Motion (useInView) que dependem da posição de scroll,
// algo que só existe depois que a página já carregou no browser.

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Atraso em segundos antes da animação começar (útil para escalonar itens). */
  delay?: number;
  className?: string;
}

/**
 * Envolve qualquer conteúdo e faz um fade + slide-up sutil quando ele entra
 * na viewport (tela visível) durante o scroll. Usa "whileInView" em vez de
 * "animate" porque queremos que a animação dispare quando o usuário rola até
 * o elemento, não assim que a página carrega.
 */
export function RevealOnScroll({ children, delay = 0, className }: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // "once: true" garante que a animação roda uma única vez (não fica
      // reanimando toda vez que o usuário rola pra cima e pra baixo).
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
