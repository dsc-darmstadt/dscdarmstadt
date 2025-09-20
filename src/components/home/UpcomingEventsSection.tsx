"use client"

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UpcomingEvents } from './UpcomingEvents'
import { AnimatedSection } from './HomeAnimatedWrapper'
import { Event } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

export function UpcomingEventsSection() {
  const t = useTranslations('home')
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUpcomingEvents() {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch events')
        }

        // Filter upcoming events on client side
        const now = new Date()
        const upcoming = result.data
          .filter((event: Event) => new Date(event.date) >= now)
          .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3) // Limit to 3 events for home page

        setUpcomingEvents(upcoming)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching upcoming events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <AnimatedSection className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('events.upcoming.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('events.upcoming.description')}
            </p>
          </AnimatedSection>

          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading upcoming events...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container">
          <AnimatedSection className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('events.upcoming.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('events.upcoming.description')}
            </p>
          </AnimatedSection>

          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Error loading events. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container">
        <AnimatedSection className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('events.upcoming.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.upcoming.description')}
          </p>
        </AnimatedSection>

        {upcomingEvents.length > 0 ? (
          <>
            <UpcomingEvents events={upcomingEvents} />
            <AnimatedSection delay={0.3} className="mt-12 flex justify-center">
              <Button asChild>
                <Link href="/events">
                  {t('events.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t('events.noUpcomingEvents')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
