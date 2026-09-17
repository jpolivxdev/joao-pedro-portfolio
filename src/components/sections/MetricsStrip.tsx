import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { metrics } from "@/data/profile";

// Estilo "editorial" de estatística: números grandes soltos, sem cada um
// virar uma caixinha separada — só uma borda fina em cima da faixa inteira
// separando ela do resto da página. Repete o visual mais "limpo" (menos
// "tudo é um card") que vimos no template de referência.
export function MetricsStrip() {
  return (
    <div className="grid grid-cols-3 border-t border-border pt-8">
      {metrics.map((metric, index) => (
        <RevealOnScroll
          key={metric.label}
          delay={index * 0.1}
          className={`text-center ${index > 0 ? "border-l border-border" : ""}`}
        >
          <AnimatedCounter
            value={metric.value}
            suffix={metric.suffix}
            className="block text-4xl sm:text-5xl font-bold text-accent"
          />
          <p className="mt-2 text-xs sm:text-sm text-muted">{metric.label}</p>
        </RevealOnScroll>
      ))}
    </div>
  );
}
