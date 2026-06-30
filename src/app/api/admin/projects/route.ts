import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbProjectToProject, projectToDbProject } from '@/lib/utils/converters'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createSupabaseServiceClient()
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: projects.map(dbProjectToProject) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAdminRequest(request)
    const body = await request.json()

    const requiredFields = ['title', 'description', 'imageUrl', 'technologies']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('projects')
      .insert(projectToDbProject(body))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data: dbProjectToProject(data) }, { status: 201 })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 })
  }
}
