# Environment Variables Setup

This project supports environment variables in both local development and Cloudflare Pages deployment.

## Local Development

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Cloudflare Pages Deployment

### Setting Environment Variables

1. Go to your Cloudflare Pages dashboard
2. Navigate to your project
3. Go to Settings > Environment Variables
4. Add the following variables for the **Production** environment:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key_here
```

Or alternatively, you can use server-side only variables:

```
SUPABASE_URL = your_supabase_url_here
SUPABASE_ANON_KEY = your_supabase_anon_key_here
```

### How It Works

The application uses a smart environment variable detection system:

1. **Local Development**: Uses `process.env` from your `.env.local` file
2. **Cloudflare Pages**: Uses environment variables set in the Cloudflare dashboard
3. **Automatic Fallback**: If Cloudflare bindings fail, falls back to `process.env`

### Edge Runtime Compatibility

All API routes use the Edge Runtime (`export const runtime = 'edge'`) which is optimized for Cloudflare Pages. The environment variable system is designed to work seamlessly with this runtime.

### Troubleshooting

If you encounter issues:

1. **Build Fails**: Ensure environment variables are set in Cloudflare Pages dashboard
2. **Runtime Errors**: Check that variable names match exactly (case-sensitive)
3. **Local Development**: Verify `.env.local` file exists and variables are correct

### Files Modified

- `src/lib/env.ts`: Environment variable detection utility
- `src/lib/supabase.ts`: Supabase client with environment awareness
- `src/app/api/*/route.ts`: All API routes updated to use new client factory
- `wrangler.jsonc`: Cloudflare configuration with environment variable bindings