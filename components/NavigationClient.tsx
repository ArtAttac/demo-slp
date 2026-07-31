'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isSawyerWorkshopsEnabled, SAWYER_WORKSHOPS_COOKIE } from '@/lib/workshops';

const createNavLinks = (showSawyerWorkshops: boolean) => [
  { href: '/#get-started', label: 'Get Started', color: 'hover:text-brand-darkBlue' },
  { href: '/#mission', label: 'Mission', color: 'hover:text-brand-darkBlue' },
  { href: '/#about', label: 'Team', color: 'hover:text-brand-darkBlue' },
  { href: '/#services', label: 'Services', color: 'hover:text-brand-darkBlue' },
  { href: '/blog', label: 'Blog', color: 'hover:text-brand-darkBlue' },
  { href: '/faq', label: 'FAQ', color: 'hover:text-brand-darkBlue' },
  {
    href: '/workshops',
    label: showSawyerWorkshops ? 'Classes/Workshops' : 'Workshops',
    color: 'hover:text-brand-darkBlue',
  },
  { href: '/#contact', label: 'Contact', color: 'hover:text-brand-darkBlue' },
];

interface NavBarProps {
  isSticky?: boolean;
  showSawyerWorkshops: boolean;
}

function NavBar({ isSticky = false, showSawyerWorkshops }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = createNavLinks(showSawyerWorkshops);

  return (
    <div className={`${isSticky ? 'bg-white/60 backdrop-blur-md' : 'bg-white/60 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-20 ${isSticky ? 'justify-between' : 'justify-between'}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/logofortopleftcorner.png"
                alt="Speech on the Slope"
                width={210}
                height={210}
                className="h-[210px] w-[210px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden xl:flex items-center ${isSticky ? 'flex-1 justify-evenly mx-12' : 'space-x-1 xl:space-x-2'}`}>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-gray-700 ${link.color} transition-all duration-300 ease-in font-medium text-base group hover:scale-125 origin-center inline-block`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-bluePurple/10 via-brand-pink/10 to-brand-yellow/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-brand-bluePurple hover:bg-brand-bluePurple/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-bluePurple transition-all duration-200"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              id="mobile-menu"
              className="xl:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 bg-gradient-to-b from-brand-bluePurple/5 to-brand-pink/5 rounded-lg mb-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-gray-700 ${link.color} rounded-lg font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function NavigationClient() {
  const [isSticky, setIsSticky] = useState(false);
  const [showSawyerWorkshops, setShowSawyerWorkshops] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith(`${SAWYER_WORKSHOPS_COOKIE}=`))
      ?.split('=').slice(1).join('=');

    setShowSawyerWorkshops(isSawyerWorkshopsEnabled(cookieValue));

    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        setIsSticky(window.scrollY > heroSection.offsetTop + heroSection.clientHeight - 80);
      } else {
        setIsSticky(window.scrollY > window.innerHeight - 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Header */}
      <header className="relative z-20 shadow-sm">
        <NavBar showSawyerWorkshops={showSawyerWorkshops} />
      </header>

      {/* Sticky Navigation */}
      <AnimatePresence>
        {isSticky && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 shadow-lg"
          >
            <NavBar isSticky showSawyerWorkshops={showSawyerWorkshops} />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
