import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

export async function verifyAdminRequest(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.slice(7)
  const supabase = createSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  return user
}
