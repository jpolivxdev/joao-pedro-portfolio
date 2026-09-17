import { StackCard } from "./StackCard";
import { AboutCard } from "./AboutCard";
import { ResumeCard } from "./ResumeCard";
import { AvailabilityCard } from "./AvailabilityCard";

/**
 * Grid da primeira dobra logo abaixo da capa (NameHero). Nome, foto e
 * headline já aparecem na capa gigante acima, então esses cards focam no
 * que falta: stack técnica, sobre mim, documentos e disponibilidade — cada
 * um como uma faixa compacta de largura total (sm:col-span-4, definido
 * dentro de cada card).
 *
 * O índice (0, 1, 2...) passado a cada card é o que alimenta o atraso do
 * stagger na animação de entrada (delay = index * 0.08s).
 */
export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <StackCard index={0} />
      <AboutCard index={1} />
      <ResumeCard index={2} />
      <AvailabilityCard index={3} />
    </div>
  );
}
