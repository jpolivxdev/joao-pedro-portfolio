import Image from "next/image";
import { BlurText } from "./BlurText";
import { personal, contactLinks } from "@/data/profile";
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "@/components/ui/icons";

const iconByType = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: MailIcon,
  whatsapp: WhatsappIcon,
};

// Server Component: nada aqui depende do navegador — só o BlurText (o
// texto que "borra e revela") é Client Component, isolado à parte. Isso
// mantém o HTML da capa pronto desde o servidor, sem esperar JavaScript
// rodar pra o texto aparecer na tela (ele só anima o efeito visual).
export function NameHero() {
  return (
    <section
      aria-label="Capa"
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Glow radial atrás do texto — mais forte que o glow discreto do
          resto do site (definido em globals.css), só aqui na capa, pra dar
          o efeito de "luz vindo de trás" no estilo do template de
          referência. "pointer-events-none" garante que essa camada
          puramente decorativa nunca atrapalha cliques. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-border shadow-2xl mb-6">
          <Image
            src={personal.avatarSrc}
            alt={`Foto de ${personal.name}`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <BlurText
          text="Prazer, eu sou"
          delay={30}
          animateBy="words"
          direction="top"
          className="justify-center text-lg sm:text-xl text-muted font-medium"
        />

        {/* Fonte serifada em itálico só nesse destaque — é o contraste
            "serifada + sans" que dá o ar mais editorial à capa, em vez do
            visual "código-fonte" do monoespaçado. */}
        <BlurText
          text="João Pedro"
          delay={40}
          animateBy="letters"
          direction="top"
          className="justify-center italic text-accent leading-[1.05] tracking-tight"
          style={{
            fontSize: "clamp(48px, 11vw, 120px)",
            fontFamily: "var(--font-playfair)",
          }}
        />

        <div className="mt-6 max-w-xl">
          <BlurText
            text={personal.headline}
            delay={12}
            animateBy="words"
            direction="top"
            className="justify-center text-sm sm:text-base text-muted"
          />
        </div>

        <a
          href="#projetos"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Ver projetos
        </a>

        <nav aria-label="Contato rápido" className="mt-6 flex items-center gap-5">
          {contactLinks.map((link) => {
            const Icon = iconByType[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted hover:text-accent transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </nav>
      </div>

      <a
        href="#conteudo"
        aria-label="Rolar para o conteúdo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-accent transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
