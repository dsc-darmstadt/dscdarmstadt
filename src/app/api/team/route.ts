import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';
import { dbTeamMemberToTeamMember, teamMemberToDbTeamMember } from '@/lib/utils/converters';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();
    
    // Check for leadership filter
    const { searchParams } = new URL(request.url);
    const isLeadership = searchParams.get('leadership') === 'true';
    
    let query = supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false });
    
    // Add leadership filter if requested
    if (isLeadership) {
      query = query.eq('is_leadership', true);
    }

    const { data: teamMembers, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert database team members to frontend format
    const convertedTeamMembers = teamMembers.map(dbTeamMemberToTeamMember);

    return NextResponse.json({
      success: true,
      data: convertedTeamMembers,
      message: `${isLeadership ? 'Leadership team' : 'Team members'} fetched successfully`
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'role', 'bio', 'imageUrl'];
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

    // Convert frontend team member to database format
    const dbTeamMember = teamMemberToDbTeamMember(body);

    // Create Supabase client that works with Cloudflare env bindings
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('team_members')
      .insert(dbTeamMember)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Convert back to frontend format
    const newTeamMember = dbTeamMemberToTeamMember(data);

    return NextResponse.json({
      success: true,
      data: newTeamMember,
      message: 'Team member created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create team member',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
