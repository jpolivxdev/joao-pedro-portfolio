"use client"; // precisa de estado (menu aberto, seção ativa) e de APIs do
// navegador (IntersectionObserver), então não dá pra ser Server Component.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { ripple } from "@/lib/ripple";
import { BracesIcon, CloseIcon, HeadsetIcon, MailIcon, MenuIcon, TowerIcon, UserIcon } from "@/components/ui/icons";

const navItems = [
  { label: "Backend", short: "Backend", href: "#trilha-backend", Icon: BracesIcon },
  { label: "Suporte", short: "Suporte", href: "#trilha-suporte", Icon: HeadsetIcon },
  { label: "Infra/Telecom", short: "Infra", href: "#trilha-infra", Icon: TowerIcon },
  { label: "Sobre", short: "Sobre", href: "#sobre", Icon: UserIcon },
  { label: "Contato", short: "Contato", href: "#contato", Icon: MailIcon },
];

// Mola curta (uns 0,25 s) para a gota: rápida o bastante para não atrasar
// quem está rolando a página.
const gotaSpring = { type: "spring" as const, stiffness: 520, damping: 40, mass: 0.8 };

/**
 * Navegação do site, em três peças:
 * - Header fixo de vidro: marca, links (do tablet para cima) e tema.
 * - Barra flutuante em pílula no rodapé da tela (só no celular).
 * - Menu em overlay de vidro (só no celular), que abre por cima do
 *   conteúdo em vez de empurrar a página.
 *
 * O item da seção visível é marcado por uma "gota". As duas navegações
 * usam o mesmo scroll-spy (IntersectionObserver: o navegador avisa quando
 * uma seção cruza o meio da tela, sem calcular posição a cada frame). A
 * gota é um único elemento com layoutId: quando o item ativo muda, o
 * motion anima posição e largura dela até o item novo.
 */
export function Header() {
  const [activeId, setActiveId] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Considera a seção "ativa" quando ela cruza uma faixa perto do meio
      // da tela, em vez de exigir que ela esteja 100% visível.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Menu aberto: foco vai para dentro dele e a página atrás não rola.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    overlayRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  // Esc fecha; Tab fica preso dentro do menu enquanto ele está aberto.
  function onOverlayKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('a, button:not([tabindex="-1"])')
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
        <nav aria-label="Navegação principal" className="mx-auto flex max-w-[1440px] items-center gap-3 px-6 py-2">
          <a href="#top" className="inline-flex min-h-11 items-center font-semibold text-foreground">
            JP<span className="text-accent-text">.</span>dev
          </a>

          <ul className="ml-auto hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    onPointerDown={ripple}
                    className={`ripple-host relative inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors ${
                      isActive ? "font-medium text-accent-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && <motion.span layoutId="gota-header" className="gota" transition={gotaSpring} />}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="ml-auto hidden sm:inline-flex md:ml-2" />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="menu-celular"
            aria-label="Abrir menu"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground sm:ml-0 md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Barra em pílula do celular: as cinco seções, sempre ao alcance do polegar. */}
      <nav
        aria-label="Seções"
        className="glass fixed inset-x-0 bottom-3 z-40 mx-auto flex w-fit max-w-[calc(100vw-16px)] rounded-full p-1 md:hidden"
      >
        {navItems.map((item) => {
          const isActive = activeId === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              onPointerDown={ripple}
              className={`ripple-host relative flex min-h-12 min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-full px-2 text-xs transition-colors ${
                isActive ? "font-medium text-accent-foreground" : "text-muted"
              }`}
            >
              {isActive && (
                <motion.span layoutId="gota-pilula" className="gota" style={{ inset: 0 }} transition={gotaSpring} />
              )}
              {/* O ícone do item que acabou de ficar ativo dá um pequeno pulo. */}
              <motion.span
                className="relative"
                animate={isActive ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <item.Icon className="h-5 w-5" />
              </motion.span>
              <span className="relative">{item.short}</span>
            </a>
          );
        })}
      </nav>

      {/* AnimatePresence deixa o overlay animar também na saída, quando ele
          deixa de existir no React. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="menu-celular"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={onOverlayKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="glass fixed inset-0 z-50 flex flex-col border-0 px-6 pb-8 pt-2 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                JP<span className="text-accent-text">.</span>dev
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Fechar menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <motion.ul
              initial={{ y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-1"
            >
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`display flex min-h-14 items-center gap-4 rounded-2xl px-3 text-4xl ${
                        isActive ? "text-accent-text" : "text-foreground"
                      }`}
                    >
                      <item.Icon className="h-6 w-6 shrink-0" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </motion.ul>

            <div className="mt-auto flex items-center justify-between gap-4">
              <span className="text-sm text-muted">Tema</span>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
