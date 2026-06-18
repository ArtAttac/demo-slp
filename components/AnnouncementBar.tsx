import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Announcement" className="bg-brand-darkBlue flex flex-wrap items-center justify-center gap-3 py-2 px-4">
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base font-semibold text-white">
        <span>Private pay only at this time.</span>
        <span>NOW ACCEPTING NEW CLIENTS!</span>
      </p>
      <Link
        href="/#contact"
        className="inline-block px-4 py-1 text-xs md:text-sm font-bold rounded-full bg-gradient-to-r from-brand-pink to-brand-yellow text-gray-900 hover:scale-105 transition-transform duration-200"
      >
        Book a Free Consultation
      </Link>
    </div>
  );
}
