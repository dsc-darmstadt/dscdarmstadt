import { MetadataRoute } from 'next'
import { siteUrl as baseUrl } from '@/lib/metadata'
import { getEvents } from '@/lib/data/events'

export const runtime = 'edge'
// Built per request so events added in the admin panel appear without a redeploy.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['en', 'de']
  const events = await getEvents()
  const routes = [
    '',
    '/about',
    '/events',
    '/events/past',
    ...events.map((event) => `/events/${event.id}`)
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemap
}
