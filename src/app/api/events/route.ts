import { NextResponse } from 'next/server';
import { getEvents } from '@/lib/data/events';

export const runtime = 'edge';

// Read-only on purpose. Events are created, edited and deleted exclusively through
// /api/admin/events, which requires a signed-in admin via verifyAdminRequest().

export async function GET() {
  try {
    const events = await getEvents();

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
