'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MissionSection() {
  return (
    <section id="mission" className="relative py-20 sm:py-28 overflow-hidden bg-brand-darkBlue">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Icon with yellow rays — sits above the bubble */}
        <div className="flex justify-center mb-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Animated yellow rays radiating outward */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 rounded-full"
                  style={{
                    height: '60px',
                    background: 'linear-gradient(to top, rgba(250, 199, 72, 0.5), rgba(250, 199, 72, 0.15), transparent)',
                    transformOrigin: `center ${60 + 64}px`,
                    transform: `rotate(${i * 30}deg) translateY(-${60 + 64}px)`,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                />
              ))}
            </div>

            {/* Soft yellow glow behind icon */}
            <div className="absolute inset-0 -m-8 bg-brand-yellow/30 rounded-full blur-2xl" />

            {/* Icon image */}
            <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32">
              <Image
                src="/iconbuilding.png"
                alt="Speech on the Slope"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Bubble body */}
          <div className="relative bg-brand-cream/95 backdrop-blur-sm rounded-[2.5rem] px-8 sm:px-12 py-10 sm:py-14 shadow-2xl border border-white/40">
            {/* Mission heading */}
            <div className="text-center mb-8">
              <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-yellow/25 to-brand-pink/25 text-sm font-bold uppercase tracking-widest text-brand-darkBlue">
                Our Mission
              </span>
            </div>

            {/* Mission text */}
            <div className="text-center space-y-6">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                At Speech on the Slope, we help children find their voice through playful, engaging therapy grounded in meaningful relationships and care that&apos;s truly individualized. We work hand-in-hand with families to strengthen communication, build confidence, and share strategies that carry over well beyond our sessions, so children can thrive at home, in school, and out in their communities.
              </p>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Whether we&apos;re supporting clearer speech, nurturing language development, or laying the groundwork for reading and spelling, every session is shaped around your child&apos;s interests, strengths, and unique learning style. Because when therapy feels like play, real progress happens.
              </p>
            </div>

            {/* Decorative bottom accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 mx-auto w-24 h-1 bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-bluePurple rounded-full"
            />
          </div>

          {/* Speech bubble tail */}
          <div className="flex justify-center -mt-1">
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderTop: '24px solid rgb(255 246 233 / 0.95)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
