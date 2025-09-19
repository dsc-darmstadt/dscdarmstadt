import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          end_date: string | null
          location: string
          max_participants: number | null
          current_participants: number
          tags: string[]
          image_url: string
          registration_url: string | null
          is_featured: boolean
          learning_objectives: string[]
          target_audience: string | null
          requirements: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          end_date?: string | null
          location: string
          max_participants?: number | null
          current_participants?: number
          tags: string[]
          image_url: string
          registration_url?: string | null
          is_featured?: boolean
          learning_objectives?: string[]
          target_audience?: string | null
          requirements?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          end_date?: string | null
          location?: string
          max_participants?: number | null
          current_participants?: number
          tags?: string[]
          image_url?: string
          registration_url?: string | null
          is_featured?: boolean
          learning_objectives?: string[]
          target_audience?: string | null
          requirements?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          github_url: string | null
          demo_url: string | null
          technologies: string[]
          team_members: string[]
          status: 'active' | 'completed' | 'archived'
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          github_url?: string | null
          demo_url?: string | null
          technologies: string[]
          team_members: string[]
          status?: 'active' | 'completed' | 'archived'
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          github_url?: string | null
          demo_url?: string | null
          technologies?: string[]
          team_members?: string[]
          status?: 'active' | 'completed' | 'archived'
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string
          image_url: string
          github_url: string | null
          linkedin_url: string | null
          twitter_url: string | null
          email: string | null
          is_leadership: boolean
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio: string
          image_url: string
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          email?: string | null
          is_leadership?: boolean
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string
          image_url?: string
          github_url?: string | null
          linkedin_url?: string | null
          twitter_url?: string | null
          email?: string | null
          is_leadership?: boolean
          order_index?: number | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}