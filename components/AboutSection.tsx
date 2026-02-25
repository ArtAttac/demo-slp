'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ginaImage from '@/app/assets/ginaaboutme.png';
import sabrinaImage from '@/app/assets/sababoutme.png';

export default function AboutSection() {
  const practitioners = [
    {
      name: 'Gina',
      credentials: 'MS CCC-SLP',
      role: 'Co-Founder & Speech Language Pathologist',
      bio: 'Gina is passionate about making speech therapy fun, functional, and family-centered. With experience in early intervention and preschool services, she specializes in helping young children build confidence in their communication skills through play-based strategies and parent coaching.',
      specialties: ['Early Intervention', 'Parent Coaching', 'Language Development'],
      image: ginaImage,
      accentColor: 'brand-pink',
      gradientFrom: 'from-brand-pink/20',
      gradientTo: 'to-brand-bluePurple/10',
    },
    {
      name: 'Sabrina',
      credentials: 'MS CCC-SLP',
      role: 'Co-Founder & Speech Language Pathologist',
      bio: 'Sabrina brings warmth, creativity, and evidence-based practice to every session. She has a deep commitment to supporting children and families through individualized therapy, with expertise in articulation, feeding therapy, and AAC. She believes every child deserves to be heard.',
      specialties: ['Feeding Therapy', 'Articulation', 'AAC'],
      image: sabrinaImage,
      accentColor: 'brand-yellow',
      gradientFrom: 'from-brand-yellow/20',
      gradientTo: 'to-brand-bluePurple/10',
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-brand-bluePurple/30 via-brand-pink/25 to-brand-yellow/20"
    >
      {/* Playful floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 h-32 w-32 rounded-full bg-brand-pink/20 blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-16 h-40 w-40 rounded-full bg-brand-bluePurple/20 blur-2xl"
          animate={{
            y: [0, -25, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-28 w-28 rounded-full bg-brand-yellow/15 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            We blend pastel whimsy with deeply personalized speech therapy. Meet your partners in progress!
          </motion.p>
        </div>

        {/* Practitioners Cards */}
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
                {/* Decorative corner accent */}
                <div className={`absolute -top-6 -right-6 h-24 w-24 rounded-full bg-${person.accentColor}/30 blur-xl`} />

                {/* Image Container */}
                <div className="relative mb-6 flex justify-center">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-${person.accentColor}/40 to-transparent blur-lg`} />
                    <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={person.image}
                        alt={`${person.name}, ${person.credentials}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-bluePurple uppercase tracking-wide mb-2">
                    {person.credentials}
                  </p>
                  <p className="text-xs text-gray-600 italic mb-4">
                    {person.role}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {person.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {person.specialties.map((specialty, i) => (
                      <motion.span
                        key={specialty}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        whileHover={{ scale: 1.1 }}
                        className={`px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-gray-800 shadow-sm border-2 border-${person.accentColor}/30 hover:border-${person.accentColor} transition-all duration-200`}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fun call-to-action */}
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
