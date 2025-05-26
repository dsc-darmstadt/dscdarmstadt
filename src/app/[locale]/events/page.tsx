import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import EventsClient from './events-client'

export const runtime = 'edge';

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'events' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    keywords: ['Events', 'Hackathons', 'Workshops', 'Tech Events', 'Programming', 'Networking'],
    path: `/${locale}/events`,
    locale
  })
}

export default function EventsPage({ params }: Props) {
  return <EventsClient locale={params.locale} />
}
