import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import MilestoneChecker from './MilestoneChecker';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Speech & Language Milestone Checker',
  description:
    'Explore age-based speech and language milestones for children from 12 months to 5 years with this free educational milestone checker.',
  alternates: {
    canonical: '/milestone-checker',
  },
  openGraph: {
    title: 'Speech & Language Milestone Checker',
    description:
      'A warm, educational way to reflect on your child’s communication milestones and decide whether a conversation with an SLP could be helpful.',
    url: '/milestone-checker',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

type MilestoneCheckerPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MilestoneCheckerPage({ searchParams }: MilestoneCheckerPageProps) {
  const params = await searchParams;
  const testQuiz = params.testquiz;

  if (Array.isArray(testQuiz) || testQuiz !== '1') {
    notFound();
  }

  return <MilestoneChecker />;
}
