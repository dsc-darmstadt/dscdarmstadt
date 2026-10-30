import { generateMetadata as generatePageMetadata } from '@/lib/metadata'
import { getTranslations } from 'next-intl/server'
import { getTeamMembers } from '@/lib/data/team'
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
    path: '/about',
    locale
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  // Most of this page is static copy; a Supabase outage only empties the team grids.
  const team = await getTeamMembers().catch((error) => {
    console.error('Error fetching team data:', error)
    return []
  })

  return (
    <AboutClient
      locale={locale}
      leadershipTeam={team.filter((member) => member.isLeadership)}
      coreTeamMembers={team.filter((member) => !member.isLeadership)}
    />
  )
}
