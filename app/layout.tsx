import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-josefin',
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://speechontheslope.com'), // Replace with your actual domain

  title: {
    default: 'Speech on the Slope | Expert Speech Therapy for Kids',
    template: '%s | Speech on the Slope'
  },

  description: 'Compassionate, play-based speech therapy services for children in Brooklyn. Specializing in early intervention, preschool services, feeding therapy, and parent coaching.',

  keywords: [
    'speech therapy',
    'speech pathology',
    'kids speech therapy',
    'pediatric speech therapy',
    'Brooklyn speech therapy',
    'early intervention',
    'feeding therapy',
    'speech therapy for kids',
    'speech pathologist',
    'communication therapy',
    'language development',
    'articulation therapy',
    'parent coaching',
    'IEP consultation',
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
    title: 'Speech on the Slope | Expert Speech Therapy for Kids',
    description: 'Compassionate, play-based speech therapy services for children in Brooklyn. Specializing in early intervention, preschool services, and parent coaching.',
    images: [
      {
        url: '/mainmainlogo.png',
        width: 1200,
        height: 630,
        alt: 'Speech on the Slope Logo',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Speech on the Slope | Expert Speech Therapy for Kids',
    description: 'Compassionate, play-based speech therapy services for children in Brooklyn.',
    images: ['/mainmainlogo.png'],
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

  // Verification for search engines
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Category for app stores
  category: 'health',

  // Alternate languages (add if you support multiple languages)
  alternates: {
    canonical: 'https://speechontheslope.com',
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
    description: 'Expert speech therapy services for children, specializing in early intervention, preschool services, and parent coaching.',
    url: 'https://speechontheslope.com',
    logo: 'https://speechontheslope.com/mainlogo.png',
    image: 'https://speechontheslope.com/mainlogo.png',
    telephone: '+1-XXX-XXX-XXXX', // Add your phone number
    email: 'info@speechontheslope.com', // Add your email

    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Your Street Address',
      addressLocality: 'Brooklyn',
      addressRegion: 'NY',
      postalCode: 'XXXXX',
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

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#171e5d" />
      </head>
      <body className={`${inter.variable} ${josefinSans.variable} font-body`}>{children}</body>
    </html>
  );
}
