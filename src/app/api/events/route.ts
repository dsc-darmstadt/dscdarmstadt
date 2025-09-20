import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { dbEventToEvent, eventToDbEvent } from '@/lib/utils/converters';

export const runtime = 'edge';

export async function GET() {
  try {
    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();
    
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert database events to frontend format
    const convertedEvents = events.map(dbEventToEvent);

    return NextResponse.json({
      success: true,
      data: convertedEvents,
      message: 'Events fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'date', 'location', 'imageUrl'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
            message: 'Validation error'
          },
          { status: 400 }
        );
      }
    }

    // Convert frontend event to database format
    const dbEvent = eventToDbEvent(body);

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('events')
      .insert(dbEvent)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert back to frontend format
    const newEvent = dbEventToEvent(data);

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create event',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
