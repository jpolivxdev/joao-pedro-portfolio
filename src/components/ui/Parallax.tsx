"use client"; // lê a posição da rolagem no navegador.

import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Parallax leve: o conteúdo anda um pouco mais devagar ou mais rápido que
 * a página enquanto a pessoa rola (acompanha o dedo, não roda sozinho).
 *
 * useScroll devolve a rolagem da página como um "motion value": um valor
 * que muda sem re-renderizar o React. useTransform converte essa rolagem
 * em deslocamento vertical; só transform é animado, então o navegador não
 * recalcula layout. `speed` é a fração da rolagem: 0.1 = desce 10px a cada
 * 100px rolados; negativo sobe. O efeito para depois de `range` px.
 */
export function Parallax({
  children,
  speed,
  range = 900,
  className,
}: {
  children?: ReactNode;
  speed: number;
  range?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, range], [0, range * speed], { clamp: true });
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
