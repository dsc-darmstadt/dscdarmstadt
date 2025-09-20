import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import AboutClient from './about-client'

export const runtime = 'edge';

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'about' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale
  })
}

export default function AboutPage({ params }: Props) {
  return <AboutClient locale={params.locale} />
}
