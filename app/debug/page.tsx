"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
      
      <Link href="/" className="text-blue-500 hover:underline mb-8 block">
        Back to Home
      </Link>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Simple Image Test</h2>
          <div className="w-64 h-64 relative border border-gray-300">
            <Image 
              src="/images/bloodletter-logo.png"
              alt="Logo"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Hero Image Test</h2>
          <div className="w-full h-96 relative border border-gray-300">
            <Image 
              src="/images/reggie-close-up.jpg"
              alt="Hero"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">3. Faction Image Test</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[3/4] relative border border-gray-300">
              <Image 
                src="/images/commandant-warden.jpg"
                alt="Commandant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="aspect-[3/4] relative border border-gray-300">
              <Image 
                src="/images/m4jor-warden.jpg"
                alt="Major"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="aspect-[3/4] relative border border-gray-300">
              <Image 
                src="/images/herald-of-the-cult-of-the-pineapple-god-bounty.jpg"
                alt="Herald"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">CSS Variables:</h2>
          {mounted && (
            <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
              {Object.entries(getComputedStyle(document.documentElement))
                .filter(([key]) => typeof key === 'string' && key.startsWith('--'))
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')}
            </pre>
          )}
        </div>
      </div>
    </main>
  );
} 