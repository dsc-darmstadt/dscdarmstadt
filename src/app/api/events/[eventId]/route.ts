import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { dbEventToEvent, eventToDbEvent } from '@/lib/utils/converters';

export const runtime = 'edge';

interface RouteParams {
  params: { eventId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = params;

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Event not found',
            message: 'The requested event does not exist'
          },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      throw error;
    }

    const convertedEvent = dbEventToEvent(event);

    return NextResponse.json({
      success: true,
      data: convertedEvent,
      message: 'Event fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch event',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = params;
    const body = await request.json();

    // Convert frontend event to database format
    const dbEvent = eventToDbEvent(body);
    dbEvent.updated_at = new Date().toISOString();

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('events')
      .update(dbEvent)
      .eq('id', eventId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Event not found',
            message: 'The requested event does not exist'
          },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      throw error;
    }

    const updatedEvent = dbEventToEvent(data);

    return NextResponse.json({
      success: true,
      data: updatedEvent,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update event',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = params;

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete event',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
