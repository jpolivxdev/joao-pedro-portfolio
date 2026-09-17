import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { experiences } from "@/data/profile";

// Server Component: só renderiza dados estáticos vindos de /data/profile.ts.
// A animação de entrada (RevealOnScroll) é um Client Component separado —
// isso é comum no Next.js: você mantém a página "estática" no servidor e só
// isola em Client Components as partes que realmente precisam de JS no
// navegador (aqui, detectar quando o elemento entra na tela).
export function ExperienceSection() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-heading" className="scroll-mt-24">
      <SectionHeading eyebrow="Trajetória" title="Experiência profissional" />

      {/* Timeline: uma linha vertical (rail) atrás dos cards, com uma
          bolinha por experiência. O "pl-10" abre espaço pra a linha e as
          bolinhas viverem à esquerda do texto, fora dos cards. */}
      <div className="relative pl-10">
        <div className="absolute left-4 top-1 bottom-1 w-px bg-border" aria-hidden="true" />

        <div className="flex flex-col gap-4">
          {experiences.map((experience, index) => (
            <RevealOnScroll key={experience.company} delay={index * 0.1}>
              <div className="relative">
                <span
                  className="absolute -left-[30px] top-5 w-3 h-3 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden="true"
                />
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-foreground">{experience.role}</h3>
                    <span className="text-sm text-accent font-medium">{experience.period}</span>
                  </div>
                  <p className="text-sm font-medium text-muted mb-2">{experience.company}</p>
                  <p className="text-sm text-muted leading-relaxed mb-3">{experience.description}</p>
                  <ul className="flex flex-col gap-1">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="text-sm text-foreground/90 flex gap-2">
                        <span className="text-accent" aria-hidden="true">
                          —
                        </span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
