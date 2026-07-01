import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/lib/adminAuth'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    await verifyAdminRequest(request)

    const supabase = createSupabaseServiceClient()
    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    if (error) throw error

    const sanitized = users.map(u => ({
      id: u.id,
      email: u.email,
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at,
    }))

    return NextResponse.json({ success: true, data: sanitized })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to list users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await verifyAdminRequest(request)
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    const supabase = createSupabaseServiceClient()
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}`,
      data: { id: data.user.id, email: data.user.email },
    })
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('Invite error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send invitation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await verifyAdminRequest(request)
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 })
    }

    // Prevent deleting yourself
    const { data: { user: caller } } = await createSupabaseServiceClient().auth.getUser(
      request.headers.get('Authorization')!.slice(7)
    )
    if (caller?.id === userId) {
      return NextResponse.json({ success: false, error: 'You cannot remove your own account' }, { status: 400 })
    }

    const supabase = createSupabaseServiceClient()
    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) throw error

    return NextResponse.json({ success: true, message: 'User removed' })
  } catch (error) {
    if (error instanceof NextResponse) return error
    return NextResponse.json({ success: false, error: 'Failed to remove user' }, { status: 500 })
  }
}
