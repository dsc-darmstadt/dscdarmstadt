import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getAllEvents } from '@/lib/data/events'
import { formatDate, formatTime } from '@/lib/utils'
import { Calendar, MapPin, Clock, Users, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Event } from '@/lib/types'
import { AnimatedWrapper, AnimatedBackButton } from '@/components/events/AnimatedWrapper'

interface EventDetailPageProps {
  params: Promise<{ eventId: string; locale: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId, locale } = await params;
  const t = await getTranslations('events')

  // Find the event by ID
  const allEvents = getAllEvents()
  const event = allEvents.find(e => e.id === eventId)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">        {/* Back button */}
        <AnimatedBackButton>
          <Link href={`/${locale}/events`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToEvents')}
            </Button>
          </Link>
        </AnimatedBackButton>

        {/* Event Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {event.description}
            </p>
          </div>

          {/* Event details grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('date')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{formatDate(event.date, locale)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {t('time')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{formatTime(event.date)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {t('location')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{event.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {t('type')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold capitalize">{event.type}</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Event Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Main content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('eventDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('about')}</h3>
                    <p className="text-muted-foreground">
                      {event.longDescription || event.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('whatYoullLearn')}</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Practical hands-on experience with modern technologies</li>
                      <li>Best practices and industry standards</li>
                      <li>Networking opportunities with fellow developers</li>
                      <li>Real-world project implementation</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t('whoShouldAttend')}</h3>
                    <p className="text-muted-foreground">
                      This event is perfect for students and developers of all skill levels who are interested in expanding their knowledge and connecting with the tech community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration CTA */}
            <Card>
              <CardHeader>
                <CardTitle>{t('joinEvent')}</CardTitle>
                <CardDescription>
                  {t('registerNow')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {event.registrationUrl ? (
                  <Button asChild className="w-full">
                    <Link href={event.registrationUrl} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('register')}
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    {t('registrationClosed')}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('topics')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>{t('requirements')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Laptop with development environment</li>
                  <li>• Basic programming knowledge</li>
                  <li>• Enthusiasm to learn!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
