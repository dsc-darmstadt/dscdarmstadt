import { Event } from '../types';
import { createSupabaseClient } from '../supabase';
import { dbEventToEvent } from '../utils/converters';

// Server-only: pages and API routes query Supabase directly, so content lands in the HTML.

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await createSupabaseClient()
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data.map(dbEventToEvent);
}

// Upcoming soonest first, past most recent first. Relies on getEvents' date ordering.
export function splitEvents(events: Event[]) {
  const now = new Date();
  return {
    upcoming: events.filter((event) => new Date(event.date) >= now),
    past: events.filter((event) => new Date(event.date) < now).reverse(),
  };
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await createSupabaseClient()
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  // 22P02: the id is not a valid uuid, so no such event exists.
  if (error?.code === '22P02') return null;
  if (error) throw error;
  return data ? dbEventToEvent(data) : null;
}
