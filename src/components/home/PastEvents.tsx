"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PastEvent } from "@/lib/types"
import { formatDate, formatTime } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { Calendar, MapPin, Clock } from "lucide-react"

interface PastEventsProps {
  events: PastEvent[]
}

export function PastEvents({ events }: PastEventsProps) {
  const t = useTranslations("events")
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
            {/* ─── image block ─────────────────────────────────── */}
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              {event.imageUrl ? (
                <Image
                  src={event.imageUrl}          // e.g. "/images/ai.jpg"
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 384px, 320px"
                  priority={index === 0}        // eager-load only first card
                />
              ) : (
                <div className="bg-gradient-to-br from-muted/20 to-muted/10 h-full w-full flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Event Image</p>
                </div>
              )}
            </div>
            {/* ─────────────────────────────────────────────────── */}

            <CardHeader>
              <CardTitle className="line-clamp-2 pb-1">{event.title}</CardTitle>
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
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
