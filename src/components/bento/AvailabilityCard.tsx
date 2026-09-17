import { BentoCard } from "./BentoCard";
import { personal } from "@/data/profile";

export function AvailabilityCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="sm:col-span-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1 sm:mb-0">Disponibilidade</h2>
        <p className="text-sm text-muted sm:hidden mb-3">Aberto a oportunidades em:</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {personal.availability.map((option) => (
          <li
            key={option}
            className="rounded-full border border-accent/30 bg-accent/10 text-accent px-3 py-1 text-sm font-medium"
          >
            {option}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
