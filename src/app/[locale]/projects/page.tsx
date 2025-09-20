import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import ProjectsClient from './projects-client'

export const runtime = 'edge';

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'projects' })

  return generatePageMetadata({
    title: t('title'),
    description: t('description'),
    locale
  })
}

export default function ProjectsPage({ params }: Props) {
  return <ProjectsClient locale={params.locale} />
}
