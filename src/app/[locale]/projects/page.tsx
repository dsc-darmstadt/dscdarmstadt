import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import ProjectsClient from './projects-client'

export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale
  })
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  return <ProjectsClient locale={locale} />
}
