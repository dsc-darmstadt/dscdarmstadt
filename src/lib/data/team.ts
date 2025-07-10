import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: "president-Jakob",
    name: "Jakob Steinke",
    role: "President",
    bio: "Computer Science student focused on data systems and algorithm design. Drives strategic growth at DSC Darmstadt and fosters collaboration with industry partners.",
    imageUrl: "/images/placeholder-team-1.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/username",
      github: "https://github.com/jakobsteinke",
      email: "president@dsc-darmstadt.de"
    },
    position: 1
  },
  {
      id: "vp-events-mehmet",
      name: "Mehmet Bulut",
      role: "Vice President - Events",
      bio: "Organizes hackathons, workshops, and networking events that bring the DSC community together. Focused on creating experiences that inspire connection and collaboration.",
      imageUrl: "/images/placeholder-team-3.jpg",
      socialLinks: {
          linkedin: "https://linkedin.com/in/maria-rodriguez",
          twitter: "https://twitter.com/mariarodriguez",
          email: "events@dsc-darmstadt.de"
        },
        position: 3
    },
    {
        id: "marketing-lead-samer",
        name: "Samer Boughanmi",
        role: "Core Team Member",
        bio: "Tech enthusiast and CS student shaping the culture of DSC Darmstadt through project work, mentorship, and meaningful peer collaboration.",
        imageUrl: "/images/placeholder-team-4.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/tom-wagner",
            twitter: "https://twitter.com/tomwagner",
            email: "marketing@dsc-darmstadt.de"
        },
        position: 4
    },
    {
        id: "partnerships-abdelhamid",
        name: "Abdelhamid Ed Houari",
        role: "Core Team Member",
        bio: "Active contributor to DSC’s technical and event-driven projects. Brings a CS background and collaborative mindset to every challenge.",
        imageUrl: "/images/placeholder-team-5.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/emma-fischer",
            email: "partnerships@dsc-darmstadt.de"
        },
        position: 5
    },
    {
        id: "dev-lead-adham",
        name: "Adham Elaraby",
        role: "Lead Developer",
        bio: "Software engineering student leading our technical projects and mentoring junior developers. Specializes in cloud technologies and DevOps practices.",
        imageUrl: "/images/placeholder-team-6.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/adham-elaraby",
            github: "https://github.com/adham-elaraby",
            email: "dev@dsc-darmstadt.de"
        },
        position: 2
    },
    {
      id: "vp-tech-arda",
      name: "Arda Nazim Atalay",
      role: "Vice President - Technology",
      bio: "Full-stack developer with expertise in modern web technologies. Organizes technical workshops and manages our development projects and hackathons.",
      imageUrl: "/images/placeholder-team-2.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarah-chen",
        github: "https://github.com/sarahchen",
        email: "tech@dsc-darmstadt.de"
      },
    position: 6
  },
  {
        id: "dev-lead-adham",
        name: "Harjot Singh Maan",
        role: "Core Team Member",
        bio: "Blending software engineering experience with community impact. A CS student actively involved in shaping real-world projects at DSC Darmstadt.",
        imageUrl: "/images/placeholder-team-6.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/adham-elaraby",
            github: "https://github.com/adham-elaraby",
            email: "dev@dsc-darmstadt.de"
        },
        position: 7
    },
    {
        id: "dev-lead-adham",
        name: "Bahadir Acikbas",
        role: "Core Team Member",
        bio: "Combines a strong CS foundation with active involvement in DSC Darmstadt. Supports workshops, coding projects, and peer collaboration.",
        imageUrl: "/images/placeholder-team-6.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/adham-elaraby",
            github: "https://github.com/adham-elaraby",
            email: "dev@dsc-darmstadt.de"
        },
        position: 8
    },
    {
        id: "dev-lead-adham",
        name: "Prit Goyani",
        role: "Core Team Member",
        bio: "Computer Science student supporting the club’s growth through technical projects, peer events, and collaborative planning.",
        imageUrl: "/images/placeholder-team-6.jpg",
        socialLinks: {
            linkedin: "https://linkedin.com/in/adham-elaraby",
            github: "https://github.com/adham-elaraby",
            email: "dev@dsc-darmstadt.de"
        },
        position: 9
    }
];

export function getTeamMembers(): TeamMember[] {
  return teamMembers
    .filter(member =>
      !member.role.includes('President') && !member.role.includes('Vice President')
    )
    .sort((a, b) => a.position - b.position);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
}

export function getLeadershipTeam(): TeamMember[] {
  return teamMembers.filter(member =>
    member.role.includes('President') || member.role.includes('Vice President')
  ).sort((a, b) => a.position - b.position);
}
