"use client"; // precisa de estado + refs do navegador, então é Client Component.

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/**
 * Mostra um número que "conta" de 0 até `value` quando o elemento entra na
 * tela. Em vez de guardar o número atual em um useState (o que forçaria um
 * re-render do React a cada frame da animação), atualizamos o texto
 * diretamente no DOM via ref — é o mesmo truque que o Framer Motion usa
 * internamente, e evita centenas de re-renders desnecessários por segundo.
 */
export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // useInView observa se o elemento está visível na tela (parecido com um
  // IntersectionObserver, mas já pronto para usar).
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
