'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ginaImage from '@/app/assets/ginapicprofileedited.png';
import sabrinaImage from '@/app/assets/sababoutme.png';

const practitioners = [
  {
    name: 'Meet Gina',
    credentials: 'M.Ed., CCC-SLP',
    role: 'Co-Founder & Speech-Language Pathologist',
    shortBio: 'Gina is a licensed speech-language pathologist who loves helping little learners find their voices and build strong foundations for reading and writing. She specializes in working with students from Pre-K through 2nd grade and brings eight years of experience supporting speech sound production, early literacy, and writing development. Her sessions are playful, engaging, and designed to help children build skills and confidence at the same time.',
    image: ginaImage,
    imagePosition: 'object-[40%_center]',
    gradientFrom: 'from-brand-pink/20',
    gradientTo: 'to-brand-bluePurple/10',
    borderColor: 'border-brand-pink/20',
  },
  {
    name: 'Meet Sabrina',
    credentials: 'MS, CCC-SLP',
    role: 'Co-Founder & Speech-Language Pathologist',
    shortBio: 'Sabrina is a licensed speech-language pathologist, play enthusiast, and proud Brooklyn local. After five years supporting Pre-K and elementary-aged students across NYC public schools, she co-founded Speech on the Slope to provide individualized, child-led therapy rooted in play. She specializes in speech sound disorders and has additional training in myofunctional therapy, helping children develop clearer speech and greater confidence in their communication.',
    image: sabrinaImage,
    imagePosition: 'object-center',
    gradientFrom: 'from-brand-yellow/20',
    gradientTo: 'to-brand-bluePurple/10',
    borderColor: 'border-brand-yellow/20',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 overflow-hidden bg-brand-cream"
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

        {/* Cards */}
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {practitioners.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
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
            </motion.div>
          ))}
        </div>

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
