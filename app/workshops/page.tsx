import type { Metadata } from 'next';

import SawyerWorkshopsEmbed from '@/components/SawyerWorkshopsEmbed';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Browse and register for classes and workshops from Speech on the Slope.',
  alternates: {
    canonical: '/workshops',
  },
  openGraph: {
    title: 'Reading Yogis',
    description: 'A playful literacy and movement experience for little learners from Speech on the Slope.',
    url: '/workshops',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reading Yogis',
    description: 'Stretch, sound out, and shine with Speech on the Slope.',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function WorkshopsPage() {
  return <SawyerWorkshopsEmbed />;
}
