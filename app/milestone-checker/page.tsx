import type { Metadata } from 'next';

import MilestoneChecker from './MilestoneChecker';

export const metadata: Metadata = {
  title: 'Speech & Language Milestone Check-In for Ages 1–5',
  description:
    'Use this free educational check-in to reflect on speech, language, and communication milestones for children ages 1 to 5.',
  alternates: {
    canonical: '/milestone-checker',
  },
  openGraph: {
    title: 'Speech & Language Milestone Check-In for Ages 1–5',
    description:
      'A warm, educational way to reflect on your child’s communication milestones and decide whether a conversation with an SLP could be helpful.',
    url: '/milestone-checker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speech & Language Milestone Check-In for Ages 1–5',
    description:
      'A free educational check-in for reflecting on communication milestones from 12 months to 5 years.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function MilestoneCheckerPage() {
  return <MilestoneChecker />;
}
