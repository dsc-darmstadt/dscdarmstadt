import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface MetadataConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  locale?: string;
}

export async function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image = '/og-image.jpg', // TODO: add real og image 1200x630px
  locale = 'en'
}: MetadataConfig): Promise<Metadata> {
  const t = await getTranslations({ locale });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dsc-darmstadt.de';
  const fullUrl = `${baseUrl}${path}`;

  const defaultTitle = 'DSCD';
  const defaultDescription = 'Join TU Darmstadt\'s developer community. Connect with industry leaders, participate in hackathons, and build the future of technology together.';

  // Don't manually add the site name here - the root layout template will handle it
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;

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
    title: metaTitle,
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
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        }
      ],
      locale: locale,
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`${baseUrl}${image}`],
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
        'en': `${baseUrl}/en${path}`,
        'de': `${baseUrl}/de${path}`,
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dsc-darmstadt.de'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DSCD' // This generates apple-mobile-web-app-title
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png', sizes: '32x32' }
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
  title: {
    default: 'DSC Darmstadt',
    template: '%s | DSCD'
  },
  description: 'Join TU Darmstadt\'s developer community. Connect with industry leaders, participate in hackathons, and build the future of technology together.',
  applicationName: 'DSC Darmstadt',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
