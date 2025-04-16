import { NextResponse } from 'next/server';

export async function GET() {
  // Get the environment variables
  const mailchimpAPI = process.env.MAILCHIMP_API_KEY;
  const audienceID = process.env.MAILCHIMP_AUDIENCE_ID;
  const apiServer = process.env.MAILCHIMP_API_SERVER;

  return NextResponse.json({
    mailchimpAPIExists: !!mailchimpAPI,
    audienceIDExists: !!audienceID,
    apiServerExists: !!apiServer,
    apiServerValue: apiServer,
    mailchimpAPILength: mailchimpAPI ? mailchimpAPI.length : 0,
    audienceIDLength: audienceID ? audienceID.length : 0,
    nodeEnv: process.env.NODE_ENV
  }, { status: 200 });
} 