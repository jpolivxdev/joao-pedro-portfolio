import { ImageResponse } from "next/og";
import { personal } from "@/data/profile";

// Outra convenção de arquivo do App Router: "opengraph-image.tsx" gera
// automaticamente a imagem usada quando o link do site é compartilhado
// no WhatsApp, LinkedIn, Twitter/X etc. Sem esse arquivo, essas redes
// mostrariam um card sem imagem.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          color: "#f2f3f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#3b82f6", display: "flex", marginBottom: 16 }}>
          Portfólio
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, display: "flex" }}>{personal.name}</div>
        <div style={{ fontSize: 32, color: "#8b8f98", display: "flex", marginTop: 24 }}>
          {personal.headline}
        </div>
      </div>
    ),
    { ...size }
  );
}
