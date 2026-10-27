import { Metadata } from 'next';

// Single source for absolute URLs (canonical, OG, sitemap, robots). Set NEXT_PUBLIC_BASE_URL once a custom domain exists.
export const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dscdarmstadt.pages.dev';

const siteName = 'DSC Darmstadt';
const siteDescription = 'Join TU Darmstadt\'s developer community. Connect with industry leaders, participate in hackathons, and build the future of technology together.';

interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  /** Route path without the locale prefix, e.g. '/events'. */
  path?: string;
  /** Absolute URL or path under /public. */
  image?: string;
  locale?: string;
}

export async function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image = '/og-image.jpg',
  locale = 'en'
}: MetadataConfig): Promise<Metadata> {
  const fullUrl = `${siteUrl}/${locale}${path}`;

  const metaTitle = title || siteName;
  const metaDescription = description || siteDescription;

  const defaultKeywords = [
    'Developer Student Club',
    'DSC Darmstadt',
    'TU Darmstadt',
    'Programming',
    'Hackathon',
    'Tech Community',
    'Student Developer',
    'Software Engineering',
    'Computer Science',
    'Technology Events'
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    // Pages without a title (home) show the bare site name instead of "X | DSCD".
    title: title || { absolute: siteName },
    description: metaDescription,
    keywords: allKeywords.join(', '),
    authors: [{ name: 'Developer Student Club Darmstadt' }],
    creator: 'Developer Student Club Darmstadt',
    publisher: 'Developer Student Club Darmstadt',

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: 'Developer Student Club Darmstadt',
      // Relative paths resolve against metadataBase.
      images: [{ url: image, alt: metaTitle }],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [image],
      creator: '@dsc_darmstadt',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },

    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${siteUrl}/en${path}`,
        'de': `${siteUrl}/de${path}`,
      },
    },

    manifest: '/manifest.json',

    other: {
      'theme-color': '#ffffff',
      'color-scheme': 'light dark',
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DSC Darmstadt' // This generates apple-mobile-web-app-title
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png', sizes: '96x96' }
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      }
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon.png',
        sizes: '180x180'
      },
      {
        rel: 'mask-icon',
        url: '/icon0.svg',
        color: '#4285F4'
      }
    ]
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
  manifest: '/manifest.json',
  title: {
    default: siteName,
    template: '%s | DSCD'
  },
  description: siteDescription,
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
