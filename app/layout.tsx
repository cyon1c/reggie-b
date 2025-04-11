import './globals.css';
import type { Metadata } from 'next';
import { Inter, Orbitron, Bebas_Neue, VT323 } from 'next/font/google';

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

const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BLOODLETTER HQ',
  description: 'Enter New Libertalia: Uncover the Truth, Survive the Chaos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${bebas.variable} ${vt323.variable}`}>
      <body className="bg-darker">
        {children}
      </body>
    </html>
  );
} 