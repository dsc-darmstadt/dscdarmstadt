import { NextRequest, NextResponse } from 'next/server';

// TODO: Replace with actual Supabase integration
export async function GET() {
  try {
    // Simulate fetching events from database
    const events = [
      {
        id: '1',
        title: 'Sample Event',
        description: 'This is a sample event from the API',
        date: new Date().toISOString(),
        location: 'TU Darmstadt',
        maxParticipants: 50,
        tags: ['API', 'Sample']
      }
    ];

    return NextResponse.json({
      success: true,
      data: events,
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

    // TODO: Validate request body
    // TODO: Insert into Supabase database

    // Simulate creating an event
    const newEvent = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    };

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
