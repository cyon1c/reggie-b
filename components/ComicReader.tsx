'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define the comic pages - now using Vercel storage URLs
//DO NOT CHANGE. THIS IS THE CORRECT BASE URL.
const VERCEL_STORAGE_URL = 'https://xacnaqrj5ebpenry.public.blob.vercel-storage.com';

const COMIC_PAGES = [
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page0 Final.webp`, alt: 'Page 0' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page1 Final.webp`, alt: 'Page 1' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page2 Final.webp`, alt: 'Page 2' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page3 Final.webp`, alt: 'Page 3' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page4 Final.webp`, alt: 'Page 4' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page5 Final.webp`, alt: 'Page 5' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page6 Final.webp`, alt: 'Page 6' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page7 Final.webp`, alt: 'Page 7' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page8 Final.webp`, alt: 'Page 8' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page9 Final.webp`, alt: 'Page 9' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page10 Final.webp`, alt: 'Page 10' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page11x12 Final.webp`, alt: 'Pages 11-12' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page13 Final.webp`, alt: 'Page 13' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page14 Final.webp`, alt: 'Page 14' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page15 Final.webp`, alt: 'Page 15' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page16 Final.webp`, alt: 'Page 16' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page17 Final.webp`, alt: 'Page 17' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page18 Final.webp`, alt: 'Page 18' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page19 Final.webp`, alt: 'Page 19' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page20 Final.webp`, alt: 'Page 20' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page21 Final.webp`, alt: 'Page 21' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page22 Final.webp`, alt: 'Page 22' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page23 Final.webp`, alt: 'Page 23' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page24 Final.webp`, alt: 'Page 24' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page25 Final.webp`, alt: 'Page 25' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page26 Final.webp`, alt: 'Page 26' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page27 Final.webp`, alt: 'Page 27' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page28 Final.webp`, alt: 'Page 28' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page29 Final.webp`, alt: 'Page 29' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page30 Final.webp`, alt: 'Page 30' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page31 Final.webp`, alt: 'Page 31' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page32 Final.webp`, alt: 'Page 32' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page33 Final.webp`, alt: 'Page 33' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page34 Final.webp`, alt: 'Page 34' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page35 Final.webp`, alt: 'Page 35' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page36 Final.webp`, alt: 'Page 36' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page37 Final.webp`, alt: 'Page 37' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page38 Final.webp`, alt: 'Page 38' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page39 Final.webp`, alt: 'Page 39' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page40 Final.webp`, alt: 'Page 40' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page41 Final.webp`, alt: 'Page 41' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page42 Final.webp`, alt: 'Page 42' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page43 Final.webp`, alt: 'Page 43' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page44 Final.webp`, alt: 'Page 44' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page45 Final.webp`, alt: 'Page 45' },
  { src: `${VERCEL_STORAGE_URL}/issue-one/Page46 Final.webp`, alt: 'Page 46' }
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
  const totalPageFiles = COMIC_PAGES.length;
  // The actual page count is 44 (43 files + 1 extra from the double-page spread)
  const actualPageCount = 44;

  // Get current displayed pages based on view mode
  const getCurrentPages = () => {
    // Special case for combined pages (12-13 spread)
    if (currentPage === 11) { // Index 11 is the combined Page11x12 Final.webp
      return [11]; // Return just this page as it's already a spread
    }
    
    // In single page view, just return the current page
    if (!isSpreadView) {
      return [currentPage];
    }
    
    // Cover page (page 0) is always shown alone
    if (currentPage === 0) {
      return [0];
    }
    
    // For spread view, show two pages side by side
    // We want to show pairs like 2-3, 4-5, 6-7, etc.
    // So we need to adjust the current page to align with these pairs
    
    // Calculate the base page for the spread (odd number)
    const basePage = currentPage % 2 === 1 ? currentPage : currentPage - 1;
    
    // Special handling for pages around the combined spread
    if (basePage === 10) { // Page 11
      return [10]; // Show alone before the spread
    }
    if (basePage === 12) { // Page 14
      return [12, 13]; // Start new spread after the combined spread
    }
    
    // Normal case: show the current page and next page
    return basePage + 1 < totalPageFiles 
      ? [basePage, basePage + 1] 
      : [basePage];
  };

  // Helper function to get display page number
  const getDisplayPageNumber = (index: number) => {
    if (index === 11) return '12-13'; // Special case for the double page spread
    if (index > 11) return (index + 2).toString(); // Skip page 13 by adding 2 to indices after the spread
    return (index + 1).toString(); // For pages before the spread, add 1 to the index
  };

  // Preload adjacent pages for smoother navigation
  useEffect(() => {
    const pagesToShow = getCurrentPages();
    const pagesToPreload = new Set([...pagesToShow]);
    
    // Add previous and next pages to preload list
    if (currentPage > 0) {
      pagesToPreload.add(currentPage - 1);
    }
    if (currentPage < totalPageFiles - 1) {
      pagesToPreload.add(currentPage + 1);
    }
    
    // For spread view, add more adjacent pages
    if (isSpreadView) {
      if (currentPage > 1) {
        pagesToPreload.add(currentPage - 2);
      }
      if (currentPage < totalPageFiles - 2) {
        pagesToPreload.add(currentPage + 2);
      }
    }
    
    setVisiblePages(Array.from(pagesToPreload));
  }, [currentPage, isSpreadView, totalPageFiles]);

  // Add loading state for each page
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [loadingPages, setLoadingPages] = useState<Set<number>>(new Set());

  // Handle page load
  const handlePageLoad = (pageIndex: number) => {
    setLoadedPages(prev => new Set(prev).add(pageIndex));
    setLoadingPages(prev => {
      const next = new Set(prev);
      next.delete(pageIndex);
      return next;
    });
  };

  // Handle page load start
  const handlePageLoadStart = (pageIndex: number) => {
    setLoadingPages(prev => new Set(prev).add(pageIndex));
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
    
    // Default comic aspect ratio (height/width) for these high-res pages is closer to 1.4
    // Measured from the actual PNG dimensions which are typically ~2560x3600px
    const singlePageAspectRatio = 1.4;
    
    // Get the current pages to display
    const pages = getCurrentPages();
    
    // Special handling for the double-page spread (Page11x12 Final.webp at index 11)
    // Double-page spreads have an aspect ratio that's half of a single page
    // A single page is taller than wide (1.4:1), a double spread is wider than tall (0.7:1)
    let spreadViewWidthMultiplier;
    let aspectRatio;
    
    if (pages.length === 1 && pages[0] === 11) {
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
    
    // For the double-page spread (page 11x12), prioritize maintaining the height
    if (pages.length === 1 && pages[0] === 11) {
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
    if (currentPage < totalPageFiles - 1) {
      if (isSpreadView && currentPage > 0) {
        // Special handling for the combined page
        if (currentPage === 10) { // Before the combined page
          setCurrentPage(11); // Go directly to the combined page
        } else if (currentPage === 11) { // After the combined page
          setCurrentPage(12); // Go to page 14 (index 12)
        } else {
          // In spread view, advance by 2 pages
          // If we're on an odd page, go to the next odd page
          // If we're on an even page, go to the next odd page
          const nextPage = currentPage % 2 === 0 ? currentPage + 1 : currentPage + 2;
          setCurrentPage(Math.min(nextPage, totalPageFiles - 1));
        }
      } else {
        // In single page view or when on cover, advance by 1
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      if (isSpreadView && currentPage > 2) {
        // Special handling for the combined page
        if (currentPage === 12) { // After the combined page
          setCurrentPage(11); // Go back to the combined page
        } else if (currentPage === 11) { // On the combined page
          setCurrentPage(10); // Go back to page 11 (index 10)
        } else {
          // In spread view, go back by 2 pages
          // If we're on an odd page, go to the previous odd page
          // If we're on an even page, go to the previous odd page
          const prevPage = currentPage % 2 === 0 ? currentPage - 1 : currentPage - 2;
          setCurrentPage(Math.max(1, prevPage));
        }
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
  }, [currentPage, isFullscreen, isSpreadView, totalPageFiles]);

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
                ? `Pages ${getDisplayPageNumber(pagesToShow[0])}-${getDisplayPageNumber(pagesToShow[1])} of ${totalPageFiles}` 
                : currentPage === 11
                  ? `Pages 12-13 of ${totalPageFiles}`
                  : `Page ${getDisplayPageNumber(currentPage)} of ${totalPageFiles}`
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
            <div className={`absolute inset-0 flex items-center justify-center z-20 bg-black/70 transition-opacity duration-300 ${loadingPages.size > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="text-primary animate-pulse text-xl">Loading...</div>
            </div>
            
            {/* Render pages based on current view mode */}
            {pagesToShow.map((pageIndex, i) => {
              const isDoublePage = pageIndex === 11;
              const isVisible = visiblePages.includes(pageIndex);
              const isLoaded = loadedPages.has(pageIndex);
              const isLoading = loadingPages.has(pageIndex);
              
              return (
                <div 
                  key={`page-${pageIndex}`}
                  className="relative h-full"
                  style={{
                    width: pagesToShow.length > 1 || isDoublePage ? 
                           (isDoublePage ? '100%' : '50%') : '100%'
                  }}
                >
                  {isVisible && (
                    <Image
                      src={COMIC_PAGES[pageIndex].src}
                      alt={COMIC_PAGES[pageIndex].alt}
                      fill
                      className={`object-contain ${isDoublePage ? 'object-fit-contain' : ''} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                      priority={i === 0} // Only prioritize the first visible page
                      sizes={pagesToShow.length > 1 || isDoublePage ? (isDoublePage ? "100vw" : "50vw") : "100vw"}
                      quality={80}
                      onLoad={() => handlePageLoad(pageIndex)}
                      onLoadStart={() => handlePageLoadStart(pageIndex)}
                      loading={i === 0 ? "eager" : "lazy"}
                      unoptimized
                    />
                  )}
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
                disabled={currentPage === totalPageFiles - 1 || (isSpreadView && pagesToShow.length > 1 && pagesToShow[pagesToShow.length - 1] === totalPageFiles - 1)}
                className={`p-3 rounded-full bg-darker/80 text-white ${
                  (currentPage === totalPageFiles - 1 || (isSpreadView && pagesToShow.length > 1 && pagesToShow[pagesToShow.length - 1] === totalPageFiles - 1)) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
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
            className="fixed top-[100px] left-0 w-1/4 h-[calc(100vh-300px)] cursor-w-resize z-10" 
            onClick={goToPrevPage}
            style={{ opacity: 0 }}
          />
          <div 
            className="fixed top-[100px] right-0 w-1/4 h-[calc(100vh-300px)] cursor-e-resize z-10" 
            onClick={goToNextPage}
            style={{ opacity: 0 }}
          />
        </div>

        {/* Page Navigation Thumbnails */}
        {!isFullscreen && (
          <div className="mt-6 overflow-x-auto py-4 relative z-20">
            <div className="flex space-x-2 justify-center">
              {(() => {
                // Calculate the range of pages to show
                let startPage = Math.max(0, currentPage - 2);
                let endPage = Math.min(totalPageFiles - 1, currentPage + 2);
                
                // Adjust if we're near the start
                if (currentPage < 2) {
                  startPage = 0;
                  endPage = Math.min(4, totalPageFiles - 1);
                }
                // Adjust if we're near the end
                else if (currentPage > totalPageFiles - 3) {
                  startPage = Math.max(0, totalPageFiles - 5);
                  endPage = totalPageFiles - 1;
                }
                
                // Generate the array of pages to show
                const pagesToShow: number[] = [];
                for (let i = startPage; i <= endPage; i++) {
                  pagesToShow.push(i);
                }
                
                return pagesToShow.map((index) => {
                  const isActive = isSpreadView 
                    ? pagesToShow.includes(index)
                    : index === currentPage;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`relative h-16 transition-all ${
                        isActive ? 'border-primary scale-110' : 'border-gray-700 opacity-70'
                      } ${index === 11 ? 'w-24 border-2' : 'w-12 border-2'}`}
                    >
                      <Image
                        src={COMIC_PAGES[index].src}
                        alt={`Thumbnail ${getDisplayPageNumber(index)}`}
                        fill
                        className={index === 11 ? "object-contain" : "object-cover"}
                        sizes={index === 11 ? "96px" : "48px"}
                        quality={10}
                        loading="lazy"
                        unoptimized
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                        {getDisplayPageNumber(index)}
                      </div>
                    </button>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicReader; 