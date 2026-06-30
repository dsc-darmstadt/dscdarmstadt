import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbTeamMemberToTeamMember, teamMemberToDbTeamMember } from '@/lib/utils/converters'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ memberId: string }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { memberId } = await params
    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase.from('team_members').select('*').eq('id', memberId).single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbTeamMemberToTeamMember(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch team member' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { memberId } = await params
    const body = await request.json()

    const dbMember = teamMemberToDbTeamMember(body)
    if (body.isLeadership !== undefined) {
      dbMember.is_leadership = body.isLeadership
    }

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('team_members')
      .update(dbMember)
      .eq('id', memberId)
      .select()
      .single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Team member not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbTeamMemberToTeamMember(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { memberId } = await params

    const supabase = createSupabaseServiceClient()
    const { error } = await supabase.from('team_members').delete().eq('id', memberId)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Team member deleted successfully' })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 500 })
  }
}
