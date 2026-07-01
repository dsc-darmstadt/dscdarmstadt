import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'

export const runtime = 'edge'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_MB = 5

export async function POST(request: NextRequest) {
  try {
    await verifyAdminRequest(request)

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: `File size must be under ${MAX_SIZE_MB}MB` },
        { status: 400 }
      )
    }

    const type = (formData.get('type') as string | null) || 'misc'
    const allowedTypes = ['events', 'projects', 'team', 'misc']
    const folder = allowedTypes.includes(type) ? type : 'misc'

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const arrayBuffer = await file.arrayBuffer()

    const supabase = createSupabaseServiceClient()
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filename, arrayBuffer, { contentType: file.type, upsert: false })

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filename)

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
