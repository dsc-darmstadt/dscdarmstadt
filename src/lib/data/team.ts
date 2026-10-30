import { TeamMember } from '../types';
import { createSupabaseClient } from '../supabase';
import { dbTeamMemberToTeamMember } from '../utils/converters';

// Server-only: queries Supabase directly so the About page renders the team into the HTML.
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await createSupabaseClient()
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data.map(dbTeamMemberToTeamMember);
}
