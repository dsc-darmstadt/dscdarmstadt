import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Name, email, and message are required'
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
          message: 'Please provide a valid email address'
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual email service integration
    // For now, just log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      subject: subject || 'No subject',
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Send email using service like SendGrid, Resend, or Nodemailer
    // TODO: Store submission in Supabase database for record keeping

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message',
        message: 'Internal server error. Please try again later.'
      },
      { status: 500 }
    );
  }
}
