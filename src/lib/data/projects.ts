import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "smart-campus-app",
    title: "Smart Campus Navigation App",
    description: "An intelligent mobile application that helps TU Darmstadt students navigate the campus efficiently. Features include real-time room finder, event notifications, cafeteria menus, and integration with the university's schedule system. Built with React Native and powered by machine learning for optimal route suggestions.",
    imageUrl: "/images/placeholder-project-1.jpg",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "Machine Learning", "Google Maps API"],
    repoUrl: "https://github.com/dsc-darmstadt/smart-campus-app",
    demoUrl: "https://smart-campus-demo.dsc-darmstadt.de",
    members: ["Alex Mueller", "Sarah Chen", "David Schmidt", "Lisa Wang"],
    status: "active",
    featured: true
  },
  {
    id: "sustainability-tracker",
    title: "Campus Sustainability Tracker",
    description: "A comprehensive web platform that tracks and visualizes the environmental impact of TU Darmstadt campus activities. Students can monitor energy consumption, waste reduction, and carbon footprint. Includes gamification elements to encourage sustainable behavior and community challenges.",
    imageUrl: "/images/placeholder-project-2.jpg",
    technologies: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Chart.js", "Docker"],
    repoUrl: "https://github.com/dsc-darmstadt/sustainability-tracker",
    demoUrl: "https://sustainability.dsc-darmstadt.de",
    members: ["Maria Rodriguez", "Tom Johnson", "Emma Fischer"],
    status: "completed",
    featured: true
  },
  {
    id: "ai-study-assistant",
    title: "AI-Powered Study Assistant",
    description: "An innovative study companion that uses natural language processing to help students with course materials. Features include automatic note summarization, quiz generation, study schedule optimization, and personalized learning recommendations based on individual progress patterns.",
    imageUrl: "/images/placeholder-project-3.jpg",
    technologies: ["Python", "OpenAI API", "Streamlit", "LangChain", "Vector Databases", "AWS"],
    repoUrl: "https://github.com/dsc-darmstadt/ai-study-assistant",
    members: ["Kevin Zhang", "Anna Müller", "Robert Taylor"],
    status: "active",
    featured: true
  },
  {
    id: "event-management-system",
    title: "Club Event Management System",
    description: "A modern event management platform specifically designed for student organizations. Includes event creation, registration management, attendance tracking, and automated communication features. Built with scalability in mind to serve multiple student clubs across the university.",
    imageUrl: "/images/placeholder-project-4.jpg",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Tailwind CSS"],
    repoUrl: "https://github.com/dsc-darmstadt/event-management",
    demoUrl: "https://events.dsc-darmstadt.de",
    members: ["Sophie Weber", "Max Hoffmann"],
    status: "completed",
    featured: false
  },
  {
    id: "code-review-bot",
    title: "Automated Code Review Bot",
    description: "A GitHub integration that provides intelligent code review suggestions for student projects. Uses static analysis and machine learning to identify potential issues, suggest improvements, and help maintain code quality standards across team projects.",
    imageUrl: "/images/placeholder-project-5.jpg",
    technologies: ["Python", "GitHub API", "Machine Learning", "Docker", "FastAPI"],
    repoUrl: "https://github.com/dsc-darmstadt/code-review-bot",
    members: ["James Wilson", "Nina Petrov"],
    status: "active",
    featured: false
  }
];

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getActiveProjects(): Project[] {
  return projects.filter(project => project.status === 'active');
}

export function getCompletedProjects(): Project[] {
  return projects.filter(project => project.status === 'completed');
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}
