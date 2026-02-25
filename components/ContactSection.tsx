'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // Replace with your Web3Forms access key
          ...formData,
          subject: 'New Contact Form Submission - Bright Voices SLP',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-brand-yellow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-brand-cream p-8 md:p-12 rounded-2xl shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-bluePurple focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-bluePurple focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-bluePurple focus:outline-none transition-colors"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-bluePurple focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-bluePurple hover:bg-brand-darkBlue text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              Thank you! We&apos;ll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              Something went wrong. Please try again.
            </div>
          )}
        </motion.form>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Or reach us directly:</p>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Phone:</span>{' '}
              <a href="tel:+15551234567" className="text-brand-darkBlue hover:underline">
                (555) 123-4567
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:hello@speechontheslope.com" className="text-brand-darkBlue hover:underline">
                hello@speechontheslope.com
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Address:</span> 123 Main Street, Suite 200, Your City, ST 12345
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
