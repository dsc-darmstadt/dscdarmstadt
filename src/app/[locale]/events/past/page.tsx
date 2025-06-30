import PastEventsClient from '../past-events-client'

interface Props {
  params: { locale: string }
}

export default function PastEventsPage({ params }: Props) {
  return <PastEventsClient locale={params.locale} />
}


