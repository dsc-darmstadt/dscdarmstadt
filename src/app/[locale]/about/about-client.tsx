'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import {
  Code,
  Target,
  Users,
  Lightbulb,
  Github,
  Linkedin,
  Mail,
  Twitter,
  ArrowRight,
  Heart,
  Zap,
  Globe
} from 'lucide-react'
import { ContactForm } from '@/components/about/ContactForm'
import { TeamMember } from '@/lib/types'
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">{member.name}</p>
          </div>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-lg">{member.name}</CardTitle>
          <CardDescription className="font-medium text-primary">
            {member.role}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">{member.bio}</p>

          {member.socialLinks && (
            <div className="flex justify-center space-x-3">
              {member.socialLinks.email && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${member.socialLinks.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              )}
              {member.socialLinks.linkedin && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              )}
              {member.socialLinks.github && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
              )}
              {member.socialLinks.twitter && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface AboutClientProps {
  locale: string
}

export default function AboutClient({ locale }: AboutClientProps) {
  const t = useTranslations('about')
  const [coreTeamMembers, setCoreTeamMembers] = useState<TeamMember[]>([])
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [coreTeamResponse, leadershipResponse] = await Promise.all([
          fetch('/api/team?leadership=false'),
          fetch('/api/team?leadership=true')
        ])

        const [coreTeamResult, leadershipResult] = await Promise.all([
          coreTeamResponse.json(),
          leadershipResponse.json()
        ])

        if (coreTeamResult.success) {
          setCoreTeamMembers(coreTeamResult.data)
        }

        if (leadershipResult.success) {
          setLeadershipTeam(leadershipResult.data)
        }
      } catch (error) {
        console.error('Error fetching team data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  const goals = [
    {
      icon: Users,
      title: t('goals.items.connect.title'),
      description: t('goals.items.connect.description'),
    },
    {
      icon: Code,
      title: t('goals.items.skills.title'),
      description: t('goals.items.skills.description'),
    },
    {
      icon: Heart,
      title: t('goals.items.community.title'),
      description: t('goals.items.community.description'),
    },
    {
      icon: Target,
      title: t('goals.items.opportunities.title'),
      description: t('goals.items.opportunities.description'),
    }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: t('values.corevalues.corevalue1.title'),
      description: t('values.corevalues.corevalue1.description')
    },
    {
      icon: Globe,
      title: t('values.corevalues.corevalue2.title'),
      description: t('values.corevalues.corevalue2.description')
    },
    {
      icon: Zap,
      title: t('values.corevalues.corevalue3.title'),
      description: t('values.corevalues.corevalue3.description')
    }
  ]

  return (
    <div className="container py-20 space-y-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{t('title')}</h1>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          {t('mission.description')}
        </p>
      </motion.div>

      {/* Mission Section */}
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('mission.title')}</h2>
        </motion.div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <goal.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{goal.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 -mx-4 px-4 py-16 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('values.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('values.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Leadership Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('team.leadersdescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton for leadership team
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-square rounded-t-lg" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : (
            leadershipTeam.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))
          )}
        </div>
      </section>

      {/* Full Team Section */}
      <section className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">{t('team.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('team.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton for core team
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-square rounded-t-lg" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-3 w-1/2 mx-auto" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))
          ) : (
            coreTeamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <ContactForm />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-primary/5 -mx-4 px-4 py-16 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t('contact.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a href="mailto:gdsc.tudarmstadt@gmail.com">
                <Mail className="h-4 w-4 mr-2" />
                {t('contact.email')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">
                Join Our Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/adham-elaraby/dscd-website-experimental"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/company/dsc-tu-darmstadt/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            {/* <a
              href="https://twitter.com/dsc_darmstadt"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a> */}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
