import { supabase } from '../lib/supabase.js';

// Sample events
const sampleEvents = [
  {
    title: "LeetCode TechJam 2.0",
    description: "Join us for the second edition of our algorithmic coding night! Tackle new LeetCode-style challenges, compete solo or in teams, and test your skills under time pressure. Expect fun twists, fresh problems, and great vibes with fellow coders. Snacks, prizes, and tech talks included!",
    date: "2024-12-15T18:00:00Z",
    location: "TU Darmstadt Campus",
    max_participants: 120,
    tags: ["challenge", "problem solving", "prizes"],
    image_url: "/images/leetcode.jpg",
    registration_url: "https://example.com/register",
    is_featured: true
  },
  {
    title: "Monthly Coding Space",
    description: "Connect with fellow students and developers at our Monthly Coding Space! This relaxed meetup is all about sharing project ideas, asking questions, and building community. Whether you're just starting out or already deep into development, join us to chat tech, get inspired, and find collaborators. All experience levels and interests welcome!",
    date: "2024-12-01T14:00:00Z",
    location: "DSC Workspace",
    max_participants: 30,
    tags: ["workshop", "community", "project exchange"],
    image_url: "/images/github.jpg",
    is_featured: false
  },
  {
    title: "AI/ML Workshop Series",
    description: "Dive into the world of Artificial Intelligence and Machine Learning with our comprehensive workshop series. Learn about neural networks, data preprocessing, and model training through hands-on projects.",
    date: "2024-11-20T16:00:00Z",
    location: "CS Building Room 101",
    max_participants: 50,
    tags: ["AI", "ML", "workshop", "hands-on"],
    image_url: "/images/aiml.jpg",
    is_featured: true
  }
];

// Sample projects
const sampleProjects = [
  {
    title: "University Food Tracker",
    description: "A web application to track meal plans and nutritional information for university students. This project helps students manage their meal plans, track nutritional intake, and discover healthy eating options on campus. Built with React and Node.js.",
    image_url: "/images/food-tracker.jpg",
    github_url: "https://github.com/dscdarmstadt/food-tracker",
    demo_url: "https://food-tracker.dscdarmstadt.de",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    team_members: ["Alice Smith", "Bob Johnson", "Charlie Brown"],
    status: "active",
    is_featured: true
  },
  {
    title: "Campus Event Planner",
    description: "A platform for organizing and discovering events happening on campus. An intuitive platform that allows students and organizations to create, manage, and discover events happening around campus. Features include event recommendations, calendar integration, and RSVP management.",
    image_url: "/images/event-planner.jpg",
    github_url: "https://github.com/dscdarmstadt/event-planner",
    technologies: ["Vue.js", "Firebase", "TypeScript"],
    team_members: ["David Wilson", "Emma Davis", "Frank Miller"],
    status: "completed",
    is_featured: false
  }
];

// Sample team members
const sampleTeamMembers = [
  {
    name: "Sarah Johnson",
    role: "DSC Lead",
    bio: "Computer Science student passionate about community building and web development. Leading the DSC Darmstadt chapter to create impactful tech solutions.",
    image_url: "/images/team/sarah.jpg",
    github_url: "https://github.com/sarahjohnson",
    linkedin_url: "https://linkedin.com/in/sarahjohnson",
    email: "sarah@dscdarmstadt.de",
    is_leadership: true,
    order_index: 1
  },
  {
    name: "Michael Chen",
    role: "Technical Lead",
    bio: "Fullstack developer with expertise in React, Node.js, and cloud technologies. Passionate about mentoring and building scalable applications.",
    image_url: "/images/team/michael.jpg",
    github_url: "https://github.com/michaelchen",
    linkedin_url: "https://linkedin.com/in/michaelchen",
    is_leadership: true,
    order_index: 2
  },
  {
    name: "Lisa Weber",
    role: "Community Manager",
    bio: "Organizing events and workshops to bring the tech community together. Background in UI/UX design and digital marketing.",
    image_url: "/images/team/lisa.jpg",
    linkedin_url: "https://linkedin.com/in/lisaweber",
    twitter_url: "https://twitter.com/lisaweber",
    is_leadership: false,
    order_index: 3
  }
];

async function populateDatabase() {
  try {
    console.log('Starting database population...');

    // Insert events
    console.log('Inserting events...');
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .insert(sampleEvents)
      .select();

    if (eventsError) {
      console.error('Error inserting events:', eventsError);
    } else {
      console.log(`Inserted ${events.length} events`);
    }

    // Insert projects
    console.log('Inserting projects...');
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .insert(sampleProjects)
      .select();

    if (projectsError) {
      console.error('Error inserting projects:', projectsError);
    } else {
      console.log(`Inserted ${projects.length} projects`);
    }

    // Insert team members
    console.log('Inserting team members...');
    const { data: teamMembers, error: teamError } = await supabase
      .from('team_members')
      .insert(sampleTeamMembers)
      .select();

    if (teamError) {
      console.error('Error inserting team members:', teamError);
    } else {
      console.log(`Inserted ${teamMembers.length} team members`);
    }

    console.log('Database population completed!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

// Run the script
populateDatabase();
