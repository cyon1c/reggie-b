'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the comic pages
const COMIC_PAGES = [
  { src: '/images/comic-intro.jpg', alt: 'Comic Page 1' },
  { src: '/images/comic-intro-2.jpg', alt: 'Comic Page 2' },
  { src: '/images/comic-intro-3.jpg', alt: 'Comic Page 3' },
  { src: '/images/comic-intro-4.jpg', alt: 'Comic Page 4' },
  { src: '/images/comic-intro-5.jpg', alt: 'Comic Page 5' },
  { src: '/images/comic-intro-6.jpg', alt: 'Comic Page 6' },
];

const ComicReader = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpreadView, setIsSpreadView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const totalPages = COMIC_PAGES.length;

  // Get current displayed pages based on view mode
  const getCurrentPages = () => {
    // In single page view, just return the current page
    if (!isSpreadView) {
      return [currentPage];
    }
    
    // Cover page (page 0) is always shown alone
    if (currentPage === 0) {
      return [0];
    }
    
    // For spread view, show two pages side by side (starting from page 1)
    // If on an even page, show current and next page
    // If on odd page, show previous and current page
    const isEvenPage = (currentPage % 2) === 0;
    if (isEvenPage) {
      // Show current and next page, but don't exceed totalPages
      return currentPage + 1 < totalPages 
        ? [currentPage, currentPage + 1] 
        : [currentPage];
    } else {
      // Show previous and current page
      return [currentPage - 1, currentPage];
    }
  };

  // Calculate optimal dimensions based on viewport and container
  const calculateDimensions = () => {
    if (!containerRef.current) return;

    // Get available space (accounting for padding and other elements)
    const headerHeight = isFullscreen ? 20 : 60;
    const thumbnailsHeight = isFullscreen ? 0 : 100;
    const containerPadding = isFullscreen ? 20 : 48;
    const extraMargin = isFullscreen ? 40 : 100;
    
    // Calculate available space
    const availableWidth = window.innerWidth - containerPadding;
    const availableHeight = window.innerHeight - headerHeight - thumbnailsHeight - containerPadding - extraMargin;
    
    // Set maximum dimensions
    const maxWidth = isFullscreen ? availableWidth : Math.min(availableWidth, 1200);
    const maxHeight = isFullscreen ? availableHeight : Math.min(availableHeight, 800);
    
    // Default comic aspect ratio (height/width) is around 1.5
    const singlePageAspectRatio = 1.5;
    
    // For spread view, the width is doubled while height stays the same
    // This creates a landscape-oriented container for two pages side by side
    const spreadViewWidthMultiplier = getCurrentPages().length > 1 ? 2 : 1;
    const aspectRatio = singlePageAspectRatio / spreadViewWidthMultiplier;
    
    // Calculate width and height based on available space and aspect ratio
    let width, height;
    
    if (maxHeight / maxWidth > aspectRatio) {
      // Width is the limiting factor
      width = maxWidth;
      height = width * aspectRatio;
    } else {
      // Height is the limiting factor
      height = maxHeight;
      width = height / aspectRatio;
    }
    
    setDimensions({ width, height });
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!readerRef.current) return;
    
    if (!isFullscreen) {
      // Enter fullscreen
      if (readerRef.current.requestFullscreen) {
        readerRef.current.requestFullscreen();
      } else if ((readerRef.current as any).webkitRequestFullscreen) {
        (readerRef.current as any).webkitRequestFullscreen();
      } else if ((readerRef.current as any).msRequestFullscreen) {
        (readerRef.current as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // Toggle between single page and spread view
  const toggleSpreadView = () => {
    // When switching to spread view from single page view,
    // ensure we land on proper spread boundaries
    if (!isSpreadView && currentPage > 0) {
      // If we're on an odd page when enabling spread view,
      // move back one page to align with spread boundaries
      if (currentPage % 2 === 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    setIsSpreadView(!isSpreadView);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement !== null ||
        (document as any).webkitFullscreenElement !== null ||
        (document as any).msFullscreenElement !== null
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Initial calculation
    calculateDimensions();
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateDimensions);
    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, [isFullscreen, isSpreadView, currentPage]); // Recalculate when relevant states change

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      if (isSpreadView && currentPage > 0) {
        // In spread view, advance by 2 pages (except when on cover page)
        const nextPage = Math.min(currentPage + 2, totalPages - 1);
        setCurrentPage(nextPage);
      } else {
        // In single page view or when on cover, advance by 1
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      if (isSpreadView && currentPage > 2) {
        // In spread view, go back by 2 pages
        // But stop at page 1 (to keep page 0 as standalone cover)
        setCurrentPage(Math.max(1, currentPage - 2));
      } else {
        // In single page view or when near cover, go back by 1
        setCurrentPage(currentPage - 1);
      }
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      } else if (e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 's') {
        toggleSpreadView();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, isFullscreen, isSpreadView, totalPages]);

  // Get pages to display
  const pagesToShow = getCurrentPages();

  return (
    <div className="comic-reader" ref={containerRef}>
      <div 
        ref={readerRef} 
        className={`${isFullscreen ? 'bg-black py-4' : ''}`}
      >
        {/* Comic Reader Header */}
        <div className={`flex justify-between items-center mb-4 p-4 bg-darker ${isFullscreen ? 'mx-4 rounded-lg' : ''} relative z-20`}>
          <h2 className="font-display text-2xl text-primary">BLOODLETTER: INTRO</h2>
          <div className="flex items-center gap-4">
            <div className="font-title text-white">
              {isSpreadView && pagesToShow.length > 1 
                ? `Pages ${pagesToShow[0] + 1}-${pagesToShow[1] + 1} of ${totalPages}` 
                : `Page ${currentPage + 1} of ${totalPages}`
              }
            </div>
            
            {/* Spread View Toggle Button */}
            <button
              onClick={toggleSpreadView}
              className="p-2 rounded-full bg-darker/80 text-white hover:bg-primary/80 border border-primary"
              aria-label={isSpreadView ? "Single page view" : "Two-page spread view"}
              title={isSpreadView ? "Switch to single page view" : "Switch to two-page spread view"}
            >
              {isSpreadView ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
              )}
            </button>
            
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-darker/80 text-white hover:bg-primary/80 border border-primary"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Comic Viewer */}
        <div className="relative mx-auto rounded overflow-hidden">
          {/* Comic Page Image Container */}
          <div 
            className="relative bg-black mx-auto flex justify-center"
            style={{ 
              width: `${dimensions.width}px`, 
              height: `${dimensions.height}px`,
              maxWidth: '100%'
            }}
          >
            {/* Render pages based on current view mode */}
            {pagesToShow.map((pageIndex, i) => (
              <div 
                key={`page-${pageIndex}`}
                className="relative h-full"
                style={{
                  width: pagesToShow.length > 1 ? '50%' : '100%'
                }}
              >
                <Image
                  src={COMIC_PAGES[pageIndex].src}
                  alt={COMIC_PAGES[pageIndex].alt}
                  fill
                  className="object-contain"
                  priority={i === 0}
                  sizes={pagesToShow.length > 1 ? "50vw" : "100vw"}
                />
              </div>
            ))}
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
              {/* Previous Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`p-3 rounded-full bg-darker/80 text-white ${
                  currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
                }`}
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1 || (isSpreadView && pagesToShow.length > 1 && pagesToShow[pagesToShow.length - 1] === totalPages - 1)}
                className={`p-3 rounded-full bg-darker/80 text-white ${
                  (currentPage === totalPages - 1 || (isSpreadView && pagesToShow.length > 1 && pagesToShow[pagesToShow.length - 1] === totalPages - 1)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
                }`}
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Click areas for navigation */}
        <div className="hidden sm:block">
          <div 
            className="fixed top-[100px] left-0 w-1/3 h-[calc(100vh-200px)] cursor-w-resize z-10" 
            onClick={goToPrevPage}
            style={{ opacity: 0 }}
          />
          <div 
            className="fixed top-[100px] right-0 w-1/3 h-[calc(100vh-200px)] cursor-e-resize z-10" 
            onClick={goToNextPage}
            style={{ opacity: 0 }}
          />
        </div>

        {/* Page Navigation Thumbnails - Hidden in fullscreen mode */}
        {!isFullscreen && (
          <div className="mt-6 overflow-x-auto py-4">
            <div className="flex space-x-4 justify-center">
              {COMIC_PAGES.map((page, index) => {
                // In spread view, highlight both pages of the current spread
                const isActive = isSpreadView 
                  ? pagesToShow.includes(index)
                  : index === currentPage;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`relative h-16 w-12 border-2 transition-all ${
                      isActive ? 'border-primary scale-110' : 'border-gray-700 opacity-70'
                    }`}
                  >
                    <Image
                      src={page.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                      {index + 1}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicReader; 