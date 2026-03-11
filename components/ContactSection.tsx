'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    contactTime: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', email: '', phone: '', contactTime: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-yellow">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-900">
            Ready to start your journey? Contact us today for a free consultation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-brand-cream p-8 md:p-12 rounded-2xl shadow-lg"
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-700 mb-6">
                Thank you for reaching out. We&apos;ll get back to you as soon as possible!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-brand-bluePurple hover:underline font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-800 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                  placeholder="Your first name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div>
                <label htmlFor="contactTime" className="block text-sm font-semibold text-gray-800 mb-2">
                  Preferred Contact Time
                </label>
                <select
                  id="contactTime"
                  name="contactTime"
                  value={formData.contactTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-bluePurple/50 focus:border-brand-bluePurple transition-colors text-gray-800"
                >
                  <option value="">Select a time</option>
                  <option value="AM">AM (Morning)</option>
                  <option value="PM">PM (Afternoon/Evening)</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm text-center">
                  Something went wrong. Please try again or email us directly at{' '}
                  <a href="mailto:hello@speechontheslope.com" className="underline">hello@speechontheslope.com</a>
                </p>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-block px-10 py-4 bg-gradient-to-r from-brand-bluePurple to-brand-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Contact icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center items-center gap-8"
        >
          {/* Email */}
          <a
            href="mailto:hello@speechontheslope.com"
            className="flex flex-col items-center gap-2 text-gray-800 hover:text-brand-darkBlue transition-colors group"
            aria-label="Email us"
          >
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-xs font-medium">Email</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+19172000339"
            className="flex flex-col items-center gap-2 text-gray-800 hover:text-brand-darkBlue transition-colors group"
            aria-label="Call us"
          >
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <span className="text-xs font-medium">917-200-0339</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/speechontheslope"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-gray-800 hover:text-brand-darkBlue transition-colors group"
            aria-label="Follow us on Instagram"
          >
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <span className="text-xs font-medium">@speechontheslope</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
