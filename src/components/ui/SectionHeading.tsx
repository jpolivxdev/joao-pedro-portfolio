// Componente simples, sem estado nem interatividade — por isso não leva
// "use client" e continua sendo um Server Component. Ele é renderizado no
// servidor e enviado ao navegador já como HTML pronto, o que deixa a página
// mais rápida (menos JavaScript pra baixar e executar no cliente).
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  // Mesmo contraste "sans-serif + serifada itálica" usado no destaque da
  // capa (NameHero) — aqui aplicado só na última palavra do título de cada
  // seção, pra repetir a mesma "assinatura" visual pelo site inteiro sem
  // reescrever cada título na mão.
  const words = title.split(" ");
  const lastWord = words.at(-1);
  const leadingWords = words.slice(0, -1).join(" ");

  return (
    <div className="mb-6">
      <p className="text-xs font-medium tracking-wide text-accent uppercase mb-1.5">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
        {leadingWords && <>{leadingWords} </>}
        <em className="italic text-accent" style={{ fontFamily: "var(--font-playfair)" }}>
          {lastWord}
        </em>
      </h2>
    </div>
  );
}
