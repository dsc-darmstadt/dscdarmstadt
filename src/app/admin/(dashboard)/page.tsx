'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, FolderOpen, Users, ArrowRight } from 'lucide-react'

interface Counts { events: number; projects: number; team: number }

function DashboardContent() {
  const [counts, setCounts] = useState<Counts | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return
      const headers = { Authorization: `Bearer ${session.access_token}` }
      const [ev, pr, tm] = await Promise.all([
        fetch('/api/admin/events', { headers }).then(r => r.json()),
        fetch('/api/admin/projects', { headers }).then(r => r.json()),
        fetch('/api/admin/team', { headers }).then(r => r.json()),
      ])
      setCounts({
        events: ev.data?.length ?? 0,
        projects: pr.data?.length ?? 0,
        team: tm.data?.length ?? 0,
      })
    }
    load()
  }, [])

  const stats = [
    { label: 'Events', value: counts?.events, href: '/admin/events', icon: Calendar },
    { label: 'Projects', value: counts?.projects, href: '/admin/projects', icon: FolderOpen },
    { label: 'Team Members', value: counts?.team, href: '/admin/team', icon: Users },
  ]

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your website content</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value ?? '–'}</div>
              <Link href={href} className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1">
                Manage <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'New Event', href: '/admin/events' },
          { label: 'New Project', href: '/admin/projects' },
          { label: 'New Team Member', href: '/admin/team' },
        ].map(({ label, href }) => (
          <Button key={label} asChild variant="outline" className="justify-start">
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return <DashboardContent />
}
