import { BentoCard } from "./BentoCard";
import { recommendation, resumes } from "@/data/profile";
import { DownloadIcon } from "@/components/ui/icons";

// Mesmo padrão de faixa larga da AboutCard/AvailabilityCard: rótulo à
// esquerda, links em linha à direita — em vez de uma lista vertical que
// deixava um monte de espaço vazio embaixo dela.
export function ResumeCard({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="sm:col-span-4 sm:flex sm:items-center sm:gap-8">
      <h2 className="text-lg font-semibold text-foreground mb-2 sm:mb-0 sm:w-40 sm:shrink-0">
        Documentos
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {resumes.map((resume) => (
          <a
            key={resume.href}
            href={resume.href}
            download
            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
          >
            <DownloadIcon className="w-4 h-4 text-accent shrink-0" />
            {resume.label}
          </a>
        ))}
        <a
          href={recommendation.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
        >
          <DownloadIcon className="w-4 h-4 text-accent shrink-0" />
          Carta de recomendação (Huawei)
        </a>
      </div>
    </BentoCard>
  );
}
