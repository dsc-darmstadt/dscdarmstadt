'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Shown when a page's server-side data load fails (e.g. Supabase is unreachable).
export default function ErrorPage() {
  const t = useTranslations('error')

  return (
    <div className="container py-20 text-center space-y-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground max-w-xl mx-auto">{t('description')}</p>
      <div className="flex justify-center gap-4">
        {/* A full reload re-runs the server data fetch; error.tsx's reset() alone would not. */}
        <Button onClick={() => window.location.reload()}>{t('tryAgain')}</Button>
        <Button variant="outline" asChild>
          <Link href="/">{t('backHome')}</Link>
        </Button>
      </div>
    </div>
  )
}
