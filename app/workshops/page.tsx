import type { Metadata } from 'next';

import SawyerWorkshopsEmbed from '@/components/SawyerWorkshopsEmbed';

export const metadata: Metadata = {
  title: 'Children’s Speech, Literacy & Movement Workshops',
  description:
    'Browse children’s speech, literacy, and movement classes and workshops from Speech on the Slope in Brooklyn.',
  alternates: {
    canonical: '/workshops',
  },
  openGraph: {
    title: 'Children’s Speech, Literacy & Movement Workshops',
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function WorkshopsPage() {
  return <SawyerWorkshopsEmbed />;
}
