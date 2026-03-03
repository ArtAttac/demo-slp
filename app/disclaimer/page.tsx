import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical & Professional Disclaimer',
  description: 'Medical and professional disclaimer for Speech on the Slope.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-brand-darkBlue font-bold hover:text-brand-bluePurple transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Medical &amp; Professional Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated: March 2, 2026</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <p>
            The content provided on the Speech on the Slope website is for general informational and educational purposes only. It is not intended as, nor should it be considered a substitute for, professional medical or therapeutic advice, diagnosis, or treatment.
          </p>

          <p>
            Browsing this website, reading our materials, or contacting us does not establish a speech-language pathologist-client relationship between you and any therapist at Speech on the Slope. Every child&apos;s communication and developmental needs are unique. Always seek the direct advice of a qualified healthcare provider, pediatrician, or licensed speech-language pathologist with any questions you may have regarding your child&apos;s speech, language, feeding, or overall development. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">No Guarantees</h2>
          <p>
            While Speech on the Slope strives to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on this website. Any reliance you place on such information is strictly at your own risk.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">External Links</h2>
          <p>
            This website may contain links to external websites that are not operated by Speech on the Slope. We have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies or content.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Contact</h2>
          <p>
            If you have questions about this disclaimer, please contact us at{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
