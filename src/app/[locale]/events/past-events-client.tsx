"use client"

import { useTranslations, useLocale } from "next-intl"
import { useState, useEffect } from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

import { Event } from "@/lib/types"
import { formatDate, formatTime } from "@/lib/utils"

function PastEventCard({ event, index }: { event: Event; index: number }) {
  const locale = useLocale()
  const t = useTranslations("events")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(event.date, locale)}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription>{event.description}</CardDescription>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(event.date, locale)}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href={`/${locale}/events/${event.id}`}>
              {t("learnMore")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface PastEventsClientProps {
  locale: string
}

export default function PastEventsClient({ locale }: PastEventsClientProps) {
  const t = useTranslations("events")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPastEvents() {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch events')
        }

        // Filter past events on client side
        const now = new Date()
        const pastEvents = result.data
          .filter((event: Event) => new Date(event.date) < now)
          .sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime())

        setEvents(pastEvents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching past events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPastEvents()
  }, [])

  if (loading) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-20">
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold">{t("tabs.past")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("description")}
        </p>
      </motion.div>

      <Tabs value="past" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
          <TabsTrigger asChild value="upcoming">
            <Link href={`/${locale}/events`} className="w-full text-center">
              {t("tabs.upcoming")}
            </Link>
          </TabsTrigger>

          <TabsTrigger value="past">{t("tabs.past")}</TabsTrigger>
        </TabsList>

        <TabsContent value="past">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <PastEventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" />
      </Tabs>
    </div>
  )
}
