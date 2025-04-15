'use client';

import { useEffect, useState, useRef } from 'react';

export default function SpoilerTicker() {
  const [position, setPosition] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tickerWidth, setTickerWidth] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

  useEffect(() => {
    const ticker = tickerRef.current;
    const container = containerRef.current;
    if (!ticker || !container) return;

    // Get the width of a single ticker element
    const updateMeasurements = () => {
      setTickerWidth(ticker.offsetWidth / 3); // We have 3 copies in the ticker
    };
    
    updateMeasurements();

    // Start the animation immediately
    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 60; // pixels per second

    const animate = (currentTime: number) => {
      if (animationPaused) {
        lastTime = currentTime; // Update lastTime to prevent jumps
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (deltaTime < 1000) { // Only update if tab is active
        setPosition((prev) => {
          const newPosition = prev - (speed * deltaTime) / 1000;
          
          // Reset position when one copy moves off-screen
          if (newPosition <= -tickerWidth) {
            return newPosition + tickerWidth;
          }
          
          return newPosition;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrame = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      updateMeasurements();
    };

    // Handle visibility change
    const handleVisibilityChange = () => {
      setAnimationPaused(document.hidden);
      if (!document.hidden) {
        lastTime = performance.now();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animationPaused, tickerWidth]);

  // Single warning message
  const warningMessage = (
    <span className="inline-flex items-center whitespace-nowrap">
      <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
      THIS PAGE MAY CONTAIN SPOILERS. IT IS RECOMMENDED TO READ THE COMIC BOOK FIRST.
      <span className="mx-8">•</span>
    </span>
  );

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden bg-primary/30 border-y-2 border-primary/50 py-4"
    >
      <div className="relative">
        <div 
          ref={tickerRef}
          className="inline-flex whitespace-nowrap text-white font-title text-xl"
          style={{ transform: `translateX(${position}px)` }}
        >
          {/* Just use 3 copies of the warning message */}
          {warningMessage}
          {warningMessage}
          {warningMessage}
        </div>
      </div>
    </div>
  );
} 