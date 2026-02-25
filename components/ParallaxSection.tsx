'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import sabginaImage from '@/app/assets/sabginainclassroom.png';

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section ref={sectionRef} className="relative h-96 md:h-[500px] overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: translateY }}
      >
        <Image
          src={sabginaImage}
          alt="Sab and Gina in a classroom"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-darkBlue via-brand-bluePurple/80 to-brand-pink/80 opacity-80" />
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Transform Communication</h2>
          <p className="text-xl md:text-2xl drop-shadow-md">One session at a time</p>
        </div>
      </div>
    </section>
  );
}
