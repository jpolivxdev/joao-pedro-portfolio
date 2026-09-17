"use client"; // usa motion values e eventos de mouse, então precisa do navegador.

import { motion, useMotionValue, useTransform } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

interface BentoCardProps {
  children: ReactNode;
  /** Índice do card no grid — usado para calcular o atraso do stagger na entrada. */
  index: number;
  className?: string;
}

/**
 * Card base do bento grid. Duas animações vivem aqui:
 *
 * 1) Entrada: fade + slide-up, com um atraso incremental por card (stagger),
 *    disparado assim que a página carrega — por isso usamos "animate" direto
 *    (não "whileInView"), já que esses cards estão todos na primeira dobra.
 *
 * 2) Hover: leve scale + "tilt" 3D que segue o mouse dentro do card. O tilt
 *    é feito calculando a posição do cursor relativa ao centro do card e
 *    transformando isso em graus de rotação (rotateX/rotateY). A transição
 *    usa "spring" (física de mola) em vez de "linear" para parecer mais viva,
 *    reagindo com uma pequena oscilação natural em vez de um movimento robótico.
 */
export function BentoCard({ children, index, className = "" }: BentoCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mapeia a posição do mouse (-0.5 a 0.5, relativa ao centro do card) para
  // um ângulo de rotação pequeno (-6 a 6 graus). Isso é o que cria o "tilt".
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      className={`glass-card rounded-2xl p-6 ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      // whileHover tem seu próprio "transition", que sobrescreve o de cima
      // só para esse gesto — por isso a entrada usa easeOut (suave e previsível)
      // enquanto o hover usa spring (física de mola, parece "vivo").
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
