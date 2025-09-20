import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

export const runtime = 'edge';

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

    // Save to Supabase
    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        message: subject ? `Subject: ${subject}\n\n${message}` : message
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Contact form submission saved:', data);

    // TODO: Send email using service like SendGrid, Resend, or Nodemailer
    // TODO: Add email notifications for contact form submissions

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: {
        id: data.id,
        timestamp: data.created_at
      }
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
