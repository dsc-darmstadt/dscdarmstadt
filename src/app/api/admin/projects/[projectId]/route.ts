import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbProjectToProject, projectToDbProject } from '@/lib/utils/converters'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ projectId: string }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { projectId } = await params
    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase.from('projects').select('*').eq('id', projectId).single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbProjectToProject(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { projectId } = await params
    const body = await request.json()

    const dbProject = projectToDbProject(body)
    dbProject.updated_at = new Date().toISOString()

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('projects')
      .update(dbProject)
      .eq('id', projectId)
      .select()
      .single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbProjectToProject(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { projectId } = await params

    const supabase = createSupabaseServiceClient()
    const { error } = await supabase.from('projects').delete().eq('id', projectId)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Project deleted successfully' })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 })
  }
}
