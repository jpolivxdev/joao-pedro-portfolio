import { ContactForm } from "./ContactForm";
import { contactLinks } from "@/data/profile";
import { GithubIcon, LinkedinIcon, MailIcon, WhatsappIcon } from "@/components/ui/icons";

const iconByType = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  email: MailIcon,
  whatsapp: WhatsappIcon,
};

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="titulo-contato" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 pt-24">
      {/* Fecha a página como ela abriu: um painel grande, tom do fundo
          elevado, com o título na mesma voz de display do nome. */}
      <div className="rounded-xl bg-background-elevated p-6 sm:p-10 lg:p-14">
        <h2 id="titulo-contato" className="display text-5xl sm:text-6xl lg:text-7xl">
          Contato
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-[48ch] leading-relaxed text-foreground/90">
              Prefere um contato direto? Use um dos canais abaixo. Respondo o mais rápido possível.
            </p>
            <nav aria-label="Canais de contato" className="mt-4 flex flex-col">
              {contactLinks.map((link) => {
                const Icon = iconByType[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-fit items-center gap-3 text-foreground transition-colors hover:text-accent-text"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
