'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Reach Out',
    description:
      "Reach out by phone or email. We'll gather some basic information and plan a time when we can meet you and your child before walking you through next steps!",
  },
  {
    number: '2',
    title: 'Evaluate',
    description:
      'Complete an evaluation with us or send us a previous evaluation report (within the past 6 months). This helps us gain more insight into your child\u2019s strengths and needs and create personalized goals.',
  },
  {
    number: '3',
    title: 'Start Therapy',
    description:
      'Therapy sessions can take place at your home or your child\u2019s school (with permission). Sessions focus on building connection and confidence while taking steps toward your child\u2019s goals. We value family involvement and will share ways for you to continue supporting these goals at home!',
  },
];

export default function GetStartedSection() {
  return (
    <section id="get-started" className="relative py-20 sm:py-28 overflow-hidden bg-brand-pink">
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
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-bluePurple/15 to-brand-pink/15 text-sm font-bold uppercase tracking-widest text-brand-darkBlue mb-4">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900"
          >
            Ready to{' '}
            <span className="text-brand-darkBlue">
              Get Started?
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => {
              const colors = [
                {
                  ring: 'ring-brand-bluePurple/30',
                  bg: 'bg-brand-bluePurple',
                  cardBorder: 'border-brand-bluePurple/20',
                  glow: 'bg-brand-bluePurple/10',
                },
                {
                  ring: 'ring-brand-pink/30',
                  bg: 'bg-brand-pink',
                  cardBorder: 'border-brand-pink/20',
                  glow: 'bg-brand-pink/10',
                },
                {
                  ring: 'ring-brand-yellow/30',
                  bg: 'bg-brand-yellow',
                  cardBorder: 'border-brand-yellow/20',
                  glow: 'bg-brand-yellow/10',
                },
              ];
              const c = colors[index];

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative z-10 w-16 h-16 rounded-full ${c.bg} flex items-center justify-center ring-4 ${c.ring} shadow-lg mb-6`}
                  >
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className={`relative flex-1 w-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border ${c.cardBorder} hover:shadow-xl transition-all duration-300`}
                  >
                    {/* Subtle glow */}
                    <div className={`absolute -inset-1 ${c.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                    <h3 className="relative text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="relative text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
