// Mapa de "nome da tecnologia" → slug no Simple Icons (simpleicons.org).
// Usamos o CDN público deles (cdn.simpleicons.org/<slug>/<cor>) em vez de
// baixar/desenhar um logo pra cada tecnologia — é uma <img> comum, então
// nem precisa passar pelo otimizador do next/image nem entrar na lista de
// domínios liberados em next.config.ts.
const SIMPLE_ICON_SLUGS: Record<string, string> = {
  "Node.js": "nodedotjs",
  Express: "express",
  TypeScript: "typescript",
  JavaScript: "javascript",
  MongoDB: "mongodb",
  React: "react",
  Angular: "angular",
  Java: "openjdk",
  "Spring Boot": "springboot",
  "Chart.js": "chartdotjs",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
};

interface TechIconProps {
  name: string;
  /** Cor do ícone em hex, sem "#" (ex.: "3b82f6"). */
  color?: string;
  className?: string;
}

/**
 * Renderiza o logo oficial da tecnologia quando conhecemos o slug dela.
 * Quando não conhecemos (ex.: "APIs REST", que não é uma marca/produto),
 * retorna null silenciosamente — o chip de texto continua funcionando
 * normalmente sem ícone, em vez de quebrar a página.
 */
export function TechIcon({ name, color = "8b8f98", className }: TechIconProps) {
  const slug = SIMPLE_ICON_SLUGS[name];
  if (!slug) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- ícone externo pequeno, não precisa do otimizador do next/image
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={className}
    />
  );
}
