import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { curatedProjects } from "@/data/profile";
import { getGithubRepos, getRepoPreviewImageUrl } from "@/lib/github";
import { ExternalLinkIcon, StarIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/TechIcon";
import { ProjectCoverImage } from "./ProjectCoverImage";

// Este é um Server Component assíncrono: no App Router, um componente pode
// ser "async" e usar "await" direto no corpo, sem precisar de useEffect +
// useState como seria necessário em um Client Component do React "puro".
// O Next.js espera essa Promise resolver no servidor antes de mandar o HTML
// pronto para o navegador.
export async function ProjectsSection() {
  const repos = await getGithubRepos();

  // Junta a descrição curada manualmente (mais clara que a do GitHub) com os
  // dados reais do repositório (estrelas, link, data de atualização), quando
  // o repositório correspondente existe no GitHub.
  const projects = curatedProjects.map((project) => {
    const repo = repos.find((r) => r.name.toLowerCase() === project.repoName.toLowerCase());
    return { ...project, repo };
  });

  return (
    <section id="projetos" aria-labelledby="projetos-heading" className="scroll-mt-24">
      <SectionHeading eyebrow="Portfólio" title="Projetos" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <RevealOnScroll
            key={project.repoName}
            delay={index * 0.1}
            // Se sobrar um card "ímpar" no fim da grid de 2 colunas, ele
            // ocupa a linha inteira em vez de ficar sozinho de um lado —
            // mas só até o breakpoint "xl", onde a grid já passa a ter 3
            // colunas e não sobra nenhum card solto.
            className={
              index === projects.length - 1 && projects.length % 2 !== 0
                ? "sm:col-span-2 xl:col-span-1"
                : undefined
            }
          >
            <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
              {/* Capa do card: quando o repositório foi encontrado na API do
                  GitHub, usamos a imagem de preview que o próprio GitHub
                  gera para ele. Sem correspondência — ou se essa imagem
                  falhar ao carregar, já que não é uma API oficial — caímos
                  num gradiente com as iniciais do projeto. */}
              <div className="relative aspect-[16/7] w-full bg-gradient-to-br from-accent/20 via-background-elevated to-background-elevated">
                <ProjectCoverImage
                  src={project.repo ? getRepoPreviewImageUrl(project.repoName) : undefined}
                  alt={`Capa do repositório ${project.title} no GitHub`}
                  title={project.title}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <h3 className="text-base font-semibold text-foreground flex items-baseline gap-2">
                  {/* Numerozinho de destaque, no mesmo espírito do template
                      de referência (cada card de serviço tinha um número
                      grande e discreto). Fica no texto, não sobre a
                      imagem — a capa vem do GitHub e tem fundo branco, um
                      número por cima dela sumiria de vista. */}
                  <span
                    aria-hidden="true"
                    className="italic text-accent/60 text-base"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.title}
                </h3>
                {project.repo && project.repo.stars > 0 && (
                  <span className="inline-flex items-center gap-1 text-sm text-muted shrink-0">
                    <StarIcon className="w-4 h-4 text-accent" />
                    {project.repo.stars}
                  </span>
                )}
              </div>

              <p className="text-xs font-medium text-accent mb-2">{project.status}</p>

              <p className="text-sm text-muted leading-relaxed mb-3">{project.description}</p>

              <ul className="flex flex-wrap gap-2 mb-4" aria-label="Tecnologias usadas">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted"
                  >
                    <TechIcon name={tech} color="8b8f98" className="w-3 h-3" />
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-4 pt-2">
                {project.repo && (
                  <a
                    href={project.repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    Ver repositório
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.extraLink && (
                  <a
                    href={project.extraLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {project.extraLink.label}
                    <ExternalLinkIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
