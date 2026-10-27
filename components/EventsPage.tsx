'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { EVENT_DETAILS } from '@/components/events-data';

const schedule = [
  {
    time: '12:15 PM',
    range: '12:15–1:00 PM',
    title: 'Reading Yogis',
    ages: 'Ages 3–5',
    pill: 'bg-brand-yellow',
    accent: 'text-brand-bluePurple',
    border: 'border-brand-yellow',
    description:
      'Brooklyn’s most-loved SLP-led reading & yoga class. A playful early literacy class with stories, movement & games!',
    tag: null,
  },
  {
    time: '1:00 PM',
    range: '1:00–2:00 PM',
    title: 'Crafts, Games, Snacks & Family Fun',
    ages: 'All ages',
    pill: 'bg-brand-pink',
    accent: 'text-brand-pink',
    border: 'border-brand-pink',
    description:
      'Hands-on crafts with Little Makers Studio, plus games, snacks, a raffle & more. Stay after class or sign up for the party on its own!',
    tag: 'Siblings welcome!',
  },
];

const quickFacts = [
  { label: 'Free', detail: 'No cost to attend' },
  { label: 'Ages 3–5', detail: 'Reading Yogis class' },
  { label: 'All ages', detail: 'Family celebration' },
];

/* ---------- Decorative shapes ---------- */

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z"
      />
    </svg>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
    </svg>
  );
}

function Book({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      <path fill="#fff6e9" stroke="#171e5d" strokeWidth="3" strokeLinejoin="round" d="M32 10C24 4 12 4 4 7v35c8-3 20-3 28 3 8-6 20-6 28-3V7c-8-3-20-3-28 3z" />
      <path stroke="#171e5d" strokeWidth="3" d="M32 10v35" />
      <path stroke="#f899b3" strokeWidth="2.5" strokeLinecap="round" d="M11 16c5-1.5 10-1 15 1M11 23c5-1.5 10-1 15 1M38 17c5-2 10-2.5 15-1M38 24c5-2 10-2.5 15-1" />
    </svg>
  );
}

function Float({
  children,
  className,
  delay = 0,
  duration = 6,
  distance = 14,
  rotate = 8,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
  duration?: number;
  distance?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={
        reduceMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -distance, 0], rotate: [0, rotate, 0] }
      }
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: duration * 1.3, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
    </svg>
  );
}

function RegisterButton({ label, size = 'md' }: { label: string; size?: 'md' | 'lg' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={EVENT_DETAILS.registerUrl}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-brand-darkBlue bg-gradient-to-r from-brand-yellow to-brand-pink font-bold text-brand-darkBlue shadow-[4px_4px_0_#171e5d] transition-shadow duration-300 hover:shadow-[6px_6px_0_#171e5d] ${
        size === 'lg' ? 'px-10 py-5 text-xl' : 'px-8 py-4 text-lg'
      }`}
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/50"
          initial={{ left: '-40%' }}
          animate={{ left: '140%' }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
        />
      )}
      <span className="relative">{label}</span>
      <span className="relative">
        <ArrowIcon />
      </span>
    </motion.a>
  );
}

/* ---------- Page ---------- */

export default function EventsPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-brand-bluePurple pb-36 pt-14 sm:pb-44 sm:pt-20">
        <Float className="left-[6%] top-10 text-brand-yellow" delay={0.2}>
          <Star className="h-10 w-10 sm:h-14 sm:w-14" />
        </Float>
        <Float className="right-[8%] top-16 text-brand-pink" delay={0.5} duration={7}>
          <Sparkle className="h-8 w-8 sm:h-12 sm:w-12" />
        </Float>
        <Float className="bottom-40 left-[10%] hidden sm:block" delay={0.8} duration={8} rotate={-10}>
          <Book className="h-16 w-20 drop-shadow-lg" />
        </Float>
        <Float className="bottom-44 right-[12%] text-brand-cream" delay={1.1} duration={5}>
          <Sparkle className="h-6 w-6 sm:h-9 sm:w-9" />
        </Float>
        <Float className="right-[30%] top-6 hidden text-brand-cream/70 md:block" delay={1.4} duration={9}>
          <Star className="h-6 w-6" />
        </Float>
        <Float className="left-[28%] bottom-52 hidden md:block" delay={1.7} duration={7} distance={20}>
          <div className="h-5 w-5 rounded-full bg-brand-yellow" />
        </Float>
        <Float className="right-[22%] bottom-60 hidden md:block" delay={2} duration={6} distance={18}>
          <div className="h-4 w-4 rounded-full bg-brand-pink" />
        </Float>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
            className="mb-6 inline-block"
          >
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block rounded-2xl border-2 border-brand-darkBlue bg-brand-yellow px-5 py-2 font-heading text-2xl tracking-wide text-brand-darkBlue shadow-[4px_4px_0_#171e5d] sm:text-3xl"
            >
              FREE!
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-base"
          >
            Upcoming Event
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-heading text-5xl leading-[1.05] text-brand-darkBlue sm:text-6xl md:text-7xl"
          >
            Reading Yogis Pop-Up
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3 font-heading text-3xl italic text-brand-cream sm:text-4xl md:text-5xl"
            style={{ textShadow: '3px 3px 0 #171e5d' }}
          >
            &amp; Family Celebration
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-darkBlue px-6 py-3 text-lg font-semibold text-white shadow-lg">
              <svg className="h-5 w-5 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {EVENT_DETAILS.dateLabel} · {EVENT_DETAILS.timeLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-brand-darkBlue shadow-lg">
              <svg className="h-5 w-5 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.66 16.66L13.41 20.9a2 2 0 01-2.83 0l-4.24-4.24a8 8 0 1111.32 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {EVENT_DETAILS.venue}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10"
          >
            <RegisterButton label="Reserve a Spot" />
          </motion.div>
        </div>

        {/* Wavy edge into cream, echoing the flyer */}
        <svg
          className="absolute inset-x-0 bottom-0 h-20 w-full sm:h-28"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#fff6e9"
            d="M0 64c120-40 240-56 360-34s240 74 360 70 240-60 360-72 240 20 360 36v56H0z"
          />
        </svg>
      </section>

      {/* Intro */}
      <section className="relative z-10 -mt-24 px-4 sm:-mt-28 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-[2rem] border-[3px] border-brand-darkBlue bg-white px-6 py-8 text-center shadow-[8px_8px_0_#171e5d] sm:px-10 sm:py-10"
        >
          <p className="text-lg leading-relaxed text-brand-darkBlue sm:text-xl">
            Join <span className="font-semibold text-brand-bluePurple">Speech on the Slope</span> at{' '}
            <span className="font-semibold">Rikud Studio</span> on <span className="font-semibold">Saturday, November 7</span>,
            for a <span className="rounded-md bg-brand-yellow/60 px-1 font-bold">FREE</span> Reading Yogis Pop-Up and Family
            Celebration! Enjoy a playful early literacy class for ages 3–5 from 12:15–1:00 PM, followed by crafts with{' '}
            <span className="font-semibold text-brand-pink">Little Makers Studio</span>, games, snacks, and family fun from
            1:00–2:00 PM.
          </p>
          <p className="mt-5 font-heading text-xl text-brand-darkBlue sm:text-2xl">
            The celebration is open to siblings &amp; children of all ages!
          </p>
        </motion.div>
      </section>

      {/* Schedule */}
      <section className="relative px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center font-heading text-4xl text-brand-darkBlue md:text-5xl"
          >
            The Afternoon Plan
          </motion.h2>

          <div className="relative grid gap-12 md:grid-cols-2 md:gap-10">
            {/* Dotted connector between the two cards */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 hidden h-0 w-16 -translate-x-1/2 border-t-4 border-dotted border-brand-darkBlue/30 md:block"
            />

            {schedule.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.15 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl border-2 ${item.border} bg-white/90 p-7 pt-10 shadow-md transition-shadow duration-300 hover:shadow-xl`}
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: index === 0 ? -4 : 4 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.4 + index * 0.15 }}
                  className={`absolute -top-6 right-6 inline-block rounded-full border-[3px] border-brand-darkBlue ${item.pill} px-5 py-2 font-heading text-xl text-brand-darkBlue sm:text-2xl`}
                >
                  {item.time}
                </motion.span>

                <p className={`mb-2 text-sm font-bold uppercase tracking-widest ${item.accent}`}>{item.ages}</p>
                <h3 className="font-heading text-2xl leading-tight text-brand-darkBlue sm:text-3xl">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{item.range}</p>
                <p className="mt-4 leading-relaxed text-gray-700">{item.description}</p>
                {item.tag && (
                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-pink/15 px-4 py-1.5 text-sm font-semibold text-brand-darkBlue">
                    <Sparkle className="h-3.5 w-3.5 text-brand-pink" />
                    {item.tag}
                  </span>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Flyer + location */}
      <section className="relative px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 40 }}
            whileInView={{ opacity: 1, rotate: -3, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.a
              href={EVENT_DETAILS.flyerSrc}
              target="_blank"
              rel="noreferrer"
              whileHover={{ rotate: 3, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative block rounded-md bg-white p-3 pb-12 shadow-2xl"
              aria-label="Open the full event flyer"
            >
              <span aria-hidden="true" className="absolute -top-3 left-6 h-7 w-24 -rotate-6 bg-brand-yellow/80 shadow-sm" />
              <span aria-hidden="true" className="absolute -top-3 right-6 h-7 w-24 rotate-6 bg-brand-pink/80 shadow-sm" />
              <Image
                src={EVENT_DETAILS.flyerSrc}
                alt="Flyer: Free trial class plus family fun, Saturday 11/7, 12:15 to 2 PM at Rikud Studio, with Speech on the Slope and Little Makers Studio"
                width={1545}
                height={1999}
                sizes="(min-width: 768px) 384px, 90vw"
                className="h-auto w-full rounded-sm"
              />
              <span className="absolute inset-x-0 bottom-3 text-center font-heading text-lg text-brand-darkBlue">
                Tap to view the full flyer
              </span>
            </motion.a>
            <Float className="-right-4 -top-8 text-brand-yellow" delay={0.4} duration={5}>
              <Star className="h-12 w-12 drop-shadow" />
            </Float>
            <Float className="-bottom-6 -left-6 text-brand-bluePurple" delay={0.9} duration={6}>
              <Sparkle className="h-10 w-10" />
            </Float>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-heading text-4xl text-brand-darkBlue md:text-5xl">Where to Find Us</h2>
            <div className="mt-6 rounded-3xl border-2 border-brand-bluePurple/30 bg-white/90 p-6 shadow-md">
              <p className="font-heading text-2xl text-brand-darkBlue">{EVENT_DETAILS.venue}</p>
              <p className="mt-1 text-lg text-gray-700">{EVENT_DETAILS.street}</p>
              <p className="text-lg text-gray-700">{EVENT_DETAILS.cityLine}</p>
              <a
                href={EVENT_DETAILS.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 inline-flex items-center gap-1 font-semibold text-brand-bluePurple hover:text-brand-darkBlue"
              >
                Get directions
                <ArrowIcon />
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-3 gap-3">
              {quickFacts.map((fact, index) => (
                <motion.li
                  key={fact.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="rounded-2xl bg-brand-bluePurple/10 px-2 py-4 text-center"
                >
                  <p className="font-heading text-lg text-brand-darkBlue sm:text-xl">{fact.label}</p>
                  <p className="mt-1 text-xs leading-snug text-gray-600 sm:text-sm">{fact.detail}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-brand-darkBlue px-6 py-14 text-center sm:px-12"
        >
          <Float className="left-6 top-6 text-brand-yellow" duration={5}>
            <Star className="h-8 w-8" />
          </Float>
          <Float className="bottom-8 right-8 text-brand-pink" delay={0.6} duration={6}>
            <Sparkle className="h-10 w-10" />
          </Float>
          <Float className="right-[20%] top-8 hidden sm:block" delay={1.2} duration={7}>
            <div className="h-3 w-3 rounded-full bg-brand-bluePurple" />
          </Float>

          <p className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-pink opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-pink" />
            </span>
            Limited spots available
          </p>
          <h2 className="relative mt-5 font-heading text-4xl text-white md:text-5xl">Save your spot!</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/80">
            Registration is free. Fill out the quick form below and we&rsquo;ll see you at Rikud Studio on November 7.
          </p>
          <div className="relative mt-9">
            <RegisterButton label="Register Now" size="lg" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
