"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useLocale } from 'next-intl'

export function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()

  const getToggleUrl = () => {
    const currentLocale = locale
    const newLocale = currentLocale === 'en' ? 'de' : 'en'
    
    // More robust path replacement
    let newPath = pathname
    if (pathname.startsWith(`/${currentLocale}/`)) {
      newPath = pathname.replace(`/${currentLocale}/`, `/${newLocale}/`)
    } else if (pathname === `/${currentLocale}`) {
      newPath = `/${newLocale}`
    } else if (pathname === '/') {
      newPath = `/${newLocale}`
    } else {
      // Fallback: ensure the path starts with the new locale
      newPath = `/${newLocale}${pathname.startsWith('/') ? pathname : '/' + pathname}`
    }
    
    return newPath
  }

  const newLocale = locale === 'en' ? 'de' : 'en'
  const toggleUrl = getToggleUrl()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm font-medium"
      asChild
    >
      <Link href={toggleUrl}>
        {locale === 'en' ? 'DE' : 'EN'}
      </Link>
    </Button>
  )
}
