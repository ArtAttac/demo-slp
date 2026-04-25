'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (config: any) => void;
    };
  }
}

export default function HuntPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            setIsModalOpen(false);
          },
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
            onClick={() => setIsModalOpen(true)}
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
                onClick={() => setIsModalOpen(true)}
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
              <p className="text-gray-700 font-medium">Saturday, May 9</p>
              <p className="text-sm text-gray-600 mt-1">2:30 PM - 5:30 PM</p>
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
              <p className="text-gray-700 font-medium">Old Stone House of Brooklyn</p>
              <p className="text-sm text-gray-600 mt-1">Brooklyn, NY</p>
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
              <p className="text-gray-700 font-medium">Ages 2-8</p>
              <p className="text-sm text-gray-600 mt-1">FREE community event</p>
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

      {/* Event Details Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-brand-bluePurple/10 via-brand-pink/10 to-brand-yellow/10 px-6 sm:px-8 py-6 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 sm:px-8 py-8 space-y-6">
                {/* Event Title & Location */}
                <div>
                  <h3 className="text-xl font-bold text-brand-darkBlue mb-2">Park Slope Little Explorers Scavenger Hunt</h3>
                  <p className="text-lg text-gray-700">Old Stone House of Brooklyn, Brooklyn, NY</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">Saturday, May 9 • 2:30 PM - 5:30 PM</p>
                </div>

                {/* Overview */}
                <div className="bg-gradient-to-br from-brand-pink/10 to-transparent rounded-2xl p-6 border border-brand-pink/20">
                  <h4 className="text-lg font-bold text-brand-darkBlue mb-4">Overview</h4>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Calling all explorers ages 2-8!</strong>
                    </p>
                    <p>
                      Join Speech on the Slope on Saturday 5/9 for a <strong>FREE neighborhood scavenger hunt</strong> designed to support early language development while your family explores our local community together.
                    </p>
                    <p>
                      This event is all about building vocabulary, sparking conversation, and strengthening observation skills through real-life experiences like noticing details, asking questions, solving clues, and describing what you see.
                    </p>
                  </div>
                </div>

                {/* How It Works */}
                <div>
                  <h4 className="text-lg font-bold text-brand-darkBlue mb-4">How It Works</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-xl mr-3">✨</span>
                      <span>Register using the link below and choose one of two café celebration time slots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">✨</span>
                      <span>Print or pick up your scavenger hunt board</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">✨</span>
                      <span>Visit participating local businesses to collect stickers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">✨</span>
                      <span>Complete your board by spotting items (younger children) or solving clues (older children)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">✨</span>
                      <span>Meet us at the Old Stone House Café tables for prizes, crafts, and games</span>
                    </li>
                  </ul>
                </div>

                {/* Important Info */}
                <div className="bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-2xl p-6 border border-brand-yellow/20">
                  <p className="text-gray-700 mb-3">
                    <strong>Families may begin visiting businesses anytime during the afternoon.</strong> The time slot you select during registration is the designated time your family will join us at the café tables for the celebration.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Please reserve a ticket for every person attending, including all children, and select the total number of tickets equal to your full party.
                  </p>
                  <p className="text-gray-700 flex items-start">
                    <span className="text-xl mr-3">⚠️</span>
                    <span><strong>Space is limited to 30 people per time slot due to park regulations.</strong> Advance registration is required.</span>
                  </p>
                </div>

                {/* Closing */}
                <div className="bg-gradient-to-br from-brand-bluePurple/10 to-transparent rounded-2xl p-6 border border-brand-bluePurple/20">
                  <p className="text-gray-700 text-lg">
                    We cannot wait to <strong>explore, connect, and grow together</strong> in language and in community 💛
                  </p>
                </div>

                {/* Eventbrite Button */}
                <div className="pt-4">
                  <button
                    id="eventbrite-widget-modal-trigger-1987359718416"
                    type="button"
                    className="w-full px-8 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    🎫 Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
