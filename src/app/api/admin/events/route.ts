import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbEventToEvent, eventToDbEvent } from '@/lib/utils/converters'

export const runtime = 'edge'

export async function GET() {
  try {
    const supabase = createSupabaseServiceClient()
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data: events.map(dbEventToEvent) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAdminRequest(request)
    const body = await request.json()

    const requiredFields = ['title', 'description', 'date', 'location', 'imageUrl']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('events')
      .insert(eventToDbEvent(body))
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data: dbEventToEvent(data) }, { status: 201 })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to create event' }, { status: 500 })
  }
}
