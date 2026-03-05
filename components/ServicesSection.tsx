'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ServicesSection() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const services = [
    {
      title: 'Free Consultations',
      bgColor: 'bg-brand-pink',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Schedule a complimentary 30-minute session to discuss your child\'s needs, answer questions, and explore how we can support your family\'s communication goals.',
    },
    {
      title: 'Preschool Services',
      bgColor: 'bg-brand-yellow',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Engaging, play-based therapy sessions designed for ages 3-5. We work on speech sounds, language development, and social skills in a fun, supportive environment.',
    },
    {
      title: 'Academic Support',
      bgColor: 'bg-brand-cream',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Targeted intervention for reading comprehension, written expression, and verbal reasoning. We help students build the language foundation needed for academic achievement.',
    },
    {
      title: 'IEP Consultation',
      bgColor: 'bg-brand-darkBlue',
      textColor: 'text-white',
      borderColor: 'border-white/20',
      backContent: 'Expert guidance through the IEP process. We help you understand evaluations, write effective goals, and advocate for appropriate services in school settings.',
    },
    {
      title: 'OT Evaluations',
      bgColor: 'bg-brand-pink',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Thorough assessments of fine motor skills, sensory processing, and daily living skills. Results include detailed recommendations and personalized intervention plans.',
    },
    {
      title: 'Early Intervention',
      bgColor: 'bg-brand-yellow',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Specialized services for infants and toddlers (0-3 years). We coach parents on strategies to enhance communication during daily routines and play.',
    },
    {
      title: 'Parent Coaching',
      bgColor: 'bg-brand-cream',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-800/20',
      backContent: 'Learn hands-on techniques to support your child\'s communication at home. We provide customized strategies that fit your family\'s lifestyle and routines.',
    },
    {
      title: 'Feeding Therapy',
      bgColor: 'bg-brand-darkBlue',
      textColor: 'text-white',
      borderColor: 'border-white/20',
      backContent: 'Address picky eating, oral motor difficulties, and mealtime behaviors. We use a responsive, family-centered approach to expand food variety and improve feeding skills.',
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
    <section id="services" className="relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden bg-brand-bluePurple">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-yellow/20 to-brand-pink/20 text-sm font-bold uppercase tracking-widest text-white mb-4">
              What We Offer
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            How We Can{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-darkBlue via-brand-yellow to-brand-cream">
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

                      <div className="relative flex-1 flex flex-col">
                        <h3 className={`text-xl sm:text-2xl font-bold ${service.textColor} mb-4 pr-12`}>
                          {service.title}
                        </h3>

                        <p className={`text-sm sm:text-base ${service.textColor} leading-relaxed flex-1`}>
                          {service.backContent}
                        </p>

                        {/* Back button indicator */}
                        <div className={`mt-4 pt-4 border-t ${service.borderColor}`}>
                          <button className={`w-full px-4 py-2 bg-white/40 hover:bg-white/60 rounded-full text-sm font-semibold ${service.textColor} transition-all duration-200`}>
                            Click to flip back
                          </button>
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
