import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection'
import { PastEvents } from '@/components/home/PastEvents'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import {
  AnimatedHeroSection,
  AnimatedHeroButtons,
  AnimatedHeroImage,
  AnimatedSection,
  AnimatedCard
} from '@/components/home/HomeAnimatedWrapper'
import { getPastEvents } from '@/lib/data/events'
import { getFeaturedProjects } from '@/lib/data/projects'
import { ArrowRight, Code, Users, Lightbulb, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const runtime = 'edge';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  console.log('Home page locale:', locale);

  const t = await getTranslations({ locale, namespace: 'home' });

  const pastEvents = await getPastEvents(3)
  const featuredProjects = getFeaturedProjects(3)

  const values = [
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: Target,
      title: t('about.values.growth.title'),
      description: t('about.values.growth.description')
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20">        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatedHeroSection className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {t('hero.description')}
              </p>
            </AnimatedHeroSection>
            <AnimatedHeroButtons className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/events">
                  {t('hero.cta.events')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">{t('hero.cta.about')}</Link>
              </Button>
            </AnimatedHeroButtons>
          </div>          <AnimatedHeroImage className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="h-32 w-32 text-primary/30" />
              </div>              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm text-muted-foreground text-center">
                  {t('hero.tagline')}
                </p>
              </div>
            </div>
          </AnimatedHeroImage>
        </div>
      </section>      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t('about.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.mission')}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedCard
                key={value.title}
                index={index}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />

      {/* Past Events Section */}
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
                {t('events.noUpcomingEvents')}
              </p>
            </div>
          )}
        </div>
      </section>


      {/* Featured Projects Section
      <section className="py-20 bg-muted/30">
        <div className="container">
          <AnimatedSection className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t('projects.featured.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.featured.description')}
            </p>
          </AnimatedSection>

          <FeaturedProjects projects={featuredProjects} />

          <AnimatedSection delay={0.3} className="mt-12 flex justify-center">
            <Button asChild>
              <Link href="/projects">
                {t('projects.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section> */}
    </div>
  )
}
