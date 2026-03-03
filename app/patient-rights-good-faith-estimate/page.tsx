import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Rights & Good Faith Estimate',
  description: 'No Surprises Act disclosure and Good Faith Estimate rights for patients of Speech on the Slope.',
};

export default function PatientRightsGoodFaithEstimatePage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Patient Rights &amp; Good Faith Estimate</h1>
        <p className="text-sm text-gray-500 mb-4">Effective Date: March 3, 2026</p>
        <p className="text-sm text-gray-500 mb-10">
          Under federal law, healthcare providers must give uninsured or self-pay patients information about expected charges and their right to receive a Good Faith Estimate.
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-10">Your Right to a Good Faith Estimate</h2>
          <p>
            You have the right to receive a Good Faith Estimate (GFE) that explains the expected costs of speech-language pathology services for you or your child before services are provided.
          </p>
          <p>
            A Good Faith Estimate is available to individuals who are not using insurance for care (including uninsured and self-pay families). You can request an estimate before scheduling services or at any time before treatment begins.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">When You Should Receive It</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>If services are scheduled at least 10 business days in advance, you should receive your estimate within 3 business days after scheduling.</li>
            <li>If services are scheduled at least 3 business days in advance, you should receive your estimate within 1 business day after scheduling.</li>
            <li>If you request a Good Faith Estimate without scheduling services, you should receive it within 3 business days of your request.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">What Your Estimate May Include</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Evaluation and treatment session fees</li>
            <li>Frequency and expected duration of services</li>
            <li>Any reasonably expected related service costs, when known</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">If Your Bill Is Much Higher Than Your Estimate</h2>
          <p>
            If you receive a bill that is at least $400 more than your Good Faith Estimate, you may be eligible to dispute the bill through the federal patient-provider dispute resolution process. You must begin the dispute process within 120 calendar days of the date on the original bill.
          </p>
          <p>
            Keep a copy or photo of your Good Faith Estimate for your records.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">How to Request a Good Faith Estimate</h2>
          <p>
            To request a Good Faith Estimate from Speech on the Slope, contact us at{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>{' '}
            or by phone (business line coming soon).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Additional Information</h2>
          <p>
            For more information about your rights under the No Surprises Act, visit{' '}
            <a
              href="https://www.cms.gov/nosurprises"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-bluePurple hover:underline"
            >
              cms.gov/nosurprises
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
