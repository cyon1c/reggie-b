'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ErrorBoundary from '@/components/ErrorBoundary';

// Log startup information
console.log('[ComicReader] Component initializing', {
  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
  timestamp: new Date().toISOString()
});

// Global error handler for image loading issues
// This will help debug iOS Chrome specific issues
if (typeof window !== 'undefined') {
  console.log('[ComicReader] Setting up global error handlers');
  
  // Enhanced error logging
  const originalConsoleError = console.error;
  console.error = function(...args) {
    console.log('[ComicReader] Console error intercepted:', ...args);
    
    // Store in localStorage for later retrieval
    try {
      const logs = JSON.parse(localStorage.getItem('console_error_logs') || '[]');
      const errorLog = {
        error: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, Object.getOwnPropertyNames(arg)) : String(arg)
        ),
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      };
      
      logs.push(errorLog);
      // Keep only last 20 errors to avoid storage issues
      if (logs.length > 20) logs.shift();
      localStorage.setItem('console_error_logs', JSON.stringify(logs));
      
      // Send to our API endpoint
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'console_error',
          data: errorLog,
          page: window.location.pathname,
          screen: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        }),
        // Use keepalive to ensure the request completes even if page is unloading
        keepalive: true
      }).catch(e => {
        console.log('[ComicReader] Failed to send error to API:', e);
      }); // Silent catch - don't cause more errors if this fails
    } catch (e) {
      console.log('[ComicReader] Error in error handling:', e);
      // If we can't log, at least try to continue
    }
    
    // Call the original console.error
    originalConsoleError.apply(console, args);
  };

  // General unhandled error capture
  window.addEventListener('error', function(e) {
    console.log('[ComicReader] Global error event captured:', {
      message: e.message,
      filename: e.filename,
      lineNumber: e.lineno,
      columnNumber: e.colno
    });
    
    if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
      console.log('[ComicReader] Image loading error:', {
        src: (e.target as HTMLImageElement).src,
        alt: (e.target as HTMLImageElement).alt,
        width: (e.target as HTMLImageElement).width,
        height: (e.target as HTMLImageElement).height
      });
      // Prevent the error from crashing the app
      e.preventDefault();
    } else {
      // Capture other JS errors
      console.error('Unhandled error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error ? (e.error.stack || e.error.toString()) : 'No error object',
        type: 'unhandled'
      });
    }
  }, true);
  
  // Promise rejection handler
  window.addEventListener('unhandledrejection', function(e) {
    console.log('[ComicReader] Unhandled promise rejection:', e.reason);
    console.error('Unhandled promise rejection:', {
      reason: e.reason ? (e.reason.stack || e.reason.toString()) : 'No reason provided',
      type: 'promise'
    });
    // Don't prevent default to allow normal handling
  });
}

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
  console.log('[ComicReader] Rendering ComicReader component');

  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpreadView, setIsSpreadView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [showLegend, setShowLegend] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const totalPageFiles = COMIC_PAGES.length;
  // The actual page count is 44 (43 files + 1 extra from the double-page spread)
  const actualPageCount = 44;

  // Add error state to track rendering issues
  const [renderError, setRenderError] = useState<string | null>(null);

  // Get current displayed pages based on view mode
  const getCurrentPages = () => {
    // Special case for combined pages (11-12 spread)
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
    // We want pairs like (1,2), (3,4), (5,6), etc.
    // So odd-numbered indices should be the first in each pair
    
    // Ensure we're on an odd-indexed page for the start of a pair
    const basePageIndex = currentPage % 2 === 1 ? currentPage : currentPage - 1;
    
    // Make sure we don't go beyond the total pages
    return basePageIndex + 1 < totalPageFiles 
      ? [basePageIndex, basePageIndex + 1] 
      : [basePageIndex];
  };

  // Helper function to get display page number
  const getDisplayPageNumber = (index: number) => {
    // The cover is page 0
    if (index === 0) return "Cover";
    
    // Page 11 is actually a combined spread of pages 11-12
    if (index === 11) return "11-12";
    
    // Pages after the combined spread need to be offset by 1
    // since the index 11 contains both pages 11 and 12
    if (index > 11) return (index + 1).toString();
    
    // For pages before the spread, just add 1 to convert from 0-indexed to 1-indexed
    return (index + 1).toString();
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
    console.log(`[ComicReader] Page ${pageIndex} loaded`);
    setLoadedPages(prev => new Set(prev).add(pageIndex));
    setLoadingPages(prev => {
      const next = new Set(prev);
      next.delete(pageIndex);
      return next;
    });
  };

  // Handle page load start
  const handlePageLoadStart = (pageIndex: number) => {
    console.log(`[ComicReader] Page ${pageIndex} load started`);
    setLoadingPages(prev => new Set(prev).add(pageIndex));
  };

  // Calculate optimal dimensions based on viewport and container
  const calculateDimensions = () => {
    try {
      console.log('[ComicReader] Starting dimension calculation');
      
      if (!containerRef.current) {
        console.log('[ComicReader] Container ref not available yet');
        return;
      }

      // Get available space (accounting for padding and other elements)
      const headerHeight = isFullscreen ? 20 : 60;
      const thumbnailsHeight = isFullscreen ? 0 : 100;
      const containerPadding = isFullscreen ? 20 : 48;
      const extraMargin = isFullscreen ? 40 : 100;
      
      // Get safer window dimensions
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      
      // Calculate available space
      const availableWidth = windowWidth - containerPadding;
      const availableHeight = windowHeight - headerHeight - thumbnailsHeight - containerPadding - extraMargin;
      
      console.log('[ComicReader] Available space:', { availableWidth, availableHeight });
      
      // Set maximum dimensions - add iOS Chrome specific limits
      const isIOSChrome = typeof navigator !== 'undefined' && 
        navigator.userAgent.includes('CriOS') && 
        /iPhone|iPad|iPod/.test(navigator.userAgent);
      
      // Apply stricter limits for iOS Chrome to avoid memory issues
      const maxWidth = isFullscreen 
        ? (isIOSChrome ? Math.min(availableWidth, 1000) : availableWidth) 
        : Math.min(availableWidth, isIOSChrome ? 900 : 1200);
      
      const maxHeight = isFullscreen 
        ? (isIOSChrome ? Math.min(availableHeight, 800) : availableHeight) 
        : Math.min(availableHeight, isIOSChrome ? 600 : 800);
      
      console.log('[ComicReader] Max dimensions:', { maxWidth, maxHeight, isIOSChrome });
      
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
      
      console.log('[ComicReader] Aspect ratio calculation:', { 
        aspectRatio, 
        spreadViewWidthMultiplier, 
        pages 
      });
      
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
      
      // For iOS Chrome, ensure dimensions are not too large to avoid memory issues
      if (isIOSChrome) {
        const maxIOSChromeWidth = 1200;
        const maxIOSChromeHeight = 1600;
        
        if (width > maxIOSChromeWidth) {
          const scale = maxIOSChromeWidth / width;
          width = maxIOSChromeWidth;
          height *= scale;
        }
        
        if (height > maxIOSChromeHeight) {
          const scale = maxIOSChromeHeight / height;
          height = maxIOSChromeHeight;
          width *= scale;
        }
      }
      
      console.log('[ComicReader] Final dimensions:', { width, height });
      
      // Debounce the state update to avoid rapid re-renders
      const newDimensions = { width, height };
      // Only update if there's a significant change to avoid render loops
      if (Math.abs(dimensions.width - width) > 5 || Math.abs(dimensions.height - height) > 5) {
        setDimensions(newDimensions);
      }
    } catch (error) {
      console.error('[ComicReader] Error calculating dimensions:', error);
      // Set safe fallback dimensions to avoid complete failure
      setDimensions({ width: 800, height: 1120 });
    }
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
    if (!isSpreadView) {
      // When enabling spread view, adjust to land on proper page pairs
      // Cover (page 0) is always shown alone
      if (currentPage === 0) {
        // Stay on page 0 (cover)
      } 
      // Special handling for pages around the combined spread (11-12)
      else if (currentPage >= 11 && currentPage < 13) {
        setCurrentPage(11); // Show the combined spread
      }
      else if (currentPage === 13) {
        setCurrentPage(13); // Keeps 14-15 paired correctly
      }
      // For all other pages, ensure we start on even-indexed pages
      // for proper pairing: (1,2), (3,4), (5,6), etc.
      else if (currentPage % 2 === 0) {
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
    console.log('[ComicReader] Going to next page from:', currentPage);
    if (currentPage < totalPageFiles - 1) {
      if (isSpreadView) {
        // Special handling for the combined page and surrounding pages
        if (currentPage === 9) { // On pages 10-11 (indices 9-10)
          setCurrentPage(11); // Go to the combined page (11-12)
        } else if (currentPage === 11) { // On the combined page (11-12)
          setCurrentPage(13); // Go to pages 14-15 (indices 13-14)
        } else {
          // In spread view, advance by 2 pages
          // Ensure we're always on an odd-numbered page
          // so spreads show pages like (1,2), (3,4), (5,6), etc.
          const nextPage = currentPage % 2 === 1 ? currentPage + 2 : currentPage + 1;
          setCurrentPage(Math.min(nextPage, totalPageFiles - 1));
        }
      } else {
        // In single page view, advance by 1
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const goToPrevPage = () => {
    console.log('[ComicReader] Going to previous page from:', currentPage);
    if (currentPage > 0) {
      if (isSpreadView) {
        // Special handling for the combined page and surrounding pages
        if (currentPage === 13) { // Coming back from pages 14-15 (indices 13-14)
          setCurrentPage(11); // Go back to the combined page (11-12)
        } else if (currentPage === 11) { // On the combined page (11-12)
          setCurrentPage(9); // Go back to pages 10-11 (indices 9-10)
        } else {
          // In spread view, go back by 2 pages normally
          // Ensure we land on odd-numbered pages for proper pairing
          const prevPage = currentPage % 2 === 0 ? currentPage - 1 : currentPage - 2;
          setCurrentPage(Math.max(prevPage, 0));
        }
      } else {
        // In single page view, go back by 1
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

  // Toggle legend visibility
  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  // Handle closing the legend when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLegend && 
          legendRef.current && 
          !legendRef.current.contains(event.target as Node) && 
          // Ignore clicks on the help button itself
          !(event.target as Element)?.closest('[aria-label="Help / Controls Legend"]')) {
        setShowLegend(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLegend]);

  // Function to safely render Image components with iOS Chrome optimizations
  const safeRenderImage = (pageIndex: number, i: number, isDoublePage: boolean, isVisible: boolean, isLoaded: boolean) => {
    console.log(`[ComicReader] Rendering image for page ${pageIndex}`, {
      isDoublePage,
      isVisible,
      isLoaded
    });
    
    try {
      // Only render if the image should be visible
      if (!isVisible) return null;
      
      // Check if we're on iOS Chrome for additional optimizations
      const isIOSChrome = typeof navigator !== 'undefined' && 
        navigator.userAgent.includes('CriOS') && 
        /iPhone|iPad|iPod/.test(navigator.userAgent);
      
      // Use lower quality for iOS Chrome to reduce memory usage
      const imageQuality = isIOSChrome ? 60 : 80;
      
      // Extra optimization for iOS Chrome - use smaller image sizes
      const sizeAttribute = pagesToShow.length > 1 || isDoublePage 
        ? (isDoublePage ? "100vw" : "50vw") 
        : "100vw";
      
      return (
        <Image
          src={COMIC_PAGES[pageIndex].src}
          alt={COMIC_PAGES[pageIndex].alt}
          fill
          className={`object-contain ${isDoublePage ? 'object-fit-contain' : ''} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority={i === 0} // Only prioritize the first visible page
          sizes={sizeAttribute}
          quality={imageQuality}
          onLoad={() => {
            console.log(`[ComicReader] Image loaded for page ${pageIndex}`);
            handlePageLoad(pageIndex);
          }}
          onLoadStart={() => {
            console.log(`[ComicReader] Image load started for page ${pageIndex}`);
            handlePageLoadStart(pageIndex);
          }}
          loading={i === 0 ? "eager" : "lazy"}
          unoptimized={!isIOSChrome} // Use Next.js optimization on iOS Chrome
          onError={(e) => {
            console.log(`[ComicReader] Image loading error for page ${pageIndex}:`, e);
            console.error(`Error loading image for page ${pageIndex}:`, e);
            setRenderError(`Failed to load page ${pageIndex}`);
          }}
        />
      );
    } catch (error) {
      console.log(`[ComicReader] Error in safeRenderImage for page ${pageIndex}:`, error);
      console.error(`Error rendering image for page ${pageIndex}:`, error);
      setRenderError(`Failed to render page ${pageIndex}`);
      return <div className="w-full h-full flex items-center justify-center bg-black text-primary">Error loading image</div>;
    }
  };

  // Add useEffect for component lifecycle logging
  useEffect(() => {
    console.log('[ComicReader] Component mounted');
    
    return () => {
      console.log('[ComicReader] Component unmounting');
    };
  }, []);

  // Log state updates
  useEffect(() => {
    console.log('[ComicReader] Current page updated:', currentPage);
  }, [currentPage]);

  useEffect(() => {
    console.log('[ComicReader] Spread view updated:', isSpreadView);
  }, [isSpreadView]);

  useEffect(() => {
    console.log('[ComicReader] Fullscreen updated:', isFullscreen);
  }, [isFullscreen]);

  useEffect(() => {
    console.log('[ComicReader] Dimensions updated:', dimensions);
  }, [dimensions]);

  // Log page calculations
  useEffect(() => {
    const pages = getCurrentPages();
    console.log('[ComicReader] Current pages to display:', pages);
  }, [currentPage, isSpreadView]);

  // Log loading states
  useEffect(() => {
    console.log('[ComicReader] Loading pages:', Array.from(loadingPages));
  }, [loadingPages]);

  useEffect(() => {
    console.log('[ComicReader] Loaded pages:', Array.from(loadedPages));
  }, [loadedPages]);

  return (
    <>
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
                  ? `Pages 11-12 of ${totalPageFiles}`
                  : `Page ${getDisplayPageNumber(currentPage)} of ${totalPageFiles}`
              }
            </div>
            
            {/* Legend/Help Button */}
            <button
              onClick={toggleLegend}
              className="p-2 rounded-full bg-darker/80 text-white hover:bg-primary/80 border border-primary"
              aria-label="Help / Controls Legend"
              title="Help / Controls Legend"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
              </svg>
            </button>
            
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

        {/* Legend Popup */}
        {showLegend && (
          <div 
            ref={legendRef}
            className="absolute top-20 right-4 w-80 bg-darker p-4 rounded-lg shadow-lg border border-primary z-30 text-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display text-primary text-lg">Controls Legend</h3>
              <button 
                onClick={toggleLegend}
                className="text-white hover:text-primary"
                aria-label="Close legend"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
            </div>
            
            <div className="text-sm space-y-3">
              <div className="grid grid-cols-8 gap-2 items-center">
                <div className="col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                  </svg>
                </div>
                <div className="col-span-7">Toggle between single and two-page view</div>
                
                <div className="col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                </div>
                <div className="col-span-7">Toggle fullscreen mode</div>
                
                <div className="col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                  </svg>
                </div>
                <div className="col-span-7">Previous page</div>
                
                <div className="col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                  </svg>
                </div>
                <div className="col-span-7">Next page</div>
              </div>
              
              <div className="border-t border-gray-700 pt-2">
                <p className="font-semibold mb-1">Keyboard Shortcuts:</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1 font-mono bg-gray-800 text-center rounded px-1">←</div>
                  <div className="col-span-3">Previous page</div>
                  
                  <div className="col-span-1 font-mono bg-gray-800 text-center rounded px-1">→</div>
                  <div className="col-span-3">Next page</div>
                  
                  <div className="col-span-1 font-mono bg-gray-800 text-center rounded px-1">F</div>
                  <div className="col-span-3">Toggle fullscreen</div>
                  
                  <div className="col-span-1 font-mono bg-gray-800 text-center rounded px-1">S</div>
                  <div className="col-span-3">Toggle spread view</div>
                  
                  <div className="col-span-1 font-mono bg-gray-800 text-center rounded px-1">Esc</div>
                  <div className="col-span-3">Exit fullscreen</div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-2 text-xs text-gray-400">
                Click anywhere on the left/right side of the comic to navigate between pages.
              </div>
            </div>
          </div>
        )}

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
                {safeRenderImage(pageIndex, i, isDoublePage, isVisible, isLoaded)}
              </div>
              );
            })}
            
            {/* Display any render errors */}
            {renderError && (
              <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/90 text-primary">
                <div className="p-4 bg-darker rounded-lg">
                  <p className="mb-2">Error: {renderError}</p>
                  <button 
                    onClick={() => setRenderError(null)} 
                    className="px-3 py-1 bg-primary text-black rounded hover:bg-primary/80"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
            
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
    </>
  );
};

// Wrap the exported component with ErrorBoundary
const ComicReaderWithErrorBoundary = () => {
  console.log('[ComicReader] Rendering ComicReaderWithErrorBoundary');
  
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    console.log('[ComicReader] ErrorBoundary caught error:', error.message);
    console.error('ComicReader error:', error, errorInfo);
    
    // Additional iOS Chrome specific logging
    const extraData = {};
    
    if (typeof navigator !== 'undefined' && 
        navigator.userAgent.includes('CriOS') && 
        /iPhone|iPad|iPod/.test(navigator.userAgent)) {
      console.log('[ComicReader] iOS Chrome detected, collecting additional info');
      Object.assign(extraData, {
        isiOSChrome: true,
        memory: (performance as any).memory ? {
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        } : 'Not available',
        windowSize: `${window.innerWidth}x${window.innerHeight}`,
        devicePixelRatio: window.devicePixelRatio,
      });
    }
    
    // Send detailed error to server
    console.log('[ComicReader] Sending error to server API');
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'error_boundary',
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        },
        componentStack: errorInfo.componentStack,
        userAgent: navigator.userAgent,
        extraData,
        page: window.location.pathname,
        time: new Date().toISOString()
      }),
      keepalive: true
    }).catch(e => {
      console.log('[ComicReader] Failed to send error boundary data to API:', e);
    }); // Silent catch
  };

  return (
    <ErrorBoundary 
      onError={handleError}
      fallback={
        <div className="p-5 bg-darker text-white m-4 rounded-lg shadow-lg">
          <h2 className="text-2xl text-primary mb-4">Comic Reader Error</h2>
          <p className="mb-3">We encountered a problem loading the comic reader.</p>
          <p className="mb-3">This issue has been logged for our team to investigate.</p>
          <p className="text-sm mb-4">If you're using iOS Chrome, please try Safari which has better compatibility.</p>
          <a href="/" className="px-4 py-2 bg-primary text-black rounded inline-block">Return to Homepage</a>
        </div>
      }
    >
      <ComicReader />
    </ErrorBoundary>
  );
};

export default ComicReaderWithErrorBoundary; 