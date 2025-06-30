import { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: "president-Jakob",
    name: "Jakob Steinke",
    role: "President",
    bio: "Computer Science student with a passion for data engineering and algorithms. Leading strategic initiatives at DSC Darmstadt and building partnerships with industry professionals.",
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
      bio: "Event management specialist coordinating our hackathons, workshops, and industry networking events. Ensuring every event creates meaningful connections.",
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
        role: "Marketing & Communications Lead",
        bio: "Digital marketing enthusiast managing our social media presence, content creation, and community outreach initiatives.",
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
        role: "Industry Partnerships Coordinator",
        bio: "Business student building bridges between DSC Darmstadt and industry partners. Facilitating sponsorships, mentorship programs, and career opportunities.",
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
