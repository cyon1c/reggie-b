import { NextResponse } from 'next/server';

// This endpoint receives error logs from the client
export async function POST(request: Request) {
  try {
    const errorData = await request.json();
    
    // Add timestamp and source info
    const enhancedData = {
      ...errorData,
      timestamp: new Date().toISOString(),
      source: 'client-side'
    };
    
    // Log to server console for now
    // In production, you'd want to store this in a proper logging system
    console.error('Client error reported:', enhancedData);
    
    // You could send these logs to an external service:
    // - Vercel Logging
    // - Vercel Edge Config
    // - Sentry, LogRocket, etc.
    // - Your own database

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling client log:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process error log' },
      { status: 500 }
    );
  }
} 