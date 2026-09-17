import { BentoCard } from "./BentoCard";
import { skills } from "@/data/profile";
import { TechIcon } from "@/components/ui/TechIcon";

export function StackCard({ index }: { index: number }) {
  const principal = skills.filter((s) => s.level === "principal");
  const secundaria = skills.filter((s) => s.level === "secundaria");

  return (
    <BentoCard index={index} className="sm:col-span-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Stack técnica</h2>

      <ul className="flex flex-wrap gap-2 mb-4" aria-label="Tecnologias principais">
        {principal.map((skill) => (
          <li
            key={skill.name}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 text-accent border border-accent/30 px-3 py-1 text-sm font-medium"
          >
            <TechIcon name={skill.name} color="3b82f6" className="w-3.5 h-3.5" />
            {skill.name}
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2" aria-label="Tecnologias secundárias">
        {secundaria.map((skill) => (
          <li
            key={skill.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm text-muted"
          >
            <TechIcon name={skill.name} color="8b8f98" className="w-3.5 h-3.5" />
            {skill.name}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
