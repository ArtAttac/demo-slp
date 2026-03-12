'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ServicesSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const services = [
    {
      title: 'Evaluations',
      bgColor: 'bg-brand-pink',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'We start by getting to know your child\u2014how they speak, understand language, and communicate\u2014so we can create a plan that truly meets their needs.',
    },
    {
      title: 'Speech & Language Therapy',
      bgColor: 'bg-brand-yellow',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'We help children speak clearly and use language confidently through fun, playful, and individualized sessions that feel meaningful and motivating.',
    },
    {
      title: 'Reading & Writing Support',
      bgColor: 'bg-brand-cream',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'We help children connect their speech and language skills to reading, writing, and spelling, building confidence and independence along the way.',
    },
    {
      title: 'Myofunctional Therapy',
      bgColor: 'bg-brand-darkBlue',
      textColor: 'text-white',
      borderColor: 'border-white/20',
      backContent: 'We use gentle, guided exercises to improve tongue posture, oral muscle strength, and breathing habits, supporting clearer speech and healthy oral development.',
    },
    {
      title: 'Community Events + Workshops',
      bgColor: 'bg-brand-pink',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'We bring families together through fun, interactive workshops that help kids build speech, language, and literacy skills while giving parents tools to support learning at home.',
    },
  ];

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden bg-brand-bluePurple">
      {/* Playful floating shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-32 left-10 h-40 w-40 rounded-full bg-brand-yellow/15 blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-brand-pink/15 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            How We Can{' '}
            <span className="text-white">
              Help
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
          >
            Comprehensive, play-based services tailored to your child&apos;s unique communication needs
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const isFlipped = flippedCards.has(index);

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  onClick={() => toggleFlip(index)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ y: -8 }}
                  className="relative cursor-pointer h-full min-h-[280px]"
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className={`h-full relative overflow-hidden rounded-3xl ${service.bgColor} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center`}>
                      {/* Plus icon indicator */}
                      <motion.div
                        animate={{ rotate: isFlipped ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/60 flex items-center justify-center shadow-md"
                      >
                        <svg className={`h-6 w-6 ${service.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </motion.div>

                      {/* Content */}
                      <div className="relative text-center">
                        <h3 className={`text-2xl sm:text-3xl font-bold ${service.textColor}`}>
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className={`h-full relative overflow-hidden rounded-3xl ${service.bgColor} p-6 sm:p-8 shadow-lg flex flex-col`}>
                      {/* Close icon indicator */}
                      <motion.div
                        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/60 flex items-center justify-center shadow-md"
                      >
                        <svg className={`h-6 w-6 ${service.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.div>

                      <div className="relative flex-1 flex flex-col overflow-hidden">
                        <h3 className={`text-xl sm:text-2xl font-bold ${service.textColor} mb-4 pr-12`}>
                          {service.title}
                        </h3>

                        <div className="flex-1 service-card-scroll pr-1">
                          <p className={`text-sm sm:text-base ${service.textColor} leading-relaxed`}>
                            {service.backContent}
                          </p>
                        </div>

                        {/* Sticky Learn More button */}
                        <div className={`mt-4 pt-4 border-t ${service.borderColor}`}>
                          <a
                            href="/services"
                            onClick={(e) => e.stopPropagation()}
                            className={`block w-full px-4 py-2 bg-white/40 hover:bg-white/60 rounded-full text-sm font-semibold ${service.textColor} transition-all duration-200 text-center`}
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-white/90 mb-6">
            Not sure which service is right for you?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Start with a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  );
}
