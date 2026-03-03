import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notice of Privacy Practices',
  description: 'HIPAA Notice of Privacy Practices for Speech on the Slope.',
};

export default function PrivacyPracticesPage() {
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Notice of Privacy Practices</h1>
        <p className="text-sm text-gray-500 mb-4">Effective Date: March 2, 2026</p>
        <p className="text-sm text-gray-500 mb-10">This notice describes how medical information about you or your child may be used and disclosed and how you can get access to this information. Please review it carefully.</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mt-10">Our Commitment to Your Privacy</h2>
          <p>
            Speech on the Slope is committed to protecting the privacy of your health information. We are required by the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its implementing regulations to maintain the privacy of your Protected Health Information (PHI), to provide you with this Notice of our legal duties and privacy practices regarding your PHI, and to abide by the terms of the Notice currently in effect.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">What Is Protected Health Information (PHI)?</h2>
          <p>
            PHI is individually identifiable health information, including demographic data, that relates to your or your child&apos;s past, present, or future physical or mental health condition, the provision of health care, or payment for health care, and that identifies you/your child or provides a reasonable basis for identification.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">How We May Use and Disclose Your PHI</h2>
          <p>We may use and disclose your PHI for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Treatment:</strong> We may use your PHI to provide, coordinate, or manage your child&apos;s speech-language pathology services. This includes sharing information with other healthcare providers involved in your child&apos;s care, such as pediatricians, teachers, or other therapists, with your written consent.</li>
            <li><strong>Payment:</strong> We may use and disclose your PHI to obtain payment for services we provide. This may include submitting claims to your health insurance plan or Early Intervention / CPSE programs.</li>
            <li><strong>Healthcare Operations:</strong> We may use and disclose your PHI for our internal operations, such as quality assessment, staff training, licensing, and accreditation activities.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Other Permitted Uses and Disclosures</h2>
          <p>We may also use or disclose your PHI without your authorization in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>As Required by Law:</strong> When required by federal, state, or local law.</li>
            <li><strong>Public Health Activities:</strong> To public health authorities for preventing or controlling disease, injury, or disability.</li>
            <li><strong>Abuse or Neglect:</strong> To report suspected child abuse or neglect to the appropriate government authority as mandated by New York State law.</li>
            <li><strong>Judicial and Administrative Proceedings:</strong> In response to a court order or lawful subpoena.</li>
            <li><strong>Serious Threats to Health or Safety:</strong> To prevent or lessen a serious and imminent threat to your health or safety or the health or safety of the public.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Uses and Disclosures Requiring Your Written Authorization</h2>
          <p>
            Any uses or disclosures of your PHI not described in this Notice will be made only with your written authorization. You may revoke your authorization at any time by submitting a written request to our office. Revocation will not affect any disclosures already made with your permission.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Your Rights Regarding Your PHI</h2>
          <p>You have the following rights regarding the PHI we maintain about you or your child:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Right to Access:</strong> You have the right to inspect and obtain a copy of your PHI maintained by our practice, with limited exceptions. A reasonable fee may apply for copies.</li>
            <li><strong>Right to Amend:</strong> You have the right to request an amendment to your PHI if you believe it is inaccurate or incomplete. We may deny the request under certain circumstances and will provide a written explanation.</li>
            <li><strong>Right to an Accounting of Disclosures:</strong> You have the right to request a list of certain disclosures we have made of your PHI.</li>
            <li><strong>Right to Request Restrictions:</strong> You have the right to request restrictions on certain uses and disclosures of your PHI. We are not required to agree to your request unless the disclosure is to a health plan for payment or operations purposes and the PHI pertains to a service you paid for out of pocket in full.</li>
            <li><strong>Right to Request Confidential Communications:</strong> You have the right to request that we communicate with you in a certain way or at a certain location (e.g., by mail to a specific address).</li>
            <li><strong>Right to a Copy of This Notice:</strong> You have the right to receive a paper copy of this Notice at any time upon request.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Complaints</h2>
          <p>
            If you believe your privacy rights have been violated, you may file a complaint with our practice or with the U.S. Department of Health and Human Services, Office for Civil Rights. You will not be penalized or retaliated against for filing a complaint.
          </p>
          <p>
            <strong>U.S. Department of Health &amp; Human Services</strong><br />
            Office for Civil Rights<br />
            200 Independence Avenue, S.W.<br />
            Washington, D.C. 20201<br />
            Toll-Free: 1-877-696-6775<br />
            Website: hhs.gov/ocr/privacy
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Changes to This Notice</h2>
          <p>
            We reserve the right to change this Notice at any time. Any revised Notice will apply to PHI we already have about you as well as any information we receive in the future. The current Notice will always be posted on our website and available at our office upon request.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-10">Contact Information</h2>
          <p>
            For questions about this Notice, to exercise any of your rights, or to file a complaint, please contact us at{' '}
            <a href="mailto:hello@speechontheslope.com" className="text-brand-bluePurple hover:underline">
              hello@speechontheslope.com
            </a>.
          </p>
        </div>
      </main>
    </div>
  );
}
