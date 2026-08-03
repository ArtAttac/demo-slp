import type { Metadata } from 'next';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Speech on the Slope evaluations, therapy sessions, insurance, and service areas.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <main>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
