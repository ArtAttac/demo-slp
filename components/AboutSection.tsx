'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ginaImage from '@/app/assets/ginaaboutme.png';
import sabrinaImage from '@/app/assets/sababoutme.png';

type ViewMode = 'cards' | 'expandable' | 'compact';

const viewOptions: { value: ViewMode; label: string }[] = [
  { value: 'cards', label: 'Overview' },
  { value: 'expandable', label: 'Detailed' },
  { value: 'compact', label: 'At a Glance' },
];

const practitioners = [
  {
    name: 'Gina Trobiani',
    credentials: 'M.Ed., CCC-SLP',
    role: 'Co-Founder & Speech-Language Pathologist',
    shortBio: 'Gina is a licensed speech-language pathologist who loves helping little learners find their voices and build strong foundations for reading and writing. She specializes in working with students from Pre-K through 2nd grade, bringing 8 years of experience in speech sound production, early literacy, and writing development to every playful, confidence-building session.',
    expandedBio: [
      'I earned my Master\u2019s in Communication Sciences & Disorders from The University of Virginia in 2017 and am a certified member of the American Speech-Language-Hearing Association (ASHA).',
      'I specialize in working with students from Pre-K through 2nd grade who need support with speech sound production, early reading skills, and writing development. Whether a child is working on clear speech, building phonological and phonemic awareness, or learning how to get their ideas onto paper, I\u2019m here to make the whole process feel supportive, engaging, and fun!',
      'I believe learning happens when children feel confident, understood, and successful. My sessions are playful and tailored to each child\u2019s unique strengths and interests\u2014creating meaningful activities and goals that support growth and translate to academic success.',
      'My goal is to help children express themselves clearly, read confidently, and write their ideas proudly\u2014so they can shine both in school and beyond.',
      'Outside of work, I love traveling with my husband, taking Pilates classes, singing while cleaning, and cuddling with my cat, Finn.',
    ],
    compactBio: 'Licensed SLP specializing in speech, early reading, and writing for Pre-K through 2nd grade. 8 years of clinical experience.',
    experience: '8 years of clinical experience',
    trainings: ['Lively Letters\u2122', 'Story Grammar Marker\u00ae', 'The Hochman Method\u00a9 (The Writing Revolution)', 'Orton Gillingham'],
    image: ginaImage,
    imagePosition: 'object-[20%_center]',
    gradientFrom: 'from-brand-pink/20',
    gradientTo: 'to-brand-bluePurple/10',
    borderColor: 'border-brand-pink/20',
    accentBg: 'bg-brand-pink/10',
  },
  {
    name: 'Sabrina',
    credentials: 'MS, CCC-SLP',
    role: 'Co-Founder & Speech-Language Pathologist',
    shortBio: 'Sabrina is a licensed speech-language pathologist, play enthusiast, and proud Brooklyn local. After five years supporting pre-K and elementary-aged students across NYC public schools, she co-founded Speech on the Slope to deliver individualized, child-led therapy rooted in play and built around what kids love\u2014because that\u2019s when real progress happens.',
    expandedBio: [
      'I earned my Master of Science in Communication Disorders from CUNY Hunter College in 2020 and am a certified member of the American Speech-Language-Hearing Association (ASHA), as well as a recipient of the Award for Continuing Education (ACE).',
      'After five years supporting pre-K and elementary-aged students across NYC public schools, I set out to create a practice rooted in individualized, playful, and family-centered speech therapy\u2014an approach that truly works because it\u2019s built around what kids love.',
      'My goal is to help children build confidence, connection, and communication that lasts. I meet children exactly where they are\u2014at home, in their world, and on their terms\u2014because kids learn best when they\u2019re having fun. That\u2019s why my sessions are always child-led, play-based, and tailored to your child\u2019s passions.',
      'When I\u2019m not celebrating speech breakthroughs, you\u2019ll probably find me wandering around Brooklyn with a croissant in hand, on the hunt for the city\u2019s best bakeries and farmers markets. I love spending time with my husband and our labradoodle, Melo (we\u2019re regulars at the dog park!), and I\u2019m on a mission to visit every U.S. National Park\u201424 down so far!',
    ],
    compactBio: 'Licensed SLP and proud Brooklyn local. 5+ years supporting pre-K and elementary students across NYC public schools.',
    education: ['MS in Communication Disorders \u2013 Hunter College', 'BA in Psychology \u2013 Binghamton University'],
    certifications: ['ASHA Award for Continuing Education (ACE)', 'ASHA Certificate of Clinical Competence (CCC)', 'Teacher of Students with Speech & Language Disabilities (TSSLD)', 'PROMPT, DTTC, Sounds in Motion, Myofunctional Therapy'],
    image: sabrinaImage,
    imagePosition: 'object-center',
    gradientFrom: 'from-brand-yellow/20',
    gradientTo: 'to-brand-bluePurple/10',
    borderColor: 'border-brand-yellow/20',
    accentBg: 'bg-brand-yellow/10',
  },
];

function ExpandableCard({ person }: { person: typeof practitioners[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${person.gradientFrom} ${person.gradientTo} p-8 shadow-xl border-2 border-white/60`}>
      {/* Photo */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image src={person.image} alt={`${person.name}, ${person.credentials}`} fill className={`object-cover ${person.imagePosition}`} />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{person.name}</h3>
        <p className="text-sm font-semibold text-brand-bluePurple uppercase tracking-wide">{person.credentials}</p>
        <p className="text-sm text-gray-600 italic">{person.role}</p>
      </div>

      {/* Short bio */}
      <p className="text-gray-700 leading-relaxed text-center mb-4">{person.shortBio}</p>

      {/* Expand/Collapse */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed text-center md:text-left pt-4 border-t border-gray-200/50">
              {person.expandedBio.map((paragraph, i) => (
                <p key={i} className={i === person.expandedBio.length - 1 ? 'italic text-gray-600' : ''}>
                  {paragraph}
                </p>
              ))}

              {/* At a Glance inside expanded */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {person.trainings && (
                  <>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-brand-pink/20">
                      <p className="font-semibold text-gray-900 mb-2">Experience</p>
                      <p className="text-gray-700 text-sm">{person.experience}</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-brand-pink/20">
                      <p className="font-semibold text-gray-900 mb-2">Advanced Trainings</p>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        {person.trainings.map((t) => <li key={t}>{t}</li>)}
                      </ul>
                    </div>
                  </>
                )}
                {person.education && (
                  <>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-brand-yellow/20">
                      <p className="font-semibold text-gray-900 mb-2">Education</p>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        {person.education.map((e) => <li key={e}>{e}</li>)}
                      </ul>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-brand-yellow/20">
                      <p className="font-semibold text-gray-900 mb-2">Certifications &amp; Trainings</p>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        {person.certifications?.map((c) => <li key={c}>{c}</li>)}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-semibold text-brand-darkBlue shadow-sm border ${person.borderColor} hover:shadow-md hover:scale-105 transition-all duration-200`}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}

function CompactCard({ person }: { person: typeof practitioners[0] }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${person.gradientFrom} ${person.gradientTo} p-8 shadow-xl border-2 border-white/60`}>
      {/* Photo */}
      <div className="relative mb-6 flex justify-center">
        <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image src={person.image} alt={`${person.name}, ${person.credentials}`} fill className={`object-cover ${person.imagePosition}`} />
        </div>
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{person.name}</h3>
        <p className="text-sm font-semibold text-brand-bluePurple uppercase tracking-wide">{person.credentials}</p>
        <p className="text-sm text-gray-600 italic">{person.role}</p>
      </div>

      {/* Compact bio */}
      <p className="text-gray-700 leading-relaxed text-center mb-6 text-sm">{person.compactBio}</p>

      {/* At a Glance */}
      <div className="grid sm:grid-cols-2 gap-3">
        {person.trainings && (
          <>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-brand-pink/20">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Experience</p>
              <p className="text-gray-700 text-xs">{person.experience}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-brand-pink/20">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Trainings</p>
              <ul className="text-gray-700 space-y-0.5 text-xs">
                {person.trainings.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </>
        )}
        {person.education && (
          <>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-brand-yellow/20">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Education</p>
              <ul className="text-gray-700 space-y-0.5 text-xs">
                {person.education.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-brand-yellow/20">
              <p className="font-semibold text-gray-900 mb-1 text-sm">Certifications</p>
              <ul className="text-gray-700 space-y-0.5 text-xs">
                {person.certifications?.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DefaultCard({ person }: { person: typeof practitioners[0] }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${person.gradientFrom} ${person.gradientTo} p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/60`}>
      {/* Photo */}
      <div className="relative mb-6 flex justify-center">
        <motion.div
          whileHover={{ rotate: [0, -3, 3, 0], scale: 1.03 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image src={person.image} alt={`${person.name}, ${person.credentials}`} fill className={`object-cover ${person.imagePosition}`} />
          </div>
        </motion.div>
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{person.name}</h3>
        <p className="text-sm font-semibold text-brand-bluePurple uppercase tracking-wide">{person.credentials}</p>
        <p className="text-sm text-gray-600 italic">{person.role}</p>
      </div>

      {/* Bio */}
      <p className="text-gray-700 leading-relaxed text-center mb-6">{person.shortBio}</p>

      {/* Link */}
      <div className="text-center">
        <Link
          href="/about"
          className={`inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-semibold text-brand-darkBlue shadow-sm border ${person.borderColor} hover:shadow-md hover:scale-105 transition-all duration-200`}
        >
          Read Full Bio &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-brand-bluePurple/30 via-brand-pink/25 to-brand-yellow/20"
    >
      {/* Playful floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 h-32 w-32 rounded-full bg-brand-pink/20 blur-2xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-16 h-40 w-40 rounded-full bg-brand-bluePurple/20 blur-2xl"
          animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-28 w-28 rounded-full bg-brand-yellow/15 blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-pink/20 to-brand-yellow/20 text-sm font-bold uppercase tracking-widest text-brand-darkBlue mb-4">
              Meet Your Speech Squad
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            Two Hearts. One{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-bluePurple">
              Playful
            </span>{' '}
            Mission.
          </motion.h2>
        </div>

        {/* View mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-white/60">
            {viewOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setViewMode(option.value)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  viewMode === option.value
                    ? 'bg-brand-darkBlue text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-darkBlue'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-12 md:grid-cols-2 lg:gap-16"
          >
            {practitioners.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={viewMode !== 'expandable' ? { y: -8 } : undefined}
                className="group relative"
              >
                {viewMode === 'cards' && <DefaultCard person={person} />}
                {viewMode === 'expandable' && <ExpandableCard person={person} />}
                {viewMode === 'compact' && <CompactCard person={person} />}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-700 mb-6">
            Ready to start your communication journey?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Let&apos;s Chat!
          </a>
        </motion.div>
      </div>
    </section>
  );
}
