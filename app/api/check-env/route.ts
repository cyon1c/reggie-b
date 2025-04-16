import { NextResponse } from 'next/server';

export async function GET() {
  // Get the environment variables
  const mailchimpAPI = process.env.MAILCHIMP_API_KEY;
  const audienceID = process.env.MAILCHIMP_AUDIENCE_ID;
  const apiServer = process.env.MAILCHIMP_API_SERVER;
  
  // Test the Mailchimp API connection
  let connectionTest = "Not attempted";
  let connectionDetails = {};
  
  if (mailchimpAPI && audienceID && apiServer) {
    try {
      // Try to ping the Mailchimp API
      const url = `https://${apiServer}.api.mailchimp.com/3.0/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`anystring:${mailchimpAPI}`).toString('base64')}`
        },
      });
      
      const data = await response.json();
      connectionTest = response.ok ? "Success" : "Failed";
      connectionDetails = {
        status: response.status,
        statusText: response.statusText,
        responseData: data
      };
    } catch (error) {
      connectionTest = "Error";
      connectionDetails = {
        message: error instanceof Error ? error.message : "Unknown error",
        error: String(error)
      };
    }
  }

  return NextResponse.json({
    mailchimpAPIExists: !!mailchimpAPI,
    audienceIDExists: !!audienceID,
    apiServerExists: !!apiServer,
    apiServerValue: apiServer,
    mailchimpAPILength: mailchimpAPI ? mailchimpAPI.length : 0,
    audienceIDLength: audienceID ? audienceID.length : 0,
    nodeEnv: process.env.NODE_ENV,
    mailchimpConnectionTest: connectionTest,
    mailchimpConnectionDetails: connectionDetails
  }, { status: 200 });
} 