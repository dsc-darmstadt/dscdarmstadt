'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'
import { AdminGuard } from '@/components/admin/AdminGuard'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  archived: 'bg-muted text-muted-foreground',
}

function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [formMode, setFormMode] = useState<'hidden' | 'create' | 'edit'>('hidden')
  const [editing, setEditing] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState<Project | null>(null)
  const [token, setToken] = useState('')

  async function loadProjects() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    setToken(session.access_token)
    const res = await fetch('/api/admin/projects', {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
    const result = await res.json()
    if (result.success) setProjects(result.data)
    setLoading(false)
  }

  useEffect(() => { loadProjects() }, [])

  function openCreate() { setEditing(null); setFormMode('create') }
  function openEdit(project: Project) { setEditing(project); setFormMode('edit') }
  function closeForm() { setEditing(null); setFormMode('hidden') }

  function handleSuccess() {
    closeForm()
    loadProjects()
  }

  async function confirmDelete() {
    if (!deleting || !token) return
    await fetch(`/api/admin/projects/${deleting.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setDeleting(null)
    loadProjects()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">{projects.length} total</p>
        </div>
        {formMode === 'hidden' && (
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}
      </div>

      {formMode !== 'hidden' && (
        <ProjectForm
          project={editing ?? undefined}
          onSuccess={handleSuccess}
          onCancel={closeForm}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16 text-muted-foreground">
            No projects yet. Click "New Project" to create one.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {projects.map(project => (
            <Card key={project.id}>
              <CardContent className="flex items-center gap-4 py-4">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-14 w-20 object-cover rounded shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{project.title}</p>
                    {project.featured && <Star className="h-3.5 w-3.5 text-yellow-500 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
                      {project.status}
                    </span>
                    {project.technologies?.slice(0, 3).map(t => (
                      <span key={t} className="text-xs bg-muted px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" onClick={() => openEdit(project)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDeleting(project)}>
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

export default function ProjectsPage() {
  return (
    <AdminGuard>
      <ProjectsContent />
    </AdminGuard>
  )
}
