'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import heroImage from '@/app/assets/herolandingv1.png';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden">
      {/* Hero image with zoom-to-center animation, cropped to hide bottom-right watermark */}
      <motion.div
        initial={{ scale: 1.5 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <Image
          src={heroImage}
          alt="Speech on the Slope - Brooklyn speech therapy"
          fill
          className="object-cover object-[center_30%]"
          priority
        />
        {/* Cover watermark in bottom-right */}
        <div className="absolute bottom-0 right-0 w-96 h-32 bg-gradient-to-tl from-brand-darkBlue via-brand-darkBlue/70 to-transparent" />
      </motion.div>
      <div className="absolute inset-0 bg-brand-darkBlue/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Speech Therapy & Literacy Support for <span className="text-brand-yellow">Brooklyn & Manhattan Kids</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
            Helping children build clear speech, strong literacy skills, and lasting confidence.
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
