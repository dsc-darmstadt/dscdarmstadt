import { NextRequest, NextResponse } from 'next/server';
import { getEventById } from '@/lib/data/events';

export const runtime = 'edge';

// Read-only on purpose. Events are created, edited and deleted exclusively through
// /api/admin/events/[eventId], which requires a signed-in admin via verifyAdminRequest().

interface RouteParams {
  params: Promise<{ eventId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = await params;
    const event = await getEventById(eventId);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: 'Event not found',
          message: 'The requested event does not exist'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
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
