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
  image = '/og-image.jpg',
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
      'theme-color': '#4285F4',
      'color-scheme': 'light dark',
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dsc-darmstadt.de'),
  title: {
    default: 'Developer Student Club Darmstadt',
    template: '%s | Developer Student Club Darmstadt'
  },
  description: 'Join TU Darmstadt\'s premier developer community. Connect with industry leaders, participate in hackathons, and build the future of technology together.',
  applicationName: 'DSC Darmstadt',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
