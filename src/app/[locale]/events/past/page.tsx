import PastEventsClient from '../past-events-client'

export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string }>
}

export default async function PastEventsPage({ params }: Props) {
  const { locale } = await params
  return <PastEventsClient locale={locale} />
}
