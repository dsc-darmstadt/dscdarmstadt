import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Code, Github, Linkedin, Mail, Instagram } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const navT = useTranslations('navigation')

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="font-bold text-lg">DSC Darmstadt</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('links.quick')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navT('home')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navT('events')}
                </Link>
              </li>
              <li>
                <Link href="" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navT('projects') + '(soon!)'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {navT('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('links.connect')}</h3>
            <div className="flex space-x-4">
              <a href="mailto:dscdarmstadt@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <a href="https://github.com/dsc-darmstadt/dscdarmstadt" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/company/dsc-tu-darmstadt/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://instagram.com/dsc.darmstadt" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t('copyright')}
          </p>
          <Link href="/admin" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
