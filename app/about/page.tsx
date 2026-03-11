'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ginaImage from '@/app/assets/ginapicprofileedited.png';
import sabrinaImage from '@/app/assets/sababoutme.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation back */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <Link href="/#contact" className="px-5 py-2 bg-brand-bluePurple text-white text-sm font-semibold rounded-full hover:bg-brand-darkBlue transition-colors">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-brand-bluePurple/20 via-brand-pink/15 to-brand-yellow/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-pink/20 to-brand-yellow/20 text-sm font-bold uppercase tracking-widest text-brand-darkBlue mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Meet Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-bluePurple">
                Speech Squad
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Two passionate speech-language pathologists dedicated to helping Brooklyn kids communicate with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== GINA FULL BIO ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-pink/15 to-brand-bluePurple/5 p-8 md:p-12 shadow-xl border-2 border-white/60">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-pink/20 blur-2xl" />

              {/* Photo + Name */}
              <div className="flex flex-col items-center mb-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-5"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-pink/30 to-transparent blur-lg" />
                  <div className="relative h-56 w-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={ginaImage}
                      alt="Gina Trobiani, M.Ed., CCC-SLP"
                      fill
                      className="object-cover object-[40%_center]"
                    />
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Gina Trobiani</h2>
                <p className="text-base font-semibold text-brand-bluePurple uppercase tracking-wide">M.Ed., CCC-SLP</p>
                <p className="text-sm text-gray-600 italic">Co-Founder &amp; Speech-Language Pathologist</p>
              </div>

              {/* Full bio */}
              <div className="max-w-3xl mx-auto space-y-5 text-gray-700 leading-relaxed">
                <p>
                  Hi, I&apos;m Gina! I&apos;m a licensed speech-language pathologist (SLP) who loves helping little learners find their voices while building strong foundations for reading and writing.
                </p>
                <p>
                  I earned my Master&apos;s in Communication Sciences &amp; Disorders from the University of Virginia in 2017 and am a certified member of the American Speech-Language-Hearing Association (ASHA).
                </p>
                <p>
                  I specialize in working with children from Pre-K through 2nd grade who need support with speech sound production, early reading skills, and writing development. Whether a child is working on producing sounds clearly, building phonological and phonemic awareness, or learning how to get their ideas onto paper, my goal is to make the process supportive, engaging, and fun.
                </p>
                <p>
                  I believe children learn best when they feel confident, understood, and successful. My sessions are playful and thoughtfully tailored to each child&apos;s strengths and interests, creating meaningful activities that build skills and translate to success in the classroom.
                </p>
                <p>
                  My goal is to help children express themselves clearly, read with confidence, and feel proud sharing their ideas&mdash;both in school and beyond.
                </p>
                <p className="italic text-gray-600">
                  Outside of work, I love traveling with my husband, solving escape rooms, and cuddling with my cat, Finn.
                </p>
              </div>

              {/* Certifications & Trainings */}
              <div className="mt-10 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-brand-darkBlue mb-5 text-center">Certifications &amp; Trainings</h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-brand-pink/20">
                  <ul className="text-gray-700 space-y-1.5 text-sm">
                    <li>Lively Letters&trade;</li>
                    <li>Story Grammar Marker&reg;</li>
                    <li>The Hochman Method&copy; (The Writing Revolution)</li>
                    <li>Orton Gillingham</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-bluePurple rounded-full" />
      </div>

      {/* ===== SABRINA FULL BIO ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-yellow/15 to-brand-bluePurple/5 p-8 md:p-12 shadow-xl border-2 border-white/60">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-brand-yellow/20 blur-2xl" />

              {/* Photo + Name */}
              <div className="flex flex-col items-center mb-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-5"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-yellow/30 to-transparent blur-lg" />
                  <div className="relative h-56 w-56 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={sabrinaImage}
                      alt="Sabrina Itzhaki, MS CCC-SLP"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sabrina Itzhaki</h2>
                <p className="text-base font-semibold text-brand-bluePurple uppercase tracking-wide">MS, CCC-SLP</p>
                <p className="text-sm text-gray-600 italic">Co-Founder &amp; Speech-Language Pathologist</p>
              </div>

              {/* Full bio */}
              <div className="max-w-3xl mx-auto space-y-5 text-gray-700 leading-relaxed">
                <p>
                  Hi, I&apos;m Sabrina! I&apos;m a licensed speech-language pathologist, play enthusiast, and proud Brooklyn local who loves helping children build confidence through clear communication.
                </p>
                <p>
                  I earned my Master of Science in Communication Disorders from CUNY Hunter College in 2020 and am a certified member of the American Speech-Language-Hearing Association (ASHA). I&apos;m also a recipient of ASHA&apos;s Award for Continuing Education (ACE).
                </p>
                <p>
                  After five years supporting Pre-K and elementary-aged students across NYC public schools, I co-founded Speech on the Slope to create a practice centered on individualized, play-based, and family-focused therapy.
                </p>
                <p>
                  I specialize in speech sound disorders and have additional training in myofunctional therapy. My sessions are child-led, engaging, and built around what kids love, helping children develop clearer speech while strengthening the foundations needed for reading and spelling success.
                </p>
                <p>
                  My goal is to help children build confidence, connection, and communication skills that last, so they can express themselves clearly at home, in school, and in their communities.
                </p>
                <p className="italic text-gray-600">
                  Outside of work, you&apos;ll often find me exploring Brooklyn with a croissant in hand in search of the city&apos;s best bakeries and farmers markets. I love spending time with my husband and our labradoodle, Melo (we&apos;re regulars at the dog park!) and I&apos;m on a mission to visit every U.S. National Park (24 down so far!).
                </p>
              </div>

              {/* Certifications & Trainings */}
              <div className="mt-10 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-brand-darkBlue mb-5 text-center">Certifications &amp; Trainings</h3>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-brand-yellow/20">
                  <ul className="text-gray-700 space-y-1.5 text-sm">
                    <li>Teacher of Students with Speech &amp; Language Disabilities (TSSLD)</li>
                    <li>PROMPT (Prompts for Restructuring Oral Muscular Phonetic Targets)</li>
                    <li>DTTC (Dynamic Temporal and Tactile Cueing)</li>
                    <li>Sounds in Motion</li>
                    <li>Myofunctional Therapy</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-bluePurple/10 via-brand-pink/10 to-brand-yellow/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We&apos;d love to meet you and your child. Reach out to schedule a free consultation.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
