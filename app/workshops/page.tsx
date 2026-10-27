import type { Metadata } from 'next';

import EventsPage from '@/components/EventsPage';
import { EVENT_DETAILS, isEventPast } from '@/components/events-data';
import Footer from '@/components/Footer';

// The previous Sawyer classes page is preserved in components/legacy/LegacyClassesPage.tsx.

// Re-render hourly so the page flips to its "past event" state shortly after the event ends.
export const revalidate = 3600;

const upcomingDescription =
  'Join Speech on the Slope at Rikud Studio on Saturday, November 7 for a free Reading Yogis early literacy class (ages 3-5) followed by crafts, games, snacks, and family fun for all ages.';
const pastDescription =
  'Community events from Speech on the Slope in Brooklyn, including our Reading Yogis early literacy and movement pop-ups. Follow along for upcoming family events.';

export function generateMetadata(): Metadata {
  const isPast = isEventPast();
  const title = isPast ? 'Community Events for Brooklyn Families' : EVENT_DETAILS.name;
  const description = isPast ? pastDescription : upcomingDescription;
  const image = isPast
    ? { url: '/workshops-share.png', width: 1200, height: 630, alt: 'Speech on the Slope events for curious, growing kids' }
    : {
        url: EVENT_DETAILS.shareImageSrc,
        width: 1200,
        height: 630,
        alt: 'Free Reading Yogis Pop-Up & Family Celebration, Saturday Nov 7 at Rikud Studio, Brooklyn',
      };

  return {
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
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
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
}

const eventStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: EVENT_DETAILS.name,
  description: upcomingDescription,
  startDate: EVENT_DETAILS.startDate,
  endDate: EVENT_DETAILS.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [
    `https://speechontheslope.com${EVENT_DETAILS.shareImageSrc}`,
    `https://speechontheslope.com${EVENT_DETAILS.flyerSrc}`,
  ],
  isAccessibleForFree: true,
  typicalAgeRange: '3-5',
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
    validFrom: '2026-10-27T00:00:00-04:00',
  },
};

export default function WorkshopsPage() {
  const isPast = isEventPast();

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Only advertise the event to search engines while it's upcoming. */}
      {!isPast && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
        />
      )}
      <EventsPage isPast={isPast} />
      <Footer />
    </div>
  );
}
