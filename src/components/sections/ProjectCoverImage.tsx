"use client"; // precisa reagir ao evento "onError" da imagem, algo que só
// existe depois que o navegador tenta carregar o arquivo de verdade.

import { useState } from "react";
import Image from "next/image";

interface ProjectCoverImageProps {
  src: string | undefined;
  alt: string;
  title: string;
}

/**
 * Capa do card de projeto. `opengraph.githubassets.com` não é uma API
 * oficial do GitHub — funciona bem na maior parte do tempo, mas às vezes
 * falha ou demora (já vimos isso acontecer). Em vez de deixar o navegador
 * mostrar o ícone de "imagem quebrada" quando isso acontece, escutamos o
 * evento onError da imagem e trocamos, no mesmo lugar, por um gradiente
 * com as iniciais do projeto — o mesmo fallback usado quando nem existe
 * repositório correspondente (src undefined).
 */
export function ProjectCoverImage({ src, alt, title }: ProjectCoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-accent/40" aria-hidden="true">
          {title
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
