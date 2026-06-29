import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import AboutClient from './about-client'

export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  return <AboutClient locale={locale} />
}
