import { personal } from "@/data/profile";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p>Feito com Next.js e Tailwind CSS.</p>
      </div>
    </footer>
  );
}
