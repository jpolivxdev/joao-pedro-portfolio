import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";
import { contactLinks, personal, tracks } from "@/data/profile";
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "@/components/ui/icons";
import { TrackCover } from "./Covers";

const contactIcons = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: MailIcon,
  whatsapp: WhatsappIcon,
};

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
      <Parallax speed={0.06} className="max-lg:transform-none! lg:col-span-6">
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

          {/* O nome entra palavra por palavra na primeira carga. É animação
              de CSS (não espera o JavaScript), então o texto pinta logo. */}
          <h1 className="display mt-4 text-[clamp(2.75rem,9vw,6rem)] sm:mt-6">
            {personal.name.split(" ").map((word, i) => (
              // O espaço fica fora do span: dentro de um inline-block ele some.
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="name-word" style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-foreground/90 sm:mt-6 sm:text-lg">{personal.short}</p>

        <p className="mt-3 text-sm text-muted sm:mt-5">
          Aberto a vagas em <span className="text-foreground">{personal.availability.join(", ")}</span>.
        </p>

        <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
          <a
            href="#contato"
            className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Falar comigo
          </a>
          <a
            href="#trilhas"
            className="inline-flex min-h-11 items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-raised"
          >
            Ver os trabalhos
          </a>

          {/* Contato direto em um toque. São ícones sem texto: o nome de
              cada um está no aria-label (leitor de tela) e na dica fluida. */}
          <ul className="flex items-center gap-1 sm:ml-2" aria-label="Contato direto">
            {contactLinks.map((link) => {
              const Icon = contactIcons[link.icon];
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    data-tip={link.label}
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Parallax>

      <Parallax speed={-0.06} className="covers max-sm:transform-none! grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3 lg:col-span-6">
        {tracks.map((track) => (
          <a
            key={track.id}
            href={`#trilha-${track.id}`}
            className={`track-cover hue-${track.id} flex min-h-16 sm:block sm:aspect-[3/4]`}
          >
            {/* No celular a faixa é baixa: o desenho aparece inteiro (meet).
                Do tablet para cima a capa é alta e o desenho preenche (slice). */}
            <span className="relative my-1.5 block w-20 shrink-0 self-stretch sm:hidden">
              <TrackCover track={track.id} fit="meet" />
            </span>
            <span className="absolute inset-0 hidden sm:block">
              <TrackCover track={track.id} />
            </span>
            <span className="flex flex-1 flex-col justify-center bg-[var(--c-deep)] px-4 py-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-none sm:justify-start sm:px-3 sm:py-3">
              <span className="display block text-2xl xl:text-3xl">{track.name.replace("/", "/\u200b")}</span>
              <span className="mt-1 block text-xs leading-snug text-[var(--c-light)] xl:text-sm">{track.proof}</span>
            </span>
          </a>
        ))}
      </Parallax>
    </section>
  );
}
