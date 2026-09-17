import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { NameHero } from "@/components/hero/NameHero";
import { BentoGrid } from "@/components/bento/BentoGrid";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { RecommendationSection } from "@/components/sections/RecommendationSection";
import { ContactSection } from "@/components/sections/ContactSection";

// page.tsx é o arquivo que o App Router usa como convenção para a página
// renderizada na rota "/". Este componente não precisa de "use client":
// ele só organiza outros componentes (alguns Server, alguns Client) —
// o Next.js decide automaticamente onde cada um roda.
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <Header />

      <main id="top" className="flex-1">
        {/* NameHero fica fora do container com max-width — é de propósito:
            ele precisa ocupar a largura inteira da tela pra funcionar como
            uma "capa". O resto do conteúdo usa um container bem largo
            (1600px) pra aproveitar melhor telas grandes/ultrawide, em vez
            de deixar uma faixa estreita centralizada com muita margem
            morta nas laterais. */}
        <NameHero />

        <div
          id="conteudo"
          className="max-w-[1600px] w-full mx-auto px-6 py-10 flex flex-col gap-14 scroll-mt-16"
        >
          <BentoGrid />

          <MetricsStrip />

          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <RecommendationSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
