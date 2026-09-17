import { BentoCard } from "./BentoCard";
import { BlurText } from "@/components/hero/BlurText";
import { personal } from "@/data/profile";

// Igual à AvailabilityCard: ocupa a largura toda (sm:col-span-4) e vira uma
// faixa baixa e larga, com o rótulo à esquerda e o conteúdo à direita, em
// vez de um card estreito e alto. Com mais largura disponível, o parágrafo
// quebra em bem menos linhas — é isso que economiza altura.
//
// O parágrafo usa o mesmo BlurText da capa (revela palavra por palavra
// quando entra na tela) — aqui ele dispara ao rolar até esse card, não ao
// carregar a página, porque o próprio componente usa IntersectionObserver
// pra saber quando está visível.
export function AboutCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="sm:col-span-4 sm:flex sm:items-start sm:gap-8">
      <h2 className="text-lg font-semibold text-foreground mb-2 sm:mb-0 sm:w-40 sm:shrink-0">
        Sobre mim
      </h2>
      <BlurText
        text={personal.about}
        delay={4}
        animateBy="words"
        direction="top"
        className="text-sm text-muted leading-relaxed"
      />
    </BentoCard>
  );
}
