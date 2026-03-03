import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Website privacy policy for Speech on the Slope.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-brand-darkBlue font-bold hover:text-brand-bluePurple transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 3, 2026</p>

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
