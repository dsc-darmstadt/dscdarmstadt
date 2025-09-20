# Developer Student Club Darmstadt Website

A modern website for DSC Darmstadt built with Next.js (App Router), TypeScript, Tailwind CSS, next-intl, and shadcn/ui. Deployed on Cloudflare Pages using next-on-pages.

## ✨ Features

### 🌍 Multi-language Support
- English and German
- Dynamic locale toggle (Navbar)
- SEO-friendly localized routes (`/[locale]/*`)

### 🌙 Theme Support
- Light and dark mode
- System preference detection
- Smooth theme transitions

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Modern and accessible UI components

### 🎨 Modern UI/UX
- shadcn/ui component library
- Framer Motion animations
- Consistent design system & accessible primitives

### 🔍 SEO Optimized
- Dynamic metadata generation
- Open Graph and Twitter Card support
- Structured data and robots.txt
- Sitemap ready

### ♿ Accessibility
- Skip navigation links
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader optimized

### 📊 Performance
- Next.js App Router (SSR/SSG)
- Optimized assets
- Code splitting & lazy loading
- Loading states & error boundaries

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dsc-darmstadt/website.git
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` at the project root and add:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GOOGLE_VERIFICATION=your_google_verification_key # optional
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   Notes:
   - These Supabase vars are required at runtime (`src/lib/supabase.ts`). If you don’t have a project yet, you may use placeholder values to boot the app, but calls to the API will fail.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
messages/                 # Localized copy (JSON): en.json, de.json
public/                   # Static assets (icons, images, manifest)
scripts/
   └── populate-db.js      # Example Supabase seeding script (adjust before use)
src/
   ├── app/
   │  ├── [locale]/        # Localized routes
   │  │  ├── about/
   │  │  ├── events/
   │  │  │  ├── [eventId]/
   │  │  │  └── past/
   │  │  ├── projects/
   │  │  └── page.tsx      # Home
   │  ├── api/
   │  │  ├── contact/
   │  │  ├── events/
   │  │  │  └── [eventId]/
   │  │  ├── projects/
   │  │  │  └── [projectId]/
   │  │  └── team/
   │  │     └── [memberId]/
   │  ├── globals.css
   │  └── layout.tsx
   ├── components/
   │  ├── layout/          # Navbar, Footer
   │  ├── home/
   │  ├── events/
   │  ├── about/
   │  └── ui/              # shadcn/ui wrappers
   ├── i18n/               # next-intl setup
   ├── lib/
   │  ├── data/            # Static fallback data
   │  ├── types/
   │  ├── utils/
   │  ├── metadata.ts      # SEO helpers
   │  └── supabase.ts      # Supabase client & DB types
   └── middleware.ts       # Locale middleware
```

## 🌐 Pages

### Home Page (`/`)
- Hero section with call-to-action
- About DSC section with mission and values
- Upcoming events preview
- Featured projects showcase

### Events Page (`/[locale]/events`)
- Tabs: Upcoming / Past
- Event cards with register/learn more
- Event detail pages

### Projects Page (`/[locale]/projects`)
- Project showcase with technology tags
- GitHub and demo links
- Team member information
- Responsive grid layout

### About Page (`/[locale]/about`)
- Mission and goals explanation
- Team member profiles
- Values and culture information
- Contact form integration

### i18n Content
- Copy lives in `messages/en.json` and `messages/de.json`.
- Keep keys in sync across locales.
- Locale middleware provides `en` and `de` routes.

## 🛠 Built With

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **next-intl**

### Backend (Ready for Integration)
- **Supabase** (database, auth, storage)
- **API Routes** (`/api/*`)
- **Contact Form** (POST `/api/contact`)

### Development Tools
- **ESLint**
- **TypeScript**

## 🔌 API Endpoints (summary)

- `GET /api/events` — list events
- `GET /api/events/[eventId]` — event by id
- `GET /api/projects` — list projects
- `GET /api/projects/[projectId]` — project by id
- `GET /api/team` — list team members
- `GET /api/team/[memberId]` — team member by id
- `POST /api/contact` — submit contact message

## ☁️ Deploy (Cloudflare Pages)

This project uses `@cloudflare/next-on-pages` to deploy Next.js to Cloudflare Pages.

Scripts:

```bash
# Build for Cloudflare Pages
npm run pages:build

# Preview locally with Wrangler
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

Configuration:
- `wrangler.jsonc` sets `pages_build_output_dir` to `.vercel/output/static` and enables `nodejs_compat`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🧪 Troubleshooting

- Dev server exits immediately (env): ensure `.env.local` contains `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- i18n 404s: make sure you visit `http://localhost:3000/en` or `http://localhost:3000/de` or have locale detection enabled via `middleware.ts`.
- Seeding data: the example `scripts/populate-db.js` assumes an ES module setup and a direct Supabase client import. Adjust paths/imports as needed before running, or insert sample rows via the Supabase dashboard.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed with ❤️ by the Developer Student Club Darmstadt team.

---

**Developer Student Club Darmstadt**
TU Darmstadt
