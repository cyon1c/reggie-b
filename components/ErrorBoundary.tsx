'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Send error to an error logging service or custom handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log client info 
    this.logClientInfo(error, errorInfo);
  }
  
  logClientInfo(error: Error, errorInfo: ErrorInfo): void {
    try {
      const clientInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        language: navigator.language,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        memoryInfo: (performance as any).memory ? {
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        } : 'Not available',
        errorMessage: error.message,
        errorStack: error.stack,
        componentStack: errorInfo.componentStack,
        time: new Date().toISOString(),
      };
      
      console.error('Client Info:', clientInfo);
      
      // Optionally send this to a logging endpoint
      // We could send this to Vercel's Edge Config or a custom API route
      if (typeof window !== 'undefined') {
        // Store in localStorage to retrieve later
        const logs = JSON.parse(localStorage.getItem('error_logs') || '[]');
        logs.push(clientInfo);
        localStorage.setItem('error_logs', JSON.stringify(logs));
        
        // You can also send to a server endpoint
        // fetch('/api/log-error', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(clientInfo)
        // }).catch(e => console.error('Failed to send error log:', e));
      }
    } catch (logError) {
      console.error('Failed to log client info:', logError);
    }
  }

  render() {
    if (this.state.hasError) {
      // Return fallback UI
      return this.props.fallback || (
        <div className="error-boundary p-4 bg-darker text-primary rounded-lg shadow-lg m-4">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">There was a problem displaying this content.</p>
          <p className="text-sm mb-4">{this.state.error?.message}</p>
          <button 
            className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 