'use client';

import { useEffect, useState, useRef } from 'react';

export default function SpoilerTicker() {
  const [position, setPosition] = useState(0);
  const tickerContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [animationPaused, setAnimationPaused] = useState(false);

  useEffect(() => {
    const tickerContent = tickerContentRef.current;
    const container = containerRef.current;
    if (!tickerContent || !container) return;

    // Get initial measurements
    const updateMeasurements = () => {
      const width = tickerContent.offsetWidth;
      setContentWidth(width);
    };
    
    updateMeasurements();

    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 60; // pixels per second

    const animate = (currentTime: number) => {
      if (animationPaused) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Only update if enough time has passed (prevents jank on inactive tabs)
      if (deltaTime < 1000) {
        setPosition((prev) => {
          const newPosition = prev - (speed * deltaTime) / 1000;
          
          // Simple reset logic: when the first copy moves completely out of view,
          // reset position to create a seamless loop
          if (newPosition <= -contentWidth) {
            return newPosition + contentWidth;
          }
          
          return newPosition;
        });
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    // Handle resize to recalculate dimensions
    const handleResize = () => {
      updateMeasurements();
      // Reset position on resize to prevent visual glitches
      setPosition(0);
    };

    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAnimationPaused(true);
      } else {
        setAnimationPaused(false);
        lastTime = performance.now(); // Reset time to prevent jumps
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animationPaused]);

  // Single ticker content - long enough to fill the screen
  const tickerContent = (
    <div className="inline-block whitespace-nowrap text-white font-title text-xl" ref={tickerContentRef}>
      <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
      THIS PAGE MAY CONTAIN SPOILERS. IT IS RECOMMENDED TO READ THE COMIC BOOK FIRST.
      <span className="mx-8">•</span>
      <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
      THIS PAGE MAY CONTAIN SPOILERS. IT IS RECOMMENDED TO READ THE COMIC BOOK FIRST.
      <span className="mx-8">•</span>
      <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
      THIS PAGE MAY CONTAIN SPOILERS. IT IS RECOMMENDED TO READ THE COMIC BOOK FIRST.
      <span className="mx-8">•</span>
      <span className="text-primary font-bold mr-4">⚠️ WARNING:</span>
      THIS PAGE MAY CONTAIN SPOILERS. IT IS RECOMMENDED TO READ THE COMIC BOOK FIRST.
      <span className="mx-8">•</span>
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden bg-primary/30 border-y-2 border-primary/50 py-4"
    >
      <div className="relative whitespace-nowrap">
        {/* First copy of the ticker content */}
        <div 
          className="inline-block text-white font-title text-xl"
          style={{ transform: `translateX(${position}px)` }}
        >
          {tickerContent}
        </div>
        
        {/* Second copy positioned right after the first copy */}
        <div 
          className="inline-block text-white font-title text-xl"
          style={{ transform: `translateX(${position + contentWidth}px)` }}
        >
          {tickerContent}
        </div>
        
        {/* Third copy for extra safety */}
        <div 
          className="inline-block text-white font-title text-xl"
          style={{ transform: `translateX(${position + contentWidth * 2}px)` }}
        >
          {tickerContent}
        </div>
      </div>
    </div>
  );
} 