import { personal, recommendation, skills } from "@/data/profile";
import { TechIcon } from "@/components/ui/TechIcon";
import { ExternalLinkIcon } from "@/components/ui/icons";

export function AboutSection() {
  const principal = skills.filter((s) => s.level === "principal");
  const secundaria = skills.filter((s) => s.level === "secundaria");

  return (
    <section id="sobre" aria-labelledby="titulo-sobre" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 pt-24">
      <h2 id="titulo-sobre" className="display text-4xl sm:text-5xl">
        Sobre
      </h2>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <p className="max-w-[65ch] text-lg leading-relaxed text-foreground/90">{personal.about}</p>

          {/* A prova mais forte fecha a leitura: o trecho da carta, no mesmo
              tom de painel da trilha Infra/Telecom de onde ela vem. */}
          <figure className="hue-infra glass glass-hue rounded-3xl p-6 sm:p-10">
            <blockquote className="max-w-[65ch] text-lg leading-relaxed text-foreground">
              “{recommendation.excerpt}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-muted">
              {recommendation.authorName}, {recommendation.authorRole}
            </figcaption>
            <a
              href={recommendation.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--c-ink)] underline decoration-[var(--c-ink)]/40 underline-offset-4 transition-colors hover:decoration-[var(--c-ink)]"
            >
              Ler a carta completa
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </figure>
        </div>

        <dl className="grid content-start gap-8 lg:col-span-5">
          <div>
            <dt className="text-sm font-medium text-muted">Disponibilidade</dt>
            <dd className="mt-2 text-foreground">{personal.availability.join(" · ")}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-muted">Tecnologias</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {[...principal, ...secundaria].map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm ${
                    skill.level === "principal" ? "border-accent text-foreground" : "border-border text-muted"
                  }`}
                >
                  <TechIcon name={skill.name} color="7d8594" className="h-3.5 w-3.5" />
                  {skill.name}
                </span>
              ))}
            </dd>
          </div>

        </dl>
      </div>
    </section>
  );
}
