/**
 * Environment variable utility that works with both:
 * 1. Local development (.env files via process.env)
 * 2. Cloudflare Workers/Pages (via env bindings)
 */

// Type for Cloudflare environment bindings
export interface CloudflareEnv {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
  [key: string]: any;
}

/**
 * Get environment variable value from either process.env or Cloudflare env bindings
 * Supports both public and server-side environment variables
 */
export function getEnvVar(
  key: string, 
  cloudflareEnv?: CloudflareEnv
): string | undefined {
  // Try Cloudflare env bindings first (for Edge Runtime)
  if (cloudflareEnv && cloudflareEnv[key]) {
    return cloudflareEnv[key];
  }

  // Check if we're in Cloudflare Workers environment by looking for globalThis.env
  // This avoids import issues during build time
  if (typeof globalThis !== 'undefined' && (globalThis as any).env && (globalThis as any).env[key]) {
    return (globalThis as any).env[key];
  }

  // Fallback to process.env (for local development and Node.js runtime)
  return process.env[key];
}

/**
 * Get Supabase configuration from environment variables
 * Works in both local development and Cloudflare environments
 */
export function getSupabaseConfig(cloudflareEnv?: CloudflareEnv) {
  // Try public variables first (for client-side usage)
  let supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', cloudflareEnv);
  let supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', cloudflareEnv);

  // Fallback to server-side variables if public ones are not available
  if (!supabaseUrl) {
    supabaseUrl = getEnvVar('SUPABASE_URL', cloudflareEnv);
  }
  
  if (!supabaseAnonKey) {
    supabaseAnonKey = getEnvVar('SUPABASE_ANON_KEY', cloudflareEnv);
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set either:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (for client-side)\n' +
      '- SUPABASE_URL and SUPABASE_ANON_KEY (for server-side)\n' +
      'In Cloudflare Pages, add these as environment variables in your dashboard.'
    );
  }

  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  };
}

/**
 * Check if we're running in Cloudflare Workers/Pages environment
 */
export function isCloudflareEnvironment(): boolean {
  return typeof globalThis !== 'undefined' && 
         typeof (globalThis as any).env !== 'undefined';
}