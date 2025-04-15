import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Orbitron, Bebas_Neue, VT323 } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
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
  icons: {
    icon: [
      { url: '/favicon.webp', type: 'image/webp' },
      { url: '/cataclysm-favicon.webp', type: 'image/webp' }
    ],
    apple: [
      { url: '/cataclysm-favicon.webp', sizes: '180x180', type: 'image/webp' }
    ],
    shortcut: '/cataclysm-favicon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${orbitron.variable} ${bebas.variable} ${vt323.variable}`}>
      <body className="bg-darker">
        {children}
      </body>
    </html>
  );
} 