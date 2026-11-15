"use client"; // MotionConfig usa contexto do React, que só existe no cliente.

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { FluidTooltip } from "@/components/ui/FluidTooltip";

/**
 * Configuração global das animações: reducedMotion="user" faz o motion
 * respeitar o "reduzir movimento" do sistema em todas as animações de
 * transform e layout (parallax, gota do menu, entradas), sem precisar
 * tratar caso a caso.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <FluidTooltip />
    </MotionConfig>
  );
}
