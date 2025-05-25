"use client"

import { useTranslations, useLocale } from 'next-intl'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUpcomingEvents, getPastEvents } from '@/lib/data/events'
import { formatDate, formatTime } from '@/lib/utils'
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Event } from '@/lib/types'

function EventCard({ event, index }: { event: Event; index: number }) {
  const t = useTranslations('events')
  const locale = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Event Image</p>
          </div>
          {event.isPast && (
            <div className="absolute top-2 right-2 bg-muted text-muted-foreground px-2 py-1 text-xs rounded">
              Past Event
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{event.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {event.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{formatDate(event.date, locale)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span>{formatTime(event.date, locale)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground sm:col-span-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            {event.duration && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{event.duration}</span>
              </div>
            )}
            {event.maxParticipants && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 shrink-0" />
                <span>{event.maxParticipants} {t('details.participants')}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {event.registrationLink && !event.isPast && (
            <Button asChild className="w-full">
              <Link href={event.registrationLink} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('register')}
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function EventsPage() {
  const t = useTranslations('events')
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  return (
    <div className="container py-20 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="upcoming">{t('tabs.upcoming')}</TabsTrigger>
            <TabsTrigger value="past">{t('tabs.past')}</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('noUpcomingEvents')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
