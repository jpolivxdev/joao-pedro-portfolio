"use client"; // usa useState/useEffect e IntersectionObserver — só existem no navegador.

import { useEffect, useMemo, useRef, useState } from "react";

interface BlurTextProps {
  text: string;
  /** Atraso, em ms, entre cada "segmento" (palavra ou letra) aparecendo. */
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const NBSP = " ";

/**
 * Revela um texto letra por letra (ou palavra por palavra), com um efeito
 * de desfoque + deslocamento suave, disparado quando o texto entra na tela.
 *
 * Essa é uma implementação sem o Framer Motion — usamos só CSS transitions
 * (via inline style) e a IntersectionObserver API nativa do navegador. Pra
 * um texto gigante que pode virar dezenas de <span> (uma por letra), isso é
 * mais leve do que criar uma <motion.span> por letra; para o resto do site
 * (poucos elementos animando por vez) o Motion continua sendo a escolha
 * certa por ser mais declarativo.
 */
export function BlurText({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );

    const node = ref.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const segments = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy]
  );

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => {
        // Um espaço "normal" sozinho dentro de um item flex acaba sendo
        // colapsado pelo navegador (vira largura zero) — por isso usamos
        //   (espaço "duro", non-breaking space), que nunca colapsa,
        // tanto para o espaço entre letras quanto entre palavras.
        const content = segment === " " ? NBSP : segment;
        const trailingSpace = animateBy === "words" && i < segments.length - 1 ? NBSP : "";

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              filter: inView ? "blur(0px)" : "blur(10px)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
              transition: `all 0.5s ease-out ${i * delay}ms`,
            }}
          >
            {content}
            {trailingSpace}
          </span>
        );
      })}
    </p>
  );
}
