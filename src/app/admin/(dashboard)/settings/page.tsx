'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { UserPlus, Trash2, Mail } from 'lucide-react'

interface AdminUser {
  id: string
  email: string
  createdAt: string
  lastSignIn: string | null
}

function SettingsContent() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviting, setInviting] = useState(false)
  const [inviteResult, setInviteResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState('')

  async function loadUsers() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    setToken(session.access_token)
    const res = await fetch('/api/admin/users', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const result = await res.json()
    if (result.success) setUsers(result.data)
    setLoading(false)
  }

  useEffect(() => { loadUsers() }, [])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setInviteResult(null)
    setInviting(true)

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inviteEmail }),
      })
      const result = await res.json()
      if (!result.success) throw new Error(result.error)

      setInviteResult({ type: 'success', msg: `Invitation sent to ${inviteEmail}` })
      setInviteEmail('')
      loadUsers()
    } catch (err) {
      setInviteResult({ type: 'error', msg: err instanceof Error ? err.message : 'Failed to send invite' })
    } finally {
      setInviting(false)
    }
  }

  async function confirmRemoveUser() {
    if (!deletingUser || !token) return
    await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: deletingUser.id }),
    })
    setDeletingUser(null)
    loadUsers()
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage admin users</p>
      </div>

      {/* Invite new admin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite admin user
          </CardTitle>
          <CardDescription>
            An invitation email will be sent. The recipient clicks the link and sets their password to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleInvite} className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="invite-email" className="sr-only">Email address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="colleague@example.com"
                required
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={inviting}>
              <Mail className="h-4 w-4 mr-2" />
              {inviting ? 'Sending…' : 'Send invite'}
            </Button>
          </form>
          {inviteResult && (
            <p className={`mt-3 text-sm ${inviteResult.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
              {inviteResult.msg}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Current admin users */}
      <Card>
        <CardHeader>
          <CardTitle>Current admins</CardTitle>
          <CardDescription>All users who can access this dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Added {new Date(user.createdAt).toLocaleDateString()}
                      {user.lastSignIn && ` · Last sign-in ${new Date(user.lastSignIn).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeletingUser(user)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {deletingUser && (
        <DeleteConfirmDialog
          itemName={`admin access for "${deletingUser.email}"`}
          onConfirm={confirmRemoveUser}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </div>
  )
}

export default function SettingsPage() {
  return <SettingsContent />
}
