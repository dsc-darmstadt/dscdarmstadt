'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Event } from '@/lib/types'
import { EventForm } from '@/components/admin/EventForm'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { formatDate } from '@/lib/utils'

function EventsContent() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [formMode, setFormMode] = useState<'hidden' | 'create' | 'edit'>('hidden')
  const [editing, setEditing] = useState<Event | null>(null)
  const [deleting, setDeleting] = useState<Event | null>(null)
  const [token, setToken] = useState('')

  async function loadEvents() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    setToken(session.access_token)
    const res = await fetch('/api/admin/events', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const result = await res.json()
    if (result.success) setEvents(result.data)
    setLoading(false)
  }

  useEffect(() => { loadEvents() }, [])

  function openCreate() { setEditing(null); setFormMode('create') }
  function openEdit(event: Event) { setEditing(event); setFormMode('edit') }
  function closeForm() { setEditing(null); setFormMode('hidden') }

  function handleSuccess() {
    closeForm()
    loadEvents()
  }

  async function confirmDelete() {
    if (!deleting || !token) return
    await fetch(`/api/admin/events/${deleting.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setDeleting(null)
    loadEvents()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">{events.length} total</p>
        </div>
        {formMode === 'hidden' && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        )}
      </div>

      {formMode !== 'hidden' && (
        <EventForm
          event={editing ?? undefined}
          onSuccess={handleSuccess}
          onCancel={closeForm}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : events.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16 text-muted-foreground">
            No events yet. Click "New Event" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {events.map(event => (
            <Card key={event.id}>
              <CardContent className="flex items-center gap-4 py-4">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-14 w-20 object-cover rounded shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{event.title}</p>
                    {event.is_featured && <Star className="h-3.5 w-3.5 text-yellow-500 shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.date, 'en')} · {event.location}
                  </p>
                  {event.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-muted px-1.5 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(event)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleting(event)}>
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
          itemName={`"${deleting.title}"`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  )
}

export default function EventsPage() {
  return <EventsContent />
}
