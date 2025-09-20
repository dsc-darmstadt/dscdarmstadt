"use client"

import { useEffect, useState } from 'react'
import { Event } from '@/lib/types'

export default function TestFeaturedEvents() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allEvents, setAllEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchAndTestEvents() {
      try {
        setLoading(true)
        const response = await fetch('/api/events')
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch events')
        }

        console.log('All events from API:', result.data)

        // Filter featured events on client side
        const featured = result.data.filter((event: Event) => event.is_featured === true)
        console.log('Filtered featured events:', featured)

        setAllEvents(result.data)
        setFeaturedEvents(featured)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAndTestEvents()
  }, [])

  if (loading) {
    return (
      <div className="container py-20">
        <h1 className="text-2xl font-bold mb-8">Featured Events Test</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-20">
        <h1 className="text-2xl font-bold mb-8">Featured Events Test</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="container py-20">
      <h1 className="text-2xl font-bold mb-8">Featured Events Test</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Found {featuredEvents.length} featured events out of {allEvents.length} total events:
        </h2>

        {featuredEvents.length === 0 ? (
          <p>No featured events found.</p>
        ) : (
          <div className="space-y-4">
            {featuredEvents.map((event: Event) => (
              <div key={event.id} className="border p-4 rounded">
                <h3 className="font-semibold">{event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Featured: {event.is_featured ? 'Yes' : 'No'}</p>
                <p>ID: {event.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Events Debug:</h2>
        <div className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
          {allEvents.map((event: Event) => (
            <div key={event.id} className="mb-2 p-2 border">
              <strong>{event.title}</strong> - Featured: {JSON.stringify(event.is_featured)} ({typeof event.is_featured})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
