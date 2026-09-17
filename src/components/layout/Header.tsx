"use client"; // precisa de estado (menu mobile aberto/fechado, seção ativa)
// e de APIs do navegador (IntersectionObserver), então não dá pra ser
// Server Component.

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const navItems = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Certificações", href: "#certificacoes" },
  { label: "Recomendação", href: "#recomendacao" },
  { label: "Contato", href: "#contato" },
];

/**
 * Header fixo no topo com:
 * - Scrollspy: destaca no menu qual seção está visível no momento,
 *   usando IntersectionObserver (API do navegador que avisa quando um
 *   elemento entra/sai da área visível — mais barato que ficar calculando
 *   posição de scroll manualmente a cada frame).
 * - Menu mobile: abaixo do breakpoint "sm" do Tailwind, os links viram um
 *   painel que abre/fecha com um botão de hambúrguer.
 */
export function Header() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Considera a seção "ativa" quando ela cruza uma faixa perto do meio
      // da tela, em vez de exigir que ela esteja 100% visível.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav aria-label="Navegação principal" className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#top" className="font-semibold text-foreground">
            JP<span className="text-accent">.</span>dev
          </a>

          <ul className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-sm transition-colors ${
                      isActive ? "text-accent font-medium" : "text-muted hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-foreground"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* AnimatePresence permite animar um elemento também na SAÍDA
            (quando ele deixa de existir no React), não só na entrada —
            sem isso, o painel simplesmente sumiria sem transição ao fechar. */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.ul
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="sm:hidden overflow-hidden flex flex-col gap-1 pt-2"
            >
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive ? "text-accent bg-accent/10 font-medium" : "text-muted hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
