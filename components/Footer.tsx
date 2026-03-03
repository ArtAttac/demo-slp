import Link from 'next/link';

const legalLinks = [
  { href: '/privacy-practices', label: 'Notice of Privacy Practices' },
  { href: '/patient-rights-good-faith-estimate', label: 'Patient Rights & Good Faith Estimate' },
  { href: '/disclaimer', label: 'Medical & Professional Disclaimer' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-use', label: 'Terms of Use' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-darkBlue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Legal</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-200 hover:text-white hover:underline transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-gray-300 mb-4">
          &copy; {new Date().getFullYear()} Speech on the Slope. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm">
          Business phone coming soon | hello@speechontheslope.com
        </p>
      </div>
    </footer>
  );
}
