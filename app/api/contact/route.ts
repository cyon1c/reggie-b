import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request data
    const data = await request.json();
    
    // Log the submission for debugging purposes
    console.log('Creative Journey form submission received:', data);
    
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Forward to the newsletter API with the contact_form source
    const response = await fetch(`${request.headers.get('origin')}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        ...data,
        source: 'contact_form'
      }),
    });
    
    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
    
  } catch (error) {
    console.error('Error processing Creative Journey form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 