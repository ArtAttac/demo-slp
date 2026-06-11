import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import readingYogisFlyer from '@/app/assets/Reading Yogis Claude Flyer.png';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Reading Yogis summer workshop registration and details.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const registrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScipkdI51SO2m5is3yJcamVEUo8oKAOvqZct3yO83NmkGFUEA/viewform?usp=header';
const embeddedFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScipkdI51SO2m5is3yJcamVEUo8oKAOvqZct3yO83NmkGFUEA/viewform?embedded=true';

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-cream via-white to-brand-pink/10">
      <nav className="sticky top-0 z-50 border-b border-brand-darkBlue/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue transition-colors hover:text-brand-bluePurple"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-brand-bluePurple px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-darkBlue"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      <main>
        <section className="pb-8 pt-16 sm:pb-10 sm:pt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-brand-darkBlue/10 bg-white shadow-xl">
              <div className="border-b border-brand-darkBlue/10 px-6 py-5 sm:px-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-brand-bluePurple">
                  Workshop
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <Image
                  src={readingYogisFlyer}
                  alt="Reading Yogis workshop flyer"
                  className="h-auto w-full rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute left-8 top-12 h-28 w-28 rounded-full bg-brand-yellow/20 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-brand-bluePurple/15 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-xl backdrop-blur-sm sm:p-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-brand-bluePurple">
                Details
              </p>
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Reading Yogis
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">
                A 7-week summer workshop using the Talk Yoga™ program as a
                foundation to help pre-readers build language and early literacy
                skills through movement, yoga, and hands-on phonics fun led by a
                certified speech-language pathologist. Designed for children ages
                3-5. Yoga mats will be provided.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-brand-cream p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-brand-darkBlue">Schedule</h2>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">
                    Wednesdays July 1st-August 12th, 2026
                    <br />
                    7 sessions
                    <br />
                    3:45-4:25pm
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-bluePurple/15">
                  <h2 className="text-xl font-bold text-brand-darkBlue">Location</h2>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">
                    Llamaste Yoga Studio
                    <br />
                    391 Bond St.
                    <br />
                    Brooklyn, NY 11231
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-pink/20">
                  <h2 className="text-xl font-bold text-brand-darkBlue">Activities</h2>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">
                    Activities include mat-based movement, music, and seated work
                    with craft materials.
                  </p>
                </div>

                <div className="rounded-3xl bg-brand-yellow/20 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-brand-darkBlue">Price</h2>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">
                    $315 for the 7-week series ($45 per class)
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-brand-darkBlue px-6 py-5 text-white shadow-lg">
                <p className="text-base leading-relaxed">
                  Advanced registration is required. Reserve your spot{' '}
                  <a
                    href={registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand-yellow underline decoration-2 underline-offset-4"
                  >
                    here
                  </a>
                  {' '}or{' '}
                  <a
                    href="#registration-form"
                    className="font-semibold text-brand-yellow underline decoration-2 underline-offset-4"
                  >
                    here at the bottom of this page
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="registration-form" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-brand-darkBlue/10 bg-white shadow-xl">
              <div className="border-b border-brand-darkBlue/10 px-6 py-5 sm:px-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-brand-bluePurple">
                  Registration Form
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Complete the form below to reserve a spot for the Reading Yogis
                  workshop.
                </p>
              </div>

              <div className="p-3 sm:p-4">
                <iframe
                  src={embeddedFormUrl}
                  title="Reading Yogis registration form"
                  className="min-h-[1516px] w-full rounded-2xl"
                  style={{ border: 0 }}
                  marginHeight={0}
                  marginWidth={0}
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
