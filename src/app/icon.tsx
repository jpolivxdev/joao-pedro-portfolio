import { ImageResponse } from "next/og";

// Convenção do App Router: um arquivo chamado "icon.tsx" dentro de /app
// é automaticamente servido como favicon do site. Não precisamos de um
// arquivo .ico estático nem de configurar nada em <head> — o Next.js
// detecta esse arquivo pelo nome e gera o favicon sozinho.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#3b82f6",
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          borderRadius: 6,
        }}
      >
        JP
      </div>
    ),
    { ...size }
  );
}
