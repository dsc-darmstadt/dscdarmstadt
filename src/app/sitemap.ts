import { MetadataRoute } from 'next'
import { siteUrl as baseUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'de']
  const routes = [
    '',
    '/about',
    '/events',
    '/projects',
    '/events/past'
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
