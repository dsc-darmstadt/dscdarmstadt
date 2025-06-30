import PastEventsClient from '../past-events-client'

export const runtime = 'edge';

interface Props {
  params: { locale: string }
}

export default function PastEventsPage({ params }: Props) {
  return <PastEventsClient locale={params.locale} />
}


