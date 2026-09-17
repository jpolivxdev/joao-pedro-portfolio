import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { certifications } from "@/data/profile";

// Antes cada certificação era um card cheio (título + emissor + carga
// horária, com bastante respiro). Como são só 3 itens curtos, isso gastava
// uma seção inteira de scroll pra pouca informação nova — aqui viraram uma
// única faixa (um card só), com as 3 certificações separadas por divisórias.
export function CertificationsSection() {
  return (
    <section id="certificacoes" aria-labelledby="certificacoes-heading" className="scroll-mt-24">
      <SectionHeading eyebrow="Formação técnica" title="Certificações" />

      <RevealOnScroll>
        <div className="glass-card rounded-2xl divide-y sm:divide-y-0 sm:divide-x divide-border flex flex-col sm:flex-row">
          {certifications.map((cert, index) => (
            <div key={cert.title} className="flex-1 p-5 flex gap-3">
              <span
                aria-hidden="true"
                className="italic text-accent/50 text-xl leading-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                <p className="text-xs text-muted mt-1">
                  {cert.issuer} · <span className="text-accent font-medium">{cert.hours}h</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
