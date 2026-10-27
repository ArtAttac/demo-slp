import type { Metadata } from 'next';

import EventsPage from '@/components/EventsPage';
import { EVENT_DETAILS } from '@/components/events-data';
import Footer from '@/components/Footer';

// The previous Sawyer classes page is preserved in components/legacy/LegacyClassesPage.tsx.

const title = 'Free Reading Yogis Pop-Up & Family Celebration';
const description =
  'Join Speech on the Slope at Rikud Studio on Saturday, November 7 for a free Reading Yogis early literacy class (ages 3-5) followed by crafts, games, snacks, and family fun for all ages.';

export const metadata: Metadata = {
  title: `${title} | Events`,
  description,
  alternates: {
    canonical: '/workshops',
  },
  openGraph: {
    title,
    description,
    url: '/workshops',
    type: 'website',
    images: [
      {
        url: '/workshops-share.png',
        width: 1200,
        height: 630,
        alt: 'Speech on the Slope events for curious, growing kids',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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

const eventStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: title,
  description,
  startDate: '2026-11-07T12:15:00-05:00',
  endDate: '2026-11-07T14:00:00-05:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: ['https://speechontheslope.com/events/reading-yogis-flyer.png'],
  isAccessibleForFree: true,
  location: {
    '@type': 'Place',
    name: EVENT_DETAILS.venue,
    address: {
      '@type': 'PostalAddress',
      streetAddress: EVENT_DETAILS.street,
      addressLocality: 'Brooklyn',
      addressRegion: 'NY',
      postalCode: '11238',
      addressCountry: 'US',
    },
  },
  organizer: [
    { '@type': 'Organization', name: 'Speech on the Slope', url: 'https://speechontheslope.com' },
    { '@type': 'Organization', name: 'Little Makers Studio' },
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/LimitedAvailability',
    url: EVENT_DETAILS.registerUrl,
  },
};

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <EventsPage />
      <Footer />
    </div>
  );
}
