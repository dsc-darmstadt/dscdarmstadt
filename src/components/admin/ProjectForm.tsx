'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'
import { ImageUpload } from './ImageUpload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: Props) {
  const isEdit = !!project

  const [fields, setFields] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    imageUrl: project?.imageUrl ?? '',
    technologies: project?.technologies?.join(', ') ?? '',
    repoUrl: project?.repoUrl ?? '',
    demoUrl: project?.demoUrl ?? '',
    members: project?.members?.join(', ') ?? '',
    status: project?.status ?? 'active',
    featured: project?.featured ?? false,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(key: string, value: string | boolean) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')

      const payload = {
        title: fields.title,
        description: fields.description,
        imageUrl: fields.imageUrl,
        technologies: fields.technologies.split(',').map(t => t.trim()).filter(Boolean),
        repoUrl: fields.repoUrl || undefined,
        demoUrl: fields.demoUrl || undefined,
        members: fields.members.split(',').map(m => m.trim()).filter(Boolean),
        status: fields.status,
        featured: fields.featured,
      }

      const url = isEdit ? `/api/admin/projects/${project.id}` : '/api/admin/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (!result.success) throw new Error(result.error)

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Project' : 'New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload currentUrl={fields.imageUrl} onUpload={(url) => set('imageUrl', url)} folder="projects" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" required value={fields.title} onChange={e => set('title', e.target.value)} />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                required
                rows={3}
                value={fields.description}
                onChange={e => set('description', e.target.value)}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
              <Input id="technologies" required placeholder="React, TypeScript, Supabase" value={fields.technologies} onChange={e => set('technologies', e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="repoUrl">GitHub URL</Label>
              <Input id="repoUrl" type="url" placeholder="https://github.com/…" value={fields.repoUrl} onChange={e => set('repoUrl', e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input id="demoUrl" type="url" placeholder="https://…" value={fields.demoUrl} onChange={e => set('demoUrl', e.target.value)} />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="members">Team Members (comma-separated)</Label>
              <Input id="members" placeholder="Alice Smith, Bob Jones" value={fields.members} onChange={e => set('members', e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={fields.status}
                onChange={e => set('status', e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                id="featured"
                type="checkbox"
                className="h-4 w-4 rounded border-input"
                checked={fields.featured}
                onChange={e => set('featured', e.target.checked)}
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
