'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the comic pages - now using Vercel storage URLs
const VERCEL_STORAGE_URL = 'https://xacnaqrj5ebpenry.public.blob.vercel-storage.com';

const COMIC_PAGES = [
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page1.webp`, alt: 'Page 1' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page2.webp`, alt: 'Page 2' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page3.webp`, alt: 'Page 3' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page4.webp`, alt: 'Page 4' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page5.webp`, alt: 'Page 5' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page6.webp`, alt: 'Page 6' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page7.webp`, alt: 'Page 7' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page8.webp`, alt: 'Page 8' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page9.webp`, alt: 'Page 9' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page10.webp`, alt: 'Page 10' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page11-12.webp`, alt: 'Pages 11-12' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page13.webp`, alt: 'Page 13' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page14.webp`, alt: 'Page 14' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page15.webp`, alt: 'Page 15' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page16.webp`, alt: 'Page 16' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page17.webp`, alt: 'Page 17' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page18.webp`, alt: 'Page 18' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page19.webp`, alt: 'Page 19' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page20.webp`, alt: 'Page 20' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page21.webp`, alt: 'Page 21' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page22.webp`, alt: 'Page 22' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page23.webp`, alt: 'Page 23' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page24.webp`, alt: 'Page 24' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page25.webp`, alt: 'Page 25' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page26.webp`, alt: 'Page 26' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page27.webp`, alt: 'Page 27' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page28.webp`, alt: 'Page 28' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page29.webp`, alt: 'Page 29' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page30.webp`, alt: 'Page 30' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page31.webp`, alt: 'Page 31' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page32.webp`, alt: 'Page 32' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page33.webp`, alt: 'Page 33' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page34.webp`, alt: 'Page 34' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page35.webp`, alt: 'Page 35' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page36.webp`, alt: 'Page 36' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page37.webp`, alt: 'Page 37' },
];

const ComicReader = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpreadView, setIsSpreadView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const totalPages = COMIC_PAGES.length;
  // The actual page count is one more than the array length because Page11-12.webp counts as two pages
  const actualPageCount = totalPages + 1;

  // Get current displayed pages based on view mode
  const getCurrentPages = () => {
    // Special case for combined pages
    if (currentPage === 10) { // Index 10 is the combined Page11-12.webp
      return [10]; // Return just this page as it's already a spread
    }
    
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
      // Skip creating a spread with the combined page (index 10)
      if (currentPage + 1 === 10) {
        return [currentPage];
      }
      return currentPage + 1 < totalPages 
        ? [currentPage, currentPage + 1] 
        : [currentPage];
    } else {
      // Show previous and current page
      // Skip creating a spread with the combined page (index 10)
      if (currentPage - 1 === 10) {
        return [currentPage];
      }
      return [currentPage - 1, currentPage];
    }
  };

  // Preload adjacent pages for smoother navigation
  useEffect(() => {
    const pagesToShow = getCurrentPages();
    const pagesToPreload = new Set([...pagesToShow]);
    
    // Add previous and next pages to preload list
    if (currentPage > 0) {
      pagesToPreload.add(currentPage - 1);
    }
    if (currentPage < totalPages - 1) {
      pagesToPreload.add(currentPage + 1);
    }
    
    // For spread view, add more adjacent pages
    if (isSpreadView) {
      if (currentPage > 1) {
        pagesToPreload.add(currentPage - 2);
      }
      if (currentPage < totalPages - 2) {
        pagesToPreload.add(currentPage + 2);
      }
    }
    
    setVisiblePages(Array.from(pagesToPreload));
  }, [currentPage, isSpreadView, totalPages]);

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
    
    // Default comic aspect ratio (height/width) for these high-res pages is closer to 1.4
    // Measured from the actual PNG dimensions which are typically ~2560x3600px
    const singlePageAspectRatio = 1.4;
    
    // Get the current pages to display
    const pages = getCurrentPages();
    
    // Special handling for the double-page spread (Page11-12.webp at index 10)
    // Double-page spreads have an aspect ratio that's half of a single page
    // A single page is taller than wide (1.4:1), a double spread is wider than tall (0.7:1)
    let spreadViewWidthMultiplier;
    let aspectRatio;
    
    if (pages.length === 1 && pages[0] === 10) {
      // For the double-page spread, we use a specific aspect ratio
      // Double-page has approximately half the height:width ratio of a single page
      aspectRatio = singlePageAspectRatio / 2;
      // We'll use the height as the limiting factor for the double-page spread
      // Set a wider multiplier for the container
      spreadViewWidthMultiplier = 2;
    } else {
      // For normal pages in spread view, width is doubled while height stays the same
      spreadViewWidthMultiplier = pages.length > 1 ? 2 : 1;
      aspectRatio = singlePageAspectRatio / spreadViewWidthMultiplier;
    }
    
    // Calculate width and height based on available space and aspect ratio
    let width, height;
    
    // For the double-page spread (page 11-12), prioritize maintaining the height
    if (pages.length === 1 && pages[0] === 10) {
      // Use max height as the limiting factor for double-page spread
      height = maxHeight;
      width = height / aspectRatio;
      
      // If width exceeds maximum, adjust both
      if (width > maxWidth) {
        const scaleFactor = maxWidth / width;
        width = maxWidth;
        height = height * scaleFactor;
      }
    } else {
      // Normal calculation for regular pages
      if (maxHeight / maxWidth > aspectRatio) {
        // Width is the limiting factor
        width = maxWidth;
        height = width * aspectRatio;
      } else {
        // Height is the limiting factor
        height = maxHeight;
        width = height / aspectRatio;
      }
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
        // Special handling for the combined page
        if (currentPage === 9) { // Before the combined page
          setCurrentPage(10); // Go directly to the combined page
        } else if (currentPage === 10) { // After the combined page
          setCurrentPage(12); // Skip to page 13 (index 12) after the combined spread
        } else {
          // Normal case: advance by 2 pages
          const nextPage = Math.min(currentPage + 2, totalPages - 1);
          setCurrentPage(nextPage);
        }
      } else {
        // In single page view or when on cover, advance by 1
        // Special handling for the combined page - skip page 11 (it's part of 11-12)
        if (currentPage === 10) { // After the combined page
          setCurrentPage(12); // Go to page 13 (index 12)
        } else {
          setCurrentPage(currentPage + 1);
        }
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      if (isSpreadView && currentPage > 2) {
        // Special handling for the combined page
        if (currentPage === 12) { // After the combined page
          setCurrentPage(10); // Go back to the combined page
        } else if (currentPage === 10) { // On the combined page
          setCurrentPage(8); // Go back to page 9 (index 8)
        } else {
          // In spread view, go back by 2 pages
          // But stop at page 1 (to keep page 0 as standalone cover)
          setCurrentPage(Math.max(1, currentPage - 2));
        }
      } else {
        // Special handling for the combined page
        if (currentPage === 12) { // After the combined page
          setCurrentPage(10); // Go back to the combined page
        } else {
          // In single page view or when near cover, go back by 1
          setCurrentPage(currentPage - 1);
        }
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
          <h2 className="font-display text-2xl text-primary">BLOODLETTER: ISSUE ONE</h2>
          <div className="flex items-center gap-4">
            <div className="font-title text-white">
              {isSpreadView && pagesToShow.length > 1 
                ? `Pages ${pagesToShow[0] + 1}-${pagesToShow[1] + 1} of ${actualPageCount}` 
                : currentPage === 10
                  ? `Pages 11-12 of ${actualPageCount}`
                  : `Page ${currentPage + 1} of ${actualPageCount}`
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
            {/* Loading indicator */}
            <div className={`absolute inset-0 flex items-center justify-center z-20 bg-black/70 transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="text-primary animate-pulse text-xl">Loading...</div>
            </div>
            
            {/* Render pages based on current view mode */}
            {pagesToShow.map((pageIndex, i) => {
              // Check if this is the double-page spread
              const isDoublePage = pageIndex === 10;
              
              return (
                <div 
                  key={`page-${pageIndex}`}
                  className="relative h-full"
                  style={{
                    width: pagesToShow.length > 1 || isDoublePage ? 
                           (isDoublePage ? '100%' : '50%') : '100%'
                  }}
                >
                  <Image
                    src={COMIC_PAGES[pageIndex].src}
                    alt={COMIC_PAGES[pageIndex].alt}
                    fill
                    className={`object-contain ${isDoublePage ? 'object-fit-contain' : ''}`}
                    priority={i === 0}
                    sizes={pagesToShow.length > 1 || isDoublePage ? (isDoublePage ? "100vw" : "50vw") : "100vw"}
                    quality={80} // Balance between quality and performance
                    onLoad={() => setIsLoading(false)}
                    unoptimized // Use this for external images from Vercel storage
                  />
                </div>
              );
            })}
            
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
            <div className="flex space-x-2 justify-center">
              {COMIC_PAGES.map((page, index) => {
                // In spread view, highlight both pages of the current spread
                const isActive = isSpreadView 
                  ? pagesToShow.includes(index)
                  : index === currentPage;
                
                // Only render thumbnails for visible pages and a few adjacent ones
                // This improves performance by not loading all 37 thumbnails at once
                const shouldRender = visiblePages.includes(index) || 
                                     Math.abs(index - currentPage) < 3 || 
                                     index === 0 || 
                                     index === totalPages - 1;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`relative h-16 w-12 border-2 transition-all ${
                      isActive ? 'border-primary scale-110' : 'border-gray-700 opacity-70'
                    }`}
                  >
                    {shouldRender ? (
                      <Image
                        src={page.src}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                        quality={10} // Low quality is fine for thumbnails
                        unoptimized // Use this for external images from Vercel storage
                      />
                    ) : (
                      <div className="absolute inset-0 bg-darker flex items-center justify-center"></div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                      {index === 10 ? '11-12' : index + 1}
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