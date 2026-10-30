import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembers } from '@/lib/data/team';

export const runtime = 'edge';

// Read-only on purpose. Writes go exclusively through
// /api/admin/team, which requires a signed-in admin via verifyAdminRequest().

export async function GET(request: NextRequest) {
  try {
    // Check for leadership filter
    const { searchParams } = new URL(request.url);
    const leadershipParam = searchParams.get('leadership');

    const teamMembers = await getTeamMembers();
    const filtered = leadershipParam === 'true' || leadershipParam === 'false'
      ? teamMembers.filter((member) => member.isLeadership === (leadershipParam === 'true'))
      : teamMembers;

    return NextResponse.json({
      success: true,
      data: filtered,
      message: `${leadershipParam === 'true' ? 'Leadership team' : leadershipParam === 'false' ? 'Core team members' : 'Team members'} fetched successfully`
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch team members',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
