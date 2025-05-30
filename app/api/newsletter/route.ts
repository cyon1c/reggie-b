import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request data
    const data = await request.json();
    
    // Log the submission for debugging purposes
    console.log('Subscription received:', data);
    
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Mailchimp API configuration
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_SERVER = process.env.MAILCHIMP_API_SERVER;
    
    // Ensure environment variables are set
    if (!API_KEY || !AUDIENCE_ID || !API_SERVER) {
      console.error('Mailchimp environment variables not set');
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      );
    }
    
    // Determine which tag to use based on source
    let tag;
    const source = data.source || 'newsletter_footer';
    
    if (source === 'contact_form' || source === 'about_page_form') {
      tag = 'The Creative Process';
    } else {
      tag = 'Citizen\'s Log';
    }
    
    // Create subscriber hash for the specific user (MD5 hash of the lowercase email)
    const emailHash = require('crypto')
      .createHash('md5')
      .update(data.email.toLowerCase())
      .digest('hex');
    
    const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed', // or 'pending' if you want double opt-in
        merge_fields: {
          SOURCE: source,
          // Add additional fields if provided
          ...(data.name ? { FNAME: data.name } : {}),
          ...(data.message ? { MESSAGE: data.message } : {})
        },
        tags: [tag]
      })
    });
    
    const responseData = await response.json();
    
    // Check if the subscription was successful
    if (response.ok) {
      let successMessage = '';
      if (tag === 'Citizen\'s Log') {
        successMessage = 'Thank you for subscribing to Citizen\'s Log!';
      } else {
        successMessage = 'Thank you for joining our Creative Journey!';
      }
      
      return NextResponse.json({ 
        success: true,
        message: successMessage
      });
    } else {
      // Handle Mailchimp error, including duplicate subscriber
      if (responseData.title === 'Member Exists') {
        // Update tags for existing member
        try {
          const updateUrl = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}/tags`;
          const updateResponse = await fetch(updateUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`
            },
            body: JSON.stringify({
              tags: [{ name: tag, status: 'active' }]
            })
          });
          
          if (updateResponse.ok) {
            return NextResponse.json({ 
              success: true,
              message: 'Your subscription preferences have been updated. Thank you!'
            });
          }
        } catch (updateError) {
          console.error('Error updating existing member tags:', updateError);
        }
        
        return NextResponse.json({ 
          success: true,
          message: 'You are already subscribed to our newsletter!'
        });
      }
      
      throw new Error(responseData.detail || 'Failed to subscribe');
    }
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 