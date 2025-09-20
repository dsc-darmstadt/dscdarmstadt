import { Project } from '../types';

// Fetch projects from API
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects');
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch projects:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Get featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.featured);
}

// Get projects by status
export async function getProjectsByStatus(status: 'active' | 'completed' | 'archived'): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(project => project.status === status);
}

// Get active projects
export async function getActiveProjects(): Promise<Project[]> {
  return getProjectsByStatus('active');
}

// Get completed projects
export async function getCompletedProjects(): Promise<Project[]> {
  return getProjectsByStatus('completed');
}

// Get single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${id}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch project:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Get all projects (alias for getProjects for backward compatibility)
export async function getAllProjects(): Promise<Project[]> {
  return getProjects();
}
