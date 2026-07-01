import { ThemeProvider } from '@/components/theme-provider'

export const metadata = { title: 'DSC Darmstadt Admin' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
