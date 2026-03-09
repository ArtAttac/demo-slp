'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImage from '@/app/assets/landing.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Speech therapist reading with a child"
        fill
        className="object-cover scale-125 object-[40%_35%]"
        priority
      />
      <div className="absolute inset-0 bg-brand-darkBlue/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto -mt-12 md:-mt-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Speech Therapy & Literacy Support for <span className="text-brand-yellow">Brooklyn Kids</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
            Helping parents build reading, writing, and speech skills with confidence and connection.
          </p>
          <a
            href="#about"
            className="inline-block bg-brand-bluePurple hover:bg-brand-darkBlue text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
