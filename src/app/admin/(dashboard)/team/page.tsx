'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TeamMember } from '@/lib/types'
import { TeamMemberForm } from '@/components/admin/TeamMemberForm'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Pencil, Trash2 } from 'lucide-react'

function TeamContent() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [formMode, setFormMode] = useState<'hidden' | 'create' | 'edit'>('hidden')
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [deleting, setDeleting] = useState<TeamMember | null>(null)
  const [token, setToken] = useState('')

  async function loadMembers() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    setToken(session.access_token)
    const res = await fetch('/api/admin/team', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const result = await res.json()
    if (result.success) setMembers(result.data)
    setLoading(false)
  }

  useEffect(() => { loadMembers() }, [])

  function openCreate() { setEditing(null); setFormMode('create') }
  function openEdit(member: TeamMember) { setEditing(member); setFormMode('edit') }
  function closeForm() { setEditing(null); setFormMode('hidden') }

  function handleSuccess() {
    closeForm()
    loadMembers()
  }

  async function confirmDelete() {
    if (!deleting || !token) return
    await fetch(`/api/admin/team/${deleting.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setDeleting(null)
    loadMembers()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-muted-foreground text-sm mt-1">{members.length} members</p>
        </div>
        {formMode === 'hidden' && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Member
          </Button>
        )}
      </div>

      {formMode !== 'hidden' && (
        <TeamMemberForm
          member={editing ?? undefined}
          onSuccess={handleSuccess}
          onCancel={closeForm}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : members.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16 text-muted-foreground">
            No team members yet. Click "New Member" to add one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {members.map(member => (
            <Card key={member.id}>
              <CardContent className="flex items-center gap-4 py-4">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-12 w-12 object-cover rounded-full shrink-0"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0 text-lg font-semibold text-muted-foreground">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{member.name}</p>
                    {/* isLeadership not on frontend type; shown via position for now */}
                  </div>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {member.position !== undefined && member.position > 0 && (
                    <p className="text-xs text-muted-foreground">Order: {member.position}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(member)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleting(member)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {deleting && (
        <DeleteConfirmDialog
          itemName={`"${deleting.name}"`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}

export default function TeamPage() {
  return <TeamContent />
}
