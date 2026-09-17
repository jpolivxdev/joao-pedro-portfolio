import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fonte serifada usada só no destaque da capa (NameHero), misturada com a
// sans-serif normal — é o mesmo contraste "serifada + sans" que dá o ar
// mais editorial/sofisticado a sites de agência/portfólio.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const siteUrl = "https://joaopedrooliva.dev"; // troque pela URL real após o deploy

// "metadata" é a forma padrão do App Router de definir <title>, <meta description>,
// Open Graph etc. sem precisar escrever tags manualmente em <head> — o Next.js
// monta o <head> a partir deste objeto em tempo de build/request.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personal.name} | ${personal.headline}`,
  description: personal.about,
  keywords: [
    "Desenvolvedor Backend Jr",
    "Node.js",
    "TypeScript",
    "APIs REST",
    "MongoDB",
    "Analista de Suporte Técnico",
    "Portfólio",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    title: personal.name,
    description: personal.headline,
    url: siteUrl,
    siteName: personal.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: personal.name,
    description: personal.headline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
