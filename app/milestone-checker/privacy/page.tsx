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

          <h2>Optional email signup</h2>
          <p>
            The email signup is a separate, optional step and is not needed to receive or view results. We collect your email address only if you check the box agreeing to join the Speech on the Slope email list and then submit the form. The signup is used for practice marketing messages about workshops, events, and updates. Your quiz answers and results are not sent with the signup.
          </p>
          <p>
            We keep your email address on the marketing list while you remain subscribed. You can unsubscribe or request deletion at any time by emailing{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>
            . We will remove it from the practice&apos;s list after processing your request, subject to any limited retention required by law or legitimate recordkeeping. Your email address, consent time, and signup source are stored in the practice&apos;s Upstash Redis datastore. Upstash may process this information under its own privacy and retention practices.
          </p>

          <h2>Privacy policies and your rights</h2>
          <p>
            For information about how website information and optional email signups are handled more generally, please review our{' '}
            <Link href="/privacy-policy" className="text-brand-bluePurple hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/privacy-practices" className="text-brand-bluePurple hover:underline">
              Notice of Privacy Practices
            </Link>
            . The checker is not a patient portal. Please do not enter private medical details into this public tool or its optional email form.
          </p>

          <h2>Questions, deletion, or opting out</h2>
          <p>
            To ask a privacy question, request deletion of an optional email signup, or unsubscribe from the marketing list, email{' '}
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
