'use client';

import { motion } from 'framer-motion';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
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

  { key: 'contact', Component: ContactSection },
  { key: 'footer', Component: Footer },
];

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <section id="hero-section">
          <HeroSection />
        </section>
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
      </motion.main>
    </>
  );
}