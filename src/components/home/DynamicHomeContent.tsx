'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PastEvents } from '@/components/home/PastEvents'
import { AnimatedSection } from '@/components/home/HomeAnimatedWrapper'
import { ArrowRight } from 'lucide-react'
import { Event } from '@/lib/types'

export function DynamicHomeContent({ events }: { events: Event[] }) {
  const t = useTranslations('home')

  return (
    <section className="py-20">
      <div className="container">
        <AnimatedSection className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('events.past.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('events.past.description')}
          </p>
        </AnimatedSection>

        {events.length > 0 ? (
          <>
            <PastEvents events={events} />
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
