import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dscd.ae0x.tech'
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

  // Add special priority for main pages
  sitemap.push({
    url: `${baseUrl}/en`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  return sitemap
}
