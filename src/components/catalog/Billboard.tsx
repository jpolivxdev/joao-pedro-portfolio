import Image from "next/image";
import { personal, tracks } from "@/data/profile";
import { TrackCover } from "./Covers";

/**
 * Primeira tela: quem é (nome, foto, sinopse, disponibilidade, contato) e as
 * três trilhas lado a lado, cada uma uma capa que leva à sua fileira. É
 * Server Component: não há nada aqui que dependa do navegador.
 */
export function Billboard() {
  return (
    <section
      aria-label="Apresentação"
      className="mx-auto grid max-w-[1440px] items-center gap-6 px-6 pb-4 pt-6 sm:gap-10 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14"
    >
      <div className="lg:col-span-6">
        <div className="flex items-center gap-4">
          <Image
            src={personal.avatarSrc}
            alt={`Foto de ${personal.name}`}
            width={72}
            height={72}
            className="h-14 w-14 rounded-full object-cover sm:h-[72px] sm:w-[72px]"
            priority
          />
          <p className="text-sm text-muted">{personal.location}</p>
        </div>

        <h1 className="display mt-4 text-[clamp(2.75rem,9vw,6rem)] sm:mt-6">{personal.name}</h1>

        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-foreground/90 sm:mt-6 sm:text-lg">{personal.short}</p>

        <p className="mt-3 text-sm text-muted sm:mt-5">
          Aberto a vagas em <span className="text-foreground">{personal.availability.join(", ")}</span>.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
          <a
            href="#contato"
            className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Falar comigo
          </a>
          <a
            href="#trilhas"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
          >
            Ver os trabalhos
          </a>
        </div>
      </div>

      <div className="covers grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:col-span-6">
        {tracks.map((track) => (
          <a
            key={track.id}
            href={`#trilha-${track.id}`}
            className={`track-cover hue-${track.id} flex min-h-16 sm:block sm:aspect-[3/4]`}
            aria-label={`${track.name}: ${track.proof}`}
          >
            <span className="relative block w-24 shrink-0 self-stretch sm:absolute sm:inset-0 sm:w-auto">
              <TrackCover track={track.id} />
            </span>
            <span className="flex flex-1 flex-col justify-center bg-[var(--c-deep)] px-4 py-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-none sm:justify-start sm:px-3 sm:py-3">
              <span className="display block text-2xl xl:text-3xl">{track.name.replace("/", "/\u200b")}</span>
              <span className="mt-1 block text-xs leading-snug text-[var(--c-light)] xl:text-sm">{track.proof}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
