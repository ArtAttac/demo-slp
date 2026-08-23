import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Website privacy policy for Speech on the Slope.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: August 23, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>
            Speech on the Slope respects your privacy. This Privacy Policy explains what information may be collected when you visit this website and how that information is used.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Information Collected Automatically</h2>
          <p>
            Like most websites, this site may collect limited technical information automatically through web hosting and standard server logs, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser and device type</li>
            <li>Pages viewed and referring pages</li>
            <li>Date/time of access and basic request metadata</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Protected Health Information (PHI)</h2>
          <p>
            This website is intended for general informational use and is not a patient portal. Speech on the Slope does not use this public website to collect, store, or transmit Protected Health Information (PHI).
          </p>
          <p>
            Please do not submit private medical details through general email or non-secure website channels.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Milestone Checker and Optional Email Signup</h2>
          <p>
            The Speech &amp; Language Milestone Checker is designed for a parent or guardian to complete about their child. No email address or other contact information is required to use the checker or view its results. The age group selection and quiz answers are used in the browser to generate a general educational summary; they are not sent to Speech on the Slope, saved to a patient record, or stored by the checker, and are cleared when the page is refreshed or left.
          </p>
          <p>
            The email signup is separate and optional. Only when you check the express opt-in box and submit the form do we collect and send your email address and consent to join the Speech on the Slope marketing list for workshops, events, and updates. Quiz answers, age selections, and results are not sent with that signup. We keep the email address while you remain subscribed, and you may unsubscribe or request deletion at any time by contacting{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>
            . The email address, consent time, and signup source are stored in the practice&apos;s Upstash Redis datastore. Upstash may process this information under its own privacy and retention practices.
          </p>
          <p>
            For more detail, see the{' '}
            <Link href="/milestone-checker/privacy" className="text-brand-bluePurple hover:underline">
              Milestone Checker Privacy Notice
            </Link>
            .
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Cookies and Analytics</h2>
          <p>
            This website may use essential technical cookies and may use basic analytics tools in the future to understand website traffic and improve performance. Any analytics data is used in aggregate and is not intended to identify you personally.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">How Information Is Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate, secure, and maintain the website</li>
            <li>To monitor performance and improve content and usability</li>
            <li>To comply with legal obligations when required</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Third-Party Services</h2>
          <p>
            Website infrastructure, hosting, and other technical tools may be provided by third-party vendors. Those vendors may process basic technical data in accordance with their own privacy and security policies.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Children&apos;s Privacy</h2>
          <p>
            This website is designed for parents and caregivers. It is not directed to children under 13 as an interactive service.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Policy Changes</h2>
          <p>
            Speech on the Slope may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated effective date.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Contact</h2>
          <p>
            Questions about this Privacy Policy can be sent to{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
