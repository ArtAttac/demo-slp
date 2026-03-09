export default function AnnouncementBar() {
  return (
    <div className="bg-brand-darkBlue flex items-center justify-center gap-4 py-2 px-4">
      <p className="text-sm md:text-base font-semibold text-white">
        NOW ACCEPTING NEW CLIENTS
      </p>
      <a
        href="#contact"
        className="inline-block px-4 py-1 text-xs md:text-sm font-bold rounded-full bg-gradient-to-r from-brand-pink to-brand-yellow text-gray-900 hover:scale-105 transition-transform duration-200"
      >
        Book a Free Consultation
      </a>
    </div>
  );
}
