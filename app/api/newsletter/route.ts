import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request data
    const data = await request.json();
    
    // Log the submission for debugging purposes
    console.log('Newsletter subscription received:', data);
    
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Mailchimp API configuration
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;
    
    // Ensure environment variables are set
    if (!API_KEY || !AUDIENCE_ID || !DATACENTER) {
      console.error('Mailchimp environment variables not set');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }
    
    // Create subscriber hash for the specific user (MD5 hash of the lowercase email)
    const emailHash = require('crypto')
      .createHash('md5')
      .update(data.email.toLowerCase())
      .digest('hex');
    
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed', // or 'pending' if you want double opt-in
        merge_fields: {
          SOURCE: data.source || 'website_footer'
        }
      })
    });
    
    const responseData = await response.json();
    
    // Check if the subscription was successful
    if (response.ok) {
      return NextResponse.json({ 
        success: true,
        message: 'You have been successfully subscribed to the newsletter!'
      });
    } else {
      // Handle Mailchimp error, including duplicate subscriber
      if (responseData.title === 'Member Exists') {
        return NextResponse.json({ 
          success: true,
          message: 'You are already subscribed to our newsletter!'
        });
      }
      
      throw new Error(responseData.detail || 'Failed to subscribe');
    }
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 