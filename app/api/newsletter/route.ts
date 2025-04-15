import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request data
    const data = await request.json();
    
    // Log the submission for debugging purposes
    console.log('Newsletter/Contact submission received:', data);
    
    // In a real implementation, this would send data to your email service
    // For now, we're just returning success
    
    // Add artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your submission! This is currently in test mode.'
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 