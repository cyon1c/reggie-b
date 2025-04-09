'use client';

import { useEffect, useState, useRef } from 'react';

export default function SpoilerTicker() {
  const [position, setPosition] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const tickerWidth = ticker.scrollWidth;
    const screenWidth = window.innerWidth;
    const totalDistance = tickerWidth + screenWidth;

    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 50; // pixels per second

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setPosition((prev) => {
        const newPosition = prev - (speed * deltaTime) / 1000;
        if (newPosition <= -totalDistance) {
          return screenWidth;
        }
        return newPosition;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-primary/30 border-y-2 border-primary/50 py-4">
      <div 
        ref={tickerRef}
        className="ticker-content whitespace-nowrap text-white font-title text-xl inline-block"
        style={{ transform: `translateX(${position}px)` }}
      >
        <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
        This page may contain spoilers. It is recommended to read the comic book first.
        <span className="mx-8">•</span>
        <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
        This page may contain spoilers. It is recommended to read the comic book first.
        <span className="mx-8">•</span>
        <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
        This page may contain spoilers. It is recommended to read the comic book first.
      </div>
    </div>
  );
} 