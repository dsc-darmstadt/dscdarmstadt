"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from '@/lib/types'
import { formatDate, formatTime } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface UpcomingEventsProps {
  events: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const t = useTranslations('events')
  const locale = useLocale()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.slice(0, 3).map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-full w-full flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Event Image</p>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date, locale)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(event.date, locale)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {event.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {event.registrationLink && (
                <Button asChild className="w-full">
                  <Link href={event.registrationLink} target="_blank">
                    {t('register')}
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
