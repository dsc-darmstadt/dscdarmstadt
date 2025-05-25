# Developer Student Club Darmstadt Website

A modern, professional website for the Developer Student Club at TU Darmstadt, built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## ✨ Features

### 🌍 Multi-language Support
- English and German translations
- Dynamic locale switching
- SEO-optimized URLs for each language

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
- Motion animations with motion-primitives
- Consistent design system
- Interactive hover effects

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
- Next.js App Router with SSR/SSG
- Optimized images and fonts
- Code splitting and lazy loading
- Loading states and error boundaries

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

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
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GOOGLE_VERIFICATION=your_google_verification_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── events/        # Events listing and details
│   │   ├── projects/      # Projects showcase
│   │   └── page.tsx       # Home page
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form submission
│   │   └── events/        # Events API endpoints
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (Navbar, Footer)
│   ├── home/             # Home page specific components
│   ├── events/           # Event components
│   ├── about/            # About page components
│   └── accessibility/    # Accessibility components
├── lib/                  # Utility functions and data
│   ├── data/            # Static data and content
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── metadata.ts      # SEO metadata configuration
├── i18n/                # Internationalization setup
└── middleware.ts        # Next.js middleware for i18n
```

## 🌐 Pages

### Home Page (`/`)
- Hero section with call-to-action
- About DSC section with mission and values
- Upcoming events preview
- Featured projects showcase

### Events Page (`/events`)
- Tabbed interface for upcoming and past events
- Event cards with registration links
- Individual event detail pages
- Filtering and search capabilities

### Projects Page (`/projects`)
- Project showcase with technology tags
- GitHub and demo links
- Team member information
- Responsive grid layout

### About Page (`/about`)
- Mission and goals explanation
- Team member profiles
- Values and culture information
- Contact form integration

## 🛠 Built With

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Motion** - Animation library
- **next-intl** - Internationalization

### Backend (Ready for Integration)
- **Supabase** - Backend as a Service (database, auth, storage)
- **API Routes** - Next.js API endpoints
- **Contact Form** - Email submission handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Developed with ❤️ by the Developer Student Club Darmstadt team.

---

**Developer Student Club Darmstadt**
TU Darmstadt
