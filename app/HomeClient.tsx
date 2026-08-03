'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AnnouncementBar from '@/components/AnnouncementBar';
import BlogToast from '@/components/BlogToast';
import HeroSection from '@/components/HeroSection';
import ServiceAreaBar from '@/components/ServiceAreaBar';
import MissionSection from '@/components/MissionSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GetStartedSection from '@/components/GetStartedSection';
import ParallaxSection from '@/components/ParallaxSection';

import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const sections = [
  { key: 'mission', Component: MissionSection },
  { key: 'about', Component: AboutSection },
  { key: 'services', Component: ServicesSection },
  { key: 'parallax', Component: ParallaxSection },
  { key: 'get-started', Component: GetStartedSection },
];

const trailingSections = [
  { key: 'contact', Component: ContactSection },
  { key: 'footer', Component: Footer },
];

export default function HomeClient({ latestPostsSlot }: { latestPostsSlot: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <section id="hero-section">
          <HeroSection />
        </section>
        <ServiceAreaBar />
        {sections.map(({ key, Component }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: 'easeOut' }}
          >
            <Component />
          </motion.div>
        ))}

        {/* Server-rendered Latest Posts (passed in from the page server component) */}
        {latestPostsSlot && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + sections.length * 0.05, ease: 'easeOut' }}
          >
            {latestPostsSlot}
          </motion.div>
        )}

        {trailingSections.map(({ key, Component }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + (sections.length + 1 + index) * 0.05, ease: 'easeOut' }}
          >
            <Component />
          </motion.div>
        ))}
      </motion.main>
      <BlogToast />
    </>
  );
}
