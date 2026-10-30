import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import { getEvents, splitEvents } from '@/lib/data/events'
import PastEventsClient from '../past-events-client'

export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'events' })

  return generatePageMetadata({
    title: t('tabs.past'),
    description: t('description'),
    path: '/events/past',
    locale
  })
}

export default async function PastEventsPage({ params }: Props) {
  const { locale } = await params
  const { past } = splitEvents(await getEvents())
  return <PastEventsClient locale={locale} events={past} />
}
