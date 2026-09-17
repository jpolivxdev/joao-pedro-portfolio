import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
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
    <section id="contato" aria-labelledby="contato-heading" className="scroll-mt-24">
      <SectionHeading eyebrow="Vamos conversar" title="Contato" />

      <RevealOnScroll>
        <div className="glass-card rounded-2xl p-6 grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted leading-relaxed mb-5">
              Prefere um contato direto? Use um dos canais abaixo — respondo o mais rápido possível.
            </p>
            <nav aria-label="Canais de contato" className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const Icon = iconByType[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-foreground hover:text-accent transition-colors w-fit"
                  >
                    <Icon className="w-4 h-4 text-accent shrink-0" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <ContactForm />
        </div>
      </RevealOnScroll>
    </section>
  );
}
