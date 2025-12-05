import type { Metadata } from "next";
import { Inter, Great_Vibes, Parisienne } from "next/font/google";
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

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Anna Pinkerman",
  description: "Site oficial de Anna Pinkerman",
  icons: {
    icon: [
      { url: '/images/anna-19-icon.png', type: 'image/png' },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${greatVibes.variable} ${parisienne.variable} antialiased font-sans overflow-x-hidden`}
      >
        {/* Adicione o componente de animação aqui */}
        <AnimatedBackground />

        {/* Envolva o conteúdo principal em um container para controle de z-index */}
        <div className="min-h-screen max-w-full overflow-x-hidden">
          <main style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
