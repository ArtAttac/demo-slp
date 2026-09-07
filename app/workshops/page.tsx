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
    images: [
      {
        url: '/workshops-share.png',
        width: 1200,
        height: 630,
        alt: 'Speech on the Slope workshops and classes for curious, growing kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Children’s Speech, Literacy & Movement Workshops',
    description: 'Browse playful speech, literacy, and movement classes for little learners.',
    images: ['/workshops-share.png'],
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
