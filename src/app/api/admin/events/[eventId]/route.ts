import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { dbEventToEvent, eventToDbEvent } from '@/lib/utils/converters'

export const runtime = 'edge'

interface RouteParams {
  params: Promise<{ eventId: string }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { eventId } = await params
    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbEventToEvent(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to fetch event' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { eventId } = await params
    const body = await request.json()

    const dbEvent = eventToDbEvent(body)
    dbEvent.updated_at = new Date().toISOString()

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase
      .from('events')
      .update(dbEvent)
      .eq('id', eventId)
      .select()
      .single()

    if (error?.code === 'PGRST116') {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 })
    }
    if (error) throw error

    return NextResponse.json({ success: true, data: dbEventToEvent(data) })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await verifyAdminRequest(request)
    const { eventId } = await params

    const supabase = createSupabaseServiceClient()
    const { error } = await supabase.from('events').delete().eq('id', eventId)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'Event deleted successfully' })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to delete event' }, { status: 500 })
  }
}
