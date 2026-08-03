import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Navigation from '@/components/Navigation';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const rawles = localFont({
  src: './fonts/Rawles.ttf',
  display: 'swap',
  variable: '--font-rawles',
});

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-outfit',
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://speechontheslope.com'), // Replace with your actual domain

  title: {
    default: 'Speech on the Slope | Brooklyn & Manhattan Speech Therapy for Kids',
    template: '%s | Speech on the Slope'
  },

  description: 'Compassionate, play-based speech therapy for children in Brooklyn and Manhattan (based in Park Slope). Specializing in speech sound disorders, myofunctional therapy, early intervention, feeding therapy, literacy support, and parent coaching.',

  keywords: [
    'speech therapy',
    'speech pathology',
    'kids speech therapy',
    'pediatric speech therapy',
    'Brooklyn speech therapy',
    'Park Slope speech therapy',
    'Park Slope speech therapist',
    'play-based speech therapy Brooklyn',
    'play-based myofunctional therapy Brooklyn',
    'play-based myofunctional therapy in Brooklyn',
    'myofunctional therapy Brooklyn',
    'pediatric myofunctional therapy Brooklyn',
    'speech sound disorder specialist Park Slope',
    'speech sound disorder therapist Brooklyn',
    'early intervention',
    'feeding therapy',
    'speech therapy for kids',
    'speech pathologist',
    'communication therapy',
    'language development',
    'articulation therapy',
    'articulation therapy Brooklyn',
    'phonological disorder therapy Brooklyn',
    'literacy support Brooklyn',
    'reading support Brooklyn',
    'parent coaching',
    'IEP consultation',
    'speech therapist Brooklyn',
    'speech therapist near me Park Slope',
    'in-home speech therapy Brooklyn',
    'tongue thrust therapy Brooklyn',
    'mouth breathing therapy kids',
    'oral motor therapy Brooklyn',
    'preschool speech therapy Brooklyn',
    'speech therapy evaluation Brooklyn',
    'language therapy for children Brooklyn',
    'speech therapy toddlers Brooklyn',
    'early intervention Brooklyn',
    'early intervention Park Slope',
    'writing support children Brooklyn',
    'phonological awareness therapy',
    'PROMPT therapy Brooklyn',
    'Orton Gillingham Brooklyn',
    'CCC-SLP Brooklyn',
    'speech therapy Carroll Gardens',
    'speech therapy Cobble Hill',
    'speech therapy Prospect Heights',
    'speech therapy Windsor Terrace',
    'speech therapy Boerum Hill',
    'play-based learning speech therapy',
    'pediatric speech therapist near me',
    'child speech delay Brooklyn',
    'speech therapy for kids near me',
  ],

  authors: [{ name: 'Speech on the Slope' }],
  creator: 'Speech on the Slope',
  publisher: 'Speech on the Slope',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://speechontheslope.com',
    siteName: 'Speech on the Slope',
    title: 'Speech on the Slope | Brooklyn & Manhattan Speech Therapy',
    description: 'Play-based speech therapy for children in Brooklyn and Park Slope, including speech sound disorders, myofunctional therapy, literacy support, and parent coaching.',
    images: [
      {
        url: '/mainlogo.png',
        width: 1200,
        height: 630,
        alt: 'Speech on the Slope Logo',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Speech on the Slope | Brooklyn & Manhattan Speech Therapy Kids',
    description: 'Play-based speech therapy in Brooklyn and Park Slope for speech sound disorders, myofunctional therapy, and literacy support.',
    images: ['/mainlogo.png'],
    creator: '@speechontheslope', // Replace with actual Twitter handle if available
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Favicon and app icons
  icons: {
    icon: '/mainlogo.png',
    apple: '/mainlogo.png',
  },

  // Category for app stores
  category: 'health',

  // Alternate languages (add if you support multiple languages)
  alternates: {
    canonical: 'https://speechontheslope.com',
    types: {
      'application/rss+xml': [
        { url: '/blog/rss.xml', title: 'Speech on the Slope Blog' },
      ],
    },
  },

  // Additional metadata
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Speech on the Slope',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) for Local Business SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': 'https://speechontheslope.com',
    name: 'Speech on the Slope',
    description: 'Play-based speech therapy for children in Brooklyn and Park Slope, specializing in speech sound disorders, myofunctional therapy, early intervention, literacy support, and parent coaching.',
    url: 'https://speechontheslope.com',
    logo: 'https://speechontheslope.com/mainlogo.png',
    image: 'https://speechontheslope.com/mainlogo.png',
    telephone: '+1-917-200-0339', // Add your phone number
    email: 'info@speechontheslope.com', // Add your email

    address: {
      '@type': 'PostalAddress',
      streetAddress: '267 9th Street',
      addressLocality: 'Brooklyn',
      addressRegion: 'NY',
      postalCode: '11215',
      addressCountry: 'US'
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.6782, // Replace with your actual coordinates
      longitude: -73.9442
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],

    priceRange: '$$',

    medicalSpecialty: 'Speech-Language Pathology',

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Speech Therapy Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Consultations',
            description: 'Complimentary 30-minute consultation to discuss your child\'s needs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preschool Services',
            description: 'Play-based therapy for ages 3-5'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Early Intervention',
            description: 'Services for infants and toddlers (0-3 years)'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Feeding Therapy',
            description: 'Address picky eating and mealtime behaviors'
          }
        }
      ]
    },

    sameAs: [
      // Add your social media profiles
      // 'https://www.facebook.com/speechontheslope',
      // 'https://www.instagram.com/speechontheslope',
      // 'https://www.linkedin.com/company/speechontheslope'
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.hisawyer.com" />
        <link rel="preconnect" href="https://cdn-fir-p.hisawyer.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/mainlogo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/mainlogo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#171e5d" />
      </head>
      <body className={`${inter.variable} ${rawles.variable} ${outfit.variable} font-body`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
