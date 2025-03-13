import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron, Bebas_Neue, Permanent_Marker } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-permanent-marker',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BLOODLETTER HQ',
  description: 'Enter Neo Fortuna: Uncover the Truth, Survive the Chaos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${bebas.variable} ${permanentMarker.variable}`}>
      <body className="bg-darker">
        {children}
      </body>
    </html>
  );
} 