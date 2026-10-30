"use client"

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UpcomingEvents } from './UpcomingEvents'
import { AnimatedSection } from './HomeAnimatedWrapper'
import { Event } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

export function UpcomingEventsSection({ events }: { events: Event[] }) {
  const t = useTranslations('home')

  return (
    <section className="py-20">
      <div className="container">
        <AnimatedSection className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('events.upcoming.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.upcoming.description')}
          </p>
        </AnimatedSection>

        {events.length > 0 ? (
          <>
            <UpcomingEvents events={events} />
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
