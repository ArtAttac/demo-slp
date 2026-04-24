'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (config: any) => void;
    };
  }
}

export default function HuntPage() {
  useEffect(() => {
    // Load Eventbrite widget script
    const script = document.createElement('script');
    script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Eventbrite widget after script loads
    script.onload = () => {
      if (window.EBWidgets) {
        window.EBWidgets.createWidget({
          widgetType: 'checkout',
          eventId: '1987359718416',
          themeSettings: {
            brandColor: '#7C5DFA',
            fontColor: '#000000',
            background: '#FFFFFF',
          },
          modal: true,
          modalTriggerElementId: 'eventbrite-widget-modal-trigger-1987359718416',
          onOrderComplete: () => {
            console.log('Order complete!');
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation back */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-brand-darkBlue hover:text-brand-bluePurple font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <button
            id="eventbrite-widget-modal-trigger-1987359718416"
            type="button"
            className="px-6 py-2 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            🎫 RSVP NOW!
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-brand-yellow/20 via-brand-pink/15 to-brand-bluePurple/10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-brand-pink/30 to-brand-yellow/30 text-sm font-bold uppercase tracking-widest text-brand-darkBlue mb-4">
              🔍 Community Event
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Park Slope Little{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-bluePurple">
                Explorers Scavenger Hunt
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-10">
              Join us for a fun-filled community adventure exploring local Park Slope businesses while practicing communication skills!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <button
                id="eventbrite-widget-modal-trigger-1987359718416"
                type="button"
                className="px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 inline-block"
              >
                🎫 RSVP NOW!
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Date Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="relative rounded-2xl bg-gradient-to-br from-brand-pink/20 to-brand-pink/5 p-6 border-2 border-brand-pink/30 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-lg font-bold text-brand-darkBlue mb-2">Date & Time</h3>
              <p className="text-gray-700 font-medium">Coming Soon</p>
              <p className="text-sm text-gray-600 mt-1">Check back for exact details</p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 p-6 border-2 border-brand-yellow/30 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-brand-darkBlue mb-2">Location</h3>
              <p className="text-gray-700 font-medium">Park Slope, Brooklyn</p>
              <p className="text-sm text-gray-600 mt-1">Local businesses throughout the neighborhood</p>
            </motion.div>

            {/* Ages Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-br from-brand-bluePurple/20 to-brand-bluePurple/5 p-6 border-2 border-brand-bluePurple/30 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-brand-darkBlue mb-2">For Ages</h3>
              <p className="text-gray-700 font-medium">Preschool & Kindergarten</p>
              <p className="text-sm text-gray-600 mt-1">Perfect for little explorers</p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-bluePurple rounded-full" />
          </div>

          {/* About the Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">What to Expect</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-pink/15 to-transparent p-8 border border-brand-pink/20">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">Communication Fun</h3>
                <p className="text-gray-700 leading-relaxed">
                  Kids practice social skills, asking questions, and conversations while exploring neighborhood businesses.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-yellow/15 to-transparent p-8 border border-brand-yellow/20">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">Prizes & Rewards</h3>
                <p className="text-gray-700 leading-relaxed">
                  Complete challenges at each stop and earn stickers, completion certificates, and special recognition!
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bluePurple/15 to-transparent p-8 border border-brand-bluePurple/20">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">Community Bonding</h3>
                <p className="text-gray-700 leading-relaxed">
                  Meet other families, support local businesses, and celebrate the vibrant Park Slope community together.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-pink/15 to-transparent p-8 border border-brand-pink/20">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-brand-darkBlue mb-3">Interactive Challenges</h3>
                <p className="text-gray-700 leading-relaxed">
                  Scavenger hunt activities designed to build confidence and encourage verbal communication.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Reach out to us directly for more information about the scavenger hunt.
            </p>
            <Link
              href="/#contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
