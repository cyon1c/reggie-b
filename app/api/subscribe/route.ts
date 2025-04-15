import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'BloodletterHQ@gmail.com',
      subject: 'New Bloodletter Subscriber',
      text: `New subscriber: ${email}\n\nThis email was submitted through the Bloodletter website.`,
      html: `
        <h2>New Bloodletter Subscriber</h2>
        <p>Email: ${email}</p>
        <p>This email was submitted through the Bloodletter website.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 