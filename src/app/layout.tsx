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
  icons: {
    icon: '/images/torre.jpg',
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
      <style>
        {`
          @media (max-width: 430px) {
            .mobile-test {
              display: block !important;
              background: red;
              color: white;
              padding: 20px;
              text-align: center;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 9999;
            }
          }
        `}
      </style>
      <body
        className={`${inter.variable} ${greatVibes.variable} antialiased font-sans overflow-x-hidden`}
      >
        <div className="mobile-test" style={{ display: 'none' }}>Mobile CSS Test</div>
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
