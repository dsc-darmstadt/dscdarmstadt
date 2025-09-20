import { TeamMember } from '../types';

// Fetch team members from API
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/team`)
    const result = await response.json()

    if (!result.success) {
      console.error('Failed to fetch team members:', result.error)
      return []
    }

    return result.data
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

// Get leadership team members
export async function getLeadershipMembers(): Promise<TeamMember[]> {
  const teamMembers = await getTeamMembers();
  // In the database, we use is_leadership field, but in frontend we can filter by role or position
  return teamMembers.filter(member =>
    member.role.toLowerCase().includes('president') ||
    member.role.toLowerCase().includes('lead') ||
    member.role.toLowerCase().includes('director')
  );
}

// Get team members by role
export async function getTeamMembersByRole(role: string): Promise<TeamMember[]> {
  const teamMembers = await getTeamMembers();
  return teamMembers.filter(member =>
    member.role.toLowerCase().includes(role.toLowerCase())
  );
}

// Get single team member by ID
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/team/${id}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch team member:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
}

// Get all team members (alias for getTeamMembers for backward compatibility)
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return getTeamMembers();
}
