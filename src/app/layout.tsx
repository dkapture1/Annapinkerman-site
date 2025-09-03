import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

// Importe o novo componente
import AnimatedBackground from '@/components/AnimatedBackground';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Anna Pinkerman",
  description: "Site oficial de Anna Pinkerman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${greatVibes.variable} antialiased font-sans`}
      >
        {/* Adicione o componente de animação aqui */}
        <AnimatedBackground />

        {/* Envolva o conteúdo principal em um container para controle de z-index */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
