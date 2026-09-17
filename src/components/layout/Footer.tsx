import { personal } from "@/data/profile";

// Mesmos links do Header — reaproveitados aqui, sem criar nenhuma seção
// nova, só repetindo a navegação no rodapé (padrão comum em templates
// "de agência", incluindo o que inspirou esse redesenho).
const navItems = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Certificações", href: "#certificacoes" },
  { label: "Recomendação", href: "#recomendacao" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-[1600px] mx-auto px-6 py-12 grid sm:grid-cols-2 gap-8">
        <div>
          <p className="font-semibold text-foreground">
            JP<span className="text-accent">.</span>dev
          </p>
          <p className="mt-2 text-sm text-muted max-w-xs">{personal.headline}</p>
        </div>

        <div className="sm:text-right">
          <p className="text-xs font-medium tracking-wide text-accent uppercase mb-3">
            Navegação
          </p>
          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-col sm:items-end gap-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-muted hover:text-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pb-8 text-xs text-muted flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border pt-6">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p>Construído com Next.js, Tailwind CSS e Motion.</p>
      </div>
    </footer>
  );
}
