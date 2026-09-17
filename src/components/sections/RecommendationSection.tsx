import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { recommendation } from "@/data/profile";
import { QuoteIcon, ExternalLinkIcon } from "@/components/ui/icons";

export function RecommendationSection() {
  return (
    <section id="recomendacao" aria-labelledby="recomendacao-heading" className="scroll-mt-24">
      <SectionHeading eyebrow="Referência" title="Carta de recomendação" />

      <RevealOnScroll>
        <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <QuoteIcon className="w-8 h-8 text-accent/30 mb-3" />
          <blockquote
            className="text-lg sm:text-xl italic text-foreground leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            “{recommendation.excerpt}”
          </blockquote>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">{recommendation.authorName}</p>
              <p className="text-sm text-muted">{recommendation.authorRole}</p>
            </div>
            <a
              href={recommendation.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Ler carta completa
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
