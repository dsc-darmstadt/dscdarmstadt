'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PastEvents } from '@/components/home/PastEvents'
import { AnimatedSection } from '@/components/home/HomeAnimatedWrapper'
import { ArrowRight } from 'lucide-react'
import { Event } from '@/lib/types'

export function DynamicHomeContent() {
  const t = useTranslations('home')
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch('/api/events')
        const eventsResult = await eventsResponse.json()

        if (eventsResult.success) {
          // Filter past events
          const now = new Date()
          const past = eventsResult.data
            .filter((event: Event) => new Date(event.date) < now)
            .sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 3)
          setPastEvents(past)
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="container">
          <AnimatedSection className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('events.past.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('events.past.description')}
            </p>
          </AnimatedSection>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading past events...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="container">
        <AnimatedSection className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('events.past.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.past.description')}
          </p>
        </AnimatedSection>

        {pastEvents.length > 0 ? (
          <>
            <PastEvents events={pastEvents} />
            <AnimatedSection delay={0.3} className="mt-12 flex justify-center">
              <Button asChild>
                <Link href="/events/past">
                  {t('events.viewAll')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t('events.noPastEvents')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}