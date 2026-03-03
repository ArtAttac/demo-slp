import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Speech on the Slope website.',
};

export default function TermsOfUsePage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 3, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>
            These Terms of Use govern your use of the Speech on the Slope website. By accessing or using this site, you agree to these terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Informational Use Only</h2>
          <p>
            Website content is provided for general informational and educational purposes only. It does not constitute medical, therapeutic, or legal advice and does not replace a direct evaluation by a qualified professional.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">No Provider-Patient Relationship</h2>
          <p>
            Using this website, reading website content, or contacting Speech on the Slope through general channels does not establish a speech-language pathologist-client or other healthcare provider-patient relationship.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Intellectual Property</h2>
          <p>
            The Speech on the Slope name, logos, brand identity, design elements, written copy, graphics, custom website assets, and site layout are proprietary and protected by applicable intellectual property laws.
          </p>
          <p>
            You may view and print website pages for personal, non-commercial use only. You may not reproduce, republish, distribute, scrape, modify, or create derivative works from site content without prior written permission from Speech on the Slope.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Prohibited Conduct</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Attempting unauthorized access to this website or related systems</li>
            <li>Using automated tools to copy or extract website content for competitive or commercial reuse</li>
            <li>Interfering with normal website operation or security</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Third-Party Links</h2>
          <p>
            This website may include links to third-party websites. Speech on the Slope is not responsible for third-party content, policies, or practices.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Disclaimer of Warranties</h2>
          <p>
            This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Speech on the Slope makes no warranties, express or implied, regarding website availability, accuracy, reliability, or fitness for a particular purpose.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Speech on the Slope will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from or related to website use.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of New York, without regard to conflict of law principles.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Changes to These Terms</h2>
          <p>
            Speech on the Slope may revise these Terms of Use at any time. Updates will be posted on this page with a revised effective date.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Contact</h2>
          <p>
            Questions about these Terms can be sent to{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
