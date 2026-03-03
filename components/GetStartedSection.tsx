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
    <section className="relative min-h-screen flex items-center py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-yellow/10">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-bluePurple via-brand-pink to-brand-yellow">
              Get Started?
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting path line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[16.6%] right-[16.6%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-brand-bluePurple/40 via-brand-pink/40 to-brand-yellow/40 origin-left"
            />
            {/* Dotted overlay */}
            <div
              className="absolute inset-0 h-full"
              style={{
                backgroundImage: 'radial-gradient(circle, rgb(131 144 250 / 0.6) 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
                backgroundPosition: 'center',
              }}
            />
          </div>

          {/* Connecting path line (mobile) */}
          <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-b from-brand-bluePurple/30 via-brand-pink/30 to-brand-yellow/30 origin-top"
            />
          </div>

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

                  {/* Arrow connector (mobile only) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-6 mb-2">
                      <svg className="w-6 h-6 text-brand-pink/50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
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
