import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import EventsClient from './events-client'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'events' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['Events', 'Hackathons', 'Workshops', 'Tech Events', 'Programming', 'Networking'],
    path: `/${locale}/events`,
    locale
  })
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params
  return <EventsClient locale={locale} />
}
