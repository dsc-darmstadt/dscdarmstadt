import { AdminNav } from '@/components/admin/AdminNav'
import { AdminGuard } from '@/components/admin/AdminGuard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-background">
        <AdminNav />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </AdminGuard>
  )
}
