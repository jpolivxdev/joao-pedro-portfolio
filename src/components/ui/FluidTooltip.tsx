"use client"; // acompanha o ponteiro e o foco do teclado no navegador.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface Tip {
  text: string;
  x: number;
  y: number;
  width: number;
  /** 1 = veio da esquerda para a direita; -1 = o contrário. */
  dir: 1 | -1;
}

const HEIGHT = 32;
const GAP = 8;

const textVariants = {
  enter: (dir: number) => ({ x: dir * 14, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir * -14, opacity: 0, filter: "blur(4px)" }),
};

/**
 * Dica (tooltip) única da página. Qualquer elemento com data-tip="texto"
 * ganha a dica: ao passar o mouse ou focar com Tab, o mesmo balão desliza
 * em mola até o elemento, ajusta a largura ao texto novo e troca o texto
 * rolando na direção do movimento.
 *
 * O balão é aria-hidden: quem usa leitor de tela ouve o aria-label do
 * próprio botão. Não aparece no toque (não há hover no celular) e fecha
 * com Esc. Com "reduzir movimento", aparece e some sem animação.
 */
export function FluidTooltip() {
  const [tip, setTip] = useState<Tip | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLElement | null>(null);
  const lastCenterRef = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)");

    function hide() {
      currentRef.current = null;
      setTip(null);
    }

    function show(el: HTMLElement) {
      const text = el.dataset.tip;
      const measure = measureRef.current;
      if (!text || !measure || currentRef.current === el) return;
      currentRef.current = el;
      measure.textContent = text;
      const width = measure.offsetWidth + 24;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const x = Math.min(Math.max(center - width / 2, 8), window.innerWidth - width - 8);
      // Sem espaço em cima (elemento colado no topo), a dica vai para baixo.
      const y = rect.top < HEIGHT + GAP * 2 ? rect.bottom + GAP : rect.top - GAP - HEIGHT;
      const dir = center >= lastCenterRef.current ? 1 : -1;
      lastCenterRef.current = center;
      setTip({ text, x, y, width, dir });
    }

    const tipTarget = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>("[data-tip]") : null;

    function onPointerOver(event: PointerEvent) {
      if (event.pointerType === "touch" || !canHover.matches) return;
      const el = tipTarget(event.target);
      if (el) show(el);
      else if (currentRef.current) hide();
    }
    function onFocusIn(event: FocusEvent) {
      const el = tipTarget(event.target);
      // Só no foco por teclado: clique e toque não abrem a dica.
      if (el && el.matches(":focus-visible")) show(el);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && currentRef.current) hide();
    }

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", hide);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", hide);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", hide);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", hide);
      window.removeEventListener("scroll", hide);
    };
  }, []);

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 38, opacity: { duration: 0.12 } };

  return (
    <>
      <span ref={measureRef} className="tooltip-measure" aria-hidden="true" />
      <AnimatePresence>
        {tip && (
          <motion.div
            key="tooltip"
            className="tooltip"
            aria-hidden="true"
            initial={{ opacity: 0, x: tip.x, y: tip.y, width: tip.width }}
            animate={{ opacity: 1, x: tip.x, y: tip.y, width: tip.width }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            <AnimatePresence initial={false} custom={tip.dir}>
              <motion.span
                key={tip.text}
                custom={tip.dir}
                variants={reduce ? undefined : textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {tip.text}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
