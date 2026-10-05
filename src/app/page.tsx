import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Billboard } from "@/components/catalog/Billboard";
import { CatalogWall } from "@/components/catalog/CatalogWall";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

// A página é uma parede de catálogo: a capa apresenta a pessoa e as três
// trilhas; cada trilha é uma fileira de provas (projetos, experiência,
// certificações, carta) que abrem ao foco. Depois vêm só o "Sobre" e o contato.
export default function Home() {
  return (
    <>
      <Header />

      <main id="top" className="flex-1">
        <Billboard />
        <CatalogWall />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
