import { Event } from '../types';

// Helper function to get base URL
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Browser should use relative path
    return '';
  }

  // Check for Cloudflare Pages environment
  if (process.env.CF_PAGES_URL) {
    return process.env.CF_PAGES_URL;
  }

  if (process.env.VERCEL_URL) {
    // Reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NODE_ENV === 'development') {
    // Development
    return 'http://localhost:3000';
  }

  // Production fallback - try to determine from global env
  if (typeof globalThis !== 'undefined' && globalThis.location) {
    return `${globalThis.location.protocol}//${globalThis.location.host}`;
  }

  // Last resort - use current deployment URL
  return 'https://testing.dscd-website-experimental.pages.dev';
}

// Fetch events from API
export async function getEvents(): Promise<Event[]> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/events`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch events:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Get upcoming events
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  const upcoming = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

// Get past events
export async function getPastEvents(limit?: number): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  const past = events
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return limit ? past.slice(0, limit) : past;
}

// Get featured events
export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents();
  return events.filter(event => event.is_featured === true);
}

// Get single event by ID
export async function getEventById(id: string): Promise<Event | null> {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/events/${id}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch event:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

// Get all events (alias for getEvents for backward compatibility)
export async function getAllEvents(): Promise<Event[]> {
  return getEvents();
}
