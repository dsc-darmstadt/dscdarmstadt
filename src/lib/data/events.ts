import { Event } from '../types';

export const events: Event[] = [
  {
    id: "summer-hackathon-2025",
    title: "Summer Innovation Hackathon 2025",
    description: "Join us for an exciting 48-hour hackathon focused on sustainable technology solutions. Teams will work on projects addressing climate change, renewable energy, and environmental conservation. Prizes worth €5,000 and mentorship opportunities with leading tech companies await!",
    date: "2025-07-15T09:00:00",
    location: "TU Darmstadt, Lichtwiese Campus, Building S2|02",
    imageUrl: "/images/placeholder-hackathon.jpg",
    registrationLink: "https://forms.example.com/summer-hackathon-2025",
    isPast: false,
    tags: ["hackathon", "sustainability", "innovation", "prizes"],
    duration: "48 hours",
    maxParticipants: 120,
    organizer: "DSC Darmstadt"
  },
  {
    id: "react-workshop-june",
    title: "Advanced React & Next.js Workshop",
    description: "Master modern React development with Next.js 15, Server Components, and the latest hooks. This hands-on workshop covers state management, performance optimization, and deployment strategies. Perfect for intermediate developers looking to level up their skills.",
    date: "2025-06-10T14:00:00",
    location: "TU Darmstadt, Stadtmitte Campus, Room S2|02 A213",
    imageUrl: "/images/placeholder-workshop.jpg",
    registrationLink: "https://forms.example.com/react-workshop",
    isPast: false,
    tags: ["workshop", "react", "nextjs", "web development"],
    duration: "4 hours",
    maxParticipants: 30,
    organizer: "DSC Darmstadt"
  },
  {
    id: "ai-ml-symposium",
    title: "AI & Machine Learning Industry Symposium",
    description: "Connect with industry leaders from Google, Microsoft, and SAP as they share insights on the latest AI trends. Network with professionals, attend technical talks, and discover internship opportunities in machine learning and data science.",
    date: "2025-08-20T10:00:00",
    location: "TU Darmstadt, darmstadtium Convention Center",
    imageUrl: "/images/placeholder-symposium.jpg",
    registrationLink: "https://forms.example.com/ai-symposium",
    isPast: false,
    tags: ["symposium", "ai", "machine learning", "networking", "industry"],
    duration: "6 hours",
    maxParticipants: 200,
    organizer: "DSC Darmstadt"
  },
  {
    id: "winter-coding-bootcamp",
    title: "Winter Coding Bootcamp 2024",
    description: "An intensive 3-day coding bootcamp covering full-stack development with modern technologies. Participants built real-world applications and competed in daily coding challenges. Featured guest speakers from leading tech companies shared career insights.",
    date: "2024-12-05T09:00:00",
    location: "TU Darmstadt, Computer Science Building",
    imageUrl: "/images/placeholder-bootcamp.jpg",
    isPast: true,
    tags: ["bootcamp", "full-stack", "coding", "career"],
    duration: "3 days",
    maxParticipants: 80,
    organizer: "DSC Darmstadt"
  },
  {
    id: "blockchain-workshop-2024",
    title: "Blockchain & Web3 Development Workshop",
    description: "Explored the fundamentals of blockchain technology and smart contract development. Participants learned Solidity programming, built DApps, and discovered opportunities in the growing Web3 ecosystem.",
    date: "2024-10-15T13:00:00",
    location: "TU Darmstadt, Innovation Lab",
    imageUrl: "/images/placeholder-blockchain.jpg",
    isPast: true,
    tags: ["workshop", "blockchain", "web3", "solidity", "smart contracts"],
    duration: "5 hours",
    maxParticipants: 40,
    organizer: "DSC Darmstadt"
  }
];

export function getUpcomingEvents(limit?: number): Event[] {
  const upcoming = events
    .filter(event => !event.isPast)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getPastEvents(limit?: number): Event[] {
  const past = events
    .filter(event => event.isPast)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return limit ? past.slice(0, limit) : past;
}

export function getAllEvents(): Event[] {
  return events;
}

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getFeaturedEvents(limit: number = 3): Event[] {
  return getUpcomingEvents(limit);
}
