import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Libera o domínio de onde vêm as capas dos cards de projeto: o próprio
    // GitHub gera essa imagem de preview automaticamente para cada
    // repositório (é o mesmo card que aparece ao compartilhar o link do
    // repo no Twitter/Slack/etc.), então usamos ela em vez de gerar/hospedar
    // imagens nossas.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
};

export default nextConfig;
