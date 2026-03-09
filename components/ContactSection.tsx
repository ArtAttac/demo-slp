'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
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
          <div className="space-y-8 text-center">
            {/* Email */}
            <div>
              <p className="font-semibold text-gray-800 text-lg mb-2">Email</p>
              <a
                href="mailto:hello@speechontheslope.com"
                className="text-xl text-brand-darkBlue hover:text-brand-bluePurple hover:underline transition-colors"
              >
                hello@speechontheslope.com
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="font-semibold text-gray-800 text-lg mb-2">Phone</p>
              <p className="text-xl text-gray-600">Business phone coming soon</p>
            </div>

            {/* Instagram */}
            <div>
              <p className="font-semibold text-gray-800 text-lg mb-2">Instagram</p>
              <a
                href="https://instagram.com/speechontheslope"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-brand-darkBlue hover:text-brand-bluePurple hover:underline transition-colors"
              >
                @speechontheslope
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
