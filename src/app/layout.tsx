import type { Metadata } from "next";
import { Geist, Geist_Mono, Big_Shoulders } from "next/font/google";
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

// Voz de display do catálogo: condensada, caixa alta, com caráter de
// sinalização industrial (combina com enlaces, torres e rodovias do mundo
// de telecom). Usada só em nome, títulos de trilha e capas; o resto é Geist.
const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
});

const siteUrl = "https://joao-pedro-portfolio-black.vercel.app"; // atualize se trocar de domínio

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
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
