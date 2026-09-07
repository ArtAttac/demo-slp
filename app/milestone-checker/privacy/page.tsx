import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Milestone Checker Privacy Notice',
  description: 'Privacy information for the Speech on the Slope Milestone Checker.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MilestoneCheckerPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-bluePurple">Speech on the Slope</p>
        <h1 className="mt-3 text-3xl font-bold text-brand-darkBlue sm:text-4xl">Milestone Checker Privacy Notice</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: August 23, 2026</p>

        <div className="prose prose-gray mt-10 max-w-none space-y-6 leading-relaxed">
          <p>
            This notice explains what happens when a parent or guardian uses the Speech &amp; Language Milestone Checker. The checker is designed to be completed by a parent or guardian about their child, not by a child directly. Results display on screen only, and no email address or other contact information is required to view them.
          </p>

          <h2>What information the checker uses</h2>
          <p>
            The checker uses the age group you select and your answers to generate a general educational summary. Those quiz answers are used in your browser only; they are not sent to Speech on the Slope, saved to a patient record, or stored by this checker. They remain available only while the page is open and are cleared when you refresh or leave the page.
          </p>

          <h2>Privacy policies and your rights</h2>
          <p>
            For information about how website information is handled more generally, please review our{' '}
            <Link href="/privacy-policy" className="text-brand-bluePurple hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-practices" className="text-brand-bluePurple hover:underline">
              Notice of Privacy Practices
            </Link>
            . The checker is not a patient portal. Please do not enter private medical details into this public tool.
          </p>

          <h2>Questions</h2>
          <p>
            To ask a privacy question, email{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>
            .
          </p>
        </div>

        <Link href="/milestone-checker" className="mt-10 inline-flex font-semibold text-brand-bluePurple underline underline-offset-4 hover:text-brand-darkBlue">
          Return to the milestone check-in
        </Link>
      </main>
    </div>
  );
}
