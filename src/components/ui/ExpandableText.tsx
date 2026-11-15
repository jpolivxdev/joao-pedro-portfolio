"use client"; // guarda se o texto está aberto ou recolhido.

import { useId, useState } from "react";

/**
 * Texto longo que, só no celular, aparece recolhido em poucas linhas com um
 * botão "Ler tudo". Do tablet para cima aparece inteiro e o botão some. O
 * texto completo está sempre no HTML: leitor de tela e buscador leem tudo.
 */
export function ExpandableText({ text, className = "" }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <p id={id} className={`${className} ${open ? "" : "max-sm:line-clamp-5"}`}>
        {text}
      </p>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 sm:hidden"
      >
        {open ? "Mostrar menos" : "Ler tudo"}
      </button>
    </div>
  );
}
