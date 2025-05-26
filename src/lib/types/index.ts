export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  registrationLink?: string;
  isPast: boolean;
  tags: string[];
  duration?: string;
  maxParticipants?: number;
  organizer?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  members: string[];
  status: 'active' | 'completed' | 'archived';
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  position: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  partnershipType: 'sponsor' | 'partner' | 'collaborator';
}
