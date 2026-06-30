import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbTeamMemberToTeamMember, teamMemberToDbTeamMember } from '@/lib/utils/converters'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createSupabaseServiceClient()
    const { data: members, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: members.map(dbTeamMemberToTeamMember) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch team members' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAdminRequest(request)
    const body = await request.json()

    const requiredFields = ['name', 'role', 'bio', 'imageUrl']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const dbMember = teamMemberToDbTeamMember(body)
    if (body.isLeadership !== undefined) {
      dbMember.is_leadership = body.isLeadership
    }

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('team_members')
      .insert(dbMember)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data: dbTeamMemberToTeamMember(data) }, { status: 201 })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 })
  }
}
