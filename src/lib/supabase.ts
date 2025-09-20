import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig, type CloudflareEnv } from './env'

// Lazy-loaded client for client-side usage only
let _supabase: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (!_supabase) {
    const config = getSupabaseConfig()
    _supabase = createClient(config.url, config.anonKey)
  }
  return _supabase
}

// Export only for client-side components - do not use in API routes
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    const client = getSupabaseClient()
    return (client as any)[prop]
  }
})

// Use this function in API routes instead of importing supabase
export function createSupabaseClient(cloudflareEnv?: CloudflareEnv) {
  // Always use direct environment variable access for API routes
  const supabaseUrl = cloudflareEnv?.NEXT_PUBLIC_SUPABASE_URL || 
                     cloudflareEnv?.SUPABASE_URL ||
                     process.env.NEXT_PUBLIC_SUPABASE_URL || 
                     process.env.SUPABASE_URL
                     
  const supabaseAnonKey = cloudflareEnv?.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                         cloudflareEnv?.SUPABASE_ANON_KEY ||
                         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                         process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side)\n' +
      '- Or SUPABASE_URL and SUPABASE_ANON_KEY (for server-side)\n' +
      'In Cloudflare Pages, add these as environment variables in your dashboard.'
    )
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

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
