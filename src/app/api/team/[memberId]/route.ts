import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { dbTeamMemberToTeamMember, teamMemberToDbTeamMember } from '@/lib/utils/converters';

export const runtime = 'edge';

interface RouteParams {
  params: { memberId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { memberId } = params;

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data: teamMember, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', memberId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Team member not found',
            message: 'The requested team member does not exist'
          },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      throw error;
    }

    const convertedTeamMember = dbTeamMemberToTeamMember(teamMember);

    return NextResponse.json({
      success: true,
      data: convertedTeamMember,
      message: 'Team member fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch team member',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { memberId } = params;
    const body = await request.json();

    // Convert frontend team member to database format
    const dbTeamMember = teamMemberToDbTeamMember(body);

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('team_members')
      .update(dbTeamMember)
      .eq('id', memberId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Team member not found',
            message: 'The requested team member does not exist'
          },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      throw error;
    }

    const updatedTeamMember = dbTeamMemberToTeamMember(data);

    return NextResponse.json({
      success: true,
      data: updatedTeamMember,
      message: 'Team member updated successfully'
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update team member',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { memberId } = params;

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete team member',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
