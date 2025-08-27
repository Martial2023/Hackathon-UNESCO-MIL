import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Autorise uniquement les URLs en HTTPS (recommandé pour la sécurité)
        hostname: '**', // Autorise tous les domaines
      },
      {
        protocol: 'http', // Si tu veux aussi autoriser HTTP (moins sécurisé)
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
